<template lang="pug" src="./projects.pug">

</template>

<style lang="postcss" src="./projects.pcss">
</style>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    projectsItem: () => import("./projects-item"),
    projectsAddNew: () => import("./projects-add-new")
  },
  data: () => ({
    showAddingCard: false,
    work: {
      title: "",
      link: "",
      description: "",
      techs: "",
      photo: ""
    }
  }),
  methods: {
    ...mapActions("works", ["loadWorks"]),

    hideAddingCard() {
      this.showAddingCard = false;
      this.work = {
        ...{
          title: "",
          link: "",
          description: "",
          techs: "",
          photo: ""
        }
      };
    },

    editWork(payload) {
      this.work = payload;
      this.showAddingCard = true;
    }
  },
  computed: {
    ...mapGetters("works", ["getWorks"]),
    ...mapState("user", {
      userID: state => state.user.id
    })
  },
  created() {
    this.loadWorks(this.userID);
  }
};
</script>