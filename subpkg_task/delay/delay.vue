<script setup>
import { delay } from '@/api/task.js';
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const time = ref();
// const id = ref();
// const delaytime = ref('');
// const delayReason = ref('');
const form = ref({
	id: '',
	delayTime: '',
	delayReason: ''
});
onLoad((e) => {
	console.log(e);
	form.value.id = e.id;
	time.value = e.time;
});
// 选择延迟时间
const getdelaytime = (e) => {
	const [date] = time.value.split(' ');
	form.value.delayTime = date + ' ' + e.detail.value + ':00';
};
// 时间差
const delaytimestatus = computed(() => {
	const start = new Date(time.value);
	const end = new Date(form.value.delayTime);
	return end - start > 0 && end - start < 7200 * 1000;
});
const delayReasonValid = computed(() => {
	return form.value.delayReason.length <= 50 && form.value.delayReason.length > 0;
});
// 按钮状态
const btnstatus = computed(() => {
	return delaytimestatus.value && delayReasonValid.value;
});
const onSubmitForm = async () => {
	try {
		console.log(form.value);
		const res = await delay(form.value);
		console.log(res);
	} catch (e) {
		//TODO handle the exception
	}
};
</script>

<template>
	<view class="delay">
		<uni-list :border="false">
			<uni-list-item :border="false" title="原定时间" showArrow :right-text="time"></uni-list-item>
			<uni-list-item :border="false" title="延迟时间" showArrow>
				<template v-slot:footer>
					<picker mode="time" @change="getdelaytime" class="time-picker">
						<text v-if="form.delayTime == ''">不可超过2个小时</text>
						<text v-else :class="{ error: !delaytimestatus }">{{ form.delayTime }}</text>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item :border="false" direction="column">
				<template v-slot:body>
					<view class="textarea-wrapper">
						<textarea class="textarea" v-model="form.delayReason" placeholder="请输入延迟提货原因" />
						<text :class="{ error: form.delayReason.length > 50 }" class="words-count">{{ form.delayReason.length }}/50</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :border="false">
				<template v-slot:body>
					<button @click="onSubmitForm" :disabled="!btnstatus" class="button">提交</button>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<style lang="scss">
.delay {
	background-color: $uni-bg-color;
	padding: 30rpx 30rpx env(safe-area-inset-bottom);
	height: calc(100vh - 44px);
}
::v-deep .uni-list {
	border-radius: 16rpx;
	overflow: hidden;
}
::v-deep .uni-list-item__content-title {
	font-size: $uni-font-size-base;
	color: #2a2929;
}

::v-deep .uni-list-item__extra-text {
	font-size: $uni-font-size-base;
	color: #818181;
}
.time-picker {
	color: $uni-minor-text;
	font-size: $uni-font-size-base;
}
.error {
	color: $uni-primary !important;
}

.words-count {
	position: absolute;
	bottom: 10rpx;
	right: 30rpx;
	color: $uni-minor-text;
	font-size: $uni-font-size-small;
}

.button {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	margin: -20rpx auto 20rpx;
	color: #fff;
	font-size: $uni-font-size-big;
	border-radius: 100rpx;
	background-color: $uni-primary;

	&[disabled] {
		background-color: #fadcd9 !important;
	}
}
</style>
