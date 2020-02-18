<template lang="pug">
	.edit-field
		.edit-field__intro
			h3.project-form__title Редактирование работы
		.edit-field__form
			form.project-form(@reset.prevent="hideAddingCard" @submit.prevent="addWorkCard(newWork)")
				.project-form__container
					.project-form__column
						input.add-image__input#project-image(type="file" @change="addPhoto")
						.project-form__block(v-if="renderedPhoto")
							.rendered-image__wrapper
								.rendered-image(:style="renderedBackground")
								label.rendered-image__label(for="project-image") Изменить превью
						.project-form__add-image(v-else)
							.add-image__desc
								p Щелкните для загрузки изображения
								label(for="project-image").form-btn Загрузить
								tooltip-input(:errorText="validation.firstError('newWork.photo')")
					.project-form__column
						.project-form-row
							label.form__label(for="project-title") Название
							input.form__input(type="text" name="title" id="project-title" v-model="newWork.title" placeholder="Название проекта")
							tooltip-input(:errorText="validation.firstError('newWork.title')")
						.project-form-row
							label.form__label(for="project-link") Ссылка
							input.form__input(type="text" name="link" id="project-link" v-model="newWork.link" placeholder="Ссылка на проект")
							tooltip-input(:errorText="validation.firstError('newWork.link')")
						.project-form-row.project-form-row--textarea
							label.form__label.form__label--textarea(for="project-desc") Описание
							textarea.form__input.form__input--textarea(name="desc" id="project-desc" v-model="newWork.description" placeholder="Описание проекта")
							tooltip-input(:errorText="validation.firstError('newWork.description')")
						.project-form-row
							.form-tags__wrapper
									label.form__label(for="project-tags") Добавление тега
									input.form__input(type="text" name="tags" id="project-tags" v-model="newWork.techs" placeholder="jQuery, Vue.js, HTML5")
									tooltip-input(:errorText="validation.firstError('newWork.techs')")
									projects-tags(:techs="newWork.techs" :tagButton="true" @updateTag="updateTag")
						.project-form-row.project-form-row--btns
							button.cancel-btn(type="reset") Отмена
							button.form-btn(type="submit") Сохранить
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import simpleVueValidator from "simple-vue-validator";
const { Validator } = simpleVueValidator;
export default {
  mixins: [simpleVueValidator.mixin],
  components: {
    projectsTags: () => import("./projects-tags"),
    tooltipInput: () => import("../../components/tooltip-input/tooltip-input")
  },
  props: {
    work: Object
  },
  data() {
    return {
      renderedPhoto: "",
      newWork: { ...this.work }
    };
  },
  validators: {
    "newWork.title": function(value) {
      return Validator.value(value).required("Заполните название");
    },
    "newWork.link": function(value) {
      return Validator.value(value).required("Добавьте ссылку");
    },
    "newWork.description": function(value) {
      return Validator.value(value).required("Заполните описание");
    },
    "newWork.techs": function(value) {
      return Validator.value(value).required("Добавьте теги");
    },
    "newWork.photo": function(value) {
      return Validator.value(value).required("Добавьте фото");
    }
  },
  methods: {
    ...mapActions("works", ["addWork", "updateWork"]),
    ...mapActions("tooltip", ["showTooltip"]),
    hideAddingCard() {
      this.$emit("hideAddingCard");
    },
    addPhoto(e) {
      this.newWork.photo = e.target.files[0];
      const reader = new FileReader();

      try {
        reader.readAsDataURL(this.newWork.photo);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };
      } catch (error) {}
    },
    async addWorkCard() {
      if (await this.$validate()) {
        try {
          const isChanged = Object.keys(this.newWork).some(key => {
            return this.newWork[key] !== this.work[key];
          });

          if (isChanged) {
            this.newWork.id
              ? await this.updateWork(this.newWork)
              : await this.addWork(this.newWork);
          }
          this.showTooltip({
            type: "success",
            message: "Работа успешно добавлена"
          });
        } catch ({ message }) {
          this.showTooltip({ type: "error", message });
        } finally {
          this.$emit("hideAddingCard");
        }
      }
    },
    updateTag(tags) {
      this.newWork.techs = tags;
    }
  },
  created() {
    this.newWork = { ...this.work };
    if (this.work.photo) {
      this.renderedPhoto =
        "https://webdev-api.loftschool.com/" + this.work.photo;
    }
  },
  computed: {
    ...mapGetters("works", ["getWorks"]),
    renderedBackground() {
      return this.renderedPhoto
        ? `background-image: url(${this.renderedPhoto});`
        : "";
    }
  },
  watch: {
    work() {
      this.newWork = { ...this.work };
      this.renderedPhoto =
        "https://webdev-api.loftschool.com/" + this.work.photo;
    }
  }
};
</script>

<style lang="postcss" src="./projects.pcss">
</style>