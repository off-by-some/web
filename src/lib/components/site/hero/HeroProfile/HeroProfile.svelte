<script lang="ts">
  import type { HeroProfileModel } from '$lib/components/site/hero/types';

  type Props = HeroProfileModel;

  let { greeting, name, role, titleId = 'profile-name' }: Props = $props();
</script>

<div class="profile-section">
  {#if greeting}
    <p class="profile-greeting" aria-hidden="true">
      <span class="profile-greeting__wave">👋</span>
      {greeting}
    </p>
  {/if}

  <h1 class="profile-name" id={titleId}>{name}</h1>
  <p class="profile-role">{role}</p>
  <div class="profile-accent" aria-hidden="true"></div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @include motion.fade-in-up(
      heroProfileIn,
      1.5rem,
      var(--token-theme-motion-enter-default),
      var(--token-reference-motion-delay-300)
    );

    @media (min-width: $breakpoint-lg) {
      align-items: flex-start;
      text-align: left;
    }
  }

  .profile-greeting {
    display: inline-flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-xs);
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-reference-typography-letter-spacing-widest);
    color: var(--token-theme-color-text-tertiary);
    margin-block-end: clamp(0.85rem, 2vh, 1.35rem);

    @include motion.fade-in-up(
      heroGreetingIn,
      1.5rem,
      var(--token-theme-motion-feedback-slow),
      var(--token-reference-motion-delay-150)
    );
  }

  .profile-greeting__wave {
    font-size: var(--token-reference-typography-size-lg);
    line-height: 1;
    animation: wave var(--hero-profile-wave-duration, var(--token-feature-hero-motion-gesture))
      var(--token-reference-motion-easing-standard)
      var(--hero-profile-wave-delay, var(--token-theme-motion-feedback-slow)) infinite;
    transform-origin: 70% 70%;
  }

  .profile-name {
    display: block;
    font-size: clamp(3.6rem, 16vw, 6.25rem);
    font-weight: var(--token-reference-typography-weight-bold);
    line-height: 1;
    margin-block-end: clamp(0.9rem, 1.8vh, 1.45rem);
    padding-block-end: 0.08em;
    color: var(--token-theme-color-text-heading);
    letter-spacing: var(--token-reference-typography-letter-spacing-tight);
    background: var(--token-theme-gradient-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer
      var(--hero-profile-shimmer-duration, var(--token-component-shimmer-text-motion-duration))
      var(--token-reference-motion-easing-standard) infinite;

    @media (min-width: $breakpoint-md) {
      font-size: clamp(5.25rem, 9vw, 8rem);
      line-height: 0.98;
      padding-block-end: 0.07em;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: clamp(5rem, 5.15vw, 7.2rem);
      line-height: 0.96;
      padding-block-end: 0.055em;
      white-space: nowrap;
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: clamp(7rem, 4.9vw, 9.25rem);
    }
  }

  .profile-role {
    font-size: clamp(
      var(--token-reference-typography-size-lg),
      4vw,
      var(--token-reference-typography-size-xl)
    );
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-secondary);
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    line-height: var(--token-reference-typography-line-height-snug);
    margin-block-end: 0;

    @include motion.fade-in-up(
      heroRoleIn,
      1.5rem,
      var(--token-theme-motion-feedback-slow),
      var(--token-reference-motion-delay-900)
    );

    @media (min-width: $breakpoint-md) {
      font-size: clamp(
        var(--token-reference-typography-size-xl),
        3vw,
        var(--token-reference-typography-size-2xl)
      );
    }

    @media (min-width: $breakpoint-lg) {
      font-size: clamp(
        var(--token-reference-typography-size-2xl),
        1.75vw,
        var(--token-reference-typography-size-3xl)
      );
      font-weight: var(--token-reference-typography-weight-normal);
    }
  }

  .profile-accent {
    inline-size: clamp(2.35rem, 1.9rem + 1.6vw, 3.35rem);
    block-size: 3px;
    background: var(--token-theme-color-emphasis-color);
    border-radius: var(--token-reference-radius-full);
    margin-block-start: var(--token-reference-spacing-fluid-md);
    margin-inline: auto;
    transform-origin: left center;
    animation: accentExpand
      var(--hero-profile-accent-duration, var(--token-feature-hero-motion-ornament))
      var(--token-reference-motion-easing-standard)
      var(--hero-profile-accent-delay, var(--token-theme-motion-feedback-default)) both;

    @media (min-width: $breakpoint-lg) {
      margin-inline: 0;
    }
  }

  @keyframes wave {
    0%,
    100% {
      transform: rotate(0deg);
    }

    10%,
    30% {
      transform: rotate(14deg);
    }

    20% {
      transform: rotate(-8deg);
    }

    40% {
      transform: rotate(14deg);
    }

    50% {
      transform: rotate(0deg);
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

  @keyframes accentExpand {
    from {
      transform: scaleX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-section,
    .profile-name,
    .profile-role,
    .profile-greeting,
    .profile-accent {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .profile-greeting__wave {
      animation: none;
    }
  }

  @media (prefers-contrast: high) {
    .profile-name {
      text-shadow: none;
      font-weight: var(--token-reference-typography-weight-bold);
      color: var(--token-theme-color-text-primary);
      -webkit-text-fill-color: var(--token-theme-color-text-primary);
    }
  }

  @media print {
    .profile-name {
      color: CanvasText;
      -webkit-text-fill-color: CanvasText;
    }
  }
</style>
