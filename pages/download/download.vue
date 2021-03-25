<template>
	<view class="container">
		<view v-for="(item,index) in arrData" class="item">
			<view>{{item.title}}</view>
			<image class="image" mode="aspectFit" :src="item.image" @click="previewImage(item.image)"></image>
			<view style="margin-left:auto; font-size: 20rpx; color: #007AFF;">{{item.last_modified_date}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrData: []
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
					name: "get_list_share",
					data: {},
					success(res) {
						that.arrData = res.result.data;
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
			previewImage: function(src) {
				var arr = [];
				arr.push(src);
				uni.previewImage({
					urls: arr,
					current: 0
				});
			}
			
		}
	}
</script>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
		
		padding: 20rpx;
	}
	
	.item {
		display: flex;
		flex-direction: column;
		
		background-color: #dee1e6;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;
	}

	.image {
		height: 200px;
	}
</style>
