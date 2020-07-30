import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
Vue.use(VueRouter)
import Layout from '@/components/Layout.vue';
const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
	},
	{
		path: '/goods/',
		name: 'Goods',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'category',
				name: 'GoodsCategory',
				component: () => import('@/views/Goods/GoodsCategory.vue'),
			},
			{
				path: 'release',
				name: 'GoodsRelease',
				component: () => import('@/views/Goods/GoodsRelease.vue'),
			},
			{
				path: 'list',
				name: 'GoodsList',
				component: () => import('@/views/Goods/GoodsList.vue'),
			},
			{
				path: 'edit/:id',
				name: 'GoodsEdit',
				component: () => import('@/views/Goods/GoodsEdit.vue'),
				props:true
			}
		]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'info',
				name: 'UserInfo',
				component: () => import('@/views/User/UserInfo.vue')
			},
			{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/UserList.vue')
			}
		]
	},
	{
		path: '/order/',
		name: 'Order',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'OrderList',
			component: () => import('@/views/Order/OrderList.vue')
		}]
	},
	{
		path: '/auth/',
		name: 'Auth',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'role',
				name: 'AuthRole',
				component: () => import('@/views/Auth/AuthRole.vue')
			},
			{
				path: 'menu',
				name: 'AuthMenu',
				component: () => import('@/views/Auth/AuthMenu.vue')
			}
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
