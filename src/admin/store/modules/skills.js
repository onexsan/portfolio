import showErrorTooltip from '../../helpers/showErrorTooltip';

export default {
	namespaced: true,
	actions: {
		async addSkill(context, payload) {
			try {
				const { data } = await this.$axios.post('/skills', payload);
				context.commit('categories/ADD_SKILL', data, { root: true });
			} catch (error) {
				showErrorTooltip(context, error);
			}
		},

		async removeSkill({ commit }, skill) {
			try {
				const { data } = await this.$axios.delete(`/skills/${skill.id}`);
				commit("categories/REMOVE_SKILL", skill, { root: true });
			} catch (error) {
				showErrorTooltip(context, error);
			}
		},

		async editSkill({ commit }, editedSkill) {
			try {
				const {
					data: { skill }
				} = await this.$axios.post(`/skills/${editedSkill.id}`, editedSkill)
				commit("categories/EDIT_SKILL", skill, { root: true });
			} catch (error) {
				showErrorTooltip(context, error);
			}
		},
	}
}


