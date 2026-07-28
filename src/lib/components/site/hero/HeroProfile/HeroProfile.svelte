<script lang="ts">
  import type { HeroProfileModel } from '$lib/components/site/hero/types';
  import Image from '$lib/components/primitives/media/Image/Image.svelte';

  type Props = HeroProfileModel;

  let { greeting, name, role, titleId = 'profile-name' }: Props = $props();
</script>

<div class="profile-section">
  {#if greeting}
    <p class="profile-greeting" aria-hidden="true">
      <span class="profile-greeting__wave">
        <Image src="svg/apple-wave-emoji.svg" alt="" width={18} height={18} priority />
      </span>
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
    container-type: inline-size;

    @include motion.fade-in-up(
      heroProfileIn,
      1.5rem,
      var(--token-theme-motion-enter-default),
      var(--token-reference-motion-delay-300)
    );

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
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
    margin-block-end: clamp(0.65rem, 2.6svw, 1.15rem);

    @include motion.fade-in-up(
      heroGreetingIn,
      1.5rem,
      var(--token-theme-motion-feedback-slow),
      var(--token-reference-motion-delay-150)
    );
  }

  .profile-greeting__wave {
    display: inline-flex;
    inline-size: var(--token-reference-typography-size-lg);
    block-size: var(--token-reference-typography-size-lg);
    animation: wave var(--hero-profile-wave-duration, var(--token-feature-hero-motion-gesture))
      var(--token-reference-motion-easing-standard)
      var(--hero-profile-wave-delay, var(--token-theme-motion-feedback-slow)) infinite;
    transform-origin: 70% 70%;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
    }
  }

  .profile-name {
    display: block;
    max-inline-size: 9ch;
    font-size: clamp(3.75rem, 15.5vw, 5.85rem);
    font-weight: var(--token-reference-typography-weight-bold);
    line-height: 1;
    margin-block-end: clamp(0.75rem, 2.8svw, 1.2rem);
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
    text-wrap: balance;

    @media (min-width: $breakpoint-md) {
      max-inline-size: none;
      font-size: clamp(5rem, 8.4vw, 7.2rem);
      line-height: 0.98;
      padding-block-end: 0.07em;
    }

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      font-size: clamp(3.25rem, 12.15cqw, 9.25rem);
      line-height: 1;
      padding-block-end: 0.06em;
      white-space: nowrap;
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
    text-wrap: balance;

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

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      font-size: clamp(
        var(--token-reference-typography-size-xl),
        3.2cqw,
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
    margin-block-start: clamp(0.75rem, 2.4svw, var(--token-reference-spacing-fluid-md));
    margin-inline: auto;
    transform-origin: left center;
    animation: accentExpand
      var(--hero-profile-accent-duration, var(--token-feature-hero-motion-ornament))
      var(--token-reference-motion-easing-standard)
      var(--hero-profile-accent-delay, var(--token-theme-motion-feedback-default)) both;

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
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
