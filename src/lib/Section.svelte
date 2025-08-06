<script lang="ts">
    export let className: string = "";
    export let id: string = "";
</script>

<div class="section-wrapper {className}" {id}>
    <slot />
</div>

<style lang="scss">

    .section-wrapper {
        max-width: 90vw;
        position: relative;
        width: 100%;
        margin: 0 auto;
    }

</style>
