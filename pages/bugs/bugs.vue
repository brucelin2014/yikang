<template>
	<view class="container">
		<table width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<th v-for="(item,index) in arrHeader" :key="index" class="header">
					{{item}}
				</th>
			</tr>
			<tr v-for="(item,index) in arrData" :key="index" :class="index % 2 == 0 ? 'content' : 'content2'" @click="edit(item)">
				<td style="padding: 10rpx;">{{item.number}}</td>
				<td style="padding: 10rpx;">{{item.type}}</td>
				<td style="padding: 10rpx;">{{item.ponderance}}</td>
				<td style="padding: 10rpx;" :class="getStatusClass(getStatusIndex(item.status))">{{item.status}}</td>
				<td style="padding: 10rpx;">{{$datetime.substrDate(item.last_modified_date)}}</td>
				<td style="padding: 10rpx;">{{item.title}}</td>
			</tr>
		</table>

		<view class="quick_menu" :style="{right: isLandscape ? '49%' : '50rpx'}">
			<view class="memu_item" @click="add">
				<view class="new">
					<uni-icons type="plusempty" size="35" color="#ffffff"></uni-icons>
				</view>
				<view class="memu_item_title" v-if="isLandscape">
					Add
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrHeader: ['编号', '分类', '严重性', '状态', '最后更新', '摘要'],
				project: '',
				arrData: [],
				// 问题状态
				arrStatus: ['新建', '反馈', '认可/公认', '已确认', '已分派', '已解决', '已关闭'],
				isLandscape: false // 是否横屏
			}
		},
		onLoad(option) {
			this.project = option.page;
			if (option.page != 'null') {
				uni.setNavigationBarTitle({
					title: 'Bug Tracker [' + option.page + ']'
				})
			}
			//this.loadDataOnLine(1, 100);
			
			uni.getSystemInfo({
				success: (res) => {
					if (res.windowWidth > res.windowHeight)
						this.isLandscape = true;
				}
			});
		},
		onShow: function() {
			console.log('App Show');
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
						filter: {
							"project": that.project
						}
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
			getStatusClass: function(index) {
				switch (index) {
					case 0:
						return 'status_new';
					case 1:
						return 'status_feedback';
					case 2:
						return 'status_acknowledged';
					case 3:
						return 'status_confirmed';
					case 4:
						return 'status_assigned';
					case 5:
						return 'status_resolved';
					case 6:
						return 'status_closed';
					default:
						return 'status_new';
				}
			},
			getStatusIndex: function(status) {
				var size = this.arrStatus.length;
				for (var i = 0; i < size; i++) {
					if (status == this.arrStatus[i])
						return i;
				}
				return 0;
			},
			add: function() {
				uni.navigateTo({
					url: '../bug_edit/bug_edit?page=' + this.project + '&item=' + null
				});
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
		background-color: #dee1e6;
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

	.quick_menu {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		bottom: 50rpx;
		right: 50rpx;
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

	.new {
		display: flex;
		justify-content: center;

		border-radius: 100%;
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		background-color: #2196F3;
	}

	.new:hover {
		background-color: #4CD964;
	}
</style>
