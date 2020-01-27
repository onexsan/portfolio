import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';

new Vue({
	el: "#reviews-component",
	template: "#reviews-widget",
	components: {
		Carousel,
		Slide
	}

});

new Vue({
	el: '.reviews__container',
	components: {
		ReviewsCarousel
	},
	methods: {
		prev() {
			document.querySelector('.VueCarousel-navigation-prev').click();
			console.log("click");
		},
		next() {
			document.querySelector('.VueCarousel-navigation-next').click()
			console.log("click");
		}
	}
});