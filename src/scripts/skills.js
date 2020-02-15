import Vue from "vue";
import axios from "axios";

const $axios = axios.create({
	baseURL: "https://webdev-api.loftschool.com/"
});

const skill = {
	template: "#skill",
	props: {
		skill: Object
	},
	methods: {
		drawColoredCircle() {
			const circle = this.$refs["color-circle"];
			const dashArray = parseInt(
				getComputedStyle(circle).getPropertyValue("stroke-dasharray")
			);
			const percent = (dashArray / 100) * (100 - this.skill.percent);

			circle.style.strokeDashoffset = percent;
		}
	},
	mounted() {
		this.drawColoredCircle();
	}
};

const skillsRow = {
	template: "#skills-row",
	components: {
		skill
	},
	props: {
		skill: Object
	}
};

new Vue({
	el: "#skills-component",
	template: "#skills-widget",
	components: {
		skillsRow
	},
	data() {
		return {
			skills: {}
		};
	},
	async created() {
		const { data } = await $axios.get("/categories/277");
		this.skills = data;
	}
});