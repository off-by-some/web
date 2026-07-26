<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';

  type Props = {
    label: string;
    count: number;
    icon?: string;
    active?: boolean;
    onSelectRequested?: () => void;
  };

  let { label, count, icon = '', active = false, onSelectRequested }: Props = $props();
</script>

<Button
  variant="secondary"
  className="filter-button {active ? 'filter-button--active' : ''}"
  role="tab"
  aria-selected={active}
  aria-controls="skills-grid"
  onclick={() => onSelectRequested?.()}
>
  {#if icon}
    <span class="filter-button__icon">{icon}</span>
  {/if}
  <span class="filter-button__label">{label}</span>
  <span class="filter-button__count">{count}</span>
</Button>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  :global(.filter-button) {
    --button-padding: var(--token-reference-spacing-fluid-xs)
      var(--token-reference-spacing-fluid-sm);
    --button-padding-md: var(--token-reference-spacing-fluid-sm)
      var(--token-reference-spacing-fluid-lg);
    --button-font-size: var(--token-reference-typography-size-xs);
    --button-font-size-md: var(--token-reference-typography-size-base);
    --button-gap: var(--token-reference-spacing-fluid-xs);
    --button-secondary-hover-transform: translateY(-3px) scale(1.02);

    backdrop-filter: blur(var(--token-reference-blur-lg));
    white-space: nowrap;
  }

  :global(.filter-button--active) {
    --button-secondary-background: var(--token-theme-color-surface-glass-medium);
    --button-secondary-color: var(--token-theme-color-text-primary);
    --button-secondary-shadow:
      var(--token-theme-shadow-focus),
      0 0 var(--token-reference-blur-md) var(--token-theme-color-interactive-glow);
    --button-secondary-hover-iridescent-opacity: 0.3;
    --button-iridescent-background: linear-gradient(
      135deg,
      var(--token-theme-color-interactive-color) 0%,
      transparent 50%
    );

    border-color: var(--token-theme-color-interactive-color);
    transform: translateY(-2px) scale(1.05);
  }

  .filter-button__icon {
    font-size: var(--token-reference-typography-size-sm);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .filter-button__label {
    min-inline-size: 0;
  }

  .filter-button__count {
    background: var(--token-theme-color-surface-glass-strong);
    border-radius: var(--token-reference-radius-sm);
    color: var(--token-theme-color-text-brand);
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-semibold);
    padding: var(--token-reference-spacing-1) var(--token-reference-spacing-2);
    backdrop-filter: blur(var(--token-reference-blur-sm));

    @media (min-width: $breakpoint-md) {
      padding: var(--token-reference-spacing-2) var(--token-reference-spacing-3);
    }
  }

  @media (min-width: $breakpoint-sm) {
    :global(.filter-button) {
      --button-padding: var(--token-reference-spacing-fluid-sm)
        var(--token-reference-spacing-fluid-md);
      --button-font-size: var(--token-reference-typography-size-sm);
      --button-gap: var(--token-reference-spacing-fluid-sm);
    }
  }

  @media (min-width: $breakpoint-md) {
    :global(.filter-button) {
      --button-gap: var(--token-reference-spacing-fluid-md);
    }
  }
</style>
