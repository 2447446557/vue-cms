import axios from 'axios';

// 登录
let login = (data) => axios.post('/api/admin/login', data);
// 注册
let register = (data) => axios.post('/api/admin/register', data);
// 获取管理员个人资料
let catesub = (data) => axios.get('/api/admin/list',{ params: data });
export default {
	login,
	register,
	catesub
}