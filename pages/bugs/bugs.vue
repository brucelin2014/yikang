<template>
	<view class="container">
		<table width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<th v-for="(item,index) in arrHeader" :key="index" class="header">
					{{item}}
				</th>
			</tr>
			<tr v-for="(item,index) in arrData" :key="index" :class="index % 2 == 0 ? 'content' : 'content2'" @click="edit(item)">
				<td style="padding: 10rpx;">{{item.type}}</td>
				<td style="padding: 10rpx;">{{item.frequency}}</td>
				<td style="padding: 10rpx;">{{item.ponderance}}</td>
				<td style="padding: 10rpx;">{{item.priority}}</td>
				
				<td style="padding: 10rpx;">{{item.version}}</td>
				<td style="padding: 10rpx;">{{item.title}}</td>
				<td style="padding: 10rpx;">{{item.status}}</td>
			</tr>
		</table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrHeader:['分类','出现频率','严重性','优先级','产品版本','摘要','状态'],
				project:'',
				arrData: []
			}
		},
		onLoad(option) {
			this.project = option.page;
			if (option.page != 'null') {
				uni.setNavigationBarTitle({
				　　title: 'Bugs [' + option.page + ']'
				})
			}
			this.loadDataOnLine(1, 100);
		},
		methods: {
			edit: function(item) {
				uni.navigateTo({
				    url: '../bug_edit/bug_edit?page=' + item.project + '&item=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			// 查找云端数据
			loadDataOnLine: function(pageIndex, pageSize) {
				var that = this;
				uniCloud.callFunction({
					name: "get_list_bug",
					data: {
						pageIndex: pageIndex,
						pageSize: pageSize,
						filter: {"project": that.project}
					},
					success(res) {
						that.arrData = res.result.data;
						//console.log(JSON.stringify(that.arrData));
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
		padding: 10rpx;
		font-size: 26rpx;
	}
	
	.header {
		padding: 10rpx;
	}
	.content {
		text-align: center;
		background-color: #D3D3D3;
	}
	.content:hover {
		background-color: #F0AD4E;
	}
	.content2 {
		text-align: center;
	}
	.content2:hover {
		background-color: #F0AD4E;
	}
</style>
