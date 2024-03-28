<script lang="ts">
  import { PUBLIC_STRAPI_URL } from "$env/static/public";
  import { Image } from "@unpic/svelte";
  import pkg from "lodash";
  const { get } = pkg;
  export let data;

  $: photos = data.data.map((d: any) => d.attributes.photo.data);
  // TODO Add a banner ?
</script>

<div class="grid grid-cols-1 sm:grid-cols-3">
  {#each photos as photo}
    <img
      src={PUBLIC_STRAPI_URL + get(photo, "attributes.url", "/")}
      alt={get(photo, "attributes.alternativeText", "")}
      class="h-full w-full object-cover"
    />
  {/each}
</div>

<style>
</style>
