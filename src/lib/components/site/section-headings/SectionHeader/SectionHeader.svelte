<script lang="ts">
  import Header from '$lib/components/primitives/typography/Header';

  type Props = {
    title: string;
    subtitle: string;
    titleId: string;
    contentClass?: string;
  };

  let { title, subtitle, titleId, contentClass = '' }: Props = $props();

  const contentClasses = $derived(
    ['section-header__content', contentClass].filter(Boolean).join(' '),
  );
</script>

<Header className="section-header">
  <div class={contentClasses}>
    <h2 class="header__title" id={titleId}>{title}</h2>
    <p class="header__subtitle">{subtitle}</p>
  </div>
</Header>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  :global(.section-header) {
    text-align: center;
    @include motion.fade-in-up(sectionHeaderIn, 30px, var(--token-theme-motion-enter-default));
  }

  .section-header__content {
    max-inline-size: 110ch;
    margin: 0 auto;
  }

  .header__title {
    font-size: var(--token-reference-typography-size-4xl);
    font-weight: var(--token-reference-typography-weight-bold);
    line-height: var(--token-reference-typography-line-height-tight);
    color: var(--token-theme-color-text-heading);
    margin-block-end: var(--token-reference-spacing-fluid-lg);
    letter-spacing: var(--token-reference-typography-letter-spacing-tight);
    background: var(--token-theme-gradient-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer
      var(--section-header-shimmer-duration, var(--token-component-shimmer-text-motion-duration))
      var(--token-reference-motion-easing-standard) infinite;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-5xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-6xl);
    }
  }

  .header__subtitle {
    font-size: var(--token-reference-typography-size-lg);
    color: var(--token-theme-color-text-secondary);
    line-height: var(--token-reference-typography-line-height-relaxed);
    max-inline-size: 70ch;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-2xl);
    }
  }

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    @include motion.reduced-motion-reset(':global(.section-header)');

    .header__title {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .header__title {
      text-shadow: none;
      font-weight: var(--token-reference-typography-weight-bold);
      color: var(--token-theme-color-text-primary);
      -webkit-text-fill-color: var(--token-theme-color-text-primary);
    }
  }

  @media print {
    .header__title {
      color: CanvasText;
      -webkit-text-fill-color: CanvasText;
    }
  }
</style>
