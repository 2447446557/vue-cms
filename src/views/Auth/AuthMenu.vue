<template>
	<div>
		<el-card class="box-card" :rules="rules">
			<div slot="header">
				<span>菜单权限</span>
			</div>
			<el-alert title="Tips" type="warning" description="设置后台管理系统的左侧菜单,目前至多支持两层菜单,三层以上菜单将不会显示" show-icon>
			</el-alert>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load="loadNode" node-key="id" lazy :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button :icon="'el-icon-'+data.icon" @click.stop="openIconModel(node,data)" type="text" :disabled="node.level==1" size="mini">
							图标
						</el-button>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button @click.stop="() => deleteNode(node,data)" :disabled="node.level==1" type="text" icon="el-icon-delete"
						 size="mini">
							删除
						</el-button>
						<span class="id">显示序号:{{ data.order }}</span>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加节点" :visible.sync="insertModalShow">
			<el-form :model="insertForm" :rules="rules" ref="insertForm">
				<el-form-item label="菜单名称" label-width="120px" prop='name'>
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="editForm">
				<el-form-item label="链接地址" label-width="120px">
					<el-input autocomplete="off" placehold='指定此菜单的链接地址,选填'></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="editForm" :rules="rules">
				<el-form-item label="显示顺序" label-width="120px" prop='order'>
					<el-input v-model="insertForm.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑节点" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules="rules" ref="editForm">
				<el-form-item label="菜单名称" label-width="120px" prop='name'>
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="editForm">
				<el-form-item label="链接地址" label-width="120px">
					<el-input autocomplete="off" placehold='指定此菜单的链接地址,选填'></el-input>
				</el-form-item>
			</el-form>
			<el-form :model="editForm" :rules="rules">
				<el-form-item label="显示顺序" label-width="120px" prop='order'>
					<el-input v-model="editForm.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
			</div>
		</el-dialog>
		<!-- 图标框 -->
		<el-dialog title="提示" :visible.sync="iconDialogVisible" width="70%">
			<ul class="icon_list">
				<li :class="{active : isChange === index}" @click="changeIcon(index,item.id,item.name)" v-for="(item,index) in iconAll">
					<i style="font-size: 26px;" :class="'el-icon-'+item.name"></i>
					{{item.name}}
				</li>
			</ul>
			<el-pagination class="paging" @current-change="handleCurrentChange" layout="prev, pager, next" :total="100">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
				<el-button @click="iconDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="iconSet">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { Role } from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name',
					order: 'order',
				},
				insertForm: {
					name: '',
					pId: '',
					order: ''
				},
				editForm: {
					id: '',
					name: '',
					order: ''
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
				iconDialogVisible:false,
				iconAll:[], //所有图标
				icon:'',
				iconName:'',
				isChange:-1, //
				rules: {
					name: [{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur'
					}, {
						min: 4,
						max: 12,
						message: '长度在 4 到 12 个字符',
						trigger: 'blur'
					}],
					order: [{
						required: true,
						message: '请输入显示顺序',
						trigger: 'blur'
					}, {
						min: 4,
						max: 12,
						message: '长度在 1 到 4 个字符',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回下一级节点数据的方法
				if (node.level == 0) {
					let { status, data } = await Role.catesub({ pId: 0 });
					return resolve(data);
				}
				//父级节点id
				let pId = node.data.id;
				//获取子节点数据
				let { status, data } = await Role.catesub({ pId });
				if (status) {
					return resolve(data);
				}
			},
			// 打开图标框
			openIconModel(node,data){
				this.node = node;
				this.iconIndex = node.data.id;
				this.iconDialogVisible = true;
				this.handleCurrentChange();
			},
			// 改变图标样式
			changeIcon(index,id,name){
				this.isChange = index;
				this.icon = id;
				this.iconName = name;
			},
			// 点击确定设置图标
			async iconSet(){
				let {status,msg} = await Role.icon_set({id:this.iconIndex,icon:this.icon});
				if(status){
					this.node.data.icon = this.iconName;
					this.$message.success(msg);
					this.iconDialogVisible = false;
				}
			},
			// 分页器换页
			async handleCurrentChange(val){
				this.isChange = -1;
				let { status, icons } = await Role.icon({ pageSize: 30, pageIndex: val });
				if (status) {
					this.iconAll = icons;
				}
			},
			
			// 编辑节点
			async handleUpdateNode() {
				// 1.表单验证
				// 2，ajax
				let { status, msg } = await Role.update({ ...this.editForm });
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
				let { status, msg, data } = await Role.insert({ ...this.insertForm });
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
					let { status, msg } = await Role.del({ id });
					if (status) {
						this.$refs.tree.remove(node);
						this.$message.success('删除成功');
					}
				}).catch(() => {
					// this.tableData.remove({ }) //...扩展运算符展开
					this.$message.info('取消删除');
				});
			},

			// 			async deleteNode(node, data) {
			// 				let id = node.data.id;
			// 				let { status, msg } = await Role.del({ id });
			// 				if (status) {
			// 					this.$refs.tree.remove(node);
			// 					this.$message.success('删除成功');
			// 				}
			// 			}
		}
	};
</script>

<style lang="less" scoped="scoped">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.id {
		font-size: 12px;
		padding: 0 10px;
	}
	.icon_list{
		list-style-type: none;
		
		.active{
			color: white;
			background-color: #5cb6ff;
			// 关闭鼠标滑过事件
			pointer-events: none;
		}
		
		li{
			width: 10%;
			height: 100px;
			float: left;
			border: 1px solid #cfcfcf;
			box-sizing: border-box;
			padding: 20px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			
			i{
				margin-bottom: 10px;
			}
		}
		
		li:hover{
			color: #5cb6ff;
		}
	}
	.icon_list::after{
	    content: "";/* 必须写，否则此伪元素创建不出来 */
	    clear: both;
	    height: 0;
	    display: block;
	}
	.paging {
		padding-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
</style>
subcate
