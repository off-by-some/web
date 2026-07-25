<script lang="ts">
  import Section from './components/primitives/layout/Section';
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
    linkedinUrl?: string;
    githubUrl?: string;
    resumeHref?: string;
    resumeFilename?: string;
    scrollText: string;
    showCanvasBackground: boolean;
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
    linkedinUrl,
    githubUrl,
    resumeHref,
    resumeFilename,
    scrollText,
    showCanvasBackground,
    metricsTitle,
    techTitle,
    scrollAriaLabel,
    stats,
    techStack,
    onPrimaryAction,
    onScrollIndicator,
    onTechCategoryClick,
    onAvatarClick,
  }: Props = $props();
</script>

<section class="hero" id="about" role="main" aria-labelledby="profile-name" data-section="about-me">
  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__container">
    <div class="hero-grid">
      <div class="hero-grid__primary">
        <HeroProfile {name} {role} {statusText} {avatarSrc} {avatarAlt} onclick={onAvatarClick} />

        <HeroValue
          headline={valueHeadline}
          description={valueDescription}
          {primaryButtonText}
          {linkedinUrl}
          {githubUrl}
          repoUrl="https://github.com/off-by-some/web"
          {resumeHref}
          {resumeFilename}
          {onPrimaryAction}
        />
      </div>

      <div class="hero-grid__secondary">
        <HeroMetricsPanel {stats} title={metricsTitle} />
        <HeroTechPanel {techStack} title={techTitle} onCategoryClick={onTechCategoryClick} />
      </div>
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
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-xl);
    animation: heroEntrance 1.2s var(--token-motion-ease-out) both;
    width: 100%;
    overflow: visible;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--token-space-fluid-3xl);
    }

    @media (min-width: $breakpoint-xlg) {
      gap: var(--token-space-fluid-4xl);
    }

    @media (max-height: 600px) {
      max-height: calc(100vh - var(--token-space-fluid-2xl));
      gap: var(--token-space-fluid-lg);
    }
  }

  // Each column manages its own vertical rhythm independently, so the gap
  // between profile/value never depends on how tall stats/tech happen to be
  // (and vice versa) — see the two-row grid this replaced, where shared row
  // tracks let the taller column's height leak into the shorter one's gap.
  .hero-grid__primary,
  .hero-grid__secondary {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-xl);
    min-width: 0;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-xlg) {
      gap: var(--token-space-fluid-2xl);
    }
  }

  // The identity block (name/role) and the value block (headline/description)
  // get extra separation beyond the base rhythm above, so the headline reads
  // as a deliberate second beat instead of a continuation of the name.
  .hero-grid__primary {
    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-xlg) {
      gap: var(--token-space-fluid-3xl);
    }
  }

  @media (min-width: $breakpoint-lg) {
    .hero-grid__primary {
      flex: 1.3 1 0%;
    }

    .hero-grid__secondary {
      flex: 1 1 0%;
    }
  }

  @media (min-width: $breakpoint-xlg) {
    .hero-grid__primary {
      flex: 1.4 1 0%;
    }

    .hero-grid__secondary {
      flex: 0.9 1 0%;
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
      flex-direction: column;
      gap: var(--token-space-fluid-lg);
    }

    .hero-grid__primary,
    .hero-grid__secondary {
      gap: var(--token-space-fluid-lg);
    }
  }
</style>
