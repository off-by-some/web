<script lang="ts">
  import { setListContext } from '../list-context';

  import type { Snippet } from 'svelte';
  import type { HTMLOlAttributes } from 'svelte/elements';

  type Props = Omit<HTMLOlAttributes, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', reversed = false, start = 1, ...rest }: Props = $props();
  const classes = $derived(['pdf-ordered-list', classProp].filter(Boolean).join(' '));
  let markerIndex: number | undefined;

  setListContext({
    marker: () => {
      markerIndex ??= Number(start);
      const marker = `${markerIndex}.`;
      markerIndex += reversed ? -1 : 1;
      return marker;
    },
  });
</script>

<ol {...rest} {reversed} {start} class={classes}>
  {@render children()}
</ol>

<style lang="scss">
  :global(:where(.pdf-ordered-list)) {
    margin: 0;
    padding-inline-start: 1.5em;
  }
</style>
