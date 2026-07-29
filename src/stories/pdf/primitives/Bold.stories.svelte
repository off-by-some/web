<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Bold } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Bold',
    component: Bold,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'bold.pdf',
      renderWidth: '34rem',
      text: 'Bold text exports as selectable bold PDF text.',
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
            'Wraps children in `<strong>`. Font weight is read from the DOM, so bold text exports as real selectable bold in the PDF without any extra work. No base class — styling is entirely up to the consumer.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Bold class="bold-story">{args.text}</Bold>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.bold-story) {
    color: #111827;
    font-size: 1.2rem;
  }
</style>
