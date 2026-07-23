<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';

  type Props = {
    label: string;
    count: number;
    icon?: string;
    active?: boolean;
    onclick?: (event: MouseEvent) => void;
  };

  let { label, count, icon = '', active = false, onclick }: Props = $props();
</script>

<Button
  variant="secondary"
  className="filter-button {active ? 'filter-button--active' : ''}"
  role="tab"
  aria-selected={active}
  aria-controls="skills-grid"
  {onclick}
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
    --button-padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    --button-padding-md: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    --button-font-size: var(--token-font-size-xs);
    --button-font-size-md: var(--token-font-size-base);
    --button-gap: var(--token-space-fluid-xs);
    --button-secondary-hover-transform: translateY(-3px) scale(1.02);

    backdrop-filter: blur(var(--token-blur-lg));
    white-space: nowrap;
  }

  :global(.filter-button--active) {
    --button-secondary-background: var(--token-surface-glass-medium);
    --button-secondary-color: var(--token-text-primary);
    --button-secondary-shadow: var(--token-shadow-focus), 0 0 20px var(--token-interactive-glow);
    --button-secondary-hover-iridescent-opacity: 0.3;
    --button-iridescent-background: linear-gradient(
      135deg,
      var(--token-interactive-color) 0%,
      transparent 50%
    );

    border-color: var(--token-interactive-color);
    transform: translateY(-2px) scale(1.05);
  }

  .filter-button__icon {
    font-size: var(--token-font-size-sm);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .filter-button__label {
    min-width: 0;
  }

  .filter-button__count {
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-sm);
    color: var(--token-text-brand);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    padding: var(--token-space-1) var(--token-space-2);
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-2) var(--token-space-3);
    }
  }

  @media (min-width: $breakpoint-sm) {
    :global(.filter-button) {
      --button-padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
      --button-font-size: var(--token-font-size-sm);
      --button-gap: var(--token-space-fluid-sm);
    }
  }

  @media (min-width: $breakpoint-md) {
    :global(.filter-button) {
      --button-gap: var(--token-space-fluid-md);
    }
  }
</style>
