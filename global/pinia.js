// 引入 Pinia
import { createPinia } from 'pinia';

// pinia持久化插件
import persist from '@/stores/persist.js';

// 实例化Pinia
const pinia = createPinia();

export default function (app) {
	// 注册pinia持久化插件
	pinia.use(persist);
	// 传递给项目应用
	app.use(pinia);
}
