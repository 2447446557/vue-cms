import axios from 'axios';

// 获取订单列表
let list = (data) => axios.get('/api/role/list',{ params: data });
// 更新角色
let edit = (data) => axios.put('/api/role',data);
// 删除角色
let remove = (id) => axios.delete('/api/role',{ params: id });
// 添加角色
let add = (data) => axios.post('/api/role', data);
// 获取子菜单
let catesub = (data) => axios.get('/api/menu/sub',{ params: data });
// 删除子菜单
let del = (id) => axios.delete('/api/category',{ params: id });
// 添加子菜单
let insert = (data) => axios.post('/api/menu', data);
// 更新子菜单
let update = (data) => axios.put('/api/menu',data);
export default {
	list,
	edit,
	remove,
	add,
	catesub,
	del,
	insert,
	update
}