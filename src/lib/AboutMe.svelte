<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import HeroPortrait from './components/site/hero/HeroPortrait';
  import HeroProfile from './components/site/hero/HeroProfile';
  import HeroValue from './components/site/hero/HeroValue';
  import ScrollIndicator from './components/site/hero/ScrollIndicator';

  type Props = {
    greeting?: string;
    name: string;
    role: string;
    valueHeadline: string;
    valueHeadlineEmphasis?: { primary?: string; accent?: string };
    valueDescription: string;
    avatarSrc: string;
    avatarAlt: string;
    primaryButtonText: string;
    exploreLinkText?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    resumeHref?: string;
    resumeFilename?: string;
    scrollText: string;
    showCanvasBackground: boolean;
    scrollAriaLabel?: string;
    portraitAnnotations?: Array<{ label: string }>;
    onPrimaryAction?: () => void;
    onScrollIndicator?: () => void;
  };

  let {
    greeting,
    name,
    role,
    valueHeadline,
    valueHeadlineEmphasis,
    valueDescription,
    avatarSrc,
    avatarAlt,
    primaryButtonText,
    exploreLinkText,
    linkedinUrl,
    githubUrl,
    resumeHref,
    resumeFilename,
    scrollText,
    showCanvasBackground,
    scrollAriaLabel,
    portraitAnnotations,
    onPrimaryAction,
    onScrollIndicator,
  }: Props = $props();
</script>

<section class="hero" id="about" role="main" aria-labelledby="profile-name" data-section="about-me">
  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__container">
    <div class="hero-grid">
      <div class="hero-grid__content">
        <HeroProfile {greeting} {name} {role} />

        <HeroValue
          headline={valueHeadline}
          headlineEmphasis={valueHeadlineEmphasis}
          description={valueDescription}
          {primaryButtonText}
          {exploreLinkText}
          {linkedinUrl}
          {githubUrl}
          repoUrl="https://github.com/off-by-some/web"
          {resumeHref}
          {resumeFilename}
          {onPrimaryAction}
          onExploreClick={onScrollIndicator}
        />
      </div>

      <div class="hero-grid__portrait">
        <HeroPortrait {avatarSrc} {avatarAlt} annotations={portraitAnnotations} />
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
    min-height: 100svh;
    background: var(--token-gradients-hero);
    overflow: hidden;
    padding: clamp(2.75rem, 5vh, 5.5rem) 0 clamp(5rem, 8vh, 7rem);
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
      padding: var(--token-space-fluid-lg) 0 calc(var(--token-space-fluid-3xl) + 2rem);
    }
  }

  :global(.hero__container) {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: min(var(--token-container-max), 118rem);
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
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'content'
      'portrait';
    align-items: center;
    justify-items: center;
    gap: clamp(1.75rem, 5vh, 3.25rem);
    animation: heroEntrance 1.2s var(--token-motion-ease-out) both;
    width: 100%;
    overflow: visible;

    @media (min-width: $breakpoint-md) {
      gap: clamp(2rem, 4.25vh, 3.75rem);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: minmax(44rem, 1.02fr) minmax(38rem, 0.98fr);
      grid-template-areas: 'content portrait';
      justify-items: stretch;
      gap: clamp(2.75rem, 4.6vw, 6.25rem);
    }

    @media (min-width: $breakpoint-xlg) {
      grid-template-columns: minmax(56rem, 1fr) minmax(44rem, 1fr);
      gap: clamp(4rem, 6vw, 8rem);
    }

    @media (max-height: 600px) {
      max-height: calc(100vh - var(--token-space-fluid-2xl));
      gap: var(--token-space-fluid-lg);
    }
  }

  .hero-grid__portrait {
    grid-area: portrait;
    display: flex;
    justify-content: center;
    align-self: center;
    min-width: 0;
    width: 100%;

    @media (min-width: $breakpoint-lg) {
      justify-content: flex-start;
    }
  }

  .hero-grid__content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    gap: clamp(1.75rem, 4vh, 3rem);
    min-width: 0;
    width: min(100%, 52rem);

    @media (min-width: $breakpoint-md) {
      gap: clamp(1.85rem, 3.5vh, 3rem);
    }

    @media (min-width: $breakpoint-lg) {
      width: 100%;
      max-width: 66rem;
      gap: clamp(2.25rem, 4vh, 3.75rem);
    }

    @media (min-width: $breakpoint-xlg) {
      max-width: 78rem;
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

    .hero-grid__content {
      gap: var(--token-space-fluid-lg);
    }
  }
</style>
