<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLQuoteElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-blockquote', classProp].filter(Boolean).join(' '));
</script>

<blockquote {...rest} class={classes}>
  {@render children()}
</blockquote>

<style lang="scss">
  :global(:where(.pdf-blockquote)) {
    margin: 0;
    padding-inline-start: 1em;
    border-inline-start: 0.25em solid currentColor;
  }
</style>
