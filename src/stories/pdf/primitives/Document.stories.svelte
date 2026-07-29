<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Document } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import DocumentStoryCanvas from './DocumentStoryCanvas.svelte';
  import { documentSource } from './source';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Document',
    component: Document,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'document.pdf',
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
            'The root wrapper that drives the whole PDF export. `renderWidth` sets the width the DOM is cloned at before rendering, keeping every measurement consistent. `bind:download` gives you a function to trigger the export — it handles cloning, waiting for fonts and images, rendering, and downloading the file. Supports `letter` (default) and `a4` page sizes.',
        },
        source: {
          code: documentSource,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <DocumentStoryCanvas filename={args.filename} renderWidth={args.renderWidth} />
{/snippet}

<Story name="Default" />
