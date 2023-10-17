<script setup>
import { ref } from 'vue';
const phoneForm = ref();
const formData = ref({
	phone: '',
	code: ''
});
const phoneRules = ref({
	phone: {
		rules: [
			{
				required: true,
				errorMessage: '请输入已绑定手机'
			},
			{
				pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
				errorMessage: '手机号格式不正确'
			}
		]
	},
	code: {
		rules: [
			{
				required: true,
				errorMessage: '请输入验证码'
			},
			{
				pattern: /^\d{6}$/,
				errorMessage: '验证码格式不正确'
			}
		]
	}
});
const submit = async () => {
	let formData = await phoneForm.value.validate();
	console.log(formData);
};
</script>

<template>
	<view class="bindphone">
		<uni-forms ref="phoneForm" :modelValue="formData" :rules="phoneRules">
			<uni-forms-item name="phone">
				<input placeholder-style="color: #818181" type="text" v-model="formData.phone" placeholder="请输入已绑定手机号" />
			</uni-forms-item>
			<uni-forms-item name="code">
				<input placeholder-style="color: #818181" v-model="formData.code" type="text" placeholder="请输入验证码" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit-button" @click="submit">下一步</button>
	</view>
</template>

<style lang="scss">
.bindphone {
	padding: 66rpx;
}
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
