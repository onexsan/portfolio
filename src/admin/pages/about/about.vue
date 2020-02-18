<template lang="pug">
section.section.about
	.container.about__container
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
								tooltip-input(:errorText="validation.firstError('title')")
								.skill-group__btns
									button.accept-btn(type="submit" name="accept-btn")
										.accept-btn__icon
									button.discard-btn(name="discard-btn")
										.discard-btn__icon
							.skill-form__content
								
							.skill-form__row
								input.skill-form__input.skill-form__input--skill(type="text" placeholder="Новый навык" name="skill-name" disabled)
								input.skill-form__input.skill-form__input--percent(type="number" placeholder="100%" name="skill-percent" disabled)
								button.add-btn.add-btn--big.add-btn--big.add-btn--disabled(type="submit" name="add-btn")
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
import SimpleVueValidator from "simple-vue-validator";

const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  components: {
    skillsGroup: () => import("./skills-group"),
    skillItem: () => import("./skill-item"),
    tooltipInput: () => import("../../components/tooltip-input/tooltip-input")
  },
  data: () => ({
    showAddingCard: false,
    title: ""
  }),
  validators: {
    title: value => {
      return Validator.value(value).required("Заполните название");
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.categories
    }),
    ...mapState("user", {
      userID: state => state.user.id
    })
  },
  created() {
    this.loadCategories(this.userID);
  },
  methods: {
    ...mapActions("categories", ["addCategory", "loadCategories"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async addNewCategory() {
      if (await this.$validate()) {
        try {
          await this.addCategory(this.title);
          this.showTooltip({
            type: "success",
            message: "Категория успешно добавлена"
          });
        } catch ({ message }) {
          this.showTooltip({ type: "error", message });
        } finally {
          this.showAddingCard = false;
        }
      }
    },
    hideCard() {
      this.showAddingCard = false;
    }
  }
};
</script>