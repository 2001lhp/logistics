<script setup>
import { getProfile, getTask } from '@/api/user.js';
import { ref, onMounted } from 'vue';
const userinfo = ref({});
const taskdata = ref({});
onMounted(async () => {
	let userres = await getProfile();
	// console.log(userres);
	userinfo.value = userres.data;
	let task = await getTask(uni.utils.getYearAndMonth());
	console.log(task);
	taskdata.value = task.data;
});
</script>

<template>
	<view class="my">
		<view class="userinfo">
			<image class="avatar" :src="userinfo.avatar" mode=""></image>
			<text class="username">{{ userinfo.name }}</text>
			<text class="num">司机编号：{{ userinfo.number }}</text>
			<text class="phone">手机号：{{ userinfo.phone }}</text>
		</view>
		<view class="overview">
			<view class="title">本月任务</view>
			<view class="content">
				<view class="item">
					<view class="num">{{ taskdata.taskAmounts }}</view>
					<text>任务总量</text>
				</view>
				<view class="item">
					<view class="num">{{ taskdata.completedAmounts }}</view>
					<text>完成任务量</text>
				</view>
				<view class="item">
					<view class="num">{{ taskdata.transportMileage }}</view>
					<text>运输里程(km)</text>
				</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item to="/subpkg_user/truck/truck" title="车辆信息" link></uni-list-item>
				<uni-list-item to="/subpkg_user/task/task" title="任务数据" link></uni-list-item>
				<uni-list-item to="/subpkg_user/settings/settings" title="系统设置" link></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<style lang="scss">
@import url('./index.scss');
</style>
