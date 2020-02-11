
import Header from '../components/header/header.vue';
import Tabs from '../components/tabs/tabs.vue';

export default [
	{
		path: '/',
		components: {
			default: () => import('../pages/about/about.vue'),
			tabs: Tabs,
			header: Header
		}
	},
	{
		path: '/works',
		components: {
			default: () => import('../pages/projects/projects.vue'),
			tabs: Tabs,
			header: Header
		}
	},
	{
		path: '/reviews',
		components: {
			default: () => import('../pages/reviews/reviews.vue'),
			header: Header,
			tabs: Tabs
		}
	},
	{
		path: '/login',
		component: () => import('../pages/auth/auth.vue'),
		meta: {
			public: true
		}
	}
];