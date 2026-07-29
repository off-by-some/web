<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Paragraph } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Paragraph',
    component: Paragraph,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'paragraph.pdf',
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
            'Signals the renderer to treat the content as one measured text block instead of individual lines. This prevents re-pagination glitches when text wraps near a page boundary. Use it for any copy that might flow across multiple lines.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <section class="paragraph-story">
      <Paragraph>{args.text}</Paragraph>
    </section>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .paragraph-story {
    max-inline-size: 24rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
