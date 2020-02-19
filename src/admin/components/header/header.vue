<template lang="pug" src="./header.pug">

</template>

<style lang="postcss" src="./header.pcss">
</style>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["logoutUser"]),
    async logoutThisUser() {
      await this.logoutUser();
      await this.$router.replace("/login");
    }
  }
};
</script>

