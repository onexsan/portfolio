export default {
	namespaced: true,
	state: {
		categories: []
	},
	mutations: {
	},
	actions: {
		async addCategory(store, title) {
			try {
				const response = await this.$axios.post("/categories", { title });
			} catch (error) {
				console.warn(error.message)
			};

		},

		// где единица там дб user id

		async fetchCategories(store) {
			try {
				const response = await this.$axios.get("/categories/1")
			} catch (error) { }
		}
	}
};
