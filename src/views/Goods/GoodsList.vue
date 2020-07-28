<template>
	<div class="box">
		<div class="header">商品列表</div>
		<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
			<el-table-column label="商品名称" width="90">
				<template scope="scope">
					<img :src="scope.row.img_md" height="80" width="80" class="head_pic" />
				</template>
			</el-table-column>
			<el-table-column width="400" prop='name'>
			</el-table-column>
			<el-table-column label="价格" width="200" class='el-icon-d-caret' prop='price'>
			</el-table-column>
			<el-table-column label="库存" width="200" class='el-icon-d-caret' prop='inventory'>
			</el-table-column>
			<el-table-column label="发布时间" width="200" class='el-icon-d-caret' prop='create_time'>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link :href="`#/goods/goodsedit/${scope.row.id}`">
						<el-button size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
					</el-link>
					<el-button size="mini" type="danger" plain @click='delModal(scope.row.id,scope.$index)'><i class="el-icon-delete"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[4, 5, 6, 7]" :page-size="4" layout="sizes, prev, pager, next" :total="totalNum">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1, //默认显示第一页
				pageSize: 4, //默认每页显示10条
				totalNum: 11, //总页数
			}
		},
		created() {
			//获取列表数据
			this.loadList();
			// this.totalNum=this.tableData.length;
			
		},
		methods: {
			//加载列表数据
			async loadList() {
				let { status, total, goods } = await Goods.list({ pageSize: 11 });
				if (status) {
					this.tableData = goods;
				}
			},
			// 删除文章
			delModal(id, i) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					// 删除角色
					let { status } = await Goods.remove({ id: id });
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize = val; //动态改变
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val; //动态改变
			}

		}
	}
</script>

<style>
	.el-pagination {
		padding: 20px;
	}
</style>
