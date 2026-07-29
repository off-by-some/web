<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-code', classProp].filter(Boolean).join(' '));
</script>

<code {...rest} class={classes}>
  {@render children()}
</code>

<style lang="scss">
  :global(:where(.pdf-code)) {
    font-family: var(--pdf-monospace-family, 'Courier New', monospace);
    font-size: 0.92em;
  }
</style>
