<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    className?: string;
    id?: string;
    children?: Snippet;
  };

  let { className = '', id = '', children }: Props = $props();
</script>

<div class="section-wrapper {className}" {id}>
  {@render children?.()}
</div>

<style lang="scss">
  @use 'lib/components/primitives/root' as root;

  .section-wrapper {
    @include root.component-root;

    max-width: 90vw;
    position: relative;
    width: 100%;
    margin-inline: auto;
    margin-block: var(--section-margin-block, 0);
  }
</style>
