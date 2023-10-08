/**
 * http请求文件
 */

// 引入fetch
import { createUniFetch } from 'uni-app-fetch';
import { useUserStore } from '@/stores/user.js';
const store = useUserStore();

// 使用自定义选项创建实例
const uniFetch = createUniFetch({
	// loading加载
	loading: { title: '加载中...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			if (store.token) options.header.Authorization = store.token;
			return options;
		},
		// 响应拦截器
		response(result) {
			if (result.data.code === 200) {
				return result.data;
			}
			uni.utils.toast(result.data.msg || '请求失败');
		}
	}
});

// 模块导出
export default uniFetch;
