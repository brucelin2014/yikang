<template>
	<view class="container">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">编号</view>
				<view class="uni-list-cell-db">{{bug.number}}</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">项目</view>
				<view class="uni-list-cell-db">
					<picker @change="bindProductChange" :value="index_Product" :range="arrProduct">
						<view class="uni-input">{{bug.project}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">分类</view>
				<view class="uni-list-cell-db">
					<picker @change="bindTypeChange" :value="index_Type" :range="arrType">
						<view class="uni-input">{{bug.type}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">报告日期</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(bug.created_date)}}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">最后更新</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(bug.last_modified_date)}}</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">出现频率</view>
				<view class="uni-list-cell-db">
					<picker @change="bindFrequencyChange" :value="index_Frequency" :range="arrFrequency">
						<view class="uni-input">{{bug.frequency}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">严重性</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPonderanceChange" :value="index_Ponderance" :range="arrPonderance">
						<view class="uni-input">{{bug.ponderance}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">优先级</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPriorityChange" :value="index_Priority" :range="arrPriority">
						<view class="uni-input">{{bug.priority}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">产品版本</view>
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="bug.version" />
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">摘要</view>
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="bug.title" />
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">描述</view>
				<textarea class="uni-list-cell-db" style="height: 100rpx;" v-model="bug.remarks" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">问题重现步骤</view>
				<textarea class="uni-list-cell-db" style="height: 180rpx;" v-model="bug.steps" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">添加图片 </view>
				<view class="addImage" @click="addFile">
					+
				</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left"></view>
				<image v-for="(item, index) in attachments" :key="index" :src="item.fileID != '' ? item.fileID : item.tempFilePath" class="img" @click="previewImage(index)"></image>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">状态</view>
				<view class="uni-list-cell-db">
					<picker @change="bindStatusChange" :value="index_Status" :range="arrStatus">
						<view :class="status_class">{{bug.status}}</view>
					</picker>
				</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">报告员</view>
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="bug.submitter" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">分派给</view>
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="bug.assigned" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">添加注释</view>
				<view class="addImage" @click="open">
					+
				</view>
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog v-model="selected_reply == null ? '' : selected_reply.reply" :title="selected_reply == null ? '添加注释' : '编辑注释'" mode="input" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
			</view>
			
			<view class="uni-list-cell" v-for="(item, index) in bug.replys" :key="index" @click="editReply(item)">
				<view class="uni-list-cell-left">
					<view style="color: #2196F3; font-size: 18rpx; width: 100%; text-align: right; padding-right: 20rpx;">
						{{item.last_modified_date}}
					</view>
				</view>
				<view class="uni-list-cell-db" >{{item.reply}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-btn-v">
					<button style="width: 40%;" type="default" @click="save">Submit</button>
					<button style="width: 40%;" type="default" @click="clear">New</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bug: {
					number: '',
					project: '',
					type: '',
					frequency: '',
					ponderance: '',
					
					priority: '',
					version: '',
					title: '',
					remarks: '',
					steps: '',
					
					attachments: [],
					status: '',
					submitter: 'Bruce',
					assigned: 'Bruce',
					replys: [], // 添加注释
					
					_id: '',
					created_date: '',
					last_modified_date: '',
				},
				
				index_Product: 0,
				index_Type: 0,
				index_Frequency: 0,
				index_Ponderance: 0,
				index_Priority: 0,
				index_Status: 0,
				status_class: 'uni-input',
				selected_reply: null,
				attachments: [],
				
				// 项目
				arrProduct: ['A4', 'A7', 'ES1', 'SL4'],
				// 類型
				arrType: ['中文简体', '中文繁體', 'English'],
				// 出现频率
				arrFrequency: ['总是', '有时', '随机', '没有试验', '无法重现', '不适用'],
				// 严重性
				arrPonderance: ['新功能', '细节', '文字', '小调整', '小错误', '很严重', '崩溃', '宕机'],
				// 优先级
				arrPriority: ['无', '低', '中', '高', '紧急', '非常紧急'],
				// 问题状态
				arrStatus: ['新建', '反馈', '认可/公认', '已确认', '已分派', '已解决', '已关闭'],
				arrStatus_Eng: ['New', 'Feedback', 'Acknowledged', 'Confirmed', 'Assigned', 'Resolved', 'Closed']
			}
		},
		onLoad(option) {
			this.init();
			this.bug.project = option.page;
			if (option.item != 'null' && option.item != undefined) {
				//console.log(decodeURIComponent(option.item));
				this.bug = JSON.parse(decodeURIComponent(option.item));
				this.status_class = this.getStatusClass(this.getStatusIndex(this.bug.status));
				this.attachments = this.bug.attachments;
			}
			else {
				this.nextNumber();
			}
		},
		methods: {
			init: function() {
				this.bug.number = "";
				this.bug.project = this.arrProduct[0];
				this.bug.type = this.arrType[0];
				this.bug.frequency = this.arrFrequency[0];
				this.bug.ponderance = this.arrPonderance[0];
				
				this.bug.priority = this.arrPriority[0];
				this.bug.version = "";
				this.bug.title = "";
				this.bug.remarks = "";
				this.bug.steps = "";
				
				this.bug.attachments = [];
				this.bug.status = this.arrStatus[0];
				this.bug.submitter = "Bruce";
				this.bug.assigned = "Bruce";
				this.bug.replys = []; // 添加注释
				
				this.bug._id = "";
				this.bug.created_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				this.bug.last_modified_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				
				this.status_class = this.getStatusClass(0);
			},
			bindProductChange: function(e) {
				this.index_Product = e.target.value;
				this.bug.project = this.arrProduct[this.index_Product];
			},
			bindTypeChange: function(e) {
				this.index_Type = e.target.value;
				this.bug.type = this.arrType[this.index_Type];
			},
			bindFrequencyChange: function(e) {
				this.index_Frequency = e.target.value;
				this.bug.frequency = this.arrFrequency[this.index_Frequency];
			},
			bindPonderanceChange: function(e) {
				this.index_Ponderance = e.target.value;
				this.bug.ponderance = this.arrPonderance[this.index_Ponderance];
			},
			bindPriorityChange: function(e) {
				this.index_Priority = e.target.value;
				this.bug.priority = this.arrPriority[this.index_Priority];
			},
			bindStatusChange: function(e) {
				this.index_Status = e.target.value;
				this.bug.status = this.arrStatus[this.index_Status];
				this.status_class = this.getStatusClass(this.index_Status);
			},
			nextNumber: function() {
				var that = this;
				uniCloud.callFunction({
					name: "get_next_number",
					data: {
					},
					success(res) {
						that.bug.number = res.result.data;
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
			save: function(e) {
				var that = this;
				that.bug.created_date = that.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				that.bug.last_modified_date = that.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				that.uploadFile(function() {
					//console.log(JSON.stringify(that.bug));
					uniCloud.callFunction({
						name: "add_bug",
						data: {
							number: that.bug.number,
							project: that.bug.project,
							type: that.bug.type,
							frequency: that.bug.frequency,
							ponderance: that.bug.ponderance,
							
							priority: that.bug.priority,
							version: that.bug.version,
							title: that.bug.title,
							remarks: that.bug.remarks,
							steps: that.bug.steps,
							
							attachments: that.bug.attachments,
							status: that.bug.status,
							submitter: that.bug.submitter,
							assigned: that.bug.assigned,
							replys: that.bug.replys,
							
							_id: that.bug._id,
							created_date: that.bug.created_date,
							last_modified_date: that.bug.last_modified_date
						},
						success(res) {
							if (that.bug._id == '')
								that.bug._id = res.result.data;
							uni.showToast({
								title:"Submit successful.",
								icon:'none'
							})
						},
						fail(e) {
							console.error(e);
						},
						complete() {
							uni.hideLoading();
						}
					});
					uni.showLoading();
				})
			},
			clear: function(e) {
				this.init();
			},
			addFile: function() {
				var that = this;
				uni.chooseImage({
				    count: 1,
				    success(res) {
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0];
							let date = new Date();
							let cloudPath = that.$datetime.dateFormat("YYYYmmdd-HHMMSS", date) + "-" + Math.ceil(Math.random() * 10) + ".jpg";
							
							var attachment = {
								fileName: cloudPath,
								tempFilePath: filePath,
								fileID: ''
							};
							that.attachments.push(attachment);
				        }
				    }
				});
			},
			uploadFile: function(callback) {
				var that = this;
				var size = that.attachments.length;
				for (let i=0; i<size; i++) {
					let attachment = that.attachments[i];
					setTimeout(function() {
						uniCloud.uploadFile({
						    filePath: attachment.tempFilePath,
							cloudPath: attachment.fileName,
						    success(e) {
								if (e.success) {
									//console.log(i + ", " + size);
									attachment.fileID = e.fileID;
									//console.log(JSON.stringify(attachment));
									that.bug.attachments.push(attachment);
									if (i == size - 1) {
										if (callback)
											callback();
									}
								} else {
									uni.showToast({
										title:"Upload file failure.",
										icon:'none'
									})
								}
							},
						    fail(e) {
								console.error(e);
							},
						    complete() {
								uni.hideLoading();
							}
						});
						uni.showLoading();
					}, i * 1000);
				}
			},
			previewImage: function(index) {
				var arr = [];
				for (var i=0; i<this.attachments.length; i++) {
					arr.push(this.attachments[i].fileID != '' ? this.attachments[i].fileID : this.attachments[i].tempFilePath);
				}
				uni.previewImage({
					urls: arr,
					current: index
				});
			},
			getStatusClass: function(index) {
				switch (index){
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
				for (var i=0; i<size; i++) {
					if (this.arrStatus[i] == status)
						return i;
				}
				return 0;
			},
			addReply: function(reply) {
				var replyObj = {
					last_modified_date: this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
					reply: reply
				};
				//console.log(JSON.stringify(replyObj));
				//console.log(JSON.stringify(this.bug.replys));
				this.bug.replys.push(replyObj);	
			},
			open: function() {
				this.selected_reply = null;
				this.$refs.popup.open();
			},
			close: function(done) {
				done();
			},
			confirm: function(done, value) {
				if (this.selected_reply == null)
					this.addReply(value);
				else {
					this.selected_reply.reply = value;
					this.selected_reply.last_modified_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				}
				done();
			},
			editReply: function(item) {
				this.selected_reply = item;
				//console.log(JSON.stringify(item));
				this.$refs.popup.open();
			}
			
		}
		
	}
</script>

<style>
	.container {
		padding: 20rpx;
		font-size: 35rpx;
	}
	
	.uni-list {
		background-color: #F5F5F5;
		border-radius: 10rpx;
	}
	.uni-list-cell {
		display: flex;
		padding: 10rpx;
	}
	.uni-list-cell-left {
		display: flex;
		align-items: center;
		width: 25%;
	}
	.uni-list-cell-db {
		color: #000000;
		background-color: #FFFFFF;
		width: 75%;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #C0C0C0;
	}
	
	.img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.addImage {
		width: 70rpx; 
		height: 70rpx;
		line-height: 70rpx;
		font-size: 60rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		border: 1px solid #C0C0C0;
		text-align: center;
	}
	
	.uni-btn-v{
		display: flex;
		margin: 10rpx;
		width: 100%;
	}
</style>
