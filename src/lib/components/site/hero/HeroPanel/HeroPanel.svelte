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

  let {
    title,
    titleId,
    area,
    delay = 'var(--token-motion-delay-panel)',
    children,
  }: Props = $props();
</script>

<div class="hero-panel-shell">
  <Card
    as="section"
    className="hero-panel hero-panel--{area}"
    aria-labelledby={titleId}
    style="--hero-panel-delay: {delay};"
  >
    <div class="hero-panel__header">
      <SectionAccentHeader {title} {titleId} />
    </div>
    {@render children?.()}
  </Card>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

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

    transform-origin: top left;

    @include motion.fade-in-up(
      heroPanelIn,
      1.5rem,
      var(--token-motion-duration-entrance),
      var(--hero-panel-delay)
    );

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-md);
    }
  }

  .hero-panel__header {
    margin-block-end: var(--token-space-fluid-md);
  }

  @include motion.reduced-motion-reset(':global(.hero-panel)');

  @media (prefers-contrast: high) {
    :global(.hero-panel) {
      border-width: var(--token-border-size-large);
      border-color: currentColor;
    }
  }
</style>
