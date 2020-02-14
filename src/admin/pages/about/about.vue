<template lang="pug">
section.section.about
	.container.about__container
		pre 
		.about__intro
			h2.title.about__title Блок «Обо мне»
			button.add-btn.add-btn--small(type="button" @click="showAddingCard = true")
				.add-btn__image
				p Добавить группу
		ul.about__blocks
			li.skill-block(v-if="showAddingCard")
				.skill-block__content
					.skill-form
						.skill-form__container
							form.skill-form__row(@submit.prevent="addNewCategory")
								input.skill-form__input.skill-form__input--group(type="text" v-model="title" placeholder="Название новой группы" name="skill-group")
								.skill-group__btns
									button.accept-btn(type="submit" name="accept-btn")
										.accept-btn__icon
									button.discard-btn(name="discard-btn")
										.discard-btn__icon
							.skill-form__content
								skill-item(
									v-for="skill in category.skills"
									:key="skill.id"
									:skill="skill"
								)
							.skill-form__row
								skill-item-add(:category="category")
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
    skillsGroup: () => import("./skills-group"),
    skillItem: () => import("./skill-item"),
    skillItemAdd: () => import("./skill-item-add")
  },
  data: () => ({
    showAddingCard: false,
    title: "",
    skill: {
      title: "",
      percent: 0,
      category: 0
    }
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
    },
    hideCard() {
      this.showAddingCard = false;
    }
  }
};
</script>