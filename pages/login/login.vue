<template>
	<view class="container">
		<view class="text">
			<view>User</view>
			<input type="text" v-model="user" />
			<view style="margin-top: 20rpx;">Password</view>
			<input type="text" v-model="pwd" password="true" />

			<view class="uni-btn-v">
				<button type="default" @click="login">Login</button>
				<button type="default" @click="clear">Clear</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: 'test',
				pwd: 'test'
			}
		},
		methods: {
			login: function() {
				if (this.user == 'test' && this.pwd == 'test') {
					uni.navigateTo({
						url: '../index/index?user=' + this.user
					});
				} else {
					uni.showToast({
						title:"Login failure.",
						icon:'none'
					})
				}
			},
			clear: function() {
				this.user = '';
				this.pwd = '';
			}
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
		font-size: 35rpx;
	}

	.text {
		padding: 50rpx;
		text-align: left;
		width: 600rpx;
		background-color: #E5E5E5;
		border-radius: 20rpx;
		line-height: 80rpx;
	}

	.uni-btn-v {
		display: flex;
		margin-top: 30rpx;
	}

	input {
		color: #000000;
		background-color: #FFFFFF;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #C0C0C0;
	}
</style>
