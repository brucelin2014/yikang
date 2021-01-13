<template>
	<view class="container" :style="{'height': windowHeight}">
		<marquee class="message" behavior="scroll">{{settings.message}}</marquee>
		<view class="products">
			<view v-for="(item,index) in arrProduct" :key="index" class="product_item" @click="goto(item)">
				{{item}}
			</view>
		</view>

		<view class="quick_menu">
			<view class="memu_item" @click="report">
				<view class="report">
					<uni-icons type="pengyouquan" size="35" color="#ffffff"></uni-icons>
				</view>
				<view class="memu_item_title">
					Report
				</view>
			</view>
			
			<view class="memu_item" @click="add">
				<view class="new">
					<uni-icons type="plusempty" size="35" color="#ffffff"></uni-icons>
				</view>
				<view class="memu_item_title">
					Add
				</view>
			</view>
			
			<view class="memu_item" @click="download">
				<view class="download">
					<uni-icons type="cloud-download" size="30" color="#ffffff"></uni-icons>
				</view>
				<view class="memu_item_title">
					Download
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				windowHeight: 0,
				arrProduct: ['A4', 'A7', 'ES1', 'SL4'],
				settings: {
					download_path: '',
					version: '',
					message: ''
				}
			}
		},
		onLoad(option) {
			this.user = option.user;
			//console.log(this.user);
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight + "px";
					//console.log(this.windowHeight);
				}
			});
			this.loadDataOnLine();
		},
		methods: {
			goto: function(page) {
				//console.log(page);
				uni.navigateTo({
					url: '../bugs/bugs?page=' + page
				});
			},
			add: function() {
				uni.navigateTo({
					url: '../bug_edit/bug_edit?page=A4&item=' + null
				});
			},
			report: function() {
				uni.showToast({
					icon:'none',
					title:'Please look forward.'
				})
			},
			download: function() {
				uni.showToast({
					icon:'none',
					title:'Please look forward.'
				})
			},
			onNavigationBarButtonTap: function(e) {
				//console.log(e.text);
				//console.log(e.fontSize);
				//console.log(e.index);
				switch (e.index){
					case 0:
						uni.navigateTo({
							url: '../about/about'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '../share/share'
						});
						break;
					default:
						break;
				}
			},
			// 查找云端数据
			loadDataOnLine: function() {
				var that = this;
				uniCloud.callFunction({
					name: "get_settings",
					data: {
					},
					success(res) {
						that.settings = res.result.data[0];
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
	}

	.products {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;

		width: 80%;
		height: 55%;
		font-size: 60rpx;
		border-radius: 20rpx;
		background-color: #dee1e6;
		margin-bottom: 10%;
	}

	.product_item {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
		margin: 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
	}

	.product_item:hover {
		background-color: #2196f3;
		color: #FFFFFF;
	}

	.quick_menu {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		width: 80%;
		bottom: 50rpx;
	}
	.memu_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		margin-left: 5%;
		margin-right: 5%;
	}
	.memu_item_title {
		text-align: center;
		margin-top: 10rpx;
		font-size: 30rpx;
	}

	.new,
	.report,
	.download {
		display: flex;
		justify-content: center;
		
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		background-color: #999999;
		line-height: 100rpx;
	}

	.new {
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		background-color: #2196F3;
	}

	.new:hover,
	.report:hover,
	.download:hover {
		background-color: #4CD964;
	}
	
	.message {
		position: absolute;
		width: 90%;
		top: 80rpx;
		
		font-size: 35rpx;
	}
</style>
