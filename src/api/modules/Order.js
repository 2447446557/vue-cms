import axios from 'axios';

// 获取确认订单页面的数据
let confirmlist = (data) => axios.get('/api/admin/order/list', { params: data });

export default {
	confirmlist
}

