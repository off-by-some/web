<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { sectionViewportSizes } from './section-viewports';
  import type { SectionViewport } from './section-viewports';

  type Props = {
    mode?: SectionViewport;
    children?: Snippet;
  };

  let { mode = 'desktop', children }: Props = $props();
  const size = $derived(sectionViewportSizes[mode]);
  let frame: HTMLDivElement | undefined = $state();

  const centerOverflow = () => {
    if (!frame || mode !== 'desktop') return;

    const overflow = frame.scrollWidth - frame.clientWidth;

    if (overflow > 0) {
      frame.scrollLeft = overflow / 2;
    }
  };

  onMount(() => {
    requestAnimationFrame(centerOverflow);
  });

  $effect(() => {
    mode;
    size.width;
    requestAnimationFrame(centerOverflow);
  });
</script>

<div bind:this={frame} class="viewport-frame viewport-frame--{mode}">
  <div
    class="viewport-frame__surface"
    style="--viewport-frame-width: {size.width}px; --viewport-frame-height: {size.height}px;"
  >
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .viewport-frame {
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    display: block;
    padding: 0;
    background: var(--token-gradients-hero, #080a18);
  }

  .viewport-frame__surface {
    width: var(--viewport-frame-width);
    min-height: var(--viewport-frame-height);
    margin-inline: auto;
    overflow: visible;
    background: var(--token-gradients-hero, #080a18);
    border: 1px solid var(--token-surface-glass-border, rgba(255, 255, 255, 0.1));
    border-radius: var(--token-radius-md, 0.75rem);
  }
</style>
