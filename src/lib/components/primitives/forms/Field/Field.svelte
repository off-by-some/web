<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    id?: string;
    label?: string;
    required?: boolean;
    error?: string;
    errorId?: string;
    counter?: string;
    counterId?: string;
    counterAriaLabel?: string;
    className?: string;
    children?: Snippet;
  };

  let {
    id = '',
    label = '',
    required = false,
    error = '',
    errorId = '',
    counter = '',
    counterId = '',
    counterAriaLabel = '',
    className = '',
    children,
  }: Props = $props();

  const resolvedErrorId = $derived(errorId || (id ? `${id}-error` : undefined));
  const classes = $derived(['field', className].filter(Boolean).join(' '));
</script>

<div class={classes}>
  {#if label}
    <label for={id} class="field__label">
      {label}{#if required}
        *{/if}
    </label>
  {/if}

  {@render children?.()}

  {#if error}
    <span class="field__error" id={resolvedErrorId} role="alert" aria-live="polite">
      {error}
    </span>
  {/if}

  {#if counter}
    <div
      class="field__counter"
      id={counterId}
      aria-live="polite"
      aria-label={counterAriaLabel || counter}
    >
      {counter}
    </div>
  {/if}
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/root' as root;

  .field {
    @include root.component-root;

    position: relative;
  }

  .field__label {
    display: block;
    font-size: var(--field-label-font-size, var(--token-font-size-sm));
    font-weight: var(--field-label-font-weight, var(--token-font-weight-medium));
    color: var(--field-label-color, var(--token-text-overlay));
    margin-bottom: var(--field-label-margin-bottom, var(--token-space-fluid-sm));
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--field-label-font-size-md, var(--token-font-size-base));
    }
  }

  .field__error {
    position: absolute;
    bottom: calc(-1 * var(--token-space-fluid-lg));
    left: 0;
    font-size: var(--field-meta-font-size, var(--token-font-size-xs));
    font-weight: var(--token-font-weight-medium);
    color: var(--field-error-color, var(--token-status-danger-color));
    display: flex;
    align-items: center;
    gap: var(--token-space-2);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    &::before {
      content: '⚠';
      font-size: var(--token-font-size-sm);
    }
  }

  .field__counter {
    position: absolute;
    bottom: calc(-1 * var(--token-space-fluid-lg));
    right: 0;
    font-size: var(--field-meta-font-size, var(--token-font-size-xs));
    color: var(--field-counter-color, var(--token-text-tertiary));
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
  }
</style>
