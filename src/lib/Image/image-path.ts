// src/lib/image-path.ts
import { base } from '$app/paths';

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

// Import all current image formats but enhanced image will output only webp
const rasterModules = import.meta.glob('/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
  query: {
    enhanced: true,
    w: '50;150',
    format: 'webp',
  },
});

// Include SVGs in the rasterModules
const svgModules = import.meta.glob('/assets/images/**/*.svg', { import: 'default' });

// Configuration constants
const PRIMARY_FORMAT = 'jpeg';
const VECTOR_EXTENSIONS = ['.svg'];

// Image cache for better performance with priority loading
const imageCache = new Map<string, Promise<PictureSourceSet | undefined>>();

// URL utilities - optimized for performance
const isExternalOrDataUrl = (url: string): boolean =>
  !url || /^https?:\/\//i.test(url) || url.startsWith('data:');

function prefix(url: string): string {
  if (isExternalOrDataUrl(url)) return url;
  if (url.startsWith('/')) return base + url;
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

// Core image loader with caching and priority support
async function loadImageUncached(name: string): Promise<PictureSourceSet | undefined> {
  if (!name) return undefined;

  const key = `/assets/images/${name}`;

  try {
    if (isVectorImage(name)) {
      const svgKey = `/assets/images/${name}`;
      if (!Object.prototype.hasOwnProperty.call(svgModules, svgKey)) return undefined;
      const loader = svgModules[svgKey] as () => Promise<string>;
      const url = await loader();
      return { src: prefix(url), isVector: true };
    }

    if (!Object.prototype.hasOwnProperty.call(rasterModules, key)) return undefined;
    const loader = rasterModules[key] as () => Promise<ImageLoaderResult>;

    const enhanced = await loader();
    return toPictureSourceSet(enhanced);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Failed to load image: ${name}`, error);
    }
    return undefined;
  }
}

// Main loader with intelligent caching
export async function loadImage(name: string): Promise<PictureSourceSet | undefined> {
  if (!name) return undefined;

  // Check cache first
  if (imageCache.has(name)) {
    const cached = imageCache.get(name);
    if (cached) return await cached;
  }

  // Load and cache the promise (not just the result)
  const loadPromise = loadImageUncached(name);
  imageCache.set(name, loadPromise);

  try {
    const result = await loadPromise;
    // Keep successful results cached, remove failures to allow retries
    if (!result) {
      imageCache.delete(name);
    }
    return result;
  } catch (error) {
    // Remove failed loads from cache to allow retries
    imageCache.delete(name);
    throw error;
  }
}

// Priority loading for above-the-fold images
export async function loadImageWithPriority(name: string): Promise<PictureSourceSet | undefined> {
  // For priority images, we can add additional optimizations here
  // Currently uses the same loader but could be enhanced with:
  // - Preconnect hints
  // - Higher priority fetch
  // - Immediate loading without skeleton delay
  return loadImage(name);
}

// Preload utility for critical images
export function preloadImage(name: string): Promise<PictureSourceSet | undefined> {
  // Immediately start loading without waiting for component mount
  return loadImage(name);
}

// Batch preload for multiple images
export function preloadImages(names: string[]): Promise<(PictureSourceSet | undefined)[]> {
  return Promise.all(names.map(preloadImage));
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
