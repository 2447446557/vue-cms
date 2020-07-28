import axios from 'axios';
// Loading 服务方式
// import router from '@/router/index';
// import { Loading, Message } from 'element-ui';
// Loading实例
// let loading;
// 设置默认的baseURL
axios.defaults.baseURL = 'http://localhost:3003';
// 请求拦截器
// axios.interceptors.request.use(function(config) {
// 	// 在发送请求之前做些什么
// 	console.log(config);
// 	// 开启Loading
// 	loading = Loading.service({ background: 'rgba(0,0,0,0.3)' });
// 	// 判断是否携带token
// 	if (config.url == '/admin/register' || config.url == '/admin/login') {
// 		return config;
// 	}
// // 	//获取token
// 	let token = sessionStorage.token;
// // 	// 无token
// 	if (!token) {
// 		Message.error("无效的Token，请重新登录!");
// 		setTimeout(() => {
// 			router.replace('/login?redirect=me');
// 			console.log(router);
// 			loading.close();
// 		}, 2000);
// 	}
// 	// 有token
// 	config.headers.Authorization = `Bearer ${token}`;
// 	return config;
// }, function(error) {
// 	// 对请求错误做些什么
// 	return Promise.reject(error);
// });
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	let { status, data } = response;
	// 关闭loading
	// loading.close();
// 判断后台返回数据携带的状态码
	switch (status) {
		case 401:
			break;
		case 404:
			break;
		case 400:
			break;
		default:
			break;
	}
	return data;
	// 在发送请求之前做些什么
}, function(error) {
	// 对请求错误做些什么 
	return Promise.reject(error);
});
