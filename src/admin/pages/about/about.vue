<template lang="pug">
section.section.about
	.container.about__container
		.about__intro
			pre {{categories}}
			h2.title.about__title Блок «Обо мне»
			button.add-btn.add-btn--small
				.add-btn__image
				p Добавить группу
		.about__blocks
			.skill-block.skill-block--empty
				.skill-block__content
					form.skill-form(@submit.prevent="addNewCategory")
						.skill-form__container
							.skill-form__row
								input.skill-form__input.skill-form__input--group(type="text" v-model="title" placeholder="Название новой группы" name="skill-group")
								.skill-group__btns
									button.accept-btn(type="submit" name="accept-btn")
										.accept-btn__icon
									button.discard-btn(name="discard-btn")
										.discard-btn__icon
							.skill-form__content
							.skill-form__row
								input.skill-form__input.skill-form__input--skill(type="text" placeholder="Новый навык" name="skill-name")
								input.skill-form__input.skill-form__input--percent(type="number" placeholder="100%" name="skill-percent")
								button.add-btn.add-btn--big(type="submit" name="add-btn")
									.add-btn__image
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    title: ""
  }),
  methods: {
    ...mapActions("categories", ["addCategory"]),
    async addNewCategory() {
      try {
        await this.addCategory(this.title);
        console.log(this.title);
      } catch (error) {
        console.warn(error.message);
      }
    }
  }
};
</script>