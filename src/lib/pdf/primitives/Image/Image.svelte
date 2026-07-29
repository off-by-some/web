<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';

  type Props = HTMLImgAttributes;

  const { class: classProp = '', ...rest }: Props = $props();
  const classes = $derived(['pdf-image', classProp].filter(Boolean).join(' '));
</script>

<img {...rest} class={classes} />

<style lang="scss">
  :global(:where(.pdf-image)) {
    display: block;
    max-inline-size: 100%;
  }
</style>
