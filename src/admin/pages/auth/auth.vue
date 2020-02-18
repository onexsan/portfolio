<template lang="pug" src="./auth.pug">
	
</template>

<style lang="postcss" src="./auth.pcss">
</style>

<script>
import $axios from "../../requests";
import { mapActions } from "vuex";

export default {
  data: () => ({
    user: {
      name: "",
      password: ""
    }
  }),
  methods: {
    ...mapActions("tooltip", ["showTooltip"]),
    async login() {
      try {
        const response = await $axios.post("/login", this.user);
        console.log(response);

        const token = response.data.token;

        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch ({ message }) {
        if (message === "Request failed with status code 403") {
          message = "Такого пользователя не существует";
        }
        this.showTooltip({ type: "error", message });
      }
    }
  }
};
</script>