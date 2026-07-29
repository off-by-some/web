<script lang="ts">
  import { resolve } from '$app/paths';
  import { Button } from '$lib/components/primitives/actions';

  interface Props {
    generating?: boolean;
    onDownloadRequested: () => void;
    title: string;
  }

  const { generating = false, onDownloadRequested, title }: Props = $props();
</script>

<div class="toolbar">
  <Button as="a" variant="secondary" href={resolve('/')} className="toolbar__back">
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8l4-4"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Back
  </Button>

  <span class="toolbar__title">{title}</span>

  <Button
    variant="primary"
    onclick={onDownloadRequested}
    disabled={generating}
    aria-busy={generating}
    className="toolbar__download"
  >
    {#if generating}
      <svg class="spin" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="20 18"
          stroke-linecap="round"
        />
      </svg>
      Generating…
    {:else}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Download PDF
    {/if}
  </Button>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .toolbar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-reference-spacing-3, 0.75rem);
    padding: 0.5rem var(--token-reference-spacing-5, 1.25rem);
    background: color-mix(
      in srgb,
      var(--token-theme-color-surface-color, #0b0f28) 85%,
      transparent
    );
    backdrop-filter: blur(var(--token-reference-blur-sm, 0.625rem));
    -webkit-backdrop-filter: blur(var(--token-reference-blur-sm, 0.625rem));
    border-bottom: var(
      --token-theme-border-default-small,
      1px solid
        color-mix(in srgb, var(--token-theme-color-interactive-color, #1de9b6) 12%, transparent)
    );

    @media (min-width: $breakpoint-md) {
      padding: 0.55rem var(--token-reference-spacing-8, 2rem);
    }
  }

  :global(.toolbar__back) {
    --button-padding: 0.3rem 0.65rem;
    --button-padding-md: 0.3rem 0.65rem;
    --button-font-size: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-font-size-md: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-radius: var(--token-reference-radius-xs, 0.375rem);
    --button-gap: 0.3rem;
    --button-secondary-hover-transform: none;
  }

  :global(.toolbar__download) {
    --button-padding: 0.35rem 0.9rem;
    --button-padding-md: 0.35rem 0.9rem;
    --button-font-size: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-font-size-md: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-font-weight: var(--token-reference-typography-weight-semibold, 600);
    --button-radius: var(--token-reference-radius-xs, 0.375rem);
    --button-gap: 0.4rem;
  }

  .toolbar__title {
    font-size: var(--token-reference-typography-size-xs, 0.8125rem);
    color: var(--token-theme-color-text-disabled, rgba(255, 255, 255, 0.45));
    display: none;

    @media (min-width: $breakpoint-md) {
      display: block;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 0.8s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .spin {
      animation: none;
    }
  }
</style>
