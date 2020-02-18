<template lang="pug">
	form.title-wrapper(@submit="changeCategoryTitle" @keyup.esc="editMode = false")
		.card__column(v-if="editMode")
			input.skill-form__input.skill-form__input--group(type="text" placeholder="Название новой группы" v-model="newTitle")
		.card__column(v-else)
			h3.skill-form__title {{category.category}}

		.card__column
			.skill-group__btns(v-if="editMode")
				button.accept-btn(type="submit" name="accept-btn")
					.accept-btn__icon
				button.discard-btn(type='button' @click="deleteSkillGroup")
					.discard-btn__icon
			.skill-group__btns(v-else)
				button.edit-btn(type='button' @click="editMode = true")
					.edit-btn__icon
</template>

<style lang="postcss" src="./about.pcss">
</style>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      editMode: this.category.showAddingCard,
      newTitle: ""
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
    ...mapActions("categories", ["deleteCategory", "updateCategory"]),
    ...mapActions("tooltip", ["showTooltip"]),
    async changeCategoryTitle() {
      if (this.newTitle === this.category.category) {
        return (this.editMode = false);
      }

      if (!this.category.id) {
        await this.addCategory(this.newTitle);
        return this.$emit("hideCard");
      }

      this.editMode = false;
      await this.updateCategory({ title: this.newTitle, id: this.category.id });
    },
    async deleteSkillGroup() {
      try {
        if (!this.category.id) {
          return this.$emit("hideCard");
        }
        this.editMode = false;
        await this.deleteCategory(this.category.id);
        this.showTooltip({
          type: "success",
          message: "Категория успешно удалена"
        });
      } catch ({ message }) {
        this.showTooltip({ type: "error", message });
      } finally {
      }
    }
  },
  watch: {
    editMode() {
      if (this.editMode) {
        this.newTitle = this.category.category || "";
      }
    }
  }
};
</script>



		