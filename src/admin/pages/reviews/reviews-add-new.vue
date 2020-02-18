<template lang="pug">
	.edit-field
		.edit-field__intro
			h3.review-form__title Новый отзыв
		.edit-field__form
			form.review-form(@submit.prevent="addReviewCard(newReview)" @reset.prevent="hideAddingCard")
				.review-form__container
					.review-form__column
						.review-form__image
							.add-image
								.add-image__icon(:style="renderedBackground" :class="{ hidden: renderedPhoto.length }")
								input.add-image__input(type="file" name="reviews-image" id="reviews-image" @change="addPhoto")
								label.add-image__label(for="reviews-image") Добавить фото
								tooltip-input(:errorText="validation.firstError('newReview.photo')")
					.review-form__column
						.review-form-row
							.review-form-row__block
								label.form__label(for="author-name") Имя автора
								input.form__input(type="text" name="name" id="author-name" placeholder="Ковальчук Дмитрий" v-model="newReview.author")
								tooltip-input(:errorText="validation.firstError('newReview.author')")
							.review-form-row__block
								label.form__label(for="author-desc") Титул автора
								input.form__input(type="text" name="desc" id="author-desc" placeholder="Основатель LoftSchool" v-model="newReview.occ")
								tooltip-input(:errorText="validation.firstError('newReview.occ')")
						.review-form-row
							.review-form-row__block.review-form-row__block--textarea
								label.form__label.form__label--textarea(for="review-text") Описание
								textarea.form__input.form__input--textarea(name="text" id="review-text" v-model="newReview.text" placeholder="Текст отзыва") 
								tooltip-input(:errorText="validation.firstError('newReview.text')")
						.review-form-row.review-form-row--btns
							button.cancel-btn(type="reset") Отмена
							button.form-btn(type="submit") Сохранить
</template>

<style lang="postcss" src="./reviews.pcss">
</style>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import simpleVueValidator from "simple-vue-validator";
const { Validator } = simpleVueValidator;
export default {
  mixins: [simpleVueValidator.mixin],
  props: {
    review: Object
  },
  components: {
    tooltipInput: () => import("../../components/tooltip-input/tooltip-input")
  },
  data() {
    return {
      renderedPhoto: "",
      newReview: { ...this.review }
    };
  },
  validators: {
    "newReview.author": function(value) {
      return Validator.value(value).required("Добавьте имя");
    },
    "newReview.occ": function(value) {
      return Validator.value(value).required("Добавьте титул");
    },
    "newReview.text": function(value) {
      return Validator.value(value).required("Заполните отзыв");
    },
    "newReview.photo": function(value) {
      return Validator.value(value).required("Добавьте фото");
    }
  },
  methods: {
    ...mapActions("reviews", ["addReview", "updateReview"]),
    ...mapActions("tooltip", ["showTooltip"]),
    hideAddingCard() {
      this.$emit("hideAddingCard");
    },

    addPhoto(e) {
      this.newReview.photo = e.target.files[0];
      const reader = new FileReader();

      try {
        reader.readAsDataURL(this.newReview.photo);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };
      } catch (error) {}
    },

    async addReviewCard(payload) {
      if (await this.$validate()) {
        try {
          const isChanged = Object.keys(this.newReview).some(key => {
            return this.newReview[key] !== this.review[key];
          });

          if (isChanged) {
            payload.id
              ? await this.updateReview(payload)
              : await this.addReview(payload);
          }

          this.showTooltip({
            type: "success",
            message: "Отзыв успешно добавлен"
          });
        } catch ({ message }) {
          this.showTooltip({ type: "error", message });
        } finally {
          this.$emit("hideAddingCard");
        }
      }
    }
  },
  computed: {
    ...mapGetters("reviews", ["getReviews"]),
    renderedBackground() {
      return this.renderedPhoto
        ? `background-image: url(${this.renderedPhoto});`
        : "";
    }
  },
  created() {
    this.newReview = { ...this.review };
    if (this.review.photo) {
      this.renderedPhoto =
        "https://webdev-api.loftschool.com/" + this.review.photo;
    }
  },
  watch: {
    review() {
      console.log("watch");
      this.newReview = { ...this.review };
      this.renderedPhoto =
        "https://webdev-api.loftschool.com/" + this.review.photo;
    }
  }
};
</script>