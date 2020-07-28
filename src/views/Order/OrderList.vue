<template>
	<div class="box">
		<div class="header">订单列表</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="#" width='50' class='el-icon-d-caret' prop='id'>
			</el-table-column>
			<el-table-column width="600">
				<template slot-scope="scope">
					<el-table :data="scope.row.goodsList" style="width: 100%">
						<el-table-column label='商品' width='90'>
							<template scope="scope">
								<img :src="scope.row.img_md" height="80" width="80" >
							</template>
						</el-table-column>
						<el-table-column prop='name'>
						</el-table-column>
						<el-table-column label='单价' prop='goods_price' width='90'>
						</el-table-column>
						<el-table-column label='数量' prop='goods_num' width='90'> 
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column label='付款总额' width="100" prop='payment'>
			</el-table-column>
			<el-table-column label="下单时间" width="200" class='el-icon-d-caret' prop='create_time'>
			</el-table-column>
			<el-table-column label="状态" width="150" class='el-icon-d-caret' prop='status'>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { Order } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			//获取列表数据
			this.loadList();
		},
		methods: {
			//加载列表数据
			async loadList() {
				let { status, total, data } = await Order.confirmlist({ pagesize: 10, pageindex: 1 });
				if (status) {
					this.tableData = data;
				}
			},
		}
	}
</script>

<style>
	.el-pagination {
		padding: 20px;
	}
</style>
