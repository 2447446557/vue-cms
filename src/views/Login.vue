<template>
	<div class="bg">
		<el-card class="login-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class='rform demo-ruleForm'>
				<el-form-item label="账户" prop='username'>
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder='请输入账户名'></el-input>
				</el-form-item>
				<el-form-item label="密码" prop='password'>
					<el-input show-password prefix-icon="el-icon-key" v-model="ruleForm.password" placeholder='请输入密码' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
				</el-form-item>
			</el-form>
			<div class="action-box">
				<div>
					<router-link to='/register'>注册</router-link>
				</div>
				<div>忘记密码</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 12 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						min: 3,
						max: 12,
						message: '长度在 3 到 12 个字符',
						trigger: 'blur'
					}],
				},
			}
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					if (valid) {
						// 校验通过
						let { status, msg, data } = await Admin.login({ ...this.ruleForm });
						if (status) {
							// 储存Token、uid、role
							sessionStorage.token = data.token;
							sessionStorage.id = data.id;
							sessionStorage.role = data.role;
							// 成功
							// this.$message.success(msg);
							// 是否有redirect参数？
							let { redirect } = this.$route.query;
							if (redirect) {
								this.$router.replace(redirect);
							} else {
								// 默认跳转路由
								this.$router.replace('/goods/list');
							}
						} else {
							// 失败
							// this.$message.error(msg);
						}
					}
				})

			},
		}
	}
</script>

<style scoped="scoped">
	.bg {
		background: url(./img/login-bg.jpg);
		background-size: cover;
		height: 100vh;
	}

	.action-box {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}

	.login-card {
		background-color: white;
		border-radius: 3px;
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
