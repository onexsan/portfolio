import Vue from "vue";

const thumbs = {
	template: "#projects-thumbs"
}

const btns = {
	template: "#projects-btns"
}

const tags = {
	template: "#projects-tags"
}

const display = {
	template: "#projects-display",
	components: {
		btns, thumbs
	},
	props: ["works"]
}

const info = {
	template: "#projects-info",
	components: {
		tags
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
			works: []
		}
	},
	methods: {
		makeArrWithRequiredImages(data) {
			return data.map(item => {
				const requiredPic = require(`../images/content/${item.photo}`);
				item.photo = requiredPic;

				return item;
			})
		}
	},
	created() {
		const data = require("../data/projects.json");
		this.works = this.makeArrWithRequiredImages(data);
	}
});