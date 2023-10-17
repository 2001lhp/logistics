<script setup>
import VehicleOption from './vehicle-option.vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task.js';
import { storeToRefs } from 'pinia';
const { recordData } = storeToRefs(useTaskStore());
const show = ref(false);
const onRadioChange = (e) => {
	show.value = e.detail.value == 1 ? true : false;
	recordData.value.isAccident = show.value;
};
const accident = ['直行事故', '追尾事故', '超车事故', '左转弯事故', '右转弯事故', '弯道事故', '坡道事故', '会车事故', '其他'];
const textshow = ref(false);
const changeaccident = (e) => {
	recordData.value.accidentType = e;
	textshow.value = e == accident[accident.length - 1];
};
</script>

<template>
	<view class="accidents">
		<view class="title">
			<view class="">车辆事故</view>
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
			<VehicleOption title="事故类型" :list="accident" @change="changeaccident"></VehicleOption>
			<textarea v-show="textshow" v-model="recordData.accidentDescription" placeholder="请输入事故描述"></textarea>
			<uni-file-picker title="请拍照" v-model="recordData.accidentImagesList"></uni-file-picker>
		</view>
	</view>
</template>

<style lang="scss">
.accidents {
	background-color: #fff;
	padding: 30rpx;
	margin: 30rpx 0;
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
</style>
