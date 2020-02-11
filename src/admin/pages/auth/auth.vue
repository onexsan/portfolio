<template lang="pug" src="./auth.pug">
	
</template>

<style lang="postcss" src="./auth.pcss">
</style>

<script>
import $axios from "../../requests";
export default {
  data: () => ({
    user: {
      name: "",
      password: ""
    }
  }),
  methods: {
    async login() {
      try {
        const response = await $axios.post("/login", this.user);
        console.log(response);

        const token = response.data.token;

        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch (error) {}
    }
  }
};
</script>