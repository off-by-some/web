<script lang="ts">
  import type { Snippet } from 'svelte';
  import Card from '$lib/components/primitives/surfaces/Card';
  import SectionAccentHeader from '$lib/components/site/section-headings/SectionAccentHeader';

  type Props = {
    title: string;
    titleId: string;
    area: 'stats' | 'tech';
    delay?: string;
    children?: Snippet;
  };

  let { title, titleId, area, delay = '0.5s', children }: Props = $props();
</script>

<div class="hero-panel-shell">
  <Card
    as="section"
    className="hero-panel hero-panel--{area}"
    aria-labelledby={titleId}
    style="--hero-panel-area: {area}; --hero-panel-delay: {delay};"
  >
    <SectionAccentHeader {title} {titleId} />
    {@render children?.()}
  </Card>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .hero-panel-shell {
    display: contents;
  }

  :global(.hero-panel) {
    --card-background: var(--token-surface-glass-medium);
    --card-border: var(--token-border-default-small);
    --card-radius: var(--token-radius-xl);
    --card-padding: var(--token-space-fluid-md);
    --card-blur: var(--token-blur-lg);
    --card-hover-transform: none;
    --card-hover-iridescent-opacity: 0.6;

    grid-area: var(--hero-panel-area);
    animation: fadeInUp 1s var(--token-motion-ease-out) var(--hero-panel-delay) both;
    transform: scale(0.8);
    transform-origin: top left;
    margin-top: auto;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-md);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.hero-panel) {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    :global(.hero-panel) {
      border-width: 2px;
      border-color: currentColor;
    }
  }
</style>
