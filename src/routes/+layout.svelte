<script lang="ts">
  const { children }: { children: import('svelte').Snippet } = $props();
</script>

<div class="app">
  {@render children()}
</div>

<style lang="scss" global>
  @use 'styles/foundations';
</style>
