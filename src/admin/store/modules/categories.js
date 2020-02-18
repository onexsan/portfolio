import showErrorTooltip from '../../helpers/showErrorTooltip';

const replaceAllKeys = (category, payload) => {
	if (category.id === payload.category.id) {
		Object.keys(category).map(key => {
			if (payload.category[key]) {
				return category[key] = payload.category[key];
			}
		});
	}

	return category;
};

export default {
	namespaced: true,
	state: {
		categories: []
	},
	mutations: {
		SET_CATEGORIES(state, payload) {
			state.categories = payload;
		},
		ADD_CATEGORY: (state, category) => {
			category.skills = [];
			state.categories.unshift(category)
		},
		DELETE_CATEGORY(state, payload) {
			state.categories = state.categories.filter(category => {
				return category.id !== payload;
			});
		},
		UPDATE_CATEGORY(state, payload) {
			state.categories = state.categories.map(category => replaceAllKeys(category, payload));
		},
		ADD_SKILL: (state, newSkill) => {
			state.categories = state.categories.map(category => {

				if (category.id === newSkill.category) {
					category.skills.push(newSkill);

				}
				return category;
			});
		},
		REMOVE_SKILL: (state, deletedSkill) => {
			const removeSkillInCategory = category => {
				category.skills = category.skills.filter(
					skill => skill.id !== deletedSkill.id
				);
			};

			const findCategory = category => {
				if (category.id === deletedSkill.category) {
					removeSkillInCategory(category);
				}

				return category;
			};

			state.categories = state.categories.map(findCategory);
		},

		EDIT_SKILL: (state, editedSkill) => {
			const editSkillInCategory = category => {
				category.skills = category.skills.map(
					skill => {
						return skill.id === editedSkill.id ? editedSkill : skill;
					}
				);
			};

			const findCategory = category => {
				if (category.id === editedSkill.category) {
					editSkillInCategory(category);
				}

				return category;
			};

			state.categories = state.categories.map(findCategory);
		},
	},
	actions: {

		async loadCategories(context, payload) {
			try {
				const { data } = await this.$axios.get(`/categories/${payload}`);
				context.commit('SET_CATEGORIES', data);
			} catch (error) {
				throw new Error(error.response.data.error || error.response.data.message);
			}
		},

		async addCategory({ commit }, title) {
			try {
				const { data } = await this.$axios.post("/categories", { title });
				commit("ADD_CATEGORY", data);
			} catch (error) {
				showErrorTooltip(context, error);
			}
		},

		async deleteCategory(context, payload) {
			try {
				const { data } = this.$axios.delete(`/categories/${payload}`);
				context.commit('DELETE_CATEGORY', payload);

			} catch (error) {
				showErrorTooltip(context, error);
			}
		},

		async updateCategory(context, payload) {
			try {
				const { data } = await this.$axios.post(`/categories/${payload.id}`, { title: payload.title });
				context.commit('UPDATE_CATEGORY', data);
			} catch (error) {
				showErrorTooltip(context, error)
			}
		},


	}
}


