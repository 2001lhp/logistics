<script setup>
import { ref, onMounted } from 'vue';
import { getMessage } from '@/api/message.js';
// import { onLoad } from '@dcloudio/uni-app';

const isEmpty = ref(false);
const hasMore = ref(false);
const announceInfo = ref({});
const announceList = ref([]);
const nextPage = ref(0);
const isTriggered = ref(false);
const getannounce = async () => {
	try {
		nextPage.value += 1;
		const result = await getMessage('200', nextPage.value, 5);
		if (nextPage.value === 1) announceList.value = [];
		announceInfo.value = result.data;
		announceList.value = [...announceList.value, ...(result.data.items || [])];
		hasMore.value = nextPage.value >= announceInfo.value.pages;
		isEmpty.value = announceList.value.length === 0;
	} catch (e) {
		console.log(e);
	}
};
onMounted(() => {
	getannounce();
});
const onScrollToLower = () => {
	if (hasMore.value) return;
	getannounce();
};

const onRefresh = async () => {
	isTriggered.value = true;
	nextPage.value = 0;
	await getannounce();
	isTriggered.value = false;
};
</script>

<template>
	<scroll-view
		class="announce"
		refresher-background="#f4f4f4"
		:refresher-triggered="isTriggered"
		@refresherrefresh="onRefresh"
		refresher-enabled
		@scrolltolower="onScrollToLower"
		scroll-y="true"
	>
		<view class="scroll-view-wrapper" v-if="announceList.length > 0">
			<view class="message-action">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-list>
				<uni-list-item
					v-for="(item, index) in announceList"
					:key="item.id"
					:title="item.title"
					:right-text="item.created"
					ellipsis="1"
					:to="`/subpkg_message/content/index?id=${item.id}`"
				>
					<template v-slot:header>
						<text class="dot"></text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-if="isEmpty" class="message-blank">暂无消息</view>
	</scroll-view>
</template>

<style lang="scss">
.scroll-view-wrapper {
	.message-action {
		padding: 30rpx 44rpx 30rpx;

		color: $uni-minor-text;
		font-size: 28rpx;

		.icon-clear {
			margin-right: 16rpx;
			font-size: 96%;
		}
	}

	.dot {
		display: block;
		width: 16rpx;
		height: 16rpx;
		background-color: $uni-primary;
		border-radius: 50%;
		align-self: center;
		margin-right: 10rpx;
		position: absolute;
		left: 24rpx;
	}
}

::v-deep .uni-list {
	margin: 0 30rpx;
	border-radius: 16rpx;
	margin-bottom: 30rpx;
	overflow: hidden;
}

::v-deep .uni-list-item__content-title {
	font-size: 30rpx !important;
	padding-left: 20rpx;
}
::v-deep .uni-list-item__extra-text {
	font-size: 28rpx !important;
	color: $uni-minor-text !important;
}
.message-blank {
	position: absolute;
	left: 50%;
	top: 40%;
	width: 201rpx;
	text-align: center;
	padding-top: 130rpx;
	background-image: url(https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/blank%402x.png);
	background-size: contain;
	background-repeat: no-repeat;
	font-size: 24rpx;
	color: $uni-minor-text;
	transform: translate(-50%, -100%);
}
.scroll-view {
	height: 100%;
	overflow: hidden;
}
</style>
