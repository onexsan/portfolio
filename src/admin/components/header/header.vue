<template lang="pug" src="./header.pug">

</template>

<style lang="postcss" src="./header.pcss">
</style>

<script>
import axios from "../../requests";

export default {
  data: () => ({
    user: {
      id: ""
    }
  }),
  methods: {
    knowId(user) {
      axios.get("/user").then(response => {
        this.user.id = response.data;
        console.log(response.data);
      });
    }
  }
};
</script>

