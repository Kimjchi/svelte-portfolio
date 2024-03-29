<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { Image } from "@unpic/svelte";
  import { gsap, ScrollTrigger } from "$lib";

  import { PUBLIC_STRAPI_URL } from "$env/static/public";
  import Markdown from "$lib/Markdown.svelte";
  import Button from "$lib/Button.svelte";
  import pkg from "lodash";
  const { get } = pkg;

  export let data;
  let index = 0;
  $: maxIndex = data.data.length;
  $: selectedProject = data.data[index].attributes;
  $: screenshots = get(selectedProject, "screenshots.data", []);
  const colorScheme = ["#639AA6", "#5F7343", "#F2EDDC", "#D9AE5F", "#F26444"];

  $: currentColor = colorScheme[index % colorScheme.length];
  $: currentProjectContent = get(selectedProject, "content", "");

  function changeSelectedProject(steps: number) {
    index = index + steps < 0 ? maxIndex - 1 : (index + steps) % maxIndex;
    const description = document.querySelector("#description");
    if (description) {
      gsap.set("#content", { minHeight: "150vh" });
    } else {
      gsap.set("#content", { minHeight: "86vh" });
    }
  }

  onMount(() => {
    gsap.defaults({ overwrite: "auto", duration: 0.3 });
    gsap.set("#content", { minHeight: "150vh" });
  });
  beforeUpdate(() => {
    ScrollTrigger.killAll();
  });
  afterUpdate(() => {
    const description = document.querySelector("#description");
    if (description) {
      function toShowcase() {
        gsap.to("#description", {
          scale: 0.8,
          autoAlpha: 0,
          display: "hidden",
        });
        gsap.to("#showcase", { scale: 1, autoAlpha: 1, display: "block" });
      }

      ScrollTrigger.create({
        trigger: "#showcase",
        end: () => innerHeight / 2,
        onToggle: (self) => self.isActive && toShowcase(),
        id: "showcase",
      });

      function toDescription() {
        gsap.to("#showcase", { scale: 0.8, autoAlpha: 0, display: "hidden" });
        gsap.to("#description", { scale: 1, autoAlpha: 1, display: "block" });
      }

      ScrollTrigger.create({
        trigger: "#description",
        start: () => innerHeight / 2,
        onToggle: (self) => self.isActive && toDescription(),
        id: "description",
      });
      gsap.set("#content", { minHeight: "150vh" });
    } else {
      gsap.set("#content", { minHeight: "86vh" });
    }
  });
  function scrollTo(id = "description", int = 700) {
    const st = ScrollTrigger.getById(id);
    st?.scroll(int);
  }
</script>

<div id="content">
  <div id="showcase" class="panel p-20 mt-5">
    <div
      style="background-color: {currentColor};"
      class="w-100% h-[80vh] min-h-60 roboto-medium relative"
    >
      {#key index}
        <div
          class="text-4xl p-5 absolute top-0 left-0"
          in:fly={{ y: -10, duration: 1000 }}
          out:fly={{ y: 50, duration: 1000 }}
        >
          {get(selectedProject, "title", "")}
        </div>

        <div class="absolute w-full h-full">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="w-1/2 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 min-h-12 {currentProjectContent
              ? 'hover:cursor-pointer'
              : ''}"
            on:click={() => scrollTo("description")}
            in:scale={{
              duration: 500,
              opacity: 0.5,
              start: 0.5,
              easing: linear,
            }}
            out:fade
          >
            <Image
              src={PUBLIC_STRAPI_URL +
                get(screenshots, "0.attributes.url", "/")}
              alt={get(screenshots, "0.attributes.alternativeText", "")}
              layout="fullWidth"
            />
          </div>
          <p
            class="marquee w-full text-white font-extrabold m-auto"
            in:fly={{ y: 200, duration: 2000 }}
            out:fly={{ y: 200, duration: 2000 }}
          >
            <span>{get(selectedProject, "client", "")} &nbsp;</span>
          </p>
          <p
            class="marquee marquee2 w-full text-white font-extrabold m-auto"
            in:fly={{ y: 200, duration: 2000 }}
            out:fly={{ y: 200, duration: 2000 }}
          >
            <span>{get(selectedProject, "client", "")} &nbsp;</span>
          </p>
        </div>
      {/key}

      <div class="absolute bottom-2 flex justify-between w-full p-2">
        <svg
          class="w-20 h-20 text-gray-800 dark:text-white hover:cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          on:click={() => changeSelectedProject(-1)}
        >
          <path stroke="currentColor" d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
        </svg>

        <svg
          class="w-20 h-20 text-gray-800 dark:text-white hover:cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          on:click={() => changeSelectedProject(1)}
        >
          <path stroke="currentColor" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
        </svg>
      </div>
    </div>

    <footer class="mt-3 text-center italic">
      {index + 1}/{data.data.length}
    </footer>
  </div>

  {#if currentProjectContent}
    <div
      class="hidden panel p-20 mt-5 text-center h-full overflow-y-scroll"
      id="description"
      style="
		--gradient:{currentColor};
	"
    >
      <div class="pt-10">
        {#if get(selectedProject, "URL")}
          <a
            href={get(selectedProject, "URL", "/")}
            target="_blank"
            class="mt-20"><Button>See the project</Button></a
          >
        {/if}
        <div class="py-20 md:px-40 text-justify">
          <Markdown source={currentProjectContent} />
        </div>

        <svg
          class="w-20 h-20 text-gray-800 mx-auto cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          on:click={() => scrollTo("showcase", -1000)}
        >
          <path stroke="currentColor" d="m16 17-4-4-4 4m8-6-4-4-4 4" />
        </svg>
      </div>
    </div>
  {/if}
</div>

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
    animation: marquee 15s linear infinite;
    font-size: 10rem;
    line-height: 1;
  }

  .marquee2 span {
    animation-delay: 15s;
  }

  .roboto-medium {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .panel {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #description {
    background: -moz-linear-gradient(
      0deg,
      var(--gradient) 80%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      var(--gradient) 80%,
      rgba(255, 255, 255, 1) 100%
    );
    background: var(--gradient);
    background: linear-gradient(
      0deg,
      var(--gradient) 10%,
      rgba(255, 255, 255, 1) 100%
    );
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
