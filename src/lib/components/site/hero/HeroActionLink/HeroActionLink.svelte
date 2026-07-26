<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';
  import type { HeroActionIcon, HeroActionShape } from '$lib/components/site/hero/types';
  import { withBasePath } from '$lib/utils/paths';

  type Props = {
    href: string;
    label: string;
    icon: HeroActionIcon;
    shape?: HeroActionShape;
    download?: boolean | string;
    target?: '_self' | '_blank';
    rel?: string;
    className?: string;
    onActionRequested?: () => void;
    onclick?: (event: MouseEvent) => void;
  };

  let {
    href,
    label,
    icon,
    shape = 'circle',
    download = undefined,
    target = '_self',
    rel = '',
    className = '',
    onActionRequested,
    onclick,
  }: Props = $props();

  const classes = $derived(
    ['hero-action-link', `hero-action-link--${shape}`, className].filter(Boolean).join(' '),
  );

  const handleClick = (event: MouseEvent) => {
    onActionRequested?.();
    onclick?.(event);
  };
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<Button
  as="a"
  variant={shape === 'label' ? 'primary' : 'secondary'}
  href={withBasePath(href)}
  className={classes}
  aria-label={label}
  title={label}
  {download}
  {target}
  rel={rel || undefined}
  onclick={handleClick}
>
  <span class="hero-action-link__icon" aria-hidden="true">
    {#if icon === 'github'}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
    {:else if icon === 'linkedin'}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.267 2.371 4.267 5.455v6.288zm-15.106-13.016c-1.144 0-2.063-.926-2.063-2.066 0-1.141.919-2.066 2.063-2.066 1.14 0 2.064.925 2.064 2.066 0 1.14-.924 2.066-2.064 2.066zm1.782 13.016h-3.564v-11.452h3.564v11.452zm15.105-20.452h-20.456c-.979 0-1.772.774-1.772 1.729v20.542c0 .955.793 1.729 1.772 1.729h20.451c.978 0 1.777-.774 1.777-1.729v-20.542c0-.955-.799-1.729-1.777-1.729z"
        />
      </svg>
    {:else if icon === 'download'}
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    {:else if icon === 'star'}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path
          d="M12 2.5l2.99 6.06 6.69.97-4.84 4.72 1.14 6.66L12 17.77l-5.98 3.14 1.14-6.66-4.84-4.72 6.69-.97z"
        />
      </svg>
    {:else}
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    {/if}
  </span>

  <span class="hero-action-link__text">{label}</span>
</Button>

<!-- eslint-enable svelte/no-navigation-without-resolve -->

<style lang="scss">
  // Base look (glass background, border, blur, hover lift, focus ring) comes
  // from Button's `secondary` variant — these overrides only reshape it into
  // the two hero-specific silhouettes (circle / label).
  :global(.hero-action-link) {
    --hero-action-size: clamp(3.25rem, 3rem + 1vw, 4rem);
    --button-focus-outline-offset: var(--token-theme-focus-offset-lg);

    position: relative;
  }

  :global(.hero-action-link--circle) {
    --button-padding: 0;
    --button-padding-md: 0;
    --button-min-height: var(--hero-action-size);
    --button-width: var(--hero-action-size);

    block-size: var(--hero-action-size);

    .hero-action-link__text {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }

  :global(.hero-action-link--circle:hover) .hero-action-link__icon {
    transform: translateY(-2px) scale(1.04);
  }

  :global(.hero-action-link--label) {
    --button-padding: var(--token-reference-spacing-fluid-sm) clamp(1.45rem, 1.15rem + 1vw, 2rem);
    --button-padding-md: var(--token-reference-spacing-fluid-sm)
      clamp(1.55rem, 1.2rem + 1vw, 2.25rem);
    --button-min-height: auto;
    --button-width: auto;
    --button-font-weight: var(--token-reference-typography-weight-semibold);

    letter-spacing: var(--token-reference-typography-letter-spacing-wide);

    .hero-action-link__icon {
      order: 2;
    }
  }

  :global(a.hero-action-link--label:hover) .hero-action-link__icon {
    transform: translateX(0.35rem);
  }

  .hero-action-link__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    opacity: 0.9;
    transition:
      transform var(--token-reference-motion-duration-emphasis)
        var(--token-reference-motion-easing-out),
      opacity var(--token-reference-motion-duration-normal) var(--token-reference-motion-easing-out);
  }

  .hero-action-link__text {
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.hero-action-link),
    .hero-action-link__icon {
      animation: none;
      transition: none;
    }
  }
</style>
