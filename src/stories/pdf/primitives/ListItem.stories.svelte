<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ListItem, UnorderedList } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/List Item',
    component: ListItem,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'list-item.pdf',
      renderWidth: '34rem',
      text: 'A single list item with an owned marker and flow-wrapped text.',
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
            'A list item with an explicit text marker — not CSS list-style — so the marker actually exports into the PDF. The `marker` prop (default `•`) takes any string, so you can use `-`, `→`, `✓`, or ordinals like `"1."`. Needs to sit inside `UnorderedList` or `OrderedList` for correct semantics.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <UnorderedList class="list-item-story">
      <ListItem>{args.text}</ListItem>
    </UnorderedList>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.list-item-story) {
    max-inline-size: 24rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
