<script lang="ts">
  import { PdfDocument, PdfPage } from '$lib/pdf/primitives';
  import type { Snippet } from 'svelte';

  import PdfStoryDownload from './PdfStoryDownload.svelte';

  interface Props {
    children?: Snippet;
    documentClass?: string;
    filename: string;
    label?: string;
    pageClass?: string;
    renderWidth: string;
    wrapPage?: boolean;
  }

  const {
    children,
    documentClass = '',
    filename,
    label = 'Download PDF',
    pageClass = '',
    renderWidth,
    wrapPage = true,
  }: Props = $props();

  let download: (() => Promise<void>) | undefined = $state();
</script>

<div class="pdf-story-frame">
  <PdfStoryDownload {download} {label} />

  <PdfDocument
    bind:download
    {filename}
    {renderWidth}
    class="pdf-story-frame__document {documentClass}"
  >
    {#if wrapPage}
      <PdfPage class="pdf-story-frame__page {pageClass}">
        {@render children?.()}
      </PdfPage>
    {:else}
      {@render children?.()}
    {/if}
  </PdfDocument>
</div>

<style lang="scss">
  .pdf-story-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    inline-size: min(100%, 60rem);
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }

  :global(.pdf-story-frame__document) {
    inline-size: min(100%, var(--pdf-story-render-width, 34rem));
  }

  :global(.pdf-story-frame__page) {
    aspect-ratio: 8.5 / 11;
    background: #fff;
    color: #1f2937;
    border-radius: var(--token-reference-radius-xs, 0.375rem);
    box-shadow: var(--token-theme-shadow-default);
    padding: 2.25rem;
  }
</style>
