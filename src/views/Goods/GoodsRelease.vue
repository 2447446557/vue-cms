<template>
	<div class="box">
		<div class="header">商品列表</div>
		<el-form ref="form" :model='form' :rules="rules">
			<el-form-item label="商品分类">
				<el-select placeholder="女装" v-model='form.cate_1st'>
					<el-option v-for="option in options_1st" :key='option.id' :label='option.name' :value="option.id"></el-option>
				</el-select>
				<el-select placeholder="流行趋势" v-model='form.cate_2nd'>
					<el-option v-for="option in options_2nd" :key='option.id' :label='option.name' :value="option.id"></el-option>
				</el-select>
				<el-select placeholder="方领连衣裙" v-model='form.cate_3rd'>
					<el-option v-for="option in options_3rd" :key='option.id' :label='option.name' :value="option.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品名称" prop='name'>
				<el-input v-model='form.name'></el-input>
				<div class="title">商品标题名称长度至少3个字符，最长200个汉字</div>
			</el-form-item>
			<el-form-item label="商品卖点" prop='hotPoint'>
				<el-input type="textarea" v-model='form.hotPoint'></el-input>
				<div class="title">商品卖点不能超过140个汉字</div>
			</el-form-item>
			<el-form-item label="商品价格" prop='price'>
				<div class="right">
					<div>
						<el-input v-model='form.price'>
							<template slot="append">元</template>
						</el-input>
					</div>
					<div class="title">
						价格必须是0-999999之间的数字，且不能高于市场价<br>
						此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格
					</div>
				</div>
			</el-form-item>
			<el-form-item label="市场价" prop='marketPrice'>
				<div class="right">
					<div>
						<el-input v-model='form.marketPrice'>
							<template slot="append">元</template>
						</el-input>
					</div>
					<div class="title">
						价格必须是0-999999之间的数字,此价格仅为市场参考价,请根据实际情况认真填写
					</div>
				</div>
			</el-form-item>
			<el-form-item label="成本价" prop='cost'>
				<div class="right">
					<div>
						<el-input v-model='form.cost'>
							<template slot="append">元</template>
						</el-input>
					</div>
					<div class="title">
						价格必须是0-999999之间的数字,此价格为商户对所销售的商品的实际成本价进行备注记录，非必填项，不会在前台销售页面中显示
					</div>
				</div>
			</el-form-item>
			<el-form-item label="折扣">
				<div class="right">
					<div>
						<el-input v-model='discounts'>
							<template slot="append">折</template>
						</el-input>
					</div>
					<div class="title">
						根据销售与市场价比例自动生成不需要编辑
					</div>
				</div>
			</el-form-item>
			<el-form-item label="商品库存" prop='inventory'>
				<div class="right">
					<div>
						<el-input v-model='form.inventory'>
							<template slot="append">件</template>
						</el-input>
					</div>
					<div class="title">
						价格必须是0-999999之间的整数<br>
						若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写
					</div>
				</div>
			</el-form-item>
			<el-form-item label="商品货号" prop='articleNo' type='number'>
				<div class="right">
					<div>
						<el-input v-model='form.articleNo'></el-input>
					</div>
					<div class="title">
						商品货号是商家管理商品的编号，买家不可见<br>
						最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点
					</div>
				</div>
			</el-form-item>
			<el-form-item label="商品主图">
				<div class="right">
					<upload :url='form.img_lg' @success='handleUploadSuccess($event)' @remove='form.img_lg=""' uploadAddress="/api/upload/goods"></upload>
					<div class="title">
						上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从<br>
						图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自<br>
						动保存在图片空间的默认分类中
					</div>
				</div>
			</el-form-item>
			<el-form-item label="商品轮播图" v-model='form.slider'>
				<div class="right">
					<el-upload action="http://localhost:3003/api/upload/slider" list-type="picture-card" :on-success="uploadSuccess" :on-preview="handlePictureCardPreview">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="form.slider" alt="">
					</el-dialog>
					<div class="title">
						上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从<br>
						图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自<br>
						动保存在图片空间的默认分类中
					</div>
				</div>
			</el-form-item>
			<div class="text">商品详情描述</div>
			<el-form-item label="商品品牌">
				<el-input v-model='form.brand'></el-input>
			</el-form-item>
			<el-form-item label="商品描述">
				<div ref="editor" v-model='form.detail'></div>
			</el-form-item>
			<div class="text">商品物流信息</div>
			<!-- 地址三级联动 -->
			<el-form-item label="所在地">
				<el-select v-model="form.province" placeholder="请选择省份">
					<el-option v-for="item in address_1st" :key="item.province_id" :label="item.name" :value="item.province_id"></el-option>
				</el-select>
				<el-select v-model="form.city" placeholder="请选择市">
					<el-option v-for="item in address_2nd" :key="item.city_id" :label="item.name" :value="item.city_id"></el-option>
				</el-select>
				<el-select v-model="form.county" placeholder="请选择区">
					<el-option v-for="item in address_3rd" :key="item.county_id" :label="item.name" :value="item.county_id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="运费">
				<div>
					<div>
						<el-input v-model='form.freight'>
							<template slot="append">元</template>
						</el-input>
					</div>
					<div class="title">
						运费设为0，前台商品将显示为免运费
					</div>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="onSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import E from 'wangeditor';
	import Upload from '@/components/Upload.vue';
	import { Goods } from '@/api/index';
	import { Category } from '@/api/index';
	export default {
		components: {
			Upload,
		},
		data() {
			return {
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					img_md: '',
					img_lg: '',
					slider: '',
					brand: '',
					detail: '',
					freight: '',
					dialogImageUrl: '',
					disabled: false,
					province: '',
					city: '',
					county: ''
				},
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				address_1st: [],
				address_2nd: [],
				address_3rd: [],
				dialogVisible: false,
				sliderString: '',
				rules: {
					name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					},{
						min: 6,
						max: 400,
						message: '长度在 3 到 200 个字符',
						trigger: 'blur'
					}],
					hotPoint: [{
						required: true,
						message: '请输入商品卖点',
						trigger: 'blur'
					},{
						min: 2,
						max: 280,
						message: '长度在 2 到 280 个字符',
						trigger: 'blur'
					}],
					price: [{
						required: true,
							message: '请输入商品价格',
							trigger: 'blur'
						},{
							min: 1,
							max: 6,
							message: '请输入正确的价格',
							trigger: 'blur'
					}],
					marketPrice: [{
						required: true,
							message: '请输入商品价格',
							trigger: 'blur'
						},{
							min: 1,
							max: 6,
							message: '请输入正确的价格',
							trigger: 'blur'
					}], 
					articleNo: [{
						required: true,
							message: '请输入商品价格',
							trigger: 'blur'
						},{
							min: 1,
							max: 6,
							message: '请输入正确的价格',
							trigger: 'blur'
					}], 
				}
			}
		},
		async created() {
			let options = await this.loadSubcate(1);
			this.options_1st = options;
			let optiont = await this.loadSubcate(2);
			this.options_2nd = optiont;
			this.address_1st = await this.loadProvince();
		},
		watch: {
			'form.cate_1st': async function(val) {
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[1].id;
			},
			'form.cate_2nd': async function(val) {
				let optiont = await this.loadSubcate(val);
				this.options_3rd = optiont;
				this.form.cate_3rd = optiont[2].id;
			},
			// 获取三级地址
			'form.province': async function(val) {
				this.address_2nd = await this.loadCity(val);
				this.form.city = this.address_2nd[0].city_id;
			},
			'form.city': async function(val) {
				this.address_3rd = await this.loadCounty(val);
				this.form.county = this.address_3rd[0].county_id;
			},
		},
		mounted() {
			//console.log(this.$refs.editor);
			// this.$refs.editor相当于js中的getElementById('editor')
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html;
			}
			//配置图片上传 
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/api/upload/editor/';
			//配置自定义filename
			editor.customConfig.uploadFileName = 'file';
			//配置自定义header
			editor.customConfig.uploadImgHeaders = {
				'Authorization': `Bearer ${sessionStorage.token}`
			};
			editor.create()
		},
		computed: {
			discounts() {
				if (this.form.price != '' && this.form.marketPrice != '') {
					let temp = (this.form.price / this.form.marketPrice) * 10;
					this.form.discount = temp;
					return temp;
				}
			}
		},
		methods: {
			//根据传参获取下一级子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ pId: id });
				console.log(data);
				return data;
			},
			// 获取所有省
			async loadProvince() {
				let { status, data } = await Goods.province();
				if (status) {
					return data;
				}
			},
			// 获取城市
			async loadCity(id) {
				let { status, data } = await Goods.city({ id });
				if (status) {
					return data;
				}
			},
			// 获取县区
			async loadCounty(id) {
				let { status, data } = await Goods.county({ id });
				if (status) {
					return data;
				}
			},
			//头像上传成功
			handleUploadSuccess({src}) {
				this.form.img_lg = src;
			},
			//发布文章

			async onSubmit() {
				this.form.img_md = this.form.img_lg;
				this.form.slider = this.sliderString;
				let { status, data, msg } = await Goods.product({ ...this.form });
				if (status) {
					this.$message.success(msg);
					this.$router.push('/Goods/GoodsList');
				}
			},
			// 加载商品的分类
			async loadSubCate(id) {
				let { status, data } = await Goods.sub({ pId: id });
				if (status) {
					return data;
				}
			},
			uploadSuccess(file) {
				if (this.sliderString == '') {
					this.sliderString = file.src;
				} else {
					this.sliderString = this.sliderString + ',' + file.src;
				}
			},
			handlePictureCardPreview(file) {
				this.form.slider = file.url;
				this.dialogVisible = true;
			},
		}
	}
</script>

<style>
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

	.el-form-item__label {
		text-align: left;
		padding: 20px;
	}

	.el-form-item__content {
		padding: 20px;
	}

	.el-input {
		width: 58%;
	}

	.el-textarea {
		width: 58%;
	}

	.el-input-group--append {
		width: 17%;
	}

	/* 	.right {
		margin-left: 100px;
	} */

	.text {
		background-color: #f5f5f5;
		padding: 10px;
		margin-bottom: 10px;
	}

	.title {
		font-size: 12px;
		color: #999;
	}

	.el-form-item__content {
		margin-left: 80px;
	}

	.el-form-item__label {
		width: auto !important;
	}
</style>
