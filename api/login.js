import uniFetch from './uni-fetch.js';

export const login = (data) => {
	return uniFetch(url:'/driver/login/account',method: 'post', data);
};
