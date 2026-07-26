<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    as?: 'input' | 'textarea' | 'button';
    value?: string;
    type?: string;
    className?: string;
    filled?: boolean;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
    element?: HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement;
    onValueChange?: (value: string, event: Event) => void;
    children?: Snippet;
    [key: string]: unknown;
  };

  let {
    as = 'input',
    value = $bindable(''),
    type,
    className = '',
    filled = false,
    error = false,
    success = false,
    warning = false,
    element = $bindable(undefined),
    onValueChange,
    children,
    ...rest
  }: Props = $props();

  // `type` means "the native `type` attribute of whatever `as` renders" —
  // its default depends on which element that is, since a text input and a
  // submit button don't share a sensible default.
  const resolvedType = $derived(
    type ?? (as === 'button' ? 'button' : as === 'input' ? 'text' : undefined),
  );

  const hasValue = $derived(filled || Boolean(value?.trim()));
  const modifierClasses = $derived(
    [
      hasValue && 'input--filled',
      error && 'input--error',
      success && 'input--success',
      warning && 'input--warning',
      className,
    ]
      .filter(Boolean)
      .join(' '),
  );

  const handleInput = (event: Event) => {
    value = (event.currentTarget as HTMLInputElement | HTMLTextAreaElement).value;
    onValueChange?.(value, event);
  };
</script>

{#if as === 'button'}
  <button
    type={resolvedType as 'button' | 'submit' | 'reset' | undefined}
    class="input {modifierClasses}"
    bind:this={element}
    {...rest}
  >
    {@render children?.()}
  </button>
{:else if as === 'textarea'}
  <textarea
    class="input input--textarea {modifierClasses}"
    bind:this={element}
    {value}
    oninput={handleInput}
    {...rest}
  ></textarea>
{:else}
  <input
    type={resolvedType}
    class="input {modifierClasses}"
    bind:this={element}
    {value}
    oninput={handleInput}
    {...rest}
  />
{/if}

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/root' as root;

  .input {
    @include root.interactive-root;

    inline-size: 100%;
    background: var(--input-background, var(--token-theme-color-surface-glass-strong));
    border: var(--input-border, var(--token-theme-border-default-small));
    border-radius: var(--input-radius, var(--token-reference-radius-lg));
    padding: var(
      --input-padding,
      var(--token-reference-spacing-fluid-md) var(--token-reference-spacing-fluid-lg)
    );
    font-size: var(--input-font-size, var(--token-reference-typography-size-base));
    color: var(--input-color, var(--token-theme-color-text-primary));
    text-align: var(--input-text-align, left);
    transition:
      transform var(--token-reference-motion-duration-normal)
        var(--token-reference-motion-easing-out),
      border-color var(--token-reference-motion-duration-normal)
        var(--token-reference-motion-easing-out),
      box-shadow var(--token-reference-motion-duration-normal)
        var(--token-reference-motion-easing-out),
      color var(--token-reference-motion-duration-normal) var(--token-reference-motion-easing-out),
      background var(--token-reference-motion-duration-normal)
        var(--token-reference-motion-easing-out);
    letter-spacing: var(--token-reference-typography-letter-spacing-normal);
    line-height: var(--token-reference-typography-line-height-normal);
    position: relative;
    box-shadow: var(--input-shadow, var(--token-theme-shadow-light));
    cursor: text;

    @media (min-width: $breakpoint-md) {
      padding: var(
        --input-padding-md,
        var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-xl)
      );
      font-size: var(--input-font-size-md, var(--token-reference-typography-size-lg));
    }

    &::placeholder {
      color: var(--input-placeholder-color, var(--token-theme-color-text-tertiary));
      letter-spacing: var(--token-reference-typography-letter-spacing-normal);
    }

    &:focus {
      outline: none;
      border-color: var(--input-focus-border-color, var(--token-theme-color-interactive-color));
      background: var(--input-focus-background, var(--token-theme-color-surface-glass-medium));
      box-shadow:
        var(--token-theme-shadow-focus),
        0 0 var(--token-reference-blur-md) var(--token-theme-shadow-glow-subtle);
      transform: var(--input-focus-transform, translateY(-2px));
    }

    &:focus-visible {
      outline: var(
        --input-focus-outline,
        var(--token-reference-border-width-accent) solid var(--token-theme-color-interactive-color)
      );
      outline-offset: var(--input-focus-outline-offset, var(--token-theme-focus-offset-sm));
    }

    &:hover:not(:focus):not(:disabled) {
      border-color: var(--input-hover-border-color, var(--token-theme-color-border-hover));
      background: var(--input-hover-background, var(--token-theme-color-surface-glass-medium));
      box-shadow: var(--input-hover-shadow, var(--token-theme-shadow-default));
    }

    &:disabled {
      background: var(--input-disabled-background, var(--token-theme-color-surface-glass-subtle));
      color: var(
        --input-disabled-color,
        var(--token-theme-color-text-disabled, var(--token-theme-color-text-tertiary))
      );
      cursor: not-allowed;
      opacity: var(--token-reference-opacity-default);
    }

    &:is(button) {
      cursor: pointer;
    }

    &--filled {
      border-color: var(--input-filled-border-color, var(--token-theme-color-border-hover));
      background: var(--input-filled-background, var(--token-theme-color-surface-glass-medium));
    }

    &--success {
      border-color: var(
        --input-success-border-color,
        var(--token-theme-color-status-success-border)
      );
      background: var(--input-success-background, var(--token-theme-color-status-success-bg));
      box-shadow: 0 0 0 var(--token-reference-border-width-large)
        var(--input-success-glow, var(--token-theme-color-status-success-glow));
    }

    &--warning {
      border-color: var(
        --input-warning-border-color,
        var(--token-theme-color-status-warning-border)
      );
      background: var(--input-warning-background, var(--token-theme-color-status-warning-bg));
      box-shadow: 0 0 0 var(--token-reference-border-width-large)
        var(--input-warning-glow, var(--token-theme-color-status-warning-border));
    }

    &--error {
      border-color: var(--input-error-border-color, var(--token-theme-color-status-danger-border));
      background: var(--input-error-background, var(--token-theme-color-status-danger-bg));
      box-shadow: 0 0 0 var(--token-reference-border-width-large)
        var(--input-error-glow, var(--token-theme-color-status-danger-glow));
    }

    &--textarea {
      resize: vertical;
      min-block-size: var(--input-textarea-min-height, 8rem);
      font-family: inherit;
      line-height: var(--token-reference-typography-line-height-relaxed);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    .input:focus {
      transform: none;
    }
  }
</style>
