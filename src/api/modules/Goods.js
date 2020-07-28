import axios from 'axios';

// 获取商品列表
let list = (data) => axios.get('/api/goods/list',{ params: data });
// 发布新商品
let product = (data) => axios.post('/api/admin/goods',data);
// 获取省信息
let province = (data) => axios.get('/api/pcct/province',{ params: data });
// 根据省信息获取市信息
let city = (data) => axios.get('/api/pcct/city',{ params: data });
// 根据市信息获取县区信息
let county = (data) => axios.get('/api/pcct/county',{ params: data });
// 删除文章
let remove = (id) => axios.delete('/api/admin/goods',{ params: id });
let detail = (data) => axios.get('/api/admin/goods', { params: data });
// 编辑角色
let edit = (id) => axios.put('/api/admin/goods');
//发布商品
let release = (data) => axios.post('/api/admin/goods', data);
export default {
	list,
	product,
	province,
	city,
	county,
	remove,
	detail,
	edit,
	release
}