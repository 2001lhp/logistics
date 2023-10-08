import { defineStore } from 'pinia';

export const useCounterStore = defineStore(
	'count',
	() => {
		return {};
	},
	{ persist: true }
);
