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
      onclick={handlePrimaryClick}
    />

    {#if exploreLabel && exploreHref}
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      <a
        class="hero-actions__explore"
        href={withBasePath(exploreHref)}
        onclick={handleExploreClick}
      >
        {exploreLabel}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M12 5v14M6 13l6 6 6-6"
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
          rel={link.external ? 'noopener noreferrer' : undefined}
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
    gap: clamp(0.95rem, 2vh, 1.55rem);
    flex-direction: column;

    @include motion.fade-in-up(heroActionsIn, 1.5rem, 0.6s, 0.8s);

    @media (min-width: $breakpoint-lg) {
      align-items: flex-start;
    }
  }

  .hero-actions__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-md) var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-lg) {
      justify-content: flex-start;
    }
  }

  .hero-actions__explore {
    --explore-link-color: color-mix(
      in srgb,
      var(--token-interactive-color) 54%,
      var(--token-text-secondary)
    );

    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    color: var(--explore-link-color);
    font-weight: var(--token-font-weight-semibold);
    text-decoration: none;
    transition:
      color 0.3s var(--token-motion-ease-out),
      gap 0.3s var(--token-motion-ease-out);

    &:hover,
    &:focus-visible {
      color: var(--token-attention-color);
      gap: var(--token-space-fluid-sm);
    }

    &:focus-visible {
      outline: 2px solid var(--explore-link-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-xs);
    }
  }

  .hero-actions__icons {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-md);

    @media (max-width: $breakpoint-sm) {
      gap: var(--token-space-fluid-sm);
    }
  }

  @include motion.reduced-motion-reset('.hero-actions');

  @media print {
    .hero-actions {
      display: none;
    }
  }
</style>
