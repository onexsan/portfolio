<template lang="pug">
	.tooltip-container(:class="{ shown: shown }")
		.tooltip(:class="'tooltip--' + type")
			.tooltip__text {{ message }}
			button(@click="closeTooltip").tooltip__close
</template>

<style lang="postcss" src="./tooltip.pcss">
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("tooltip", {
      shown: state => state.shown,
      type: state => state.type,
      message: state => state.message
    })
  },
  methods: {
    ...mapActions("tooltip", ["closeTooltip"])
  },
  watch: {
    shown(value) {
      if (value) {
        let timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => this.closeTooltip(), 5000);
      }
    }
  }
};
</script>