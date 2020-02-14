<template lang="pug">
	form.skill-add-wrapper(@submit.prevent="addNewSkill")
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