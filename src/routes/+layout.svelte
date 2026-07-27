<script lang="ts">
  import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
  import interCssUrl from '@fontsource-variable/inter/wght.css?url';

  const { children }: { children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
  <!--
    Inter Variable backs the site's primary sans stack and sits under the
    hero name (the page's LCP element), so it can't be deferred past
    hydration the way the decorative Caveat font is - any post-load swap
    there risks a layout shift. Instead: preload the font bytes, and load
    the @font-face CSS via the standard non-blocking "preload as style,
    then promote to stylesheet" pattern so it applies as early as the
    browser can manage without ever being a render-blocking <link>.
  -->
  <link rel="preload" href={interWoff2} as="font" type="font/woff2" crossorigin="anonymous" />
  <link
    rel="preload"
    href={interCssUrl}
    as="style"
    onload={(event) => {
      const link = event.currentTarget as HTMLLinkElement;
      link.onload = null;
      link.rel = 'stylesheet';
    }}
  />
  <noscript><link rel="stylesheet" href={interCssUrl} /></noscript>
</svelte:head>

<div class="app">
  {@render children()}
</div>

<style lang="scss" global>
  @use 'styles/foundations';
</style>
