<script setup>
import { ref, onMounted } from 'vue';
import { getMessage, getReadAll } from '@/api/message.js';
const isEmpty = ref(false);
const nextPage = ref(0);
const hasMore = ref(false);
const isTriggered = ref(false);
const taskList = ref([]);
const getnotify = async () => {
	try {
		nextPage.value += 1;
		const res = await getMessage(201, nextPage.value, 5);
		if (nextPage.value === 1) taskList.value = [];
		taskList.value = [...taskList.value, ...(res.data.items || [])];
		hasMore.value = nextPage.value >= result.data.pages;
		isEmpty.value = taskList.value.length === 0;
	} catch (e) {
		//TODO handle the exception
	}
};
onMounted(() => {
	getnotify();
});
const handleAllRead = async () => {
	try {
		await getReadAll(201);
		nextPage.value = 0;
		getnotify();
	} catch (e) {
		//TODO handle the exception
	}
};
const onScrollToLower = () => {
	if (hasMore.value) return;
	getnotify();
};
const onRefresh = async () => {
	isTriggered.value = true;
	nextPage.value = 0;
	await getnotify();
	isTriggered.value = false;
};
</script>

<template>
	<scroll-view
		class="notify"
		refresher-background="#f4f4f4"
		:refresher-triggered="isTriggered"
		@refresherrefresh="onRefresh"
		refresher-enabled
		@scrolltolower="onScrollToLower"
		scroll-y="true"
	>
		<view class="scroll-view-wrapper">
			<view @click="handleAllRead" class="message-action">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-card :is-shadow="false" v-for="(item, index) in taskList" :key="index">
				<view class="brief">{{ item.content }}</view>
				<view class="extra">
					<text class="time">{{ item.created }}</text>
					<navigator class="link" url="/subpkg_message/content/index">查看详情</navigator>
				</view>
				<template v-slot:title>
					<view :class="{ unread: item.isRead === 0 }" class="title">{{ item.title }}</view>
				</template>
			</uni-card>
			<view class="tips" v-if="hasMore">已经到达底部了~</view>
		</view>
		<view v-if="isEmpty" class="message-blank">暂无消息</view>
	</scroll-view>
</template>

<style lang="scss">
.notify {
	height: calc(100vh - 138px);
	padding-bottom: 15px;
}
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
.title {
	height: 100rpx;
	font-size: 28rpx;
	color: #000;
	font-weight: 600;
	border-bottom: 2rpx solid #eee;
	display: flex;
	align-items: center;
}

.unread::after {
	content: '';
	display: block;
	width: 16rpx;
	height: 16rpx;
	line-height: 1;
	margin-left: 6rpx;
	background-color: $uni-primary;
	border-radius: 50%;
}

.brief {
	margin-top: 20rpx;
	font-size: $uni-font-size-small;
	color: $uni-minor-text;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	/*设置子元素排列方式*/
	-webkit-box-orient: vertical;
	/*设置显示的行数，多出的部分会显示为...*/
	-webkit-line-clamp: 1;
}

.extra {
	display: flex;
	justify-content: space-between;
	margin: 40rpx 0 10rpx;
	font-size: 28rpx;
}

.time {
	color: $uni-minor-text;
}

.link {
	display: flex;
	align-items: center;
	height: 44rpx;
	padding: 0 20rpx;
	color: $uni-primary;
	border: 2rpx solid $uni-primary;
	border-radius: 60rpx;
}

.tips {
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20rpx;
	color: #ccc;
}
</style>
