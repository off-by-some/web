<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLPreElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-code-block', classProp].filter(Boolean).join(' '));
</script>

<pre {...rest} class={classes} data-pdf-text="pre"><code>{@render children()}</code></pre>

<style lang="scss">
  :global(:where(.pdf-code-block)) {
    margin: 0;
    overflow: auto;
    font-family: var(--pdf-monospace-family, 'Courier New', monospace);
    white-space: pre-wrap;
  }

  :global(:where(.pdf-code-block code)) {
    font-family: inherit;
  }
</style>
