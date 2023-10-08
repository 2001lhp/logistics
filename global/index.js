// 引入pinia
import Pinia from './pinia.js';

// 统一注册
export const globalRegister = {
	install(app) {
		app.use(Pinia);
	}
};
