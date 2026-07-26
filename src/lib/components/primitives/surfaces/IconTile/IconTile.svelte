<script lang="ts">
  import type { Snippet } from 'svelte';
  import Image from '$lib/components/primitives/media/Image';

  type Props = {
    src: string;
    alt?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    className?: string;
    imageClassName?: string;
    style?: string;
    children?: Snippet;
  };

  let {
    src,
    alt = '',
    sizes = '48px',
    loading = 'lazy',
    className = '',
    imageClassName = '',
    style = '',
    children,
  }: Props = $props();
</script>

<div class="icon-tile {className}" {style}>
  <Image {src} {alt} {sizes} {loading} className="icon-tile__image {imageClassName}" />
  {@render children?.()}
</div>

<style lang="scss">
  @use 'lib/components/primitives/root' as root;

  .icon-tile {
    @include root.component-root;

    --icon-tile-resolved-size: var(--icon-tile-size, var(--token-component-icon-tile-size));
    --icon-tile-resolved-padding: var(--icon-tile-padding, var(--token-reference-spacing-2));
    --icon-tile-resolved-image-size: var(
      --icon-tile-image-size,
      calc(var(--icon-tile-resolved-size) - (var(--icon-tile-resolved-padding) * 2))
    );
    --icon-tile-resolved-overflow: var(--icon-tile-overflow, visible);

    align-items: center;
    background: var(--icon-tile-background, var(--token-theme-color-surface-color));
    border: var(--icon-tile-border, var(--token-theme-border-default-small));
    border-radius: var(--icon-tile-radius, var(--token-reference-radius-lg));
    box-shadow: var(--icon-tile-shadow, none);
    display: flex;
    flex-shrink: 0;
    block-size: var(--icon-tile-resolved-size);
    justify-content: center;
    overflow: var(--icon-tile-resolved-overflow);
    padding: var(--icon-tile-resolved-padding);
    position: relative;
    transition:
      background-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      border-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    inline-size: var(--icon-tile-resolved-size);
    z-index: var(--icon-tile-z-index, var(--token-reference-layer-base));
  }

  :global(.icon-tile__image) {
    display: block;
    filter: var(--icon-tile-image-filter, none);
    block-size: var(--icon-tile-resolved-image-size);
    min-block-size: var(--icon-tile-resolved-image-size);
    min-inline-size: var(--icon-tile-resolved-image-size);
    object-fit: contain;
    transform: var(--icon-tile-image-transform, none);
    transition:
      filter var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    inline-size: var(--icon-tile-resolved-image-size);
  }
</style>
