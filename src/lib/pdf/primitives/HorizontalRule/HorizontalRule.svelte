<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'class'> & {
    class?: string;
  };

  const { class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-horizontal-rule', classProp].filter(Boolean).join(' '));
</script>

<span {...rest} class={classes} data-horizontal-rule aria-hidden="true"></span>

<style lang="scss">
  :global(:where(.pdf-horizontal-rule)) {
    display: block;
    block-size: 1px;
    inline-size: 100%;
    background: currentColor;
    border-radius: var(--token-reference-radius-full, 9999px);
  }
</style>
