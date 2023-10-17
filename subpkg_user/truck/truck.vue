<script setup>
import { getcarmsg } from '@/api/user.js';
import { ref, onMounted } from 'vue';
const carinfo = ref({});
onMounted(async () => {
	let res = await getcarmsg();
	console.log(res);
	carinfo.value = res.data;
});
</script>

<template>
	<view class="truck">
		<!-- <image src="../../static/uploads/truck_picture.jpg" mode=""></image> -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in carinfo.pictureList" :key="item.url">
				<image :src="item.url" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="list">
			<uni-list>
				<uni-list-item title="车辆编号" :rightText="carinfo.id"></uni-list-item>
				<uni-list-item title="车辆号牌" :rightText="carinfo.licensePlate"></uni-list-item>
				<uni-list-item title="车型" :rightText="carinfo.truckType"></uni-list-item>
				<uni-list-item title="所属机构" :rightText="carinfo.currentOrganName"></uni-list-item>
				<uni-list-item title="载重" :rightText="carinfo.allowableLoad"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<style lang="scss">
.truck {
	background-color: $uni-bg-color;
	// background-color: #ccc;
	height: calc(100vh - 44px);
	box-sizing: border-box;
	padding: 30rpx;
	swiper {
		width: 100%;
		height: 400rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.list {
		margin-top: 30rpx;
		width: 690rpx;
		height: 402rpx;
		background: #ffffff;
		border-radius: 20rpx;
	}
}
</style>
