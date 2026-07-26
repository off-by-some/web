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
    gap: var(--button-gap, var(--token-reference-spacing-fluid-sm));
    padding: var(
      --button-padding,
      var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-xl)
    );
    min-block-size: var(--button-min-height, auto);
    inline-size: var(--button-width, auto);
    font-size: var(--button-font-size, var(--token-reference-typography-size-base));
    font-weight: var(--button-font-weight, var(--token-reference-typography-weight-medium));
    border: var(--button-border, none);
    border-radius: var(--button-radius, var(--token-reference-radius-full));
    cursor: pointer;
    text-decoration: none;
    transition:
      transform var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard),
      border-color var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard),
      color var(--token-theme-motion-feedback-fast) var(--token-reference-motion-easing-standard),
      background var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard);
    overflow: var(--button-overflow, hidden);
    letter-spacing: var(--token-reference-typography-letter-spacing-wide);
    line-height: var(--token-reference-typography-line-height-snug);

    &::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      inset: 0;
      background: var(
        --button-iridescent-background,
        var(--token-theme-color-surface-glass-iridescent)
      );
      opacity: 0;
      transition: opacity var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard);
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    &:focus,
    &:focus-visible {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--button-focus-outline-offset, var(--token-theme-focus-offset-sm));
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: var(--token-theme-opacity-disabled);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--button-font-size-md, var(--token-reference-typography-size-lg));
      padding: var(
        --button-padding-md,
        var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-2xl)
      );
    }
  }

  .button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: inherit;
    min-inline-size: 0;
    position: relative;
    z-index: 2;
  }

  .button--primary {
    background: var(--button-primary-background, var(--token-theme-color-interactive-color));
    color: var(--button-primary-color, var(--token-theme-color-text-dark));
    box-shadow: var(
      --button-primary-shadow,
      var(--token-theme-shadow-elevated),
      0 0 var(--token-reference-blur-md) var(--token-theme-color-interactive-glow)
    );

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(
        --button-primary-hover-shadow,
        var(--token-theme-shadow-elevated),
        0 0 calc(var(--token-reference-blur-md) + var(--token-reference-blur-sm))
          var(--token-theme-color-interactive-glow)
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
    background: var(--button-secondary-background, var(--token-theme-color-surface-glass-strong));
    color: var(--button-secondary-color, var(--token-theme-color-text-overlay));
    border: var(--button-border, var(--token-theme-border-default-small));
    backdrop-filter: blur(var(--token-reference-blur-lg));
    box-shadow: var(--button-secondary-shadow, var(--token-theme-shadow-light));

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: var(--button-secondary-hover-transform, translateY(-3px) scale(1.02));
      border-color: var(--token-theme-color-border-hover);
      color: var(--token-theme-color-text-primary);
      box-shadow: var(--button-secondary-hover-shadow, var(--token-theme-shadow-elevated));

      &::before {
        opacity: var(--button-secondary-hover-iridescent-opacity, 0.8);
      }
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      transform: translateY(-1px) scale(1);
    }
  }

  @media (forced-colors: active) {
    .button {
      border: 1px solid ButtonText;
      box-shadow: none;
    }

    .button:disabled,
    .button[aria-disabled='true'] {
      border-color: GrayText;
      color: GrayText;
    }
  }
</style>
