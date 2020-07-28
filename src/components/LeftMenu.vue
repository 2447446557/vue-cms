<template>
	<el-menu class="el-menu-vertical-demo" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-s-goods"></i>
				<span>商品管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index='/goods/goodscategory'>商品分类</el-menu-item>
				<el-menu-item index='/goods/goodsrelease'>发布商品</el-menu-item>
				<el-menu-item index='/goods/goodslist'>商品列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-files"></i>
				<span>订单管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index='/order/orderlist'>订单列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-setting"></i>
				<span>账户设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index='/user/userinfo'>账户信息</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index='/user/userlist'>用户列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu> 
		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>权限设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index='/auth/authrole'>用户角色</el-menu-item>
				<el-menu-item index='/auth/authmenu'>菜单权限</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
	</el-col>
	</el-row>
</template>

<script>
	export default {
		methods: {
		}
	}
</script>

<style>
	.el-menu-vertical-demo {
		
	}
</style>
