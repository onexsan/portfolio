<template lang="pug">
	ul.project-form__tags
		li.project-tags__item(v-for="(tag, index) in tags" :key="tag")
			p {{tag}}
			button.project-tags__icon(v-if="tagButton" type="button" @click="delTag(index)")
			
</template>

<style lang="postcss" src="./projects.pcss">
</style>

<script>
export default {
  props: ["techs", "tagButton"],
  data() {
    return {
      tags: Object
    };
  },
  methods: {
    delTag(index) {
      this.tags.splice(index, 1);
      this.$emit("updateTag", this.tags.join(","));
    }
  },
  created() {
    if (this.techs.length > 0) {
      this.tags = this.techs.split(",");
    }
  },
  watch: {
    techs() {
      this.tags = this.techs.split(",");
    }
  }
};
</script>