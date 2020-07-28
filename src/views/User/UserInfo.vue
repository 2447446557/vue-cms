<template>
	<div class="box">
		<div class="register">账户资料</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class='rform'>
			<el-form-item label="账户">
				<el-input v-model="ruleForm.username" disabled='disabled'></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop='fullname'>
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop='sex'>
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop='tel'>
				<el-input type="primary" v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="权限" prop='role_name'>
				<el-select v-model="ruleForm.role_name">

				</el-select>
			</el-form-item>
			<el-form-item label="头像">
				<upload @remove="ruleForm.avatar = ''" @success="transmission($event)" :url="ruleForm.avatar" uploadAddress="/api/upload/user"></upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='handleUpdateNode'>修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Upload from '@/components/Upload.vue';
	import { User } from '@/api/index';
	export default {
		components: { Upload },
		data() {
			return {
				ruleForm: {
					id: '',
					username: '',
					fullname: '',
					email: '',
					sex: '男',
					avatar: '',
					tel: '',
					role_name: '',

				},
				imageUrl: '',
				rules: {
					fullname: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 12,
						message: '长度在 6 到 12 个字符',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}, {
						min: 10,
						max: 16,
						message: '输入邮箱格式错误',
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
		created() {
			this.openEditModal();
		},
		methods: {
			// 获取id 
			async openEditModal() {
				let id = sessionStorage.id;
				let { status, data } = await User.load({ id });
				this.ruleForm = { ...data };
			},
			// 编辑节点
			async handleUpdateNode() {
				// 1.表单验证
				// 2，ajax
				let { status, msg } = await User.update({ ...this.ruleForm });
				if (status) {
					this.$message.success(msg);
					this.node.data = this.ruleForm;
				}
			},
			// 头像上传成功
			transmission({ status, msg, src }) { // 直接 解构 传回来的数据
				this.ruleForm.avatar = src;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
		}
	}
</script>

<style>
	.register {
		height: 60px;
		line-height: 60px;
		padding: 0 20px;
		border-bottom: 1px solid #999999;
	}

	.rform {
		padding-top: 30px;
		padding-left: 20px;
		padding-right: 20px;
	}


	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
