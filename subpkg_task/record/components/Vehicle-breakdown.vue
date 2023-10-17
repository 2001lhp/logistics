<script setup>
import VehicleOption from './vehicle-option.vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task.js';
import { storeToRefs } from 'pinia';
const { recordData } = storeToRefs(useTaskStore());
const show = ref(false);
const onRadioChange = (e) => {
	show.value = e.detail.value == 1 ? true : false;
	recordData.value.isFault = show.value;
};
const fault = ['启动困难', '不着车', '漏油', '漏水', '照明失灵', '有异响', '排烟异常', '温度异常', '其他'];
const textshow = ref(false);
const changefault = (e) => {
	recordData.value.faultType = e;
	textshow.value = e == fault[fault.length - 1];
};
</script>

<template>
	<view class="breakdown">
		<view class="title">
			<view class="">车辆故障</view>
			<radio-group class="radio-group" @change="onRadioChange">
				<label class="radio">
					<radio value="1" />
					<text>是</text>
				</label>
				<label class="radio">
					<radio checked value="0" />
					<text>否</text>
				</label>
			</radio-group>
		</view>
		<view v-show="show" class="box">
			<VehicleOption title="故障类型" :list="fault" @change="changefault"></VehicleOption>
			<textarea v-show="textshow" v-model="recordData.faultDescription" placeholder="请输入故障描述" />
			<uni-file-picker v-model="recordData.faultImagesList" title="请拍照"></uni-file-picker>
		</view>
	</view>
</template>

<style lang="scss">
.breakdown {
	padding: 30rpx;
	margin: 30rpx 0;
	background-color: #fff;
}
.title {
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	::v-deep.uni-label-pointer {
		margin-right: 10rpx;
		.uni-radio-input {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
	}
}
.box {
	margin-top: 30rpx;
	textarea {
		margin-top: 20rpx;
	}
}
</style>
