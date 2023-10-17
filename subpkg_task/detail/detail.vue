<script setup>
import { ref } from 'vue';
import { taskDetail } from '@/api/task.js';
import { onLoad } from '@dcloudio/uni-app';
const info = ref({});
const getInfo = async (id) => {
	const res = await taskDetail(id);
	console.log(res);
	info.value = res.data;
};
onLoad((e) => {
	// console.log(e);
	getInfo(e.id);
});
</script>

<template>
	<view class="detail">
		<view class="search">
			<!-- #ifdef APP-PLUS || MP -->
			<text class="iconfont icon-scan"></text>
			<!-- #endif -->

			<!-- #ifdef H5 -->
			<text class="iconfont icon-search"></text>
			<!-- #endif -->
			<input type="text" placeholder="输入运单号" />
		</view>
		<scroll-view scroll-y="true">
			<view class="basic-info">
				<view class="title">基本信息</view>
				<view class="time-line">
					<view class="line">{{ info.startAddress }}</view>
					<view class="line">{{ info.endAddress }}</view>
					<navigator hover-class="none" class="guide">
						<text class="iconfont icon-guide"></text>
						<text>开始导航</text>
					</navigator>
				</view>
				<view class="info-list">
					<view class="item">
						<text class="label">任务编号</text>
						<text class="value">{{ info.transportTaskId }}</text>
					</view>
					<template v-if="info.status >= 1">
						<view class="item">
							<text class="label">联系人</text>
							<text class="value">{{ info.startHandoverName }}</text>
						</view>
						<view class="item">
							<text class="label">联系电话</text>
							<text class="value">{{ info.startHandoverPhone }}</text>
						</view>
						<view class="item">
							<text class="label">预计提货时间</text>
							<text class="value">{{ info.planDepartureTime }}</text>
						</view>
						<view class="item">
							<text class="label">实际提货时间</text>
							<text class="value">{{ info.actualDepartureTime }}</text>
						</view>
					</template>
					<template v-if="info.status >= 2">
						<view class="item">
							<text class="label">交付联系人</text>
							<text class="value">{{ info.finishHandoverName }}</text>
						</view>
						<view class="item">
							<text class="label">联系电话</text>
							<text class="value">{{ info.finishHandoverPhone }}</text>
						</view>
						<view class="item">
							<text class="label">预计送达时间</text>
							<text class="value">{{ info.planArrivalTime }}</text>
						</view>
						<view class="item">
							<text class="label">实际送达时间</text>
							<text class="value">{{ info.actualArrivalTime }}</text>
						</view>
					</template>
				</view>
			</view>
		</scroll-view>
		<view class="toolbar" v-if="info.status === 1">
			<navigator :url="`/subpkg_task/delay/delay?id=${info.id}&time=${info.planDepartureTime}`" hover-class="none" class="button secondary">延迟提货</navigator>
			<navigator :url="`/subpkg_task/pickup/pickup?id=${info.id}`" hover-class="none" class="button primary">提货</navigator>
		</view>
		<view class="toolbar" v-if="info.status === 2">
			<navigator :url="`/subpkg_task/except/except?id=${info.transportTaskId}`" hover-class="none" class="button secondary">异常上报</navigator>
			<navigator :url="`/subpkg_task/delivery/delivery?id=${info.id}`" hover-class="none" class="button primary">交付</navigator>
		</view>
		<view class="toolbar" v-if="info.status === 4">
			<navigator :url="`/subpkg_task/record/record?id=${info.transportTaskId}&time=${info.actualDepartureTime}`" hover-class="none" class="button primary">回车登记</navigator>
		</view>
	</view>
</template>

<style lang="scss">
.detail {
	background-color: $uni-bg-color;
	// background-color: aqua;
	height: calc(100vh - 44px);

	.search {
		background-color: #fff;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		position: relative;
		.icon-scan,
		.icon-search {
			position: absolute;
			top: 50%;
			left: 40rpx;
			padding: 20rpx;
			font-weight: 600;
			transform: translateY(-50%);
			color: $uni-minor-text;
			font-size: $uni-font-size-base;
		}
		input {
			height: 64rpx;
			background-color: #f4f4f4;
			border-radius: 64rpx;
			padding-left: 80rpx;
			font-size: $uni-font-size-small;
		}
	}
	.basic-info {
		// padding: 30rpx;
		background-color: #fff;
		padding: 30rpx 30rpx 20rpx;
		border-radius: 16rpx;
		background-color: #fff;
		margin: 30rpx;
		box-sizing: border-box;

		.hr {
			border-top: 1rpx solid #f4f4f4;
			margin: 20rpx 0;
		}

		.title {
			padding-bottom: 10rpx;
			margin-bottom: 30rpx;
			font-size: $uni-font-size-base;
			color: #000;
		}

		.time-line {
			min-height: 110rpx;
			position: relative;
			padding: 0 140rpx 0 30rpx;
			margin-left: 30rpx;
			border-left: 2rpx dashed #f4f4f4;

			&::before,
			&::after {
				display: block;
				position: absolute;
				width: 44rpx;
				height: 44rpx;
				left: -24rpx;
				color: #ffffff;
				font-size: 24rpx;
				border-radius: 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			&::before {
				top: -1rpx;
				content: '起';
				background: #2a2929;
			}

			&::after {
				content: '止';
				bottom: -1rpx;
				background: #ef4f3f;
			}

			.line {
				font-size: $uni-font-size-small;
				color: $uni-minor-text;
				margin-top: 30rpx;

				&:first-child {
					margin-top: 0;
				}
			}

			.guide {
				position: absolute;
				right: 0;
				top: 50%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				text-align: center;
				font-size: 24rpx;
				transform: translateY(-50%);

				.iconfont {
					margin-bottom: 10rpx;
					font-size: 40rpx;
				}
			}
		}

		.info-list {
			padding: 20rpx 10rpx 0;
			margin-top: 40rpx;
			border-top: 2rpx solid #f4f4f4;

			.item {
				display: flex;
				justify-content: space-between;
				line-height: 1;
				padding: 20rpx 0;
				font-size: $uni-font-size-small;

				.label {
					color: $uni-minor-text;
				}

				.value {
					color: #000;
				}
			}
		}
	}

	.toolbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 30rpx calc(env(safe-area-inset-bottom) + 30rpx);
		font-size: $uni-font-size-base;
		background-color: #fff;
		position: fixed;
		bottom: 0;

		.button {
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			/* #ifdef APP */
			padding-top: 4rpx;
			/* #endif */
			border-radius: 100rpx;
			font-size: $uni-font-size-big;
		}

		.secondary {
			width: 250rpx;
			color: #000;
			background-color: #e6e6e6;
		}

		.primary {
			width: 400rpx;
			color: #fff;
			background-color: $uni-primary;

			&.block {
				width: 690rpx;
			}

			&[disabled] {
				background-color: #fadcd9;
			}
		}
	}
}
</style>
