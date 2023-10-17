<script setup>
import Notify from './components/notify.vue';
import Announce from './components/announce.vue';
import { ref } from 'vue';
const tabIndex = ref(0);
const tab = ref([
	{ title: '公告', rendered: false },
	{ title: '任务通知', rendered: true }
]);
const changeTab = (index) => {
	tab.value[index].rendered = true;
	tabIndex.value = index;
};
</script>
<template>
	<view class="message">
		<view class="tab">
			<view @click="changeTab(index)" class="tab-item" v-for="(item, index) in tab" :key="index">
				<view class="title" :class="{ active: tabIndex === index }">
					{{ item.title }}
				</view>
			</view>
		</view>
		<Announce v-show="tabIndex === 0"></Announce>
		<Notify v-show="tabIndex === 1"></Notify>
	</view>
</template>

<style lang="scss">
.message {
	background-color: $uni-bg-color;
	height: calc(100vh - 94px);
}
.tab {
	display: flex;

	.tab-item {
		height: 88rpx;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		flex-direction: column;

		.title {
			font-size: 28rpx;
			color: #818181;
			position: relative;

			&.active {
				color: #2a2929;
				font-weight: 500;

				&::after {
					content: '';
					display: block;
					background: #d8d8d8;
					background-image: linear-gradient(210deg, #f25c4d 25%, #e52d21 100%, #e52d21 100%);
					border-radius: 20rpx;
					border-radius: 4rpx;
					width: 100%;
					height: 8rpx;
					position: absolute;
					bottom: -25rpx;
				}
			}
		}
	}
}
</style>
