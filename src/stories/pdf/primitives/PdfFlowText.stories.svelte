<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PdfFlowText } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Pdf Flow Text',
    component: PdfFlowText,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'pdf-flow-text.pdf',
      renderWidth: '34rem',
      text: 'Flow text gives the renderer permission to draw a wrapped text box as one measured block, which avoids retry-style pagination artifacts while preserving selectable text.',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Flow text marks copy that should be exported as one measured text block. Use it for wrapping paragraphs and bullets near page boundaries.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <section class="pdf-flow-text-story">
      <PdfFlowText>{args.text}</PdfFlowText>
    </section>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .pdf-flow-text-story {
    max-inline-size: 24rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
