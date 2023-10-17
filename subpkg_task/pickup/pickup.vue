<script setup>
import { ref, computed } from 'vue';
import { takeDelivery } from '@/api/task.js';
import { onLoad } from '@dcloudio/uni-app';
const id = ref();
onLoad((e) => {
	console.log(e);
	id.value = e.id;
});
// 提货凭证照片
const receiptPictrues = ref([]);
const cargoPickUpPictureList = computed(() => {
	return receiptPictrues.value.map((item) => {
		return {
			url: item.url
		};
	});
});
// 提货照片数组
const goodsPictrues = ref([]);
const cargoPictureList = computed(() => {
	return goodsPictrues.value.map((item) => {
		return {
			url: item.url
		};
	});
});
const enableSubmit = computed(() => {
	return cargoPickUpPictureList.value.length > 0 && cargoPictureList.value.length > 0;
});
const onSubmit = async () => {
	try {
		let data = {
			id: id.value,
			cargoPickUpPictureList: cargoPickUpPictureList.value,
			cargoPictureList: cargoPictureList.value
		};
		console.log(data);
		const res = await takeDelivery(data);
		console.log(res);
		uni.reLaunch({
			url: '/subpkg_task/detail/detail?id=' + id.value
		});
	} catch (e) {
		//TODO handle the exception
	}
};
</script>

<template>
	<view class="pickup">
		<view class="info">
			<!-- 提货凭证上传组件 -->
			<uni-file-picker file-extname="jpg,webp,gif,png" title="请拍照上传提货凭证" limit="3" v-model="receiptPictrues" />
			<!-- 上传货品照片组件 -->
			<uni-file-picker file-extname="jpg,webp,gif,png" title="请拍照上传货品照片" limit="3" v-model="goodsPictrues" />
		</view>
		<button class="button" :disabled="!enableSubmit" @click="onSubmit">提交</button>
	</view>
</template>

<style lang="scss">
.pickup {
	background-color: $uni-bg-color;
	height: calc(100vh - 44px);
	padding: 30rpx;
	.info {
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 16rpx;
	}

	::v-deep .uni-file-picker {
		margin-bottom: 30rpx;
	}

	.button {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		/* #ifdef APP */
		padding-top: 4rpx;
		/* #endif */
		border-radius: 100rpx;
		margin-top: 60rpx;
		color: #fff;
		font-size: $uni-font-size-big;
		background-color: $uni-primary;

		&[disabled] {
			color: #fff;
			background-color: #fadcd9;
		}
	}
}
</style>
