<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'> & {
    children?: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', role, ...rest }: Props = $props();
  const classes = $derived([classProp].filter(Boolean).join(' '));
  const resolvedRole = $derived(
    role ?? (rest['aria-label'] || rest['aria-labelledby'] ? 'region' : undefined),
  );
</script>

<div {...rest} role={resolvedRole} class={classes} data-page>
  {@render children?.()}
</div>

<style lang="scss">
  div {
    display: block;
  }
</style>
