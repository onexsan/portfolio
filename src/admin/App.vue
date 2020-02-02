<template lang="pug">
  .root__wrapper
    admHeader()
    tabs()
    about()
    projects()
    reviews()
    auth()
</template>

<style lang="postcss" src="./styles/main.pcss">
</style>

<script>
import admHeader from "./components/header/header.vue";
import tabs from "./components/tabs/tabs.vue";
import about from "./pages/about/about.vue";
import projects from "./pages/projects/projects.vue";
import reviews from "./pages/reviews/reviews.vue";
import auth from "./pages/auth/auth.vue";

export default {
  components: {
    admHeader,
    tabs,
    about,
    projects,
    reviews,
    auth
  }
};
</script>