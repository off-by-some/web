<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { TaskListItem, UnorderedList } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    checked: boolean;
    filename: string;
    mode: 'single' | 'mixed';
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Task List Item',
    component: TaskListItem,
    render: template,
    tags: ['autodocs'],
    args: {
      checked: false,
      filename: 'task-list-item.pdf',
      mode: 'single',
      renderWidth: '34rem',
      text: 'Write the story files',
    },
    argTypes: {
      ...hideControls(['children']),
      checked: { control: 'boolean' },
      filename: { control: 'text' },
      mode: { control: 'radio', options: ['single', 'mixed'] },
      renderWidth: { control: 'text' },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'A `ListItem` with the marker set to `[x]` or `[ ]` based on the `checked` prop. Compose inside `UnorderedList` for correct semantics.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <UnorderedList class="task-list-story">
      {#if args.mode === 'mixed'}
        <TaskListItem checked>Design the API</TaskListItem>
        <TaskListItem checked>Write the renderer</TaskListItem>
        <TaskListItem>Write the story files</TaskListItem>
        <TaskListItem>Add PDF font support</TaskListItem>
      {:else}
        <TaskListItem checked={args.checked}>{args.text}</TaskListItem>
      {/if}
    </UnorderedList>
  </PdfStoryFrame>
{/snippet}

<Story name="Unchecked" args={{ checked: false, filename: 'task-list-item-unchecked.pdf' }} />
<Story
  name="Checked"
  args={{ checked: true, filename: 'task-list-item-checked.pdf', text: 'Design the API' }}
/>
<Story
  name="Mixed List"
  args={{ filename: 'task-list-mixed.pdf', mode: 'mixed' }}
  parameters={{
    docs: {
      description: {
        story: 'A realistic task list with a mix of checked and unchecked items.',
      },
    },
  }}
/>

<style lang="scss">
  :global(.task-list-story) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-inline-size: 22rem;
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }
</style>
