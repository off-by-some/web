<script lang="ts">
  import { resolve } from '$app/paths';
  import { Button } from '$lib/components/primitives/actions';

  interface Props {
    downloadReady?: boolean;
    generating?: boolean;
    onDownloadRequested: () => void;
    title: string;
  }

  const { downloadReady = true, generating = false, onDownloadRequested, title }: Props = $props();
</script>

<header class="resume-toolbar">
  <nav class="resume-toolbar__navigation" aria-label="Resume navigation">
    <Button
      as="a"
      variant="secondary"
      href={resolve('/')}
      class="resume-toolbar__action resume-toolbar__back"
    >
      <svg
        class="resume-toolbar__icon"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 12L6 8l4-4"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Back</span>
    </Button>
  </nav>

  <p class="resume-toolbar__title">{title}</p>

  <div class="resume-toolbar__actions">
    <Button
      variant="primary"
      onclick={onDownloadRequested}
      disabled={generating || !downloadReady}
      aria-busy={generating}
      class="resume-toolbar__action resume-toolbar__download"
    >
      {#if generating}
        <svg
          class="resume-toolbar__icon resume-toolbar__spinner"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
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
        <span>Generating...</span>
      {:else}
        <svg
          class="resume-toolbar__icon"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Download PDF</span>
      {/if}
    </Button>
  </div>
</header>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .resume-toolbar {
    position: sticky;
    inset-block-start: 0;
    z-index: 50;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: var(--token-reference-spacing-3, 0.75rem);
    padding-block: 0.5rem;
    padding-inline: var(--token-reference-spacing-5, 1.25rem);
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
      padding-block: 0.55rem;
      padding-inline: var(--token-reference-spacing-8, 2rem);
    }
  }

  .resume-toolbar__navigation,
  .resume-toolbar__actions {
    display: flex;
    align-items: center;
    min-inline-size: 0;
  }

  .resume-toolbar__navigation {
    justify-content: flex-start;
  }

  .resume-toolbar__actions {
    justify-content: flex-end;
  }

  :global(.resume-toolbar__action) {
    --button-padding: 0.3rem 0.65rem;
    --button-padding-md: 0.3rem 0.65rem;
    --button-font-size: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-font-size-md: var(--token-reference-typography-size-xs, 0.8125rem);
    --button-radius: var(--token-reference-radius-xs, 0.375rem);
    --button-gap: 0.3rem;
    --button-min-height: 2rem;
  }

  :global(.resume-toolbar__download) {
    --button-padding: 0.35rem 0.9rem;
    --button-padding-md: 0.35rem 0.9rem;
    --button-font-weight: var(--token-reference-typography-weight-semibold, 600);
    --button-gap: 0.4rem;
  }

  .resume-toolbar__title {
    margin: 0;
    min-inline-size: 0;
    max-inline-size: min(42vw, 26rem);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--token-reference-typography-size-xs, 0.8125rem);
    font-weight: var(--token-reference-typography-weight-medium, 500);
    color: var(--token-theme-color-text-disabled, rgba(255, 255, 255, 0.45));
    text-align: center;

    @media (max-width: $breakpoint-sm) {
      display: none;
    }
  }

  .resume-toolbar__icon {
    flex: 0 0 auto;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .resume-toolbar__spinner {
    animation: spin var(--token-reference-duration-fast, 0.8s) linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .resume-toolbar__spinner {
      animation: none;
    }
  }
</style>
