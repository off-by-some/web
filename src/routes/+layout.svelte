<script lang="ts">
  export let children: import('svelte').Snippet;
</script>

<div class="app">
  {@render children()}
</div>

<style lang="scss" global>
  /* Tokens are linked early via app.html to avoid FOUC */
</style>
