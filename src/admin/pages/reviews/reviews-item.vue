<template lang="pug">
	.block-item__container
		.review__author
			.author__avatar(:style="reviewPic")
			.author__about
				p.author__name {{ review.author }}
				p.author__info {{ review.occ }}
		.review__text
			p {{ review.text }}
		.review__controls
			button.edit-btn(type="button" @click="editReview")
				p Править
				.edit-btn__icon
			button.discard-btn(type="button" @click="deleteThisReview(review.id)")
				p Удалить
				.discard-btn__icon
</template>

<style lang="postcss" src="./reviews.pcss">
</style>

<script>
import { mapActions } from "vuex";

export default {
  name: "reviews-item",
  props: {
    review: Object
  },
  methods: {
    ...mapActions("reviews", ["deleteReview"]),
    ...mapActions("tooltip", ["showTooltip"]),
    deleteThisReview(payload) {
      try {
        this.$emit("hideAddingCard");
        this.deleteReview(payload);
        this.showTooltip({
          type: "success",
          message: "Отзыв успешно удален"
        });
      } catch ({ message }) {
        this.showTooltip({ type: "error", message });
      }
    },
    editReview() {
      this.$emit("editReview", this.review);
    }
  },
  computed: {
    reviewPic() {
      return `background-image: url(https://webdev-api.loftschool.com/${this.review.photo})`;
    }
  }
};
</script>