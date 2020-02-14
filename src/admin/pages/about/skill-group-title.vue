<template lang="pug">
	.title-wrapper
		h3.skill-form__title {{category.category}}
		.skill-group__btns
			button.edit-btn
				.edit-btn__icon
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>