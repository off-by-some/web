<script lang="ts">
  import Paragraph from '../Paragraph';
  import { listMarker } from '../list-context';

  import type { Snippet } from 'svelte';
  import type { HTMLLiAttributes } from 'svelte/elements';

  type Props = Omit<HTMLLiAttributes, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
    marker?: string;
  };

  const {
    children,
    class: classProp = '',
    marker = listMarker() ?? '•',
    ...rest
  }: Props = $props();
  const classes = $derived(['pdf-list-item', classProp].filter(Boolean).join(' '));
</script>

<li {...rest} class={classes}>
  <span class="pdf-list-item__marker" aria-hidden="true">{marker}</span>
  <Paragraph class="pdf-list-item__text">
    {@render children()}
  </Paragraph>
</li>

<style lang="scss">
  :global(:where(.pdf-list-item)) {
    display: grid;
    grid-template-columns: var(--pdf-list-marker-size, 0.8rem) minmax(0, 1fr);
    column-gap: var(--pdf-list-marker-gap, 0.35em);
    margin: 0;
    list-style: none;
  }

  :global(:where(.pdf-list-item__marker)) {
    color: currentColor;
    line-height: inherit;
  }
</style>
