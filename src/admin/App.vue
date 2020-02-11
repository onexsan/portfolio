<template lang="pug">
  div.root-wrapper-container
    div.root-container
      //- header.header-container
      //-   app-header
      //- section.tabs-container
      //-   tabs
      //- main.content-container
      //-   router-view
      section.auth-container
        auth
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    // appHeader: () => import("./components/header/header"),
    // tabs: () => import("./components/tabs/tabs"),
    auth: () => import("./pages/auth/auth")
  }
};
</script>


<style lang="postcss" src="./styles/main.pcss">
</style>
