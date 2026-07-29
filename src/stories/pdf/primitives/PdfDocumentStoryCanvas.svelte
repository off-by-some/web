<script lang="ts">
  import { PdfDocument, PdfFlowText, PdfPage, PdfRule } from '$lib/pdf/primitives';
  import PdfStoryDownload from '../PdfStoryDownload.svelte';

  interface Props {
    filename: string;
    renderWidth: string;
  }

  const { filename, renderWidth }: Props = $props();
  let download: (() => Promise<void>) | undefined = $state();
</script>

<div class="pdf-document-story">
  <PdfStoryDownload {download} />

  <PdfDocument bind:download {filename} {renderWidth} class="pdf-document-story__document">
    <PdfPage class="pdf-document-story__page">
      <section class="pdf-document-story__sample" aria-label="PDF document export sample">
        <PdfRule class="pdf-document-story__rule" />
        <PdfFlowText>Selectable text exported by PdfDocument.</PdfFlowText>
      </section>
    </PdfPage>
  </PdfDocument>
</div>

<style lang="scss">
  .pdf-document-story {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    inline-size: min(100%, 60rem);
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }

  :global(.pdf-document-story__document) {
    inline-size: min(100%, var(--pdf-story-render-width, 34rem));
  }

  :global(.pdf-document-story__page) {
    aspect-ratio: 8.5 / 11;
    background: #fff;
    color: #1f2937;
    border-radius: var(--token-reference-radius-xs, 0.375rem);
    box-shadow: var(--token-theme-shadow-default);
    padding: 2.25rem;
  }

  .pdf-document-story__sample {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    color: #1f2937;
    font-size: 0.95rem;
  }

  :global(.pdf-document-story__rule) {
    display: block;
    block-size: 0.125rem;
    color: #1de9b6;
  }
</style>
