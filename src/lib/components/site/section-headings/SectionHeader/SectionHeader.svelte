<script lang="ts">
  import Header from '$lib/components/primitives/typography/Header';

  type Props = {
    title: string;
    subtitle: string;
    titleId: string;
    variant?: 'standard' | 'compact';
    contentClass?: string;
  };

  let { title, subtitle, titleId, variant = 'standard', contentClass = '' }: Props = $props();

  const contentClasses = $derived(
    ['section-header__content', contentClass].filter(Boolean).join(' '),
  );
</script>

<Header className="section-header section-header--{variant}">
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
    margin-bottom: var(--token-space-fluid-5xl);
    @include motion.fade-in-up(sectionHeaderIn, 30px, 1s);
  }

  :global(.section-header--compact) {
    margin-bottom: var(--token-space-fluid-3xl);

    @media (min-width: $breakpoint-md) {
      margin-bottom: var(--token-space-fluid-4xl);
    }
  }

  .section-header__content {
    max-width: 110ch;
    margin: 0 auto;
  }

  .header__title {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-lg);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-5xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-6xl);
    }
  }

  .header__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    line-height: var(--token-line-height-relaxed);
    max-width: 70ch;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
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
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .header__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
