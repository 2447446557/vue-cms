import axios from 'axios';
// 获取管理员列表
let list = (data) => axios.get('/api/admin/list',{ params: data });
let remove = (id) => axios.delete('/api/admin',{ params: id });
let load = (data) => axios.get('/api/admin',{ params: data });
let update = (data) => axios.put('/api/admin', data);
export default {
	list,
	remove,
	load,
	update
}