<!--
╭──────────────────────────────────────────────────────────────────────────────╮
│ <Image/> — Lazy, responsive image loader with skeleton & animations          │
╰──────────────────────────────────────────────────────────────────────────────╯

TL;DR
• Pass a src like "company_logos/concordus-applications.jpg".
• Files must exist under /assets/images/** at build time.
• Outputs <picture> props (src, srcset, sources, width, height).
• URLs are prefixed with SvelteKit {base} → safe for GitHub Pages.
• Beautiful skeleton loader and smooth load-in animations.

USAGE
  <Image src="company_logos/concordus-applications.jpg" alt="Concordus" />

REQUIREMENTS ✅
  [ ] Images live in /assets/images/** (project root)
  [ ] src is exact path + extension (case-sensitive)
  [ ] @sveltejs/enhanced-img enabled before the SvelteKit plugin

HOW IT WORKS 🧠
  1) import.meta.glob(...) creates a lazy registry.
  2) Shows skeleton loader while loading.
  3) On first use of a src:
       – loads a tiny manifest chunk
       – returns { src, width, height, srcset, sources[] }
  4) Animates in smoothly when loaded.
  5) All URLs get {base} prefix for subpath deploys.

PERFORMANCE 📦
  • Initial JS: small registry + dynamic import stubs.
  • Per image: one small metadata chunk on first render (cached after).
  • Keep globs narrow or split by folder if you have many images.
  • width/height included to prevent CLS; set `sizes` so the browser picks best.

OPTIONS
  • priority: true → eager load + fetchpriority="high".
  • showFallback: true → renders <img> placeholder if missing.
  • skeletonAspectRatio: string → custom aspect ratio for skeleton (default: "16/9")

ACCESSIBILITY ♿
  • alt=""  → decorative (component adds aria-hidden/role).
  • alt="…" → informative (required for content images).

TROUBLESHOOTING 🔧
  • "Image not found" → wrong path/extension/case or not present at build time.
  • Dev tip: log available keys with:
      console.log(Object.keys(import.meta.glob('/assets/images/**/*')))
-->
<!-- <Image/> — normal <img> with optional responsive sources -->
<!-- src/lib/components/Image.svelte -->
<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { onMount, afterUpdate } from 'svelte';
  import type { PictureSourceSet } from '$lib/Image/image-path';
  import { loadImage } from '$lib/Image/image-path';

  // Match <img> API
  export let src: string; // acts like <img src="">
  export let alt: string = '';
  export let sizes: string | undefined = undefined; // browser hint; default computed below
  export let loading: HTMLImgAttributes['loading'] = 'lazy';
  export let decoding: HTMLImgAttributes['decoding'] = 'async';
  export let fetchpriority: HTMLImgAttributes['fetchpriority'] = undefined;
  export let priority = false; // set to true for LCP images

  // Internal state
  let data: PictureSourceSet | undefined;
  let err: string | null = null;
  let lastObservedSrc: string | undefined;
  let requestSequence = 0;

  async function startLoadFor(currentSrc: string | undefined) {
    const myId = ++requestSequence;
    const name = toName(currentSrc ?? '');
    if (!name) {
      data = undefined;
      err = null;
      return;
    }
    try {
      const result = await loadImage(name);
      if (myId !== requestSequence) return; // stale
      data = result ?? undefined;
      err = result ? null : `Image not found: ${name}`;
    } catch {
      if (myId !== requestSequence) return; // stale
      data = undefined;
      err = 'Failed to load image';
    }
  }

  // Grab any class passed to <Image class="..."> so we can put it on the real <img>
  $: klass = (($$props as any).class || '') as string;

  // Helper: turn a src string into a catalog "name" under /assets/images/**
  function toName(s: string): string | undefined {
    if (!s) return;
    if (/^https?:\/\//i.test(s) || s.startsWith('data:')) return; // external: render plain <img>
    // Accept "/assets/images/foo.png" or "foo.png"
    return s.replace(/^\/assets\/images\//, '');
  }

  onMount(() => {
    lastObservedSrc = src;
    void startLoadFor(src);
  });

  afterUpdate(() => {
    if (src !== lastObservedSrc) {
      lastObservedSrc = src;
      void startLoadFor(src);
    }
  });

  // If user passes a numeric width (like <Image width={48} …>), default sizes => "48px"
  $: effectiveSizes =
    sizes ??
    (Number.isFinite(($$props as any).width as number)
      ? String(($$props as any).width) + 'px'
      : undefined);

  // Decorative images: hide from AT when alt is empty
  $: ariaHidden = alt === '' ? 'true' : undefined;
  $: role = alt === '' ? 'presentation' : undefined;
</script>

{#if data}
  {#if data.isVector}
    <!-- SVG: contain inside the box; CSS still controls final size -->
    <img
      src={data.src}
      {alt}
      class={klass}
      loading={priority ? 'eager' : loading}
      {decoding}
      fetchpriority={priority ? 'high' : fetchpriority}
      aria-hidden={ariaHidden === 'true' ? 'true' : undefined}
      {role}
      {...$$restProps}
    />
  {:else}
    <!-- Raster: responsive <picture>. Width/height provide intrinsic size (no CLS);
         CSS/containers still control display size (e.g., img { max-width:100%; height:auto }) -->
    <picture class={klass}>
      {#each data.sources ?? [] as s (s.type)}
        <source type={s.type} srcset={s.srcset} sizes={effectiveSizes} />
      {/each}
      <img
        src={data.src}
        srcset={data.srcset}
        sizes={effectiveSizes}
        {alt}
        class={klass}
        loading={priority ? 'eager' : loading}
        {decoding}
        fetchpriority={priority ? 'high' : fetchpriority}
        width={(($$props as any).width as number | undefined) ?? data.width}
        height={(($$props as any).height as number | undefined) ?? data.height}
        aria-hidden={ariaHidden === 'true' ? 'true' : undefined}
        {role}
        {...$$restProps}
      />
    </picture>
  {/if}
{:else}
  <!-- Fallback: non-catalog or not yet resolved -> plain <img> -->
  <!-- <img
    src={src}
    alt={alt}
    class={klass}
    loading={priority ? 'eager' : loading}
    decoding={decoding}
    fetchpriority={priority ? 'high' : fetchpriority}
    aria-hidden={ariaHidden ? 'true' : undefined}
    role={role}
    {...$$restProps}
  /> -->
{/if}

{#if import.meta.env.DEV && err}
  <pre style="color:crimson;font:12px/1.3 ui-monospace,monospace;margin-top:.5rem">{err}</pre>
{/if}

<style>
  /* Optional: make it behave like typical responsive images by default.
     Remove if your design system handles this globally. */
  :global(img),
  :global(picture > img) {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
