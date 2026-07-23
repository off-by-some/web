<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import GitHubProjectLink from './components/site/hero/GitHubProjectLink';
  import HeroMetricsPanel from './components/site/hero/HeroMetricsPanel';
  import HeroProfile from './components/site/hero/HeroProfile';
  import HeroTechPanel from './components/site/hero/HeroTechPanel';
  import HeroValue from './components/site/hero/HeroValue';
  import ScrollIndicator from './components/site/hero/ScrollIndicator';

  type Props = {
    name: string;
    role: string;
    statusText: string;
    valueHeadline: string;
    valueDescription: string;
    avatarSrc: string;
    avatarAlt: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    scrollText: string;
    showCanvasBackground: boolean;
    githubLabel?: string;
    metricsTitle?: string;
    techTitle?: string;
    scrollAriaLabel?: string;
    stats: Array<{
      count: string;
      label: string;
      type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
    }>;
    techStack: Array<{
      title: string;
      level: 'expert' | 'advanced';
      technologies: string[];
    }>;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
    onScrollIndicator?: () => void;
    onTechCategoryClick?: (category: string) => void;
    onAvatarClick?: () => void;
  };

  let {
    name,
    role,
    statusText,
    valueHeadline,
    valueDescription,
    avatarSrc,
    avatarAlt,
    primaryButtonText,
    secondaryButtonText,
    scrollText,
    showCanvasBackground,
    githubLabel,
    metricsTitle,
    techTitle,
    scrollAriaLabel,
    stats,
    techStack,
    onPrimaryAction,
    onSecondaryAction,
    onScrollIndicator,
    onTechCategoryClick,
    onAvatarClick,
  }: Props = $props();
</script>

<section class="hero" id="about" role="main" aria-labelledby="profile-name" data-section="about-me">
  <GitHubProjectLink href="https://github.com/off-by-some/web" label={githubLabel} />

  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__container">
    <div class="hero-grid">
      <HeroProfile {name} {role} {statusText} {avatarSrc} {avatarAlt} onclick={onAvatarClick} />

      <HeroValue
        headline={valueHeadline}
        description={valueDescription}
        {primaryButtonText}
        {secondaryButtonText}
        {onPrimaryAction}
        {onSecondaryAction}
      />

      <HeroMetricsPanel {stats} title={metricsTitle} />
      <HeroTechPanel {techStack} title={techTitle} onCategoryClick={onTechCategoryClick} />
    </div>
  </Section>

  <ScrollIndicator text={scrollText} ariaLabel={scrollAriaLabel} onclick={onScrollIndicator} />
</section>

<style lang="scss">
  @use '../styles/breakpoints' as *;

  .hero {
    position: relative;
    min-height: 100vh;
    background: var(--token-gradients-hero);
    overflow: hidden;
    padding: var(--token-space-fluid-2xl) 0;
    font-family: var(--token-font-family-sans);
    font-feature-settings:
      'kern' 1,
      'liga' 1,
      'calt' 1,
      'ss01' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-hero-glow);
      opacity: 0;
      animation: backgroundGlow 4s ease-in-out 1s both;
      pointer-events: none;
    }

    @media (max-height: 600px) {
      padding: var(--token-space-fluid-lg) 0;
    }
  }

  :global(.hero__container) {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: var(--token-container-max);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-lg);
    width: 100%;

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-2xl);
    }
  }

  .hero-grid {
    display: grid;
    gap: var(--token-space-fluid-xl);
    animation: heroEntrance 1.2s var(--token-motion-ease-out) both;
    width: 100%;
    overflow: visible;

    grid-template-areas:
      'profile'
      'value'
      'stats'
      'tech';

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1.3fr 1fr;
      grid-template-areas:
        'profile stats'
        'value tech';
      gap: var(--token-space-fluid-2xl) var(--token-space-fluid-3xl);
      align-items: start;
    }

    @media (min-width: $breakpoint-xlg) {
      grid-template-columns: 1.4fr 0.9fr;
      gap: var(--token-space-fluid-3xl) var(--token-space-fluid-4xl);
    }

    @media (max-height: 600px) {
      max-height: calc(100vh - var(--token-space-fluid-2xl));
      gap: var(--token-space-fluid-lg);
    }
  }

  @keyframes heroEntrance {
    from {
      opacity: 0;
      transform: translateY(2rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes backgroundGlow {
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-grid {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media print {
    .hero {
      min-height: auto;
      max-height: none;
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .hero-grid {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }
  }
</style>
