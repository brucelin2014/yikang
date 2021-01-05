<template>
	<view class="container" :style="{'height': windowHeight}">
		<view class="products">
			<view v-for="(item,index) in arrProduct" :key="index" class="product_item" @click="goto(item)">
				{{item}}
			</view>
		</view>

		<view class="quick_menu">
			<view class="report" @click="report">◕</view>
			<view class="new" @click="add">+</view>
			<view class="download" @click="download">🠗</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				windowHeight: 0,
				arrProduct: ['A4', 'A7', 'ES1', 'SL4']
			}
		},
		onLoad(option) {
			this.user = option.user;
			console.log(this.user);
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight + "px";
					//console.log(this.windowHeight);
				}
			})
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
				console.log(e.text);
				console.log(e.fontSize);
				uni.navigateTo({
					url: '../about/about'
				});
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.products {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;

		width: 80%;
		height: 60%;
		font-size: 60rpx;
		border-radius: 20rpx;
		background-color: #f3f3f3;
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

	.new,
	.report,
	.download {
		display: flex;
		justify-content: center;

		color: #FFFFFF;
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		background-color: #999999;
		font-size: 100rpx;
		line-height: 110rpx;
		margin-left: 5%;
		margin-right: 5%;
	}

	.new {
		width: 140rpx;
		height: 140rpx;
		line-height: 130rpx;
		background-color: #2196F3;
	}

	.new:hover,
	.report:hover,
	.download:hover {
		background-color: #4CD964;
		color: #FFFFFF;
	}
</style>
