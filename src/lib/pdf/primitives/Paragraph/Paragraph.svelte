<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-paragraph', classProp].filter(Boolean).join(' '));
</script>

<p {...rest} class={classes} data-pdf-text="flow">
  {@render children()}
</p>

<style lang="scss">
  :global(:where(.pdf-paragraph)) {
    margin: 0;
  }
</style>
