<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PdfDocument } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfDocumentStoryCanvas from './PdfDocumentStoryCanvas.svelte';
  import { pdfDocumentSource } from './source';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Pdf Document',
    component: PdfDocument,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'pdf-primitives.pdf',
      renderWidth: '34rem',
    },
    argTypes: {
      ...hideControls(['children', 'download', 'pageSize']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Framework-facing PDF wrapper. The caller renders real DOM at the intended width; PdfDocument exposes only a bound download function and keeps jsPDF hidden behind a Blob-producing renderer. The canvas below is the exported page.',
        },
        source: {
          code: pdfDocumentSource,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfDocumentStoryCanvas filename={args.filename} renderWidth={args.renderWidth} />
{/snippet}

<Story name="Default" />
