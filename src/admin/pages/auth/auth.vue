<template lang="pug" src="./auth.pug">
	
</template>

<style lang="postcss" src="./auth.pcss">
</style>

<script>
import $axios from "../../requests";
import simpleVueValidator from "simple-vue-validator";

const { Validator } = simpleVueValidator;
import { mapActions } from "vuex";

export default {
  mixins: [simpleVueValidator.mixin],
  data: () => ({
    user: {
      name: "",
      password: ""
    },
    errorText: {
      type: String,
      default: ""
    }
  }),
  components: {
    tooltipInput: () => import("../../components/tooltip-input/tooltip-input")
  },
  validators: {
    "user.name": function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    },
    "user.password": function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    }
  },
  methods: {
    ...mapActions("tooltip", ["showTooltip"]),
    async login() {
      if (await this.$validate()) {
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
  }
};
</script>