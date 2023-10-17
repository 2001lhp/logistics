<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';
const store = useUserStore();
const show = ref(false);
const flag = ref(false);
const fn = () => {
	if (flag.value) {
	} else {
		store.token = null;
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}
};
</script>

<template>
	<view class="settings">
		<uni-list>
			<uni-list-item to="/subpkg_user/settings/bindPhone" title="换绑手机" link></uni-list-item>
			<uni-list-item title="修改密码" link></uni-list-item>
			<uni-list-item title="消息通知设置" link></uni-list-item>
			<uni-list-item
				title="清理缓存"
				link
				@click="
					show = true;
					flag = true;
				"
			></uni-list-item>
		</uni-list>
		<button
			@click="
				show = true;
				flag = false;
			"
		>
			退出
		</button>
		<view class="box" v-show="show">
			<view class="a">
				<view class="text">{{ flag ? '清理缓存后会清空所有数据' : '确定要退出登录？' }}</view>
				<view class="btn">
					<view @click="show = false">取消</view>
					<view @click="fn">{{ flag ? '清理' : '退出' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
.settings {
	height: calc(100vh - 44px);
	background-color: $uni-bg-color;
	padding: 40rpx 30rpx;
	box-sizing: border-box;
	button {
		width: 100%;
		height: 120rpx;
		margin-top: 80rpx;
		font-size: 32rpx;
		color: #2a2929;
		line-height: 120rpx;
		border: 0;
	}
	.box {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
		.a {
			width: 600rpx;
			background-color: #fff;
			border-radius: 20rpx;
			margin: auto;
			font-size: 32rpx;
			.text {
				text-align: center;
				line-height: 170rpx;
			}
			.btn {
				display: flex;
				:last-child {
					color: #ef4f3f;
				}
				view {
					width: 50%;
					line-height: 100rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
