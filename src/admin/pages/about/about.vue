<template lang="pug">
section.section.about
	.container.about__container
		pre 
		.about__intro
			h2.title.about__title Блок «Обо мне»
			button.add-btn.add-btn--small
				.add-btn__image
				p Добавить группу
		ul.about__blocks
			li.skill-block
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
			li.skill-block(v-for="category in categories" :key="category.id")
				skills-group(
					:category="category"
				)
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    skillsGroup: () => import("./skills-group")
  },
  data: () => ({
    title: ""
  }),
  computed: {
    ...mapState("categories", {
      categories: state => state.categories
    })
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions("categories", ["addCategory", "fetchCategories"]),
    async addNewCategory() {
      try {
        await this.addCategory(this.title);
      } catch (error) {
        console.warn(error.message);
      }
    }
  }
};
</script>