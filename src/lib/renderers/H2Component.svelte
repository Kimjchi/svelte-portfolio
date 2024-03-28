<script lang="ts">
  export let depth;
  export let options;
</script>

<svelte:element this={`h${depth}`}>
  <slot />
</svelte:element>

<style>
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1rem;
  }
</style>
