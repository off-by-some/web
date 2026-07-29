<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Italic } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Italic',
    component: Italic,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'italic.pdf',
      renderWidth: '34rem',
      text: 'Italic text exports as selectable italic PDF text.',
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
            'Wraps children in `<em>`. Font style is read from the DOM, so italic text exports as real selectable italic in the PDF without any extra work. No base class — styling is entirely up to the consumer.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Italic class="italic-story">{args.text}</Italic>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.italic-story) {
    color: #374151;
    font-size: 1.2rem;
  }
</style>
