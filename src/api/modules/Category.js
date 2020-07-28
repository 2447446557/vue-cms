import axios from 'axios';
// 获取子级分类
let list = (data) => axios.get('/api/category/sub',{ params: data });
let remove = (id) => axios.delete('/api/category',{ params: id });
// 修改分类
let edit = (data) => axios.put('/api/category',data);
// 添加子类
let add = (data) => axios.post('/api/category',data);
let subcate = (data) => axios.get('/api/category/sub', { params: data});
//获取子级分类
let all = (pId) => axios.get('/api/category/sub', { params: pId });

export default {
	list,
	remove,
	edit,
	add,
	subcate,
	all
}