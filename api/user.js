import uniFetch from './uni-fetch.js';

export const login = (data) => {
	if (!data.account || !data.password) return;
	return uniFetch.post('/driver/login/account', data);
};
