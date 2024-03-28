<script>
  import me from "$lib/assets/queen.jpeg";
  import iconFB from "$lib/assets/icons/facebook.svg";
  import iconGithub from "$lib/assets/icons/github.svg";
  import iconInsta from "$lib/assets/icons/instagram.svg";
  import iconLinkedin from "$lib/assets/icons/linkedin.svg";
  import Button from "$lib/Button.svelte";
  import { PUBLIC_STRAPI_URL } from "$env/static/public";
</script>

<div class="w-full">
  <h1 class="mx-auto my-20 text-6xl text-center">
    I like trains and smile a lot
  </h1>
  <div>
    <img src={me} alt="Me with a crown" class="mx-auto" />
    <p class="text-center text-sm text-gray-500">How I think I look</p>
  </div>
  <h2 class="mx-auto my-16 text-3xl text-center">Jérémy Kim</h2>
  <p class=" text-justify md:px-40">
    I'm a French Full Stack Developer graduated from an engineering school and
    back in Paris. After interning 6 months at Smartly.io in Helsinki, I decided
    to continue my job there as this place is full of extraordinary people.
    However, after 2 years, I decided to come back to Paris and pursue a career
    in web development especially front end development.
    <br />
    <br />
    In between work, I like to balance between watching movies, reading books and
    trying creative projects. I also try to add some sport here and there. I would
    like to be a more creative person but I'm lazy as hell (which makes me a good
    programmer).
    <br />
    <br />
    I coded this website to learn svelte/sveltKit and experiment with GSAP. Now,
    there is a place where I can dump my drawings, writings and future comics. Knowing
    that people can see this stuff is a good motivation. Be it bad or very bad, I
    will put (most of) all my work here.
    <br />
    <br />
    Thanks for reading this. Please reach out if you wanna talk.
  </p>
  <div class="flex justify-center pt-16 px-32 space-x-5">
    <div class="flex-1 opacity-30 hover:opacity-100 hover:cursor-pointer">
      <a href="https://www.facebook.com/jeremy.kim.503645" target="_blank"
        ><img src={iconFB} alt="Facebook icon" /></a
      >
    </div>
    <div class="flex-1 opacity-30 hover:opacity-100 hover:cursor-pointer">
      <a href="https://github.com/Kimjchi" target="_blank"
        ><img src={iconGithub} alt="Github icon" /></a
      >
    </div>
    <div class="flex-1 opacity-30 hover:opacity-100 hover:cursor-pointer">
      <a href="https://www.instagram.com/kimjchi/" target="_blank"
        ><img src={iconInsta} alt="Instragram icon" /></a
      >
    </div>
    <div class="flex-1 opacity-30 hover:opacity-100 hover:cursor-pointer">
      <a
        href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-v-kim/"
        target="_blank"><img src={iconLinkedin} alt="Linkedin icon" /></a
      >
    </div>
  </div>
  <p class="text-center text-xs pt-3">
    Icons made by <a
      href="https://www.flaticon.com/authors/pixel-perfect"
      target="_blank">Pixel perfect</a
    >
    from
    <a href="https://www.flaticon.com/" target="_blank">www.flaticon.com</a>
  </p>
  <a
    href={PUBLIC_STRAPI_URL + "/uploads/CV_2024_bb37cde0c3.pdf"}
    target="_blank"
    ><div class="mt-10 text-center">
      <Button>More? Here's my resume</Button>
    </div></a
  >
</div>

<style>
  p {
    font-family: "Roboto", sans-serif;
  }
</style>
