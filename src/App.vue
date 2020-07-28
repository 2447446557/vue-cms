<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: 'app',
	}
</script>
<style lang="less">
	body {
		margin: 0;
		padding: 0;
	}

	body .el-header {
		padding: 0 0px;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	a {
		text-decoration: none;
		color: #666;
	}

	nav {
		padding: 30px;
	}

	nav a {
		margin: 0 30px;
	}

	nav a.current {
		color: orange;
		font-weight: bold;
	}

	.header {
		padding: 18px 20px;
		border-bottom: 1px solid #ebeef5;
		box-sizing: border-box;
		
	}
	.box {
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		margin: 0px;
	}
	.el-container {
		    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
	}
</style>
