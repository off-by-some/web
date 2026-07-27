<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import HeroActions from './components/site/hero/HeroActions';
  import HeroPortrait from './components/site/hero/HeroPortrait';
  import HeroProfile from './components/site/hero/HeroProfile';
  import HeroValue from './components/site/hero/HeroValue';
  import ScrollIndicator from './components/site/hero/ScrollIndicator';
  import type {
    HeroActionsModel,
    HeroPortraitModel,
    HeroProfileModel,
    HeroScrollModel,
    HeroValueModel,
  } from './components/site/hero/types';

  type Props = {
    profile: HeroProfileModel;
    value: HeroValueModel;
    portrait: HeroPortraitModel;
    actions: HeroActionsModel;
    scroll: HeroScrollModel;
    showCanvasBackground: boolean;
    onContactRequested?: () => void;
    onExploreRequested?: () => void;
  };

  let {
    profile,
    value,
    portrait,
    actions,
    scroll,
    showCanvasBackground,
    onContactRequested,
    onExploreRequested,
  }: Props = $props();
</script>

<section
  class="hero"
  id="about"
  role="main"
  aria-labelledby={profile.titleId ?? 'profile-name'}
  data-section="about-me"
>
  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__container">
    <div class="hero-grid">
      <div class="hero-grid__content">
        <HeroProfile {...profile} />

        <HeroValue {...value} />

        <HeroActions {...actions} onPrimaryAction={onContactRequested} />
      </div>

      <div class="hero-grid__portrait">
        <HeroPortrait
          avatarSrc={portrait.src}
          avatarAlt={portrait.alt}
          annotations={portrait.annotations}
        />
      </div>
    </div>
  </Section>

  <ScrollIndicator
    text={scroll.text}
    ariaLabel={scroll.ariaLabel}
    onScrollRequested={onExploreRequested}
  />
</section>

<style lang="scss">
  @use '../styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .hero {
    position: relative;
    min-height: 100vh;
    min-height: 100svh;
    background: var(--token-feature-hero-background);
    overflow: hidden;
    padding: clamp(2.75rem, 5vh, 5.5rem) 0 clamp(5rem, 8vh, 7rem);
    font-family: var(--token-reference-typography-family-sans);
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
      background: var(--token-feature-hero-glow);
      opacity: 0;
      animation: backgroundGlow var(--token-feature-hero-motion-background)
        var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-1000) both;
      pointer-events: none;
    }

    @media (max-height: 600px) {
      padding: var(--token-reference-spacing-fluid-lg) 0
        calc(var(--token-reference-spacing-fluid-3xl) + 2rem);
    }
  }

  :global(.hero__container) {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 var(--token-reference-spacing-fluid-lg);
    width: 100%;

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-reference-spacing-fluid-2xl);
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
    width: 100%;
    overflow: visible;

    @include motion.fade-in-up(
      heroEntrance,
      2rem,
      var(--token-feature-hero-motion-entrance),
      var(--token-reference-motion-delay-0),
      both,
      0.98
    );

    @media (min-width: $breakpoint-md) {
      gap: clamp(2rem, 4.25vh, 3.75rem);
    }

    // Tablet landscape gets its own side-by-side treatment rather than
    // waiting for the desktop-oriented $breakpoint-lg - otherwise every
    // iPad, in any orientation, was stuck with the stacked mobile layout.
    @media (min-width: $breakpoint-md-lg) {
      grid-template-columns: minmax(22rem, 0.92fr) minmax(20rem, 1.08fr);
      grid-template-areas: 'content portrait';
      justify-items: stretch;
      gap: clamp(2rem, 3.5vw, 3.5rem);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: minmax(44rem, 1.02fr) minmax(38rem, 0.98fr);
      gap: clamp(2.75rem, 4.6vw, 6.25rem);
    }

    @media (min-width: $breakpoint-xlg) {
      grid-template-columns: minmax(56rem, 1fr) minmax(44rem, 1fr);
      gap: clamp(4rem, 6vw, 8rem);
    }

    // No max-height cap here: on short viewports the section should grow
    // taller than 100vh and let the page scroll, rather than silently
    // clipping content against .hero's overflow: hidden.
    @media (max-height: 600px) {
      gap: var(--token-reference-spacing-fluid-lg);
    }
  }

  .hero-grid__portrait {
    grid-area: portrait;
    display: flex;
    justify-content: center;
    align-self: center;
    min-width: 0;
    width: 100%;

    @media (min-width: $breakpoint-md-lg) {
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

    @media (min-width: $breakpoint-md-lg) {
      width: 100%;
      gap: clamp(2rem, 3.5vh, 3.25rem);
    }

    @media (min-width: $breakpoint-lg) {
      max-width: 66rem;
      gap: clamp(2.25rem, 4vh, 3.75rem);
    }

    @media (min-width: $breakpoint-xlg) {
      max-width: 78rem;
    }
  }

  @keyframes backgroundGlow {
    to {
      opacity: 1;
    }
  }

  @include motion.reduced-motion-reset('.hero-grid');

  @media print {
    .hero {
      min-height: auto;
      max-height: none;
      background: Canvas;
      color: CanvasText;
      padding: var(--token-reference-spacing-fluid-lg);
    }

    .hero-grid {
      flex-direction: column;
      gap: var(--token-reference-spacing-fluid-lg);
    }

    .hero-grid__content {
      gap: var(--token-reference-spacing-fluid-lg);
    }
  }
</style>
