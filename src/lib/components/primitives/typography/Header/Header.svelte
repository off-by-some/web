<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    as?: 'header' | 'div';
    className?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { as = 'header', className = '', children, ...rest }: Props = $props();

  const classes = $derived(['header', className].filter(Boolean).join(' '));
</script>

<svelte:element this={as} class={classes} {...rest}>
  {@render children?.()}
</svelte:element>

<style lang="scss">
  @use 'lib/components/primitives/root' as root;

  .header {
    @include root.component-root;

    position: relative;
  }
</style>
