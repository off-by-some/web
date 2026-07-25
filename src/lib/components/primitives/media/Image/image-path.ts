// src/lib/components/primitives/media/Image/image-path.ts
import { withBasePath } from '$lib/utils/paths';

export interface ImageLoaderResult {
  img: { src: string; w: number; h: number };
  sources: Record<string, string>; // e.g. { avif: "url 25w, ...", webp: "...", jpeg: "..." }
}

export interface PictureSourceSet {
  src: string;
  width?: number;
  height?: number;
  srcset?: string;
  sources?: { type: string; srcset: string }[];
  // Indicates a vector image like SVG which doesn't use responsive sources
  isVector?: boolean;
}

// Vite's import.meta.glob requires its query (including imagetools' `w`) to
// be static, so arbitrary per-call widths aren't possible — instead we
// predeclare a couple of source-width tiers and pick between them based on
// the `width` the caller already passes to <Image> (the width it intends to
// render at), rather than a separate prop describing what the image "is".
const SMALL_TIER_MAX_WIDTH = 150;
const MEDIUM_TIER_MAX_WIDTH = 300;

// Default tier: icons, logos, avatars — small, so a 150px max source is plenty.
const smallRasterModules = import.meta.glob('/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
  query: {
    enhanced: true,
    w: '50;150',
    format: 'webp',
  },
});

// Medium tier: avatars and inline media that can render above the small icon
// range but should still avoid jumping straight to banner-sized sources.
const mediumRasterModules = import.meta.glob('/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
  query: {
    enhanced: true,
    w: '150;200;300',
    format: 'webp',
  },
});

// Large tier: anything requested wider than MEDIUM_TIER_MAX_WIDTH — needs real
// source widths instead of being upscaled from a 150px-wide small-tier file.
const largeRasterModules = import.meta.glob('/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
  query: {
    enhanced: true,
    w: '400;800;1200',
    format: 'webp',
  },
});

function rasterModulesFor(targetWidth: number | undefined) {
  if (!targetWidth || targetWidth <= SMALL_TIER_MAX_WIDTH) return smallRasterModules;
  if (targetWidth <= MEDIUM_TIER_MAX_WIDTH) return mediumRasterModules;
  return largeRasterModules;
}

// Include SVGs in the rasterModules
const svgModules = import.meta.glob('/assets/images/**/*.svg', {
  import: 'default',
  query: '?url',
});

// Configuration constants
const PRIMARY_FORMAT = 'jpeg';
const VECTOR_EXTENSIONS = ['.svg'];

// Image cache for better performance with priority loading
const imageCache = new Map<string, Promise<PictureSourceSet | undefined>>();

// URL utilities - optimized for performance
const isExternalOrDataUrl = (url: string): boolean =>
  !url || /^https?:\/\//i.test(url) || url.startsWith('data:');

const isFilesystemPath = (url: string): boolean =>
  /^[A-Za-z]:[\\/]/.test(url) || url.startsWith('/Users/') || url.startsWith('/private/');

const publicImageUrl = (name: string): string => prefix(`/assets/images/${name}`);

function prefix(url: string): string {
  if (isExternalOrDataUrl(url)) return url;
  if (url.startsWith('/')) return withBasePath(url);
  return url;
}

function prefixSrcset(srcset: string | undefined): string | undefined {
  if (!srcset) return undefined;
  const entries = srcset.split(',');
  const mapped = entries.map((entry) => {
    const trimmed = entry.trim();
    if (!trimmed) return '';
    const parts = trimmed.split(/\s+/);
    const url = parts[0] ?? '';
    const sizeParts = parts.slice(1);
    return [prefix(url), ...sizeParts].join(' ').trim();
  });
  return mapped.filter(Boolean).join(', ');
}

// Enhanced image processing with better error handling
function toPictureSourceSet(enhanced: ImageLoaderResult): PictureSourceSet {
  const sourcesByFormat = enhanced.sources;
  let primaryCandidate = sourcesByFormat[PRIMARY_FORMAT];
  if (!primaryCandidate) primaryCandidate = sourcesByFormat.webp;
  if (!primaryCandidate) primaryCandidate = sourcesByFormat.avif;
  if (!primaryCandidate) primaryCandidate = Object.values(sourcesByFormat)[0];

  const preparedSources = Object.entries(sourcesByFormat)
    .filter(([format]) => format !== PRIMARY_FORMAT)
    .map(([format, srcset]) => {
      const prepared = prefixSrcset(srcset);
      return prepared ? { type: `image/${format}`, srcset: prepared } : null;
    })
    .filter((x): x is { type: string; srcset: string } => Boolean(x));

  return {
    src: prefix(enhanced.img.src),
    width: enhanced.img.w,
    height: enhanced.img.h,
    srcset: prefixSrcset(primaryCandidate),
    sources: preparedSources.length > 0 ? preparedSources : undefined,
  };
}

// Vector image detection
const isVectorImage = (name: string): boolean => {
  const lowered = name.toLowerCase();
  return VECTOR_EXTENSIONS.some((ext) => lowered.endsWith(ext));
};

function warnInDev(message: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
}

async function loadVectorImage(name: string): Promise<PictureSourceSet> {
  const key = `/assets/images/${name}`;

  if (!Object.prototype.hasOwnProperty.call(svgModules, key)) {
    return { src: publicImageUrl(name), isVector: true };
  }

  const loader = svgModules[key] as () => Promise<string>;

  try {
    const url = await loader();
    return {
      src: isFilesystemPath(url) ? publicImageUrl(name) : prefix(url),
      isVector: true,
    };
  } catch (error) {
    warnInDev(`Falling back to public SVG path: ${name}`, error);
    return { src: publicImageUrl(name), isVector: true };
  }
}

async function loadRasterImage(
  name: string,
  targetWidth: number | undefined,
): Promise<PictureSourceSet | undefined> {
  const key = `/assets/images/${name}`;
  const modules = rasterModulesFor(targetWidth);

  if (!Object.prototype.hasOwnProperty.call(modules, key)) return undefined;

  const loader = modules[key] as () => Promise<ImageLoaderResult>;

  try {
    const enhanced = await loader();
    return toPictureSourceSet(enhanced);
  } catch (error) {
    warnInDev(`Falling back to public image path: ${name}`, error);
    if (import.meta.env.DEV) return { src: publicImageUrl(name) };
    throw error;
  }
}

// Core image loader with caching and priority support
async function loadImageUncached(
  name: string,
  targetWidth: number | undefined,
): Promise<PictureSourceSet | undefined> {
  try {
    if (!name) return undefined;
    return isVectorImage(name)
      ? await loadVectorImage(name)
      : await loadRasterImage(name, targetWidth);
  } catch (error) {
    warnInDev(`Failed to load image: ${name}`, error);
    return undefined;
  }
}

// Main loader with intelligent caching. `targetWidth` — the width the caller
// intends to render at (same value <Image> already accepts as `width`) —
// picks which predeclared source-width tier to generate from; see
// rasterModulesFor above. Omit it and you get the small/icon-sized tier.
export async function loadImage(
  name: string,
  targetWidth?: number,
): Promise<PictureSourceSet | undefined> {
  if (!name) return undefined;

  const cacheKey = targetWidth ? `${String(targetWidth)}:${name}` : `default:${name}`;

  // Check cache first
  if (imageCache.has(cacheKey)) {
    const cached = imageCache.get(cacheKey);
    if (cached) return await cached;
  }

  // Load and cache the promise (not just the result)
  const loadPromise = loadImageUncached(name, targetWidth);
  imageCache.set(cacheKey, loadPromise);

  try {
    const result = await loadPromise;
    // Keep successful results cached, remove failures to allow retries
    if (!result) {
      imageCache.delete(cacheKey);
    }
    return result;
  } catch (error) {
    // Remove failed loads from cache to allow retries
    imageCache.delete(cacheKey);
    throw error;
  }
}

// Priority loading for above-the-fold images
export async function loadImageWithPriority(
  name: string,
  targetWidth?: number,
): Promise<PictureSourceSet | undefined> {
  // For priority images, we can add additional optimizations here
  // Currently uses the same loader but could be enhanced with:
  // - Preconnect hints
  // - Higher priority fetch
  // - Immediate loading without skeleton delay
  return loadImage(name, targetWidth);
}

// Preload utility for critical images
export function preloadImage(
  name: string,
  targetWidth?: number,
): Promise<PictureSourceSet | undefined> {
  // Immediately start loading without waiting for component mount
  return loadImage(name, targetWidth);
}

// Batch preload for multiple images
export function preloadImages(names: string[]): Promise<(PictureSourceSet | undefined)[]> {
  return Promise.all(names.map((name) => preloadImage(name)));
}

// Type guards and utilities
export const isEnhancedImage = (sourceSet: PictureSourceSet): boolean =>
  !sourceSet.isVector && Boolean(sourceSet.sources?.length);

export const hasValidDimensions = (
  sourceSet: PictureSourceSet,
): sourceSet is PictureSourceSet & { width: number; height: number } =>
  typeof sourceSet.width === 'number' &&
  typeof sourceSet.height === 'number' &&
  sourceSet.width > 0 &&
  sourceSet.height > 0;

// Calculate aspect ratio for skeleton loading
export const getAspectRatio = (sourceSet: PictureSourceSet): string => {
  if (hasValidDimensions(sourceSet)) {
    return String(sourceSet.width) + '/' + String(sourceSet.height);
  }
  return '1/1';
};

// Clear cache utility (useful for development or memory management)
export function clearImageCache(): void {
  imageCache.clear();
}

// Get cache size for debugging
export function getCacheInfo(): { size: number; keys: string[] } {
  return {
    size: imageCache.size,
    keys: Array.from(imageCache.keys()),
  };
}

// Development utilities
if (import.meta.env.DEV) {
  const dbg = globalThis as unknown as {
    __imageCache?: {
      cache: Map<string, Promise<PictureSourceSet | undefined>>;
      clear: () => void;
      info: () => { size: number; keys: string[] };
    };
  };
  dbg.__imageCache = {
    cache: imageCache,
    clear: clearImageCache,
    info: getCacheInfo,
  };
}
