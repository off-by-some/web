<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Strikethrough } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Strikethrough',
    component: Strikethrough,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'strikethrough.pdf',
      renderWidth: '34rem',
      text: 'Deprecated API method',
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
            'Wraps children in semantic `<del>` text. The renderer follows the computed `text-decoration` so the strike appears in the exported PDF too.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Strikethrough class="strikethrough-story">{args.text}</Strikethrough>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.strikethrough-story) {
    color: #6b7280;
    font-size: 1rem;
    text-decoration: line-through;
  }
</style>
