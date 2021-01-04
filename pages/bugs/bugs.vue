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
				<td style="padding: 10rpx;">{{item.ponderance}}</td>
				<td style="padding: 10rpx;">{{item.status}}</td>
				<td style="padding: 10rpx;">{{substrDate(item.last_modified_date)}}</td>
				<td style="padding: 10rpx;">{{item.title}}</td>
			</tr>
		</table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrHeader:['分类','严重性','状态','最后更新','摘要'],
				project:'',
				arrData: []
			}
		},
		onLoad(option) {
			this.project = option.page;
			if (option.page != 'null') {
				uni.setNavigationBarTitle({
				　　title: 'Bug Tracker [' + option.page + ']'
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
			substrDate: function(datetime) {
				var index = datetime.indexOf(' ');
				return datetime.substr(0, index);
			}
			
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
