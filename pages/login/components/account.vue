<script setup>
import { ref } from 'vue';
import { login } from '@/api/user.js';
import { useUserStore } from '@/stores/user.js';
import { onLoad } from '@dcloudio/uni-app';
const store = useUserStore();
const formData = ref({
	account: '',
	password: ''
});
const redirectURL = ref('');
const routeType = ref('');
onLoad((e) => {
	redirectURL.value = e.redirectUrl;
	routeType.value = e.routeType;
});
const accountForm = ref();
const accountRules = ref({
	account: {
		rules: [
			{
				required: true,
				errorMessage: '请输入登录账号'
			},
			{
				pattern: /^[a-zA-Z0-9]{6,8}$/,
				errorMessage: '登录账号格式不正确'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入登录密码'
			},
			{
				pattern: /^\d{6}$/,
				errorMessage: '登录密码格式不正确'
			}
		]
	}
});
const submit = async () => {
	try {
		let formData = await accountForm.value.validate();
		console.log(formData);
		let res = await login(formData);
		console.log(res);
		store.token = res.data;
		console.log(redirectURL.value, routeType.value);
		if (routeType.value !== undefined) {
			uni[routeType.value]({
				url: redirectURL.value
			});
		} else {
			uni.switchTab({
				url: '/pages/my/my'
			});
		}
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
};
</script>
<template>
	<uni-forms ref="accountForm" :modelValue="formData" :rules="accountRules">
		<uni-forms-item name="account">
			<input placeholder-style="color: #818181" type="text" v-model="formData.account" placeholder="请输入账号" />
		</uni-forms-item>
		<uni-forms-item name="password">
			<input placeholder-style="color: #818181" v-model="formData.password" type="password" placeholder="请输入密码" />
		</uni-forms-item>
	</uni-forms>
	<button class="submit-button" @click="submit">登录</button>
</template>

<style lang="scss">
.uni-forms {
	.uni-forms-item {
		height: 100rpx;
		margin-bottom: 20 !important;
		border-bottom: 2rpx solid #eee;
		box-sizing: border-box;

		::v-deep .uni-forms-item__content {
			display: flex;
			align-items: center;
		}

		::v-deep input {
			width: 100%;
			font-size: $uni-font-size-base;
			color: $uni-minor-text;
		}
	}

	::v-deep .uni-forms-item__error {
		width: 100%;
		padding-top: 10rpx;
		border-top: 2rpx solid $uni-primary;
		color: $uni-primary;
		font-size: $uni-font-size-small;
		transition: none;
	}
}

.submit-button {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	border: none;
	background: $uni-primary;
	border-radius: 49.54rpx;
	margin-top: 80rpx;
	font-size: $uni-font-size-big;
	color: #fff;
}

.disabled {
	background-color: #fadcd9;
	color: #fff;
}
</style>
