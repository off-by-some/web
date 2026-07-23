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

    --icon-tile-resolved-size: var(
      --icon-tile-size,
      clamp(
        var(--icon-tile-min-size, 2.75rem),
        var(--icon-tile-fluid-size, 6vw),
        var(--icon-tile-max-size, 3.75rem)
      )
    );
    --icon-tile-resolved-padding: var(--icon-tile-padding, var(--token-space-2));
    --icon-tile-resolved-image-size: var(
      --icon-tile-image-size,
      calc(var(--icon-tile-resolved-size) - (var(--icon-tile-resolved-padding) * 2))
    );
    --icon-tile-resolved-overflow: var(--icon-tile-overflow, visible);

    align-items: center;
    background: var(--icon-tile-background, var(--token-surface-color));
    border: var(--icon-tile-border, var(--token-border-default-small));
    border-radius: var(--icon-tile-radius, var(--token-radius-lg));
    box-shadow: var(--icon-tile-shadow, none);
    display: flex;
    flex-shrink: 0;
    height: var(--icon-tile-resolved-size);
    justify-content: center;
    overflow: var(--icon-tile-resolved-overflow);
    padding: var(--icon-tile-resolved-padding);
    position: relative;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    width: var(--icon-tile-resolved-size);
    z-index: var(--icon-tile-z-index, 1);
  }

  :global(.icon-tile__image) {
    display: block;
    filter: var(--icon-tile-image-filter, none);
    height: var(--icon-tile-resolved-image-size);
    min-height: var(--icon-tile-resolved-image-size);
    min-width: var(--icon-tile-resolved-image-size);
    object-fit: contain;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    width: var(--icon-tile-resolved-image-size);
  }
</style>
