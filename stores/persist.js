import { createPersistedState } from 'pinia-plugin-persistedstate';

const piniaPluginPersistedstate = createPersistedState({
	key: (id) => `${id}`,
	storage: {
		getItem: (key) => {
			return uni.getStorageSync(key);
		},
		setItem: (key, value) => {
			uni.setStorageSync(key, value);
		}
	}
});

export default piniaPluginPersistedstate;
