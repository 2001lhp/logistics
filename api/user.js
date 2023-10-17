import uniFetch from './uni-fetch.js';

export const login = (data) => {
	if (!data.account || !data.password) return;
	return uniFetch.post('/driver/login/account', data);
};

export const getProfile = () => {
	return uniFetch.get('/driver/users');
};

export const getTask = (data) => {
	if (!data.month || !data.year) return;
	return uniFetch.get('/driver/users/taskReport', data);
};

export const getcarmsg = () => {
	return uniFetch.get('/driver/users/truck');
};
