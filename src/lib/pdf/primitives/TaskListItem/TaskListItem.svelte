<script lang="ts">
  import ListItem from '../ListItem';

  import type { Snippet } from 'svelte';
  import type { HTMLLiAttributes } from 'svelte/elements';

  type Props = Omit<HTMLLiAttributes, 'children' | 'class'> & {
    checked?: boolean;
    children: Snippet;
    class?: string;
  };

  const { checked = false, children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-task-list-item', classProp].filter(Boolean).join(' '));
  const marker = $derived(checked ? '[x]' : '[ ]');
</script>

<ListItem {...rest} {marker} class={classes}>
  {@render children()}
</ListItem>

<style lang="scss">
  :global(:where(.pdf-task-list-item)) {
    --pdf-list-marker-size: 1.65rem;
  }
</style>
