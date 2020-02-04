import Vue from "vue";

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
	props: ["currentWork"],
	computed: {
		tagsArray() {
			return this.currentWork.skills.split(', ');
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
		makeArrWithRequiredImages(data) {
			return data.map(item => {
				const requiredPic = require(`../images/content/${item.photo}`);
				item.photo = requiredPic;

				return item;
			})
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
		const data = require("../data/projects.json");
		this.works = this.makeArrWithRequiredImages(data);
	},
	mounted() {
		this.disableButtons(this.currentIndex);
	}
});