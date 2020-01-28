import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import EventBus from "./event.js";

const ReviewsCarousel = {
	template: "#reviews-widget",
	data() {
		return {
			reviews: [],
			slidesPerPage: 2
		}
	},
	components: {
		Carousel,
		Slide
	},
	methods: {
		pageChange(number) {
			EventBus.$emit('activePage', number);
		},
		pages() {
			if (this.slidesPerPage > 1) {
				return this.reviews.length % 2 === 1
					? (this.reviews.length - 1) / 2
					: this.reviews.length / 2 - 1;
			}

			return this.reviews.length - 1;
		},
		calcSlidesPerPage(self) {
			function calc() {
				self.slidesPerPage = (window.innerWidth <= 700) ? 1 : 2;
			}

			calc();

			window.addEventListener('resize', calc);
		},
		mounted() {
			this.calcSlidesPerPage(this);

			// Запрос к базе за отзывами
			// ...
		},
		watch: {
			slidesPerPage() {
				EventBus.$emit('pages', this.pages());
			}
		}


	}

};

new Vue({
	el: '.reviews__container',
	data: {
		activePage: 0,
		// данное значение меняется в зависимости от кол. элементов в массиве reviews (строка 9)
		// но так как ты не делаешь запрос к базе а выводишь отзывы хардкодно, то и массив всегда пуст
		// зная сколько у нас захардкодено записей указ вручную и кол. страниц
		pages: 1 // страниц 2, но отчет начинается с 0. 0 - это первая страница, 1 - это вторая
	},
	components: {
		ReviewsCarousel
	},
	methods: {
		prev() {
			document.querySelector('.VueCarousel-navigation-prev').click();
		},
		next() {
			document.querySelector('.VueCarousel-navigation-next').click()
		}
	},
	mounted() {
		EventBus.$on('activePage', number => {
			this.activePage = number;
		});

		EventBus.$on('pages', number => {
			this.pages = number;
		});
	}
});