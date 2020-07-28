<template>
	<div class="box">
		<div class="header">用户列表</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column width="100" prop='id' label='#'>
			</el-table-column>
			<el-table-column label="头像" width="130">
				<template scope="scope">
					<img :src="scope.row.avatar" height="80" width="80" class="head_pic" />
				</template>
			</el-table-column>
			<el-table-column label="账号" width="130" class='el-icon-d-caret' prop='username'>
			</el-table-column>
			<el-table-column label="姓名" width="130" class='el-icon-d-caret' prop='fullname'>
			</el-table-column>
			<el-table-column label="性别" width="80" class='el-icon-d-caret' prop='sex'>
			</el-table-column>
			<el-table-column label="手机" width="130" class='el-icon-d-caret' prop='tel'>
			</el-table-column>
			<el-table-column label="角色" width="130" class='el-icon-d-caret'>
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.role_name }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="上次登录" width="180" class='el-icon-d-caret' prop='login_time'>
			</el-table-column>
			<el-table-column label="登录次数" width="130" class='el-icon-d-caret' prop='login_count'>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain @click="openEditModal(scope.row.id)"><i class="el-icon-edit"></i></el-button>
					<el-button size="mini" type="danger" plain @click='delModal(scope.row.id,scope.$index)'><i class="el-icon-delete"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="修改信息" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules="rules" ref="editForm">
				<el-form-item label="姓名" label-width="120px" prop='fullname'>
					<el-input v-model="editForm.fullname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop='sex'>
					<el-radio-group v-model="editForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" label-width="120px" prop='tel'>
					<el-input v-model="editForm.tel" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="权限" prop='role_name'>
					<el-select v-model="editForm.role_name" placehold='请选择账户'>
						<el-option label="超级管理员"></el-option>
						<el-option label="管理员"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="头像" prop='avatar'>
					<upload @remove="editForm.avatar = ''" @success='transmission($event)' :url="editForm.avatar" uploadAddress="/api/upload/user"></upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Upload from '@/components/Upload.vue';
	import { User } from '@/api/index';
	export default {
		components: { Upload },
		data() {
			return {
				tableData: [],
				editForm: {
					fullname: '',
					sex: '',
					tel: '',
					role_name: '',
					avatar: ''
				},
				editModalShow: false,
				rules: {
					fullname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, {
						min: 4,
						max: 8,
						message: '长度在 4 到 8 个字符',
						trigger: 'blur'
					}],
					tel: [{
						required: true,
						message: '请输入电话',
						trigger: 'blur'
					}, {
						min: 11,
						max: 11,
						message: '长度为11个字符',
						trigger: 'blur'
					}],
				}
			}
		},
		created() {
			//获取列表数据
			this.loadList();
		},
		methods: {
			//加载列表数据
			async loadList() {
				let { status, total, data } = await User.list({ pagesize: 10, pageindex: 1 });
				if (status) {
					this.tableData = data;
				}
			},
			delModal(id, i) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					// 删除角色
					let { status, data } = await User.remove({ id: id });
					if (status) {
						//更新dom
						this.tableData.splice(i, 1);
						this.$message.info('删除成功');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
			// 头像上传成功
			transmission({ status, msg, src }) { // 直接 解构 传回来的数据
				this.editForm.avatar = src;
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
			// 打开编辑Modal
			async openEditModal(id) {
				let { status, data } = await User.load({ id });
				this.editForm = { ...data };
				this.editModalShow = true;
			},

		}
	}
</script>

<style>
	.el-pagination {
		padding: 20px;
	}

	.head_pic {
		border-radius: 50%;
	}

	.el-form-item__label {
		width: 120px;
	}
</style>
