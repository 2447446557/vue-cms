<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load="loadNode" node-key="id" lazy :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button @click.stop="() => deleteNode(node,data)" type="text" icon="el-icon-delete" size="mini">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm" :rules='rules'>
				<el-form-item label="分类名称" label-width="120px" prop='name'>
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop='img'>
					<upload @remove="insertForm.img = ''" @success="transmission($event)" :url="insertForm.img"></upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules='rules'>
				<el-form-item label="分类名称" label-width="120px" prop='name'>
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop='img'>
					<upload @remove="editForm.img = ''" @success="transmission($event)" :url="editForm.img"></upload>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Upload from '@/components/Upload.vue';
	import { Category } from '@/api/index';
	export default {
		components: { Upload },
		data() {
			return {
				type: 'img',
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId: '',
					img: ''
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
					img: ''
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
				rules: {
					name: [{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}, {
						min: 4,
						max: 12,
						message: '长度在 4 到 12 个字符',
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回下一级节点数据的方法
				if (node.level == 0) {
					let { status, data } = await Category.list({ pId: 0 });
					return resolve(data);
				}
				//父级节点id
				let pId = node.data.id;
				//获取子节点数据
				let { status, data } = await Category.list({ pId });
				if (status) {
					return resolve(data);
				}
			},
			// 编辑节点
			async handleUpdateNode() {
				// 1.表单验证
				// 2，ajax
				let { status, msg, data } = await Category.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					this.node.data = this.editForm;
					// 插入新的tree节点
					this.editModalShow = false;
				}
			},
			// 打开编辑Modal
			openEditModal(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;
			},
			//打开插入Modal
			openInsertModal(node, data) {
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
				this.node = node;
			},
			//插入节点
			async handleInsertNode() {
				//1.表单校验
				//2.ajax
				let { status, msg, data } = await Category.add({ ...this.insertForm });
				if (status) {
					this.$message.success(msg);
					// 插入新的tree节点
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
					this.insertModalShow = false;
				}
			},
			deleteNode(node, data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let id = node.data.id;
					let { status, msg } = await Category.remove({ id });
					if (status) {
						this.$refs.tree.remove(node);
						this.$message.success('删除成功');
					}
				}).catch(() => {
					// this.tableData.remove({ }) //...扩展运算符展开
					this.$message.info('取消删除');
				});
			},
			// 头像上传成功
			transmission({ status, msg, src }) { // 直接 解构 传回来的数据
				this.editForm.img = src;
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
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.el-form-item__label {
		width: 120px;
	}
</style>
subcate
