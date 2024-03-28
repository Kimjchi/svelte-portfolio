<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "$lib";
  import pkg from "lodash";
  const { range } = pkg;

  onMount(() => {
    let svg = document.querySelector("svg");
    if (svg) {
      let wibble = document.querySelector("#wibble") as SVGPolylineElement;
      const width = 100;
      const pointz = 30;
      const spacing = width / pointz;

      const pointzArray = range(pointz).map((i) => {
        const position = i / (pointz - 1);
        if (!svg) return;
        const point = wibble?.points?.appendItem(svg.createSVGPoint());

        point.x = i * spacing;
        point.y = 25;
        return point;
      });

      let button = document.querySelector("button.body");
      let isAnimating = false;

      button?.addEventListener("mouseenter", () => {
        if (isAnimating === true) {
          return;
        }

        isAnimating = true;
        pointzArray.forEach((point: any, index: number) => {
          const mapper = gsap.utils.mapRange(0, pointz, 0, 0.4);

          if (index === 0) {
            gsap
              .to(point, {
                keyframes: [
                  { y: "+=6", ease: "Sine.easeInOut" },
                  { y: "-=12", ease: "Sine.easeInOut" },
                  { y: "+=6", ease: "Sine.easeInOut" },
                ],
                yoyo: true,
                duration: 0.6,
                onComplete: () => {
                  isAnimating = false;
                },
              })
              .progress(mapper(index));
          } else {
            gsap
              .to(point, {
                keyframes: [
                  { y: "+=6", ease: "Sine.easeInOut" },
                  { y: "-=12", ease: "Sine.easeInOut" },
                  { y: "+=6", ease: "Sine.easeInOut" },
                ],
                yoyo: true,
                duration: 0.6,
              })
              .progress(mapper(index));
          }
        });
      });
    }
  });
</script>

<button class="body">
  <span><slot /></span>
  <svg viewBox="0 0 100 50" preserveAspectRatio="none">
    <polyline
      stroke="#17bbab"
      id="wibble"
      fill="#17bbab"
      stroke-width="45"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  button {
    position: relative;
    outline: none;
    border: none;
    border-radius: 99px;
    padding: 1rem 2rem;
    background-color: transparent;
    overflow: visible;
    color: white;
  }

  button span {
    position: relative;
    z-index: 2;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 0;
    left: 15%;
    width: 75%;
    transform: translateY(-50%);
    z-index: 1;
    overflow: visible;
  }
</style>
