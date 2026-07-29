<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ListItem, OrderedList } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Ordered List',
    component: OrderedList,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'ordered-list.pdf',
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
            '`OrderedList` gives `ListItem` children numeric markers by default, so the visible DOM and exported PDF share the same ordered-list rhythm without CSS counter fallback behavior.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <OrderedList class="ordered-list-story">
      <ListItem>Clone the DOM at the specified render width.</ListItem>
      <ListItem>Wait for fonts and images to load.</ListItem>
      <ListItem>Map element bounding boxes to PDF coordinates.</ListItem>
      <ListItem>Render and return a Blob for download.</ListItem>
    </OrderedList>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.ordered-list-story) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-inline-size: 26rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
