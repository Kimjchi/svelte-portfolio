<script>
  import pkg from "lodash";
  import { PUBLIC_STRAPI_URL } from "$env/static/public";
  const { get } = pkg;

  export let data;
  let index = 0;
  $: selectedProject = data.data[index].attributes;
  $: screenshots = get(selectedProject, "Screenshots.data", []);
  const colorScheme = ["#639AA6", "#5F7343", "#F2EDDC", "#D9AE5F", "#F26444"];
</script>

<div
  style="background-color: {colorScheme[0]};"
  class="w-100% h-[90vh] min-h-60 roboto-medium relative"
>
  <div class="text-4xl p-5 absolute top-0 left-0">
    {get(selectedProject, "Title", "")}
  </div>
  <div class="absolute w-full h-full">
    <img
      src={PUBLIC_STRAPI_URL + get(screenshots, "0.attributes.url", "/")}
      alt={get(screenshots, "0.attributes.alternativeText", "")}
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    />
    <p class="marquee w-full text-white text-6xl font-extrabold m-auto">
      <span>FREELANCE &nbsp;</span>
    </p>
    <p
      class="marquee marquee2 w-full text-white text-6xl font-extrabold m-auto"
    >
      <span>FREELANCE &nbsp;</span>
    </p>
  </div>

  <div class="absolute bottom-2 flex justify-between w-full p-2">
    <svg
      class="w-20 h-20 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
    </svg>

    <svg
      class="w-20 h-20 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
    </svg>
  </div>
</div>

<footer class="bottom-0 text-center">{index + 1}/{data.data.length}</footer>

<style>
  .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .marquee span {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 10s linear infinite;
  }

  .marquee2 span {
    animation-delay: 10s;
  }

  .roboto-medium {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
</style>
