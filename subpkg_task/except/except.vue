<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { reportException } from '@/api/task.js';
const id = ref();
onLoad((e) => {
	// console.log(e);
	id.value = e.id;
});
// 异常时间
const exceptionPicker = ref('');
const exceptionTime = computed(() => {
	return exceptionPicker.value || '请选择';
});
// 上报位置
const exceptionPlace = ref('');
const onLocationChoose = async () => {
	try {
		const { address } = await uni.chooseLocation({});
		console.log('address', address);
		exceptionPlace.value = address;
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
};
// 异常类型
const exceptionType = ref('');
const popup = ref('popup');
const exceptionTypes = ['发动机启动困难', '不着车，漏油', '照明失灵', '排烟异常、温度异常', '其他问题'];
const openPopup = () => {
	popup.value.open();
};
const tempException = [];
const onCheckboxChange = (e) => {
	tempException.push(e.detail.value[0]);
	console.log('tempException', tempException);
};
const onPopupConfirm = () => {
	popup.value.close();
	exceptionType.value = tempException.join('|');
};
// 异常描述
const exceptionDescribe = ref('');
// 上传图片
const exceptionPictures = ref([]);
const exceptionImagesList = computed(() => {
	return exceptionPictures.value.map((item) => {
		return {
			url: item.url
		};
	});
});
// 提交
const onSubmit = async () => {
	try {
		const data = {
			transportTaskId: transportTaskId.value,
			exceptionTime: exceptionTime.value,
			exceptionPlace: exceptionPlace.value,
			exceptionType: exceptionType.value,
			exceptionImagesList: exceptionImagesList.value
		};
		const res = await reportException(data);
		console.log(res);
		uni.reLaunch({
			url: '/pages/task/index'
		});
	} catch (e) {
		//TODO handle the exception
	}
};
</script>

<template>
	<view class="except">
		<scroll-view class="scroll-view" scroll-y>
			<uni-list>
				<uni-list-item title="异常时间" right-text="请选择" link>
					<template v-slot:footer>
						<uni-datetime-picker v-model="exceptionPicker">
							<view class="picker-value">{{ exceptionTime }}</view>
						</uni-datetime-picker>
					</template>
				</uni-list-item>
				<uni-list-item clickable @click="onLocationChoose" title="上报位置" :right-text="exceptionPlace || '请选择'" link></uni-list-item>
				<uni-list-item clickable @click="openPopup" title="异常类型" :right-text="exceptionType || '请选择'" link></uni-list-item>
				<uni-list-item title="异常描述">
					<template v-slot:body>
						<textarea v-model="exceptionDescribe" placeholder="请输入异常描述" />
					</template>
				</uni-list-item>
				<uni-list-item title="上传图片(最多3张)" direction="column">
					<template v-slot:footer>
						<uni-file-picker v-model="exceptionPictures" file-extname="jpg,webp,gif,png" limit="3"></uni-file-picker>
					</template>
				</uni-list-item>
			</uni-list>
			<button class="btn" @click="onSubmit">提交</button>
		</scroll-view>
		<uni-popup ref="popup" type="bottom">
			<view class="box">
				<view class="title">选择类型</view>
				<uni-list>
					<uni-list-item v-for="item in exceptionTypes" :key="item" :title="item">
						<template v-slot:footer>
							<checkbox-group @change="onCheckboxChange">
								<checkbox :value="item" />
							</checkbox-group>
						</template>
					</uni-list-item>
				</uni-list>
				<button @click="onPopupConfirm">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<style lang="scss">
.except {
	background-color: $uni-bg-color;
	height: calc(100vh - 44px);
	.picker-value {
		width: 360rpx;
		color: #818181;
		text-align: right;
		font-size: 28rpx;
	}
	::v-deep .uni-list-item__extra-text {
		font-size: 28rpx;
	}
	.btn {
		width: 400rpx;
		background-color: $uni-primary;
		line-height: 100rpx;
		border-radius: 50rpx;
		color: #fff;
	}
	.box {
		background-color: #fff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		padding: 30rpx;
		.title {
			padding-left: 20rpx;
		}
		.uni-list {
			margin: 20rpx 0;
		}
		button {
			width: 400rpx;
			background-color: $uni-primary;
			line-height: 90rpx;
			border-radius: 45rpx;
			color: #fff;
		}
	}
}
</style>
