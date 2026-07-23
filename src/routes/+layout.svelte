<script lang="ts">
  const { children }: { children: import('svelte').Snippet } = $props();
</script>

<div class="app">
  {@render children()}
</div>

<style lang="scss" global>
  /* Tokens are linked early via app.html to avoid FOUC */
</style>
