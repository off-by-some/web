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
    --hero-padding-block-start: max(
      calc(env(safe-area-inset-top) + clamp(2.15rem, 5svh, 3rem)),
      clamp(2.15rem, 5svh, 3rem)
    );
    --hero-padding-block-end: calc(clamp(4.5rem, 9svh, 6.5rem) + env(safe-area-inset-bottom));

    position: relative;
    min-height: 100vh;
    min-height: 100svh;
    background: var(--token-feature-hero-background);
    overflow: hidden;
    padding: var(--hero-padding-block-start) 0 var(--hero-padding-block-end);
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
    justify-content: flex-start;

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
      --hero-padding-block-start: max(
        calc(env(safe-area-inset-top) + var(--token-reference-spacing-fluid-lg)),
        var(--token-reference-spacing-fluid-lg)
      );
      --hero-padding-block-end: calc(
        var(--token-reference-spacing-fluid-3xl) + 2rem + env(safe-area-inset-bottom)
      );
    }

    @media (min-width: $breakpoint-md) {
      --hero-padding-block-start: max(
        calc(env(safe-area-inset-top) + clamp(3rem, 7svh, 5rem)),
        clamp(3rem, 7svh, 5rem)
      );
      --hero-padding-block-end: calc(clamp(4.75rem, 8svh, 6.75rem) + env(safe-area-inset-bottom));
    }

    @media (min-width: $breakpoint-md-lg) {
      justify-content: center;
    }
  }

  :global(.hero__container) {
    --section-max-inline-size: clamp(66rem, 90vw, 152rem);

    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: flex-start;
    margin: 0 auto;
    padding: 0 clamp(1.25rem, 5vw, var(--token-reference-spacing-fluid-xl));
    width: 100%;

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-md-lg) {
      align-items: center;
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
    gap: clamp(1.45rem, 5.5svw, 2.65rem);
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
      gap: clamp(2rem, 4.75svw, 3.45rem);
      max-inline-size: 66rem;
      margin-inline: auto;
    }

    // Side-by-side is a shape decision, not only a width decision. Square and
    // tall desktop windows keep the stacked editorial layout even when they
    // are technically wider than the tablet-landscape breakpoint.
    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      grid-template-columns: minmax(30rem, 0.98fr) minmax(28rem, 1.02fr);
      grid-template-areas: 'content portrait';
      justify-items: stretch;
      gap: clamp(1.5rem, 3.2vw, 7rem);
      max-inline-size: none;
      transform: translateY(-1.5rem);
    }

    @media (min-width: $breakpoint-lg) and (min-aspect-ratio: 4 / 3) {
      transform: none;
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
    margin-block-start: clamp(0.75rem, 4svw, 1.4rem);

    @media (min-width: $breakpoint-md) {
      margin-block-start: 0;
    }

    @media (min-width: $breakpoint-md-lg) {
      justify-content: center;
    }
  }

  .hero-grid__content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    gap: clamp(1.75rem, 4vh, 3rem);
    gap: clamp(1.35rem, 4.8svw, 2.35rem);
    min-width: 0;
    width: min(100%, 52rem);

    @media (min-width: $breakpoint-md) {
      gap: clamp(1.65rem, 3.8svw, 2.65rem);
      width: min(100%, 58rem);
    }

    @media (min-width: $breakpoint-md-lg) {
      width: 100%;
      gap: clamp(2rem, 3.5svh, 3.25rem);
    }

    @media (min-width: $breakpoint-lg) {
      max-width: clamp(66rem, 36vw, 78rem);
      gap: clamp(2.25rem, 4svh, 3.75rem);
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
