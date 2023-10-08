<script setup>
import { ref } from 'vue';
import account from './components/account.vue';
const logintype = ref(false);
</script>
<template>
	<view class="login">
		<view class="box">
			<view class="title">{{ logintype ? '账号登录' : '手机号登录' }}</view>
			<view class="type" @click="logintype = !logintype">
				<text>{{ logintype ? '手机号登录' : '账号登录' }}</text>
				<text class="iconfont icon-caret"></text>
			</view>
		</view>
		<account></account>
	</view>
</template>

<style lang="scss">
@import './index.scss';
</style>
