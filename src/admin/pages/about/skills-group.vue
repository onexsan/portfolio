<template lang="pug">
	.skill-block__content
		.skill-form
			.skill-form__container
				.skill-form__row
					skill-group-title(:category="category")
				.skill-form__content
					.skill-item__wrapper(v-for="skill in category.skills" :key="skill.id")
						skill-item(
							:skill="skill"
						)
				form.skill-form__row(@submit.prevent="addNewSkill")
					.skill-form__group
						input.skill-form__input.skill-form__input--skill(type="text" placeholder="Новый навык" name="skill-name" v-model="skill.title")
						tooltip-input(:errorText="validation.firstError('skill.title')")
					.skill-form__group
						input.skill-form__input.skill-form__input--percent(type="number" placeholder="100%" name="skill-percent" v-model="skill.percent")
						tooltip-input(:errorText="validation.firstError('skill.percent')")
					button.add-btn.add-btn--big(type="submit" name="add-btn")
						.add-btn__image
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
    skillGroupTitle: () => import("./skill-group-title"),
    skillItem: () => import("./skill-item"),
    tooltipInput: () => import("../../components/tooltip-input/tooltip-input")
  },
  data() {
    return {
      skill: {
        title: "",
        percent: 0,
        category: this.category.id
      }
    };
  },
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Заполните название");
    },
    "skill.percent": value => {
      return Validator.value(value)
        .between(0, 100, "Некорректное значение для процентов")
        .required("Поле не может быть пустым");
    }
  },
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    ...mapActions("categories", ["addCategory", "loadCategories"]),
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      if (await this.$validate()) {
        try {
          if (await this.$validate()) {
            this.skill.category = this.category.id;
            await this.addSkill(this.skill);
            this.skill.title = "";
            this.skill.percent = 0;
            this.validation.reset();
          }
        } catch (error) {
          console.warn(error.message);
        }
      }
    }
  }
};
</script>