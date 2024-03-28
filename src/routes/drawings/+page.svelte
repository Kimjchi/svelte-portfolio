<script lang="ts">
  import { PUBLIC_STRAPI_URL } from "$env/static/public";
  import { Image } from "@unpic/svelte";
  import pkg from "lodash";
  const { get } = pkg;
  export let data;

  $: images = data.data.map((d: any) => d.attributes.image.data);
  // TODO Add a banner ?
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:p-40">
  {#each images as image}
    <div>
      <Image
        src={PUBLIC_STRAPI_URL + get(image, "attributes.url", "/")}
        alt={get(image, "attributes.alternativeText", "")}
        layout="fullWidth"
      />
    </div>
  {/each}
</div>

<style>
</style>
