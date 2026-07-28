<script lang="ts">
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';
  import type { HeroActionsModel } from '$lib/components/site/hero/types';
  import { withBasePath } from '$lib/utils/paths';

  type Props = HeroActionsModel & {
    onPrimaryAction?: () => void;
    onExploreAction?: () => void;
  };

  let {
    primaryLabel,
    primaryHref,
    exploreLabel,
    exploreHref,
    exploreDownload,
    iconLinks = [],
    iconLinksLabel = 'Profile links',
    onPrimaryAction,
    onExploreAction,
  }: Props = $props();

  function handleActionIntent(event: MouseEvent, onAction?: () => void) {
    if (!onAction) return;

    event.preventDefault();
    onAction();
  }

  const handlePrimaryClick = (event: MouseEvent) => handleActionIntent(event, onPrimaryAction);
  const handleExploreClick = (event: MouseEvent) => handleActionIntent(event, onExploreAction);
</script>

<div class="hero-actions">
  <div class="hero-actions__row">
    <HeroActionLink
      href={primaryHref}
      label={primaryLabel}
      icon="arrow"
      shape="label"
      className="hero-actions__primary"
      onclick={handlePrimaryClick}
    />

    {#if exploreLabel && exploreHref}
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      <a
        class="hero-actions__explore"
        href={withBasePath(exploreHref)}
        download={exploreDownload}
        onclick={handleExploreClick}
      >
        {exploreLabel}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M12 3v12M7 10l5 5 5-5M5 21h14"
            fill="none"
            stroke="currentColor"
            stroke-width="2.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    {/if}
  </div>

  {#if iconLinks.length}
    <div class="hero-actions__icons" role="group" aria-label={iconLinksLabel}>
      {#each iconLinks as link (link.label)}
        <HeroActionLink
          href={link.href}
          label={link.label}
          icon={link.icon}
          target={link.external ? '_blank' : '_self'}
          rel={link.external ? 'noopener noreferrer external' : undefined}
          download={link.download}
        />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.85rem, 3.6svw, 1.35rem);
    flex-direction: column;
    container-type: inline-size;

    @include motion.fade-in-up(
      heroActionsIn,
      1.5rem,
      var(--token-theme-motion-feedback-slow),
      var(--token-reference-motion-delay-800)
    );

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      align-items: flex-start;
    }
  }

  .hero-actions__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-fluid-md)
      clamp(1rem, 1.8vw, var(--token-reference-spacing-fluid-lg));
    inline-size: 100%;

    :global(.hero-action-link--label) {
      inline-size: min(100%, 24rem);
      justify-content: center;
      white-space: nowrap;
    }

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      justify-content: flex-start;
      inline-size: auto;

      :global(.hero-action-link--label) {
        inline-size: auto;
      }

      :global(.hero-actions__primary) {
        --button-font-size-md: clamp(
          var(--token-reference-typography-size-base),
          2.05cqw,
          var(--token-reference-typography-size-lg)
        );
        --button-gap: clamp(0.45rem, 0.85cqw, var(--token-reference-spacing-fluid-sm));
        --button-padding-md: var(--token-reference-spacing-fluid-sm) clamp(1.2rem, 3.5cqw, 2.25rem);
      }
    }
  }

  .hero-actions__explore {
    --explore-link-color: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color) 54%,
      var(--token-theme-color-text-secondary)
    );

    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--token-reference-spacing-fluid-xs);
    color: var(--explore-link-color);
    font-weight: var(--token-reference-typography-weight-semibold);
    white-space: nowrap;
    text-decoration: none;
    transition:
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      gap var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard);

    &:hover,
    &:focus-visible {
      color: var(--token-theme-color-attention-color);
      gap: var(--token-reference-spacing-fluid-sm);
    }

    &:focus-visible {
      outline: var(--token-reference-border-width-large) solid var(--explore-link-color);
      outline-offset: var(--token-theme-focus-offset-lg);
      border-radius: var(--token-reference-radius-xs);
    }
  }

  .hero-actions__icons {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.65rem, 3svw, var(--token-reference-spacing-fluid-md));

    @media (max-width: $breakpoint-sm) {
      gap: var(--token-reference-spacing-fluid-sm);
    }
  }

  @include motion.reduced-motion-reset('.hero-actions');

  @media print {
    .hero-actions {
      display: none;
    }
  }
</style>
