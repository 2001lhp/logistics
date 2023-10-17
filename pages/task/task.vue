<script setup>
import { ref } from 'vue';
import Pickup from './components/pickup.vue';
import Delivery from './components/delivery.vue';
import Complete from './components/complete.vue';
const tabIndex = ref(0);
const tab = ref([
	{ title: '待提货', rendered: true },
	{ title: '在途', rendered: false },
	{ title: '已完成', rendered: false }
]);
const changeTab = (index) => {
	tab.value[index].rendered = true;
	tabIndex.value = index;
};
</script>

<template>
	<view class="task">
		<view class="tab">
			<view @click="changeTab(index)" class="tab-item" v-for="(item, index) in tab" :key="index">
				<view class="title" :class="{ active: tabIndex === index }">
					{{ item.title }}
				</view>
			</view>
		</view>
		<Pickup v-show="tabIndex === 0"></Pickup>
		<Delivery v-show="tabIndex === 1"></Delivery>
		<Complete v-show="tabIndex === 2"></Complete>
	</view>
</template>

<style lang="scss">
.task {
	height: calc(100vh - 50px);
}
.tab {
	display: flex;
	padding: calc(env(safe-area-inset-top) + 13px) 60rpx 0;
	font-size: 36rpx;

	.tab-item {
		height: 88rpx;
		// flex: 1;
		margin-right: 70rpx;
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
