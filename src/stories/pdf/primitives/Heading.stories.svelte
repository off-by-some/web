<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Heading } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    size: 1 | 2 | 3 | 4;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Heading',
    component: Heading,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'heading.pdf',
      renderWidth: '34rem',
      size: 2,
      text: 'Heading',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
      size: { control: 'select', options: [1, 2, 3, 4] },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            "Renders an `h1` through `h4` based on the `size` prop. Default font sizes are controlled by `--pdf-heading-size-1` through `--pdf-heading-size-4`, so you can tune the scale per document without touching the component. Margins are zeroed by default — spacing is the parent's responsibility.",
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Heading size={args.size} class="heading-story">{args.text}</Heading>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.heading-story) {
    color: #0d1117;
  }
</style>
