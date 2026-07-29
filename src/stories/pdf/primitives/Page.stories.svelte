<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Page } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';
  import { pageSource } from './source';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Page',
    component: Page,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'page.pdf',
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
            'Marks a PDF page boundary. `Document` collects these to split the render into separate pages. Children are optional — a bare `<Page />` is a valid blank page. Add an `aria-label` and `role="region"` is set automatically.',
        },
        source: {
          code: pageSource,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth} wrapPage={false}>
    <Page class="pdf-story-frame__page page-story" aria-label="Blank PDF page story" />
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.page-story) {
    background-image:
      linear-gradient(#fff, #fff),
      linear-gradient(135deg, rgba(29, 233, 182, 0.28), rgba(19, 99, 83, 0.1));
    background-clip: padding-box, border-box;
    border: 0.125rem dashed rgba(19, 99, 83, 0.45);
  }
</style>
