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

type RasterModuleMap = Partial<Record<string, ImageLoaderResult>>;
type RasterModuleLoaderMap = Partial<Record<string, () => Promise<ImageLoaderResult>>>;
type VectorModuleLoaderMap = Partial<Record<string, () => Promise<string>>>;
type ImportMetaEnvWithStorybook = ImportMetaEnv & {
  STORYBOOK?: boolean | string;
};

// Vite's import.meta.glob requires imagetools options to be static. Instead of
// one giant all-purpose registry, paths choose their natural source tier:
// icons/logos stay compact, avatars keep retina room, banners get wide sources.
const iconRasterModules = import.meta.glob('/assets/images/icons/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
  query: {
    enhanced: true,
    w: '64;128;192',
    format: 'webp',
  },
}) as RasterModuleLoaderMap;

const companyLogoRasterModules = import.meta.glob(
  '/assets/images/company_logos/**/*.{jpg,jpeg,png,webp,avif}',
  {
    import: 'default',
    query: {
      enhanced: true,
      w: '64;128;192',
      format: 'webp',
    },
  },
) as RasterModuleLoaderMap;

const employeeRasterModules = import.meta.glob(
  '/assets/images/employees/**/*.{jpg,jpeg,png,webp,avif}',
  {
    import: 'default',
    query: {
      enhanced: true,
      w: '96;160;240',
      format: 'webp',
    },
  },
) as RasterModuleLoaderMap;

const bannerRasterModules = import.meta.glob(
  '/assets/images/banners/**/*.{jpg,jpeg,png,webp,avif}',
  {
    import: 'default',
    query: {
      enhanced: true,
      w: '480;800;1200',
      format: 'webp',
    },
  },
) as RasterModuleLoaderMap;

const eagerRasterModules: RasterModuleMap = {};

const lazyRasterModules = {
  ...iconRasterModules,
  ...companyLogoRasterModules,
  ...employeeRasterModules,
  ...bannerRasterModules,
};

// SVGs are below-the-fold site assets, so keep their URL modules out of the
// first page chunk and resolve them only when the Image instance needs them.
// Use a file-relative glob so Storybook's /assets/images static route cannot
// shadow Vite's `?url` module request in dev.
const SVG_ASSET_PREFIX = '../../../../../../assets/images/';

const svgModules = import.meta.glob('../../../../../../assets/images/**/*.svg', {
  import: 'default',
  query: '?url',
}) as VectorModuleLoaderMap;

// Configuration constants
const PRIMARY_FORMAT = 'jpeg';
const VECTOR_EXTENSIONS = ['.svg'];
const isStorybook = Boolean((import.meta.env as ImportMetaEnvWithStorybook).STORYBOOK);
const storybookBaseUrl = import.meta.env.BASE_URL || '/';

// Image cache for better performance with priority loading
const imageCache = new Map<string, Promise<PictureSourceSet | undefined>>();
const externalImageCache = new Map<string, Promise<void>>();

// URL utilities - optimized for performance
const isExternalOrDataUrl = (url: string): boolean =>
  !url || /^https?:\/\//i.test(url) || url.startsWith('data:');

const isFilesystemPath = (url: string): boolean =>
  /^[A-Za-z]:[\\/]/.test(url) || url.startsWith('/Users/') || url.startsWith('/private/');

function prefix(url: string): string {
  if (isExternalOrDataUrl(url)) return url;
  if (url.startsWith('/')) return withBasePath(url);
  return url;
}

function prefixStorybookAsset(url: string): string {
  if (isExternalOrDataUrl(url)) return url;

  const normalizedBase = storybookBaseUrl.endsWith('/') ? storybookBaseUrl : `${storybookBaseUrl}/`;
  return `${normalizedBase}${url.replace(/^\/+/, '')}`;
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

function loadStaticCatalogImage(name: string): PictureSourceSet | undefined {
  if (!name) return undefined;

  return {
    src: prefixStorybookAsset(`/assets/images/${name}`),
    isVector: isVectorImage(name),
  };
}

function warnInDev(message: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
}

async function loadVectorImage(name: string): Promise<PictureSourceSet | undefined> {
  const key = `${SVG_ASSET_PREFIX}${name}`;
  const load = svgModules[key];

  if (!load) return undefined;

  const url = await load();
  return {
    src: isFilesystemPath(url) ? prefix(`/assets/images/${name}`) : prefix(url),
    isVector: true,
  };
}

function loadRasterImage(name: string): PictureSourceSet | undefined {
  const key = `/assets/images/${name}`;
  const enhanced = eagerRasterModules[key];

  if (!enhanced) return undefined;
  return toPictureSourceSet(enhanced);
}

async function loadLazyRasterImage(name: string): Promise<PictureSourceSet | undefined> {
  const key = `/assets/images/${name}`;
  const load = lazyRasterModules[key];

  if (!load) return undefined;
  return toPictureSourceSet(await load());
}

function imageNameFromSource(source: string): string | undefined {
  if (!source || isExternalOrDataUrl(source)) return undefined;
  return source.replace(/^\/?assets\/images\//, '').replace(/^\/+/, '');
}

function preloadExternalImage(source: string): Promise<void> {
  if (!source || source.startsWith('data:') || typeof window === 'undefined') {
    return Promise.resolve();
  }

  const cached = externalImageCache.get(source);
  if (cached) return cached;

  const loadPromise = new Promise<void>((resolve) => {
    const img = new window.Image();

    img.decoding = 'async';
    img.onload = () => {
      resolve();
    };
    img.onerror = (error) => {
      externalImageCache.delete(source);
      warnInDev(`Failed to preload external image: ${source}`, error);
      resolve();
    };
    img.src = source;
  });

  externalImageCache.set(source, loadPromise);
  return loadPromise;
}

// Core image loader with caching and priority support
function loadImageUncached(name: string): Promise<PictureSourceSet | undefined> {
  try {
    if (isStorybook) return Promise.resolve(loadStaticCatalogImage(name));

    const eagerImage = getImage(name);
    if (eagerImage) return Promise.resolve(eagerImage);

    return isVectorImage(name) ? loadVectorImage(name) : loadLazyRasterImage(name);
  } catch (error) {
    warnInDev(`Failed to load image: ${name}`, error);
    return Promise.resolve(undefined);
  }
}

export function getImage(name: string): PictureSourceSet | undefined {
  if (!name) return undefined;
  if (isStorybook) return loadStaticCatalogImage(name);
  return isVectorImage(name) ? undefined : loadRasterImage(name);
}

// Main loader with intelligent caching. `targetWidth` is retained for API
// compatibility; source tiers are now selected by image folder so SSR can render
// final URLs without waiting for browser-only effects.
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
  const loadPromise = loadImageUncached(name);
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

export async function preloadImageSource(source: string, targetWidth?: number): Promise<void> {
  if (!source) return;

  if (/^https?:\/\//i.test(source)) {
    await preloadExternalImage(source);
    return;
  }

  const name = imageNameFromSource(source);
  if (name) {
    await preloadImage(name, targetWidth);
  }
}

export async function preloadImageSources(sources: string[], targetWidth?: number): Promise<void> {
  await Promise.all(
    Array.from(new Set(sources)).map((source) => preloadImageSource(source, targetWidth)),
  );
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
