<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    as?: 'span' | 'div' | 'p' | 'h2' | 'h3' | 'h4';
    className?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { as = 'span', className = '', children, ...rest }: Props = $props();
</script>

<svelte:element this={as} class="visually-hidden {className}" {...rest}>
  {@render children?.()}
</svelte:element>

<style lang="scss">
  .visually-hidden {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
