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

    width: 100%;
    background: var(--input-background, var(--token-surface-glass-strong));
    border: var(--input-border, var(--token-border-default-small));
    border-radius: var(--input-radius, var(--token-radius-lg));
    padding: var(--input-padding, var(--token-space-fluid-md) var(--token-space-fluid-lg));
    font-size: var(--input-font-size, var(--token-font-size-base));
    color: var(--input-color, var(--token-text-primary));
    text-align: var(--input-text-align, left);
    transition:
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out),
      border-color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-normal) var(--token-motion-ease-out),
      color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      background var(--token-motion-duration-normal) var(--token-motion-ease-out);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-normal);
    position: relative;
    box-shadow: var(--input-shadow, var(--token-shadow-light));
    cursor: text;

    @media (min-width: $breakpoint-md) {
      padding: var(--input-padding-md, var(--token-space-fluid-lg) var(--token-space-fluid-xl));
      font-size: var(--input-font-size-md, var(--token-font-size-lg));
    }

    &::placeholder {
      color: var(--input-placeholder-color, var(--token-text-tertiary));
      letter-spacing: var(--token-letter-spacing-normal);
    }

    &:focus {
      outline: none;
      border-color: var(--input-focus-border-color, var(--token-interactive-color));
      background: var(--input-focus-background, var(--token-surface-glass-medium));
      box-shadow:
        var(--token-shadow-focus),
        0 0 20px var(--token-shadow-glow-subtle);
      transform: var(--input-focus-transform, translateY(-2px));
    }

    &:focus-visible {
      outline: var(--input-focus-outline, 3px solid var(--token-interactive-color));
      outline-offset: var(--input-focus-outline-offset, 2px);
    }

    &:hover:not(:focus):not(:disabled) {
      border-color: var(--input-hover-border-color, var(--token-border-color-hover));
      background: var(--input-hover-background, var(--token-surface-glass-medium));
      box-shadow: var(--input-hover-shadow, var(--token-shadow-default));
    }

    &:disabled {
      background: var(--input-disabled-background, var(--token-surface-glass-subtle));
      color: var(--input-disabled-color, var(--token-text-disabled, var(--token-text-tertiary)));
      cursor: not-allowed;
      opacity: var(--token-opacity-default);
    }

    &:is(button) {
      cursor: pointer;
    }

    &--filled {
      border-color: var(--input-filled-border-color, var(--token-border-color-hover));
      background: var(--input-filled-background, var(--token-surface-glass-medium));
    }

    &--success {
      border-color: var(--input-success-border-color, var(--token-status-success-border));
      background: var(--input-success-background, var(--token-status-success-bg));
      box-shadow: 0 0 0 2px var(--input-success-glow, var(--token-status-success-glow));
    }

    &--warning {
      border-color: var(--input-warning-border-color, var(--token-status-warning-border));
      background: var(--input-warning-background, var(--token-status-warning-bg));
      box-shadow: 0 0 0 2px var(--input-warning-glow, var(--token-status-warning-border));
    }

    &--error {
      border-color: var(--input-error-border-color, var(--token-status-danger-border));
      background: var(--input-error-background, var(--token-status-danger-bg));
      box-shadow: 0 0 0 2px var(--input-error-glow, var(--token-status-danger-glow));
    }

    &--textarea {
      resize: vertical;
      min-height: var(--input-textarea-min-height, 8rem);
      font-family: inherit;
      line-height: var(--token-line-height-relaxed);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    .input:focus {
      transform: none;
    }
  }
</style>
