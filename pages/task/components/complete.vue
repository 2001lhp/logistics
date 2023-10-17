<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasks } from '@/api/task.js';
const isEmpty = ref(false);
const hasMore = ref(false);
const isTriggered = ref(false);
const onRefresh = () => {};
const onScrollToLower = () => {};
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
		<view>已完成</view>
		<view v-if="isEmpty" class="task-blank">无待提货物</view>
	</scroll-view>
</template>

<style lang="scss"></style>
