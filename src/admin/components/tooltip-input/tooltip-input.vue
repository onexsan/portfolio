<template lang="pug">
	.input-tooltip(:class="{ 'input-tooltip--shown': errorText }") {{ errorText }}
</template>

<style lang="postcss">
</style>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: ""
    }
  }
};
</script>