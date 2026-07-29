<script lang="ts">
  import { Document, Paragraph, Page, HorizontalRule } from '$lib/pdf/primitives';
  import PdfStoryDownload from '../PdfStoryDownload.svelte';

  interface Props {
    filename: string;
    renderWidth: string;
  }

  const { filename, renderWidth }: Props = $props();
  let download: (() => Promise<void>) | undefined = $state();
</script>

<div class="document-story">
  <PdfStoryDownload {download} />

  <Document bind:download {filename} {renderWidth} class="document-story__document">
    <Page class="document-story__page">
      <section class="document-story__sample" aria-label="PDF document export sample">
        <HorizontalRule class="document-story__rule" />
        <Paragraph>Selectable text exported by Document.</Paragraph>
      </section>
    </Page>
  </Document>
</div>

<style lang="scss">
  .document-story {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    inline-size: min(100%, 60rem);
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }

  :global(.document-story__document) {
    inline-size: min(100%, var(--pdf-story-render-width, 34rem));
  }

  :global(.document-story__page) {
    aspect-ratio: 8.5 / 11;
    background: #fff;
    color: #1f2937;
    border-radius: var(--token-reference-radius-xs, 0.375rem);
    box-shadow: var(--token-theme-shadow-default);
    padding: 2.25rem;
  }

  .document-story__sample {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    color: #1f2937;
    font-size: 0.95rem;
  }

  :global(.document-story__rule) {
    display: block;
    block-size: 0.125rem;
    color: #1de9b6;
  }
</style>
