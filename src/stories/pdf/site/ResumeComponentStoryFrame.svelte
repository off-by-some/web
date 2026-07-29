<script lang="ts">
  import { interPdfFonts } from '$lib/pdf/fonts';
  import type { Snippet } from 'svelte';

  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  interface Props {
    children: Snippet;
    filename: string;
    label?: string;
  }

  const { children, filename, label = 'Download PDF' }: Props = $props();
</script>

<PdfStoryFrame
  {filename}
  fonts={interPdfFonts}
  {label}
  renderWidth="52rem"
  documentClass="resume-component-story__document"
  pageClass="resume-component-story__page"
>
  <div class="resume-component-story__content">
    {@render children()}
  </div>
</PdfStoryFrame>

<style lang="scss">
  :global(.resume-component-story__document) {
    --pdf-story-render-width: 52rem;
    --resume-font-family: Inter, Helvetica, 'Nimbus Sans', Arial, sans-serif;
    --resume-color-paper: #fff;
    --resume-color-ink: var(--token-theme-color-text-dark, #0d1117);
    --resume-color-body: color-mix(in srgb, var(--resume-color-ink) 74%, var(--resume-color-paper));
    --resume-color-muted: color-mix(
      in srgb,
      var(--resume-color-ink) 54%,
      var(--resume-color-paper)
    );
    --resume-color-soft: color-mix(in srgb, var(--resume-color-ink) 36%, var(--resume-color-paper));
    --resume-color-link: color-mix(in srgb, #0969da 30%, var(--resume-color-section, #136353));
    --resume-color-accent: var(--token-theme-color-interactive-color, #1de9b6);
    --resume-color-section: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color, #1de9b6) 38%,
      var(--resume-color-ink)
    );
    --resume-color-highlight: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color, #1de9b6) 38%,
      var(--resume-color-ink)
    );

    font-family: var(--resume-font-family);
  }

  :global(.resume-component-story__page) {
    padding-block-start: 2.85rem;
    padding-block-end: 3rem;
    padding-inline: 3.35rem;
  }

  .resume-component-story__content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
