<template>
	<div class="bg">
		<el-card class="register-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class='rform demo-ruleForm'>
				<el-form-item label="账户" prop='username'>
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder='请输入账户名'></el-input>
				</el-form-item>
				<el-form-item label="密码" prop='password'>
					<el-input show-password v-model="ruleForm.password" prefix-icon="el-icon-key" placeholder='请输入密码' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input show-password v-model="ruleForm.checkPass" prefix-icon="el-icon-key" placeholder='请再次输入密码'></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname" prefix-icon="el-icon-user" placeholder='请输入姓名'></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input type="primary" v-model="ruleForm.tel" prefix-icon="el-icon-user" placeholder='请输入手机号'></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox label="同意本站用户协议" name="type"></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleRegister('ruleForm')">注册</el-button>
				</el-form-item>
			</el-form>
			<div class="action-box">
				<div>
					<router-link to='/login'>登录</router-link>
				</div>
				<div>忘记密码</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index'
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					sex: '女',
					tel: ''
				},
				rules: {
					username: [{
							required: true,
							type: 'string',
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						type: 'string',
						message: '请输入密码',
						trigger: 'blur'
					}, {
						pattern: /^\d{3,}$/,

						message: '密码至少3位数字',
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					fullname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, {
						min: 2,
						max: 8,
						message: '长度在 2 到 8 个字符',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}, {
						min: 11,
						max: 11,
						message: '长度为11个字符',
						trigger: 'blur'
					}],
				},
			}

		},
		methods: {
			handleRegister(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					if (valid) {
						// 校验通过
						let { status, msg, data} = await Admin.register({ ...this.ruleForm });
						if (status) {
							// 储存Token、uid、role
							sessionStorage.token = data.token;
							sessionStorage.uid = data.uid;
							sessionStorage.role = data.role;
							// 成功
							// this.$message.success(msg);
						} else {
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
		background: url(img/login-bg.jpg) no-repeat;
		background-size: cover;
		height: 100vh;
	}

	.action-box {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}

	.register-card {
		background-color: white;
		border-radius: 3px;
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
