<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ListItem, UnorderedList } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    first: string;
    renderWidth: string;
    second: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Unordered List',
    component: UnorderedList,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'unordered-list.pdf',
      first: 'List items use flow text so wrapped lines remain stable in the PDF.',
      renderWidth: '34rem',
      second: 'Markers are visible text, not CSS-generated content.',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
      first: { control: 'text' },
      second: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'A `<ul>` container for `ListItem` children. Manages its own margin and left padding; gap between items is up to the consumer.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <UnorderedList class="unordered-list-story">
      <ListItem>{args.first}</ListItem>
      <ListItem>{args.second}</ListItem>
    </UnorderedList>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.unordered-list-story) {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-inline-size: 24rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
