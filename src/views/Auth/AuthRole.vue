<template>
	<div class="box">
		<div class="content_box">
			<div class="title"><span>角色列表</span>
				<el-button type="primary" @click="openInsertModal" plain class='add'>添加角色</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="#" width="150" prop='id'>
				</el-table-column>
				<el-table-column label="分类" width="150">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.name }}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" plain @click='editModal(scope.row.id,scope.$index)'><i class="el-icon-edit"></i></el-button>
						<el-button size="mini" type="danger" plain @click="delModal(scope.row.id,scope.$index)"><i class="el-icon-delete"></i></el-button>
						<el-button size="mini" type="primary" plain @click="loadRights(scope.row.id)"><i class="el-icon-setting"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 权限设置 -->
		<div class="right" v-show="isRightsShow">
			<el-card v-for="item in rightsArrAll" :key="item.id" class="box-card box-card-right">
				<div slot="header" class="clearfix top">
					<span>{{item.name}}</span>
					<el-switch @change="clickParent(item)" v-model="item.checked"></el-switch>
				</div>
				<div v-for="option in item.children" :key="option.id" class="text item">
					<span>{{option.name}}</span>
					<el-switch v-model="option.checked" @change="clickChild(option,item)"></el-switch>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
	import { Role } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
				editForm: {
					id: '',
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}, {
						min: 4,
						max: 12,
						message: '长度在 4 到 12 个字符',
						trigger: 'blur'
					}]
				},
				node: {},
				nodeData: {}, //节点数据
				editModalShow: false,
				rightsArrAll: [], // 权限数组
				rightsId: '',
				roleMenuId:'',
				isRightsShow: false,
			};
		},
		created() {
			this.loadList();

		},
		methods: {
			// 获取权限
			async loadRights(id) {
				this.isRightsShow = true;
				let { status, data } = await Role.rights({ id });
				if (status) {
					this.rightsArrAll = data;
					this.rightsId = id;
				}
			},
			async loadList() {
				let { status, total, data } = await Role.list({ pagesizeL: 10, pageindex: 1 });
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
					let { status } = await Role.remove({ id: id });
					if (status) {
						//更新dom
						this.tableData.splice(i, 1);
						this.$message.info('删除成功');
					}
				}).catch(() => {
					// this.tableData.remove({ }) //...扩展运算符展开
					this.$message.info('取消删除');
				});
			},
			openInsertModal() {
				this.$prompt('请输入添加的角色名称', '添加角色', {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白名称',
					}).then(async ({ value }) => {
						let { status, data } = await Role.add({ name: value });
						if (status) {
							//更新dom
							this.tableData.push({ name: value, ...data }) //...扩展运算符展开
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					});
			},
			editModal(id, index) {

				this.editForm = this.tableData[index];
				console.log(this.tableData[index]);
				this.$prompt('请输入修改的角色名称', '修改角色', {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白名称',
						inputValue: this.editForm.name
					}).then(async ({ value }) => {
						this.editForm.name = value;
						let { status, data } = await Role.edit({ ...this.editForm });
						if (status) {
							//更新dom
							this.tableData[index].name = value;
							this.$message.success('修改成功');
						}
					})
					.catch(() => {
						this.$message.info('取消修改');
					});
			},

		}
	}
</script>

<style lang="less" scoped="scoped">
	.add {
		float: right;
	}
	.box{
		display: flex;
	}
	.content_box {
		width: 42%;
		
	}
	.right {
		width: 55%;
	}
	
	.box-card-right.box-card {
		width: 100%;
		height: auto;
		margin-bottom: 20px;
	
		.top {
			display: flex;
			justify-content: space-between;
		}
	}
	
	.el-form--label-left .el-form-item__label {
		text-align: left;
	}
	
	.item {
		display: flex;
		justify-content: space-between;
	
		span {
			font-size: 14px;
			margin-bottom: 10px;
		}
	}
</style>
