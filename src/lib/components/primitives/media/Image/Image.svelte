<!--
╭──────────────────────────────────────────────────────────────────────────────╮
│ <Image/> — responsive catalog image renderer                                 │
╰──────────────────────────────────────────────────────────────────────────────╯

TL;DR
• Pass a src like "company_logos/concordus-applications.jpg".
• Pass a statically imported enhanced asset for critical SSR-first images.
• Files must exist under /assets/images/** at build time.
• Outputs <picture> props (src, srcset, sources, width, height).
• URLs are prefixed with SvelteKit {base} → safe for GitHub Pages.

USAGE
  <Image src="company_logos/concordus-applications.jpg" alt="Concordus" />
  <Image src={heroImage} alt="Hero" priority />

REQUIREMENTS ✅
  [ ] Images live in /assets/images/** (project root)
  [ ] src is exact path + extension (case-sensitive)
  [ ] @sveltejs/enhanced-img enabled before the SvelteKit plugin

HOW IT WORKS 🧠
  1) import.meta.glob(...) creates a lazy registry.
  2) Reserves explicit width/height while loading when callers provide them.
  3) On first use of a src:
       – loads a tiny manifest chunk
       – returns { src, width, height, srcset, sources[] }
  4) All URLs get {base} prefix for subpath deploys.

PERFORMANCE 📦
  • Initial JS: small registry + dynamic import stubs.
  • Per image: one small metadata chunk on first render (cached after).
  • Keep globs narrow or split by folder if you have many images.
  • width/height included to prevent CLS; set `sizes` so the browser picks best.

OPTIONS
  • priority: true → eager load + fetchpriority="high".
  • width/height: intrinsic layout hints for stable placeholders and rendered images.

ACCESSIBILITY ♿
  • alt=""  → decorative (component adds aria-hidden/role).
  • alt="…" → informative (required for content images).

TROUBLESHOOTING 🔧
  • "Image not found" → wrong path/extension/case or not present at build time.
  • Dev tip: log available keys with:
      console.log(Object.keys(import.meta.glob('/assets/images/**/*')))
-->
<!-- <Image/> — normal <img> with optional responsive sources -->
<!-- src/lib/components/primitives/media/Image/Image.svelte -->
<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import type {
    ImageSource,
    PictureSourceSet,
  } from '$lib/components/primitives/media/Image/image-path';
  import {
    getImageNameFromSource,
    getImage,
    getInlineImage,
    isEnhancedImageSource,
    isExternalOrDataUrl,
    loadImage,
    toPictureSourceSet,
  } from '$lib/components/primitives/media/Image/image-path';

  type ResolvedImage = {
    key: string;
    data: PictureSourceSet | undefined;
  };

  type Props = {
    src: ImageSource; // string catalog/external src or statically imported ?enhanced asset
    alt?: string;
    sizes?: string; // browser hint; default computed below
    loading?: HTMLImgAttributes['loading'];
    decoding?: HTMLImgAttributes['decoding'];
    fetchpriority?: HTMLImgAttributes['fetchpriority'];
    priority?: boolean; // set to true for LCP images
    preload?: boolean; // emits <link rel="preload" as="image"> when metadata is available
    inline?: boolean; // embeds catalog asset bytes into the img src for tiny critical images
    placeholderSrc?: string; // optional inline placeholder shown under the final image
    className?: string;
    style?: HTMLImgAttributes['style'];
    width?: number;
    height?: number;
    [key: string]: unknown;
  };

  let {
    src,
    alt = '',
    sizes,
    loading = 'lazy',
    decoding = 'async',
    fetchpriority,
    priority = false,
    preload = priority,
    inline = false,
    placeholderSrc,
    className = '',
    style,
    width,
    height,
    ...rest
  }: Props = $props();

  // Internal state
  function imageDataFor(
    currentSrc: ImageSource | undefined,
    shouldInline: boolean,
  ): PictureSourceSet | undefined {
    if (!currentSrc) return;
    if (isEnhancedImageSource(currentSrc)) return toPictureSourceSet(currentSrc);

    const name = getImageNameFromSource(currentSrc);
    if (!name) return;
    return (shouldInline ? getInlineImage(name) : undefined) ?? getImage(name);
  }

  function inlineImageDataFor(currentSrc: string | undefined): PictureSourceSet | undefined {
    if (!currentSrc) return;

    const name = getImageNameFromSource(currentSrc);
    return name ? getInlineImage(name) : undefined;
  }

  function keyFor(currentSrc: ImageSource | undefined, shouldInline: boolean): string {
    if (!currentSrc) return '';
    if (isEnhancedImageSource(currentSrc)) return `enhanced\0${currentSrc.img.src}`;
    return `string\0${currentSrc}\0${shouldInline ? 'inline' : 'url'}`;
  }

  let resolved = $state<ResolvedImage | undefined>(undefined);
  const requestKey = $derived(keyFor(src, inline));
  const data = $derived(resolved?.key === requestKey ? resolved.data : imageDataFor(src, inline));
  let err = $state<string | null>(null);
  let lazyElement: HTMLElement | undefined = $state();
  let finalImageElement: HTMLImageElement | undefined = $state();
  let finalImageLoaded = $state(false);
  let shouldLoad = $state(false);
  let requestSequence = 0;
  const placeholderData = $derived(inlineImageDataFor(placeholderSrc));

  function markFinalImageLoaded() {
    finalImageLoaded = true;
  }

  async function startLoadFor(currentSrc: ImageSource | undefined) {
    const myId = ++requestSequence;
    const key = keyFor(currentSrc, inline);
    const name = currentSrc ? getImageNameFromSource(currentSrc) : undefined;

    if (!name) {
      resolved = { key, data: imageDataFor(currentSrc, inline) };
      err = null;
      return;
    }

    resolved = { key, data: imageDataFor(currentSrc, inline) };
    try {
      const result = await loadImage(name);
      if (myId !== requestSequence) return; // stale
      resolved = { key, data: result ?? undefined };
      err = result ? null : `Image not found: ${name}`;
    } catch {
      if (myId !== requestSequence) return; // stale
      resolved = { key, data: undefined };
      err = 'Failed to load image';
    }
  }

  const isExternalSrc = $derived(typeof src === 'string' && isExternalOrDataUrl(src));

  $effect(() => {
    requestKey;
    requestSequence += 1;
    resolved = undefined;
    err = null;
    finalImageLoaded = false;
    shouldLoad = false;
  });

  $effect(() => {
    if (!placeholderData || !finalImageElement) return;
    if (finalImageElement.complete && finalImageElement.naturalWidth > 0) {
      finalImageLoaded = true;
    }
  });

  // Defer below-the-fold catalog resolution until the component is close enough
  // for the browser to need it.
  $effect(() => {
    if (priority || loading === 'eager' || isExternalSrc) {
      shouldLoad = true;
      return;
    }

    const eagerData = imageDataFor(src, inline);
    if (eagerData) {
      shouldLoad = true;
      return;
    }

    shouldLoad = false;
    err = null;
  });

  $effect(() => {
    if (shouldLoad || priority || loading === 'eager' || isExternalSrc) return;

    if (!lazyElement || typeof window.IntersectionObserver !== 'function') {
      shouldLoad = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        shouldLoad = true;
        observer.disconnect();
      },
      { rootMargin: '800px 0px' },
    );

    observer.observe(lazyElement);
    return () => observer.disconnect();
  });

  // Reruns after the lazy gate opens and whenever `src` changes thereafter.
  $effect(() => {
    if (!shouldLoad) return;
    if (isExternalSrc) return;
    if (imageDataFor(src, inline)) return;
    void startLoadFor(src);
  });

  // If user passes a numeric width (like <Image width={48} …>), default sizes => "48px"
  const effectiveSizes = $derived(sizes ?? (Number.isFinite(width) ? `${width}px` : undefined));

  // Decorative images: hide from AT when alt is empty
  const ariaHidden = $derived(alt === '' ? 'true' : undefined);
  const role = $derived(alt === '' ? 'presentation' : undefined);
</script>

<svelte:head>
  {#if data && preload && !data.isInline}
    <link
      rel="preload"
      as="image"
      href={data.preloadSrc ?? data.src}
      imagesrcset={data.preloadSrcset ?? data.srcset}
      imagesizes={effectiveSizes}
      fetchpriority={priority ? 'high' : fetchpriority}
    />
  {/if}
</svelte:head>

{#if data}
  {#if data.isVector}
    <!-- SVG: contain inside the box; CSS still controls final size -->
    <img
      src={data.src}
      {alt}
      class={className}
      class:image={true}
      {style}
      loading={priority ? 'eager' : loading}
      {decoding}
      fetchpriority={priority ? 'high' : fetchpriority}
      {width}
      {height}
      aria-hidden={ariaHidden === 'true' ? 'true' : undefined}
      {role}
      {...rest}
    />
  {:else}
    <!-- Raster: responsive <picture>. Width/height provide intrinsic size (no CLS);
         CSS/containers still control display size (e.g., img { max-width:100%; height:auto }) -->
    {#if placeholderData}
      <img
        src={placeholderData.src}
        alt=""
        class={className}
        class:image={true}
        class:image__preview={true}
        {style}
        loading="eager"
        decoding="async"
        width={width ?? data.width}
        height={height ?? data.height}
        aria-hidden="true"
        role="presentation"
      />
    {/if}
    <picture class="image__picture">
      {#each data.sources ?? [] as s (s.type)}
        <source type={s.type} srcset={s.srcset} sizes={effectiveSizes} />
      {/each}
      <img
        src={data.src}
        srcset={data.srcset}
        sizes={effectiveSizes}
        {alt}
        class={className}
        class:image={true}
        class:image__final={Boolean(placeholderData)}
        class:image__final--loaded={finalImageLoaded}
        {style}
        loading={priority ? 'eager' : loading}
        {decoding}
        fetchpriority={priority ? 'high' : fetchpriority}
        width={width ?? data.width}
        height={height ?? data.height}
        aria-hidden={ariaHidden === 'true' ? 'true' : undefined}
        {role}
        bind:this={finalImageElement}
        onload={markFinalImageLoaded}
        {...rest}
      />
    </picture>
  {/if}
{:else if isExternalSrc}
  <!-- Fallback: external/data URLs render as a normal image while catalog images load. -->
  <img
    src={typeof src === 'string' ? src : ''}
    {alt}
    class={className}
    class:image={true}
    {style}
    loading={priority ? 'eager' : loading}
    {decoding}
    fetchpriority={priority ? 'high' : fetchpriority}
    {width}
    {height}
    aria-hidden={ariaHidden === 'true' ? 'true' : undefined}
    {role}
    {...rest}
  />
{:else}
  <span
    bind:this={lazyElement}
    class={className}
    class:image__placeholder={true}
    aria-hidden="true"
    style:inline-size={width ? `${width}px` : undefined}
    style:block-size={height ? `${height}px` : undefined}
  ></span>
{/if}

{#if import.meta.env.DEV && err}
  <pre class="image__error">{err}</pre>
{/if}

<style>
  .image {
    display: block;
    max-inline-size: 100%;
  }

  .image__picture {
    display: contents;
  }

  .image__preview {
    pointer-events: none;
    transition: opacity 160ms ease;
    user-select: none;
  }

  .image__final {
    color: transparent;
    font-size: 0;
    opacity: 0;
    transition: opacity 160ms ease;
  }

  .image__final--loaded {
    opacity: 1;
  }

  .image__placeholder {
    block-size: 100%;
    display: block;
    inline-size: 100%;
    min-block-size: 1px;
    min-inline-size: 1px;
  }

  .image__error {
    color: var(--image-error-color, var(--token-theme-color-status-danger-fg));
    font:
      var(--image-error-font-size, var(--token-reference-typography-size-xs)) /
        var(--token-reference-typography-line-height-snug)
        var(--token-reference-typography-family-mono, ui-monospace),
      ui-monospace;
    margin-block-start: var(--token-reference-spacing-3);
  }

  @media (prefers-reduced-motion: reduce) {
    .image__preview,
    .image__final {
      transition: none;
    }
  }
</style>
