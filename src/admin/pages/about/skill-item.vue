<template lang="pug">
	ul.skill__list
		li.skill-item(v-if="editmode === false")
			.skill-item__name
				p.skill-item__input {{skill.title}}
			.skill-item__percent
				.skill-item__percent-number
					p.skill-item__input {{skill.percent}}
				.skill-item__percent-sign
					p %
			.skill-item__controls
				button.edit-btn(type="button" @click="editmode = true")
					.edit-btn__icon
				button.delete-btn(type="button" @click="removeExistedSkill")
					.delete-btn__icon

		li.skill-item(v-else)
			.skill-item__name
				input.skill-item__input(type="text" placeholder="Title" v-model="editedSkill.title")
			.skill-item__percent
				.skill-item__percent-number
					input.skill-item__input(type="number" placeholder="100" v-model="editedSkill.percent")
				.skill-item__percent-sign
					p %
			.skill-item__controls
				button(type="button" @click="editExistedSkill")
					p Сохранить
				button(type="button" @click="editmode = false" )
					p Отмена
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      editmode: false,
      editedSkill: { ...this.skill }
    };
  },
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async removeExistedSkill() {
      try {
        await this.removeSkill(this.skill);
      } catch (error) {
        console.warn(error.message);
      }
    },
    async editExistedSkill() {
      try {
        await this.editSkill(this.editedSkill);
      } catch (error) {
      } finally {
        this.editmode = false;
      }
    }
  }
};
</script>