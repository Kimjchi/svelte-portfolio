<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { quadOut } from "svelte/easing";
  import { Hamburger } from "svelte-hamburgers";

  let open: boolean;
  const LINKS = [
    {
      label: "WORK",
      url: "/",
    },
    {
      label: "PHOTOS",
      url: "/photos",
    },
    {
      label: "DRAWINGS",
      url: "/drawings",
    },
    {
      label: "ABOUT",
      url: "/about",
    },
  ];
</script>

<div
  class="hidden sm:flex flex-row justify-between text-lg py-10 px-16 fixed top-0 w-full z-20"
>
  <div class="flex flex-row space-x-6">
    <a href="/">WORK</a>
    <a href="/photos">PHOTOS</a>
  </div>

  <h1 class="text-4xl absolute left-1/2 -translate-x-1/2">KIM</h1>

  <div class="flex flex-row space-x-6">
    <a href="/drawings">DRAWINGS</a>
    <a href="/about">ABOUT</a>
  </div>
</div>
<div class="sm:hidden text-lg py-10 fixed top-0 w-full z-20">
  <h1 class="text-4xl absolute left-1/2 -translate-x-1/2">KIM</h1>
  <div class="absolute right-5 z-30">
    <Hamburger bind:open />
  </div>
</div>

{#if open}
  {#key open}
    <div
      class="menu py-10 fixed top-0 h-full z-30"
      transition:fly|global={{ x: -150 }}
    >
      {#each LINKS as link, i}
        <p transition:fly|global={{ y: -15, delay: 50 * i }}>
          <a href={link.url} on:click={() => (open = false)}>{link.label}</a>
        </p>
      {/each}
      <div
        class="bar"
        transition:scale|global={{ duration: 750, easing: quadOut, opacity: 1 }}
      />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={() => (open = false)}
      class="fixed top-0 w-full h-full z-20 bg-slate-950 opacity-30"
      transition:fly|global={{ x: -150 }}
    ></div>
  {/key}
{/if}

<style>
  a {
    font-weight: 400;
    opacity: 0.5;
  }
  a:hover {
    opacity: 1;
  }

  div {
    font-family: "Roboto", sans-serif;
  }
  .menu {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    padding: 1em;
    color: black;
    background-color: white;
  }

  p {
    cursor: pointer;
    width: max-content;
    margin: 1rem auto;
  }

  .bar {
    border-style: solid;
    border-color: black;
    border-width: 1px;
    height: 0;
    opacity: 0.5;
  }
</style>
