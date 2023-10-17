<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { truckRegistration } from '@/api/task.js';
import VehicleAccidents from './components/Vehicle-accidents.vue';
import VehicleBreakdown from './components/Vehicle-breakdown.vue';
import VehicleViolations from './components/Vehicle-violations.vue';
import { useTaskStore } from '@/stores/task.js';
import { storeToRefs } from 'pinia';
const { recordData } = storeToRefs(useTaskStore());
onLoad((e) => {
	console.log(e);
	recordData.value.id = e.id;
	recordData.value.startTime = e.time;
	console.log(recordData.value);
});
const onSubmit = async () => {
	console.log(recordData.value);
	try {
		recordData.value.accidentImagesList = recordData.value.accidentImagesList.map((item) => {
			return {
				url: item.url
			};
		});
		recordData.value.faultImagesList = recordData.value.faultImagesList.map((item) => {
			return {
				url: item.url
			};
		});
		const res = await truckRegistration(recordData.value);
		console.log(res);
	} catch (e) {
		//TODO handle the exception
	}
};
</script>

<template>
	<view class="record">
		<uni-list>
			<uni-list-item title="出车时间" :right-text="recordData.startTime" link></uni-list-item>
			<uni-list-item title="回车时间" link>
				<template v-slot:footer>
					<uni-datetime-picker v-model="recordData.endTime">
						<view class="picker-value">{{ recordData.endTime || '请选择' }}</view>
					</uni-datetime-picker>
				</template>
			</uni-list-item>
		</uni-list>
		<VehicleViolations></VehicleViolations>
		<VehicleBreakdown></VehicleBreakdown>
		<VehicleAccidents></VehicleAccidents>
		<button @click="onSubmit">交车</button>
	</view>
</template>

<style lang="scss">
.record {
	// background-color: $uni-bg-color;
	background-color: #eee;
	height: calc(100vh - 44px);
	padding: 30rpx;
	overflow: auto;
}
.picker-value {
	width: 360rpx;
	color: #818181;
	text-align: right;
	font-size: 28rpx;
}
button {
	width: 400rpx;
	line-height: 100rpx;
	border-radius: 50rpx;
	color: #fff;
	background-color: $uni-primary;
	position: fixed;
	bottom: 20rpx;
	left: 169rpx;
}
</style>
