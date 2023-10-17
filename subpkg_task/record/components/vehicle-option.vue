<script setup>
import { ref } from 'vue';
defineProps({
	title: String,
	list: Array
});
const tabIndex = ref(-1);
const emits = defineEmits();
const change = (item, i) => {
	tabIndex.value = i;
	emits('change', item);
};
</script>

<template>
	<view class="title">{{ title }}</view>
	<view class="tab">
		<view class="option" v-for="(item, index) in list" :key="item" :class="{ active: index === tabIndex }" @click="change(item, index)">{{ item }}</view>
	</view>
</template>

<style lang="scss">
.title {
	font-size: 28rpx;
	margin-top: 20rpx;
}
.tab {
	display: flex;
	flex-wrap: wrap;
	font-size: 28rpx;
	.option {
		width: 180rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		margin-top: 30rpx;
		margin-right: 35rpx;
		color: #818181;
		border: 0.0625rem solid #f4f4f4;
		background-color: #f4f4f4;
		border-radius: 20rpx;
		&:nth-child(3n) {
			margin-right: 0;
		}
		&.active {
			color: #ef4f3f;
			border: 2rpx solid #ef4f3f;
			background-color: #ffe0dd;
		}
	}
}
</style>
