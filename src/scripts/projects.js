import Vue from "vue";
import EventBus from "./event.js";
import xhr from './xhrRequests';

const thumbs = {
	template: "#projects-thumbs",
	props: ["works", "currentWork"]
}

const btns = {
	template: "#projects-btns",
	props: ["works", "currentWork"]
}

const tags = {
	template: "#projects-tags",
	props: ["tags"]
}

const display = {
	template: "#projects-display",
	components: {
		btns, thumbs
	},
	props: ["works", "currentWork", "currentIndex"]

}

const info = {
	template: "#projects-info",
	components: {
		tags
	},
	props: ["currentWork", "works"],
	computed: {
		tagsArray() {
			return this.currentWork.techs.split(', ');
		}
	}
}

new Vue({
	el: "#projects-component",
	template: "#projects-widget",
	components: {
		display, info
	},
	data() {
		return {
			works: [],
			currentIndex: 0
		}
	},
	computed: {
		currentWork() {
			return this.works[this.currentIndex]
		}
	},
	methods: {
		// makeArrWithRequiredImages(data) {
		// 	return data.map(item => {
		// 		const requiredPic = require(`../images/content/${item.photo}`);
		// 		item.photo = requiredPic;

		// 		return item;
		// 	})
		// },
		workFunc(work, index) {
			work.photo = 'https://webdev-api.loftschool.com/' + work.photo;
			work.techs = work.techs.split(',');
			work.index = index;

			return work;
		},
		handleSlide(direction) {
			switch (direction) {
				case "next":
					this.currentIndex++;
					break;
				case "prev":
					this.currentIndex--;
					break;
			}
		},
		disableButtons(value) {
			const worksAmount = this.works.length - 1;
			const buttonNext = document.querySelector(".slider-btn__item--next");
			const buttonPrev = document.querySelector(".slider-btn__item--prev");
			console.log(value, worksAmount);


			if (value === 0) {
				buttonPrev.setAttribute("disabled", "disabled");
			} else {
				buttonPrev.removeAttribute("disabled");
			}

			if (value === worksAmount) {
				buttonNext.setAttribute("disabled", "disabled");
			} else {
				buttonNext.removeAttribute("disabled");
			}
		}

	},
	watch: {
		currentIndex(value) {
			this.disableButtons(value)
		}
	},
	created() {
		xhr('get', 'works/277')
			.then(works => works.map((work, index) => this.workFunc(work, index)))
			.then(works => this.works = works)
			.then(() => {
				EventBus.$emit('work', this.works[this.activeWork]);
			});

		// this.works = this.makeArrWithRequiredImages(data);
	},
	mounted() {
		this.disableButtons(this.currentIndex);
	}
});