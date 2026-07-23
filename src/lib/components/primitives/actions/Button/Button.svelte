<script lang="ts">
  import type { Snippet } from 'svelte';
  import { pressableAttrs } from '$lib/components/primitives/internal/pressable';

  type Props = {
    as?: 'button' | 'a' | 'div';
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
    [key: string]: unknown;
  };

  let {
    as = 'button',
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    onclick,
    children,
    ...rest
  }: Props = $props();

  const classes = $derived(['button', `button--${variant}`, className].filter(Boolean).join(' '));

  // `disabled` isn't a real attribute on <a>/<div> — this makes it behave
  // like one is regardless of what `as` renders to.
  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onclick?.(event);
  };

  const pressable = $derived(pressableAttrs({ as, disabled, onclick }));
</script>

<svelte:element
  this={as}
  class={classes}
  type={as === 'button' ? type : undefined}
  disabled={as === 'button' ? disabled : undefined}
  aria-disabled={as !== 'button' && disabled ? true : undefined}
  tabindex={as === 'a' && disabled ? -1 : pressable.tabindex}
  role={pressable.role}
  onkeydown={pressable.onkeydown}
  onclick={handleClick}
  {...rest}
>
  <span class="button__content">{@render children?.()}</span>
</svelte:element>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/root' as root;

  .button {
    @include root.interactive-root;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-gap, var(--token-space-fluid-sm));
    padding: var(--button-padding, var(--token-space-fluid-lg) var(--token-space-fluid-xl));
    min-height: var(--button-min-height, auto);
    width: var(--button-width, auto);
    font-size: var(--button-font-size, var(--token-font-size-base));
    font-weight: var(--button-font-weight, var(--token-font-weight-medium));
    border: var(--button-border, none);
    border-radius: var(--button-radius, var(--token-radius-full));
    cursor: pointer;
    text-decoration: none;
    transition:
      transform var(--token-motion-duration-fast) var(--token-motion-ease-out),
      border-color var(--token-motion-duration-fast) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-fast) var(--token-motion-ease-out),
      color var(--token-motion-duration-fast) var(--token-motion-ease-out),
      background var(--token-motion-duration-fast) var(--token-motion-ease-out);
    overflow: hidden;
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);

    &::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      inset: 0;
      background: var(--button-iridescent-background, var(--token-surface-glass-iridescent));
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    &:focus,
    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: var(--button-focus-outline-offset, 2px);
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: var(--token-opacity-default);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--button-font-size-md, var(--token-font-size-lg));
      padding: var(--button-padding-md, var(--token-space-fluid-lg) var(--token-space-fluid-2xl));
    }
  }

  .button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: inherit;
    min-width: 0;
    position: relative;
    z-index: 2;
  }

  .button--primary {
    background: var(--button-primary-background, var(--token-interactive-color));
    color: var(--button-primary-color, var(--token-text-dark));
    box-shadow: var(
      --button-primary-shadow,
      var(--token-shadow-elevated),
      0 0 20px var(--token-interactive-glow)
    );

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(
        --button-primary-hover-shadow,
        var(--token-shadow-elevated),
        0 0 30px var(--token-interactive-glow)
      );

      &::before {
        opacity: 0.8;
      }
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      transform: translateY(-2px) scale(1);
    }
  }

  .button--secondary {
    background: var(--button-secondary-background, var(--token-surface-glass-strong));
    color: var(--button-secondary-color, var(--token-text-overlay));
    border: var(--button-border, var(--token-border-default-small));
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--button-secondary-shadow, var(--token-shadow-light));

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: var(--button-secondary-hover-transform, translateY(-3px) scale(1.02));
      border-color: var(--token-border-color-hover);
      color: var(--token-text-primary);
      box-shadow: var(--button-secondary-hover-shadow, var(--token-shadow-elevated));

      &::before {
        opacity: var(--button-secondary-hover-iridescent-opacity, 0.8);
      }
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      transform: translateY(-1px) scale(1);
    }
  }
</style>
