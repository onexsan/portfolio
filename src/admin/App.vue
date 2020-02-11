<template lang="pug">
  .root-wrapper
    router-view(name="header")
    router-view(name="tabs")
    .page__wrapper
      router-view
      
</template>

<script>
export default {};
</script>


<style lang="postcss" src="./styles/main.pcss">
</style>
