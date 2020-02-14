<template lang="pug">
	.skill-block__content
		.skill-form
			.skill-form__container
				.skill-form__row
					skill-group-title(:category="category")
				.skill-form__content
					skill-item(
						v-for="skill in category.skills"
						:key="skill.id"
						:skill="skill"
					)
				form.skill-form__row(@submit.prevent="addNewSkill")
					input.skill-form__input.skill-form__input--skill(type="text" placeholder="Новый навык" name="skill-name" v-model="skill.title")
					input.skill-form__input.skill-form__input--percent(type="number" placeholder="100%" name="skill-percent" v-model="skill.percent")
					button.add-btn.add-btn--big(type="submit" name="add-btn")
						.add-btn__image
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    skillGroupTitle: () => import("./skill-group-title"),
    skillItem: () => import("./skill-item")
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
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      try {
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";
      } catch (error) {
        console.warn(error.message);
      }
    }
  }
};
</script>