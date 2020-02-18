<template lang="pug">
	.block-item__container
		.item__visuals
			.item__thumb
				img.project__image(:src="workPhoto(work.photo)" style="object-fit: cover; object-position: center")
			projects-tags(:techs="work.techs")
		.projects__item-content
			.item__info
				h4.item__name {{work.title}}
				.item__desc 
					p {{ work.description }}
				.item__link
					a.project-link(:href="work.link")
						p {{ work.link }}
			.item__controls
				button.edit-btn(type="button" @click="editWork")
					p Править
					.edit-btn__icon
				button.discard-btn(type="button" @click="deleteThisWork(work.id)")
					p Удалить
					.discard-btn__icon
</template>

<style lang="postcss" src="./projects.pcss">
</style>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    projectsTags: () => import("./projects-tags")
  },
  props: {
    work: Object
  },
  methods: {
    ...mapActions("works", ["deleteWork"]),
    ...mapActions("tooltip", ["showTooltip"]),
    workPhoto(photo) {
      return `https://webdev-api.loftschool.com/${photo}`;
    },
    editWork() {
      this.$emit("editWork", this.work);
    },
    deleteThisWork(payload) {
      try {
        this.deleteWork(payload);
        this.showTooltip({
          type: "success",
          message: "Работа успешно удалена"
        });
      } catch ({ message }) {
        this.showTooltip({ type: "error", message });
      }
    }
  }
};
</script>