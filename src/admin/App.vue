<template lang="pug">
  .root-wrapper
    router-view(name="header")
    router-view(name="tabs")
    .page__wrapper
      router-view
    page-tooltip()
</template>

<script>
export default {
  components: {
    pageTooltip: () => import("./components/tooltip/tooltip")
  }
};
</script>


<style lang="postcss" src="./styles/main.pcss">
</style>
