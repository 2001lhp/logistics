<script setup>
import { ref } from 'vue';
import VehicleOption from './vehicle-option.vue';
import { useTaskStore } from '@/stores/task.js';
import { storeToRefs } from 'pinia';
const { recordData } = storeToRefs(useTaskStore());
const show = ref(false);
const onRadioChange = (e) => {
	show.value = e.detail.value == 1 ? true : false;
	recordData.value.isBreakRules = show.value;
};
const peccant = ['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速驾驶', '其它'];
const money = ['0元', '100元', '200元', '300元', '500元', '1000元', '2000元'];
const scores = ['0分', '1分', '2分', '3分', '6分', '12分'];
const textshow = ref(false);
const changepeccant = (e) => {
	recordData.value.breakRulesType = e;
	textshow.value = e == peccant[peccant.length - 1];
};
const changemoney = (e) => {
	recordData.value.penaltyAmount = e;
};
const changescores = (e) => {
	recordData.value.deductPoints = e;
};
</script>

<template>
	<view class="violations">
		<view class="title">
			<view class="">车辆违章</view>
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
			<VehicleOption title="违章类型" :list="peccant" @change="changepeccant"></VehicleOption>
			<textarea placeholder="请输入" v-show="textshow" v-model="recordData.breakRulesDescription"></textarea>
			<VehicleOption title="罚款金额" :list="money" @change="changemoney"></VehicleOption>
			<VehicleOption title="扣分" :list="scores" @change="changescores"></VehicleOption>
		</view>
	</view>
</template>

<style lang="scss">
.violations {
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
