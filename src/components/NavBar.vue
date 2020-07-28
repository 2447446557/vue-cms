<template>
	<div class="navbar">
		<div class="left">
			<img src="../views/img/logo.png" alt="" height="60px">
			<i class="el-icon-s-fold"></i>
		</div>
		<div>
			<el-dropdown>
				<span class="el-dropdown-link">
					 <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					admin<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.navbar {
		background-color: #31404E;
		height: 60px;
		line-height: 60px;
		width: 100%;
	}
	.navbar>div:first-child {
		float: left;
	}
	.navbar>div:nth-child(2) {
		float: right;
		margin-right: 40px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
	.el-avatar>img {
		width: 28px;
		height: 28px;
	}
	.el-dropdown-link {
		display: flex;
		align-items: center;
	}
	.left {
		display: flex;
		align-items: center;
		margin-left: 40px;
	}
	.el-icon-s-fold {
		color: white;
	}
</style>
