<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import H2Component from "$lib/renderers/H2Component.svelte";
  import ImageComponent from "./renderers/ImageComponent.svelte";
  export let source: string;
</script>

<SvelteMarkdown
  {source}
  renderers={{ heading: H2Component, image: ImageComponent }}
/>
