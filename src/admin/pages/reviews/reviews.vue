<template lang="pug" src="./reviews.pug">

</template>

<style lang="postcss" src="./reviews.pcss">
</style>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    reviewsItem: () => import("./reviews-item"),
    reviewsAddNew: () => import("./reviews-add-new")
  },
  data: () => ({
    showAddingCard: false,
    review: {
      author: "",
      occ: "",
      text: "",
      photo: ""
    }
  }),
  methods: {
    ...mapActions("reviews", ["loadReviews"]),
    editReview(payload) {
      this.review = payload;
      this.showAddingCard = true;
    },
    hideAddingCard() {
      this.showAddingCard = false;
      this.review = {
        ...{
          author: "",
          occ: "",
          text: "",
          photo: ""
        }
      };
    }
  },
  computed: {
    ...mapGetters("reviews", ["getReviews"]),
    ...mapState("user", {
      userID: state => state.user.id
    })
  },
  created() {
    this.loadReviews(this.userID);
  }
};
</script>