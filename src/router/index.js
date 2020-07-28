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
				path: 'goodscategory',
				name: 'GoodsCategory',
				component: () => import('@/views/Goods/GoodsCategory.vue'),
			},
			{
				path: 'goodsrelease',
				name: 'GoodsRelease',
				component: () => import('@/views/Goods/GoodsRelease.vue'),
			},
			{
				path: 'goodslist',
				name: 'GoodsList',
				component: () => import('@/views/Goods/GoodsList.vue'),
			},
			{
				path: 'goodsedit/:id',
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
				path: 'userinfo',
				name: 'UserInfo',
				component: () => import('@/views/User/UserInfo.vue')
			},
			{
				path: 'userlist',
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
			path: 'orderlist',
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
				path: 'authrole',
				name: 'AuthRole',
				component: () => import('@/views/Auth/AuthRole.vue')
			},
			{
				path: 'authmenu',
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
