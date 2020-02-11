<template lang="pug" src="./tabs.pug">

</template>

<style lang="postcss" src="./tabs.pcss">
</style>


<script>
export default {
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Отзывы", href: "/reviews" },
        { title: "Работы", href: "/works" }
      ]
    };
  }
};
</script>