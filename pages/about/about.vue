<template>
	<view class="container">
		<view class="text">
			<view>功能: 缺陷跟踪系统</view>
			<view>标准: 参照
				<a href="http://demo.mantisbt.org/" target="_blank">Mantis Bug Tracker</a>开发
			</view>
			<view>版本: V1.0.0</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 90vh;
		font-size: 38rpx;
	}
	
	.text {
		padding: 50rpx;
		text-align: left;
		width: 600rpx;
		background-color: #E5E5E5;
		border-radius: 20rpx;
		line-height: 80rpx;
	}
</style>
