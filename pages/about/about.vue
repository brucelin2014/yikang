<template>
	<view class="container">
		<view class="text">
			<view>功能: 缺陷跟踪系统</view>
			<view>标准: 参考
				<a href="http://demo.mantisbt.org/" target="_blank">Mantis Bug Tracker</a>开发
			</view>
			<view>版本: {{version}}</view>
			<view>安卓APP: 扫码下载</view>
			<view class="qrimg">
			    <tki-qrcode
			    ref="qrcode"
			    :val="val"
			    :size="size"
			    :background="background"
			    :foreground="foreground"
			    :pdground="pdground"
			    :lv="lv"
			    :onval="onval"
			    :loadMake="loadMake" />
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		comments: {
			tkiQrcode
		},
		data() {
			return {
				settings: {
					download_path: '',
					version: '',
					message: ''
				},
				version: '',
				val: '',
				size: 200,
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				icon: '',
				iconsize: '45',
				lv: 1,
				onval: true,
				loadMake: true,
				src: ''
			}
		},
		onLoad(option) {
			this.loadDataOnLine();
		},
		methods: {
			// 查找云端数据
			loadDataOnLine: function() {
				var that = this;
				uniCloud.callFunction({
					name: "get_settings",
					data: {
					},
					success(res) {
						that.val = res.result.data[0].download_path;
						that.version = res.result.data[0].version;
					},
					fail(e) {
						console.error(e);
					},
					complete() {
						uni.hideLoading();
					}
				});
				uni.showLoading();
			},
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
		background-color: #dee1e6;
		border-radius: 20rpx;
		line-height: 80rpx;
	}
</style>
