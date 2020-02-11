export default [
	{
		path: "/",
		component: () => import("../pages/about/about.vue"),
		meta: {
			title: "Блок «Обо мне»"
		}
	},
	{
		path: "/works",
		component: () => import("../pages/projects/projects.vue"),
		meta: {
			title: "Блок «Работы»"
		}
	},
	{
		path: "/reviews",
		component: () => import("../pages/reviews/reviews.vue"),
		meta: {
			title: "Блок «Отзывы»"
		}
	},
	{
		path: "/login",
		component: () => import("../pages/auth/auth.vue"),
		meta: {
			public: true
		}
	}
];