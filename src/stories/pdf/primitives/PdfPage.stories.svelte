<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PdfPage } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';
  import { pdfPageSource } from './source';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Pdf Page',
    component: PdfPage,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'pdf-page.pdf',
      renderWidth: '34rem',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'PDF page primitive. It owns the page marker consumed by PdfDocument and keeps page boundaries declarative in Svelte.',
        },
        source: {
          code: pdfPageSource,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth} wrapPage={false}>
    <PdfPage class="pdf-story-frame__page pdf-page-story" aria-label="Blank PDF page story" />
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.pdf-page-story) {
    background-image:
      linear-gradient(#fff, #fff),
      linear-gradient(135deg, rgba(29, 233, 182, 0.28), rgba(19, 99, 83, 0.1));
    background-clip: padding-box, border-box;
    border: 0.125rem dashed rgba(19, 99, 83, 0.45);
  }
</style>
