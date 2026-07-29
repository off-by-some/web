<script lang="ts">
  import { setListContext } from '../list-context';

  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-unordered-list', classProp].filter(Boolean).join(' '));

  setListContext({
    marker: () => '•',
  });
</script>

<ul {...rest} class={classes}>
  {@render children()}
</ul>

<style lang="scss">
  :global(:where(.pdf-unordered-list)) {
    margin: 0;
    padding-inline-start: 1.25em;
  }
</style>
