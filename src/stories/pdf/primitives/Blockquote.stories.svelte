<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Blockquote } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Blockquote',
    component: Blockquote,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'blockquote.pdf',
      renderWidth: '34rem',
      text: 'The best way to predict the future is to invent it.',
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
            'A `<blockquote>` with a left border drawn via `border-inline-start: 0.25em solid currentColor`. Set `color` on the element or a parent to change the border color.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Blockquote class="blockquote-story">{args.text}</Blockquote>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.blockquote-story) {
    max-inline-size: 24rem;
    color: #1de9b6;
    font-size: 1rem;
    font-style: italic;
    line-height: 1.5;
  }
</style>
