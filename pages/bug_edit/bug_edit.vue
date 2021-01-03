<template>
	<view class="container">
		<view class="uni-list">
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
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="bug.type" />
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
				<textarea class="uni-list-cell-db" style="height: 150rpx;" v-model="bug.remarks" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">上传文件 </view>
				<input class="uni-list-cell-db" name="input" placeholder="" @click="uploadFile" v-model="bug.attachments" />
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">状态</view>
				<view class="uni-list-cell-db">
					<picker @change="bindStatusChange" :value="index_Status" :range="arrStatus">
						<view class="uni-input">{{bug.status}}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="uni-btn-v">
			<button type="default" @click="save">Submit</button>
			<button type="default" @click="clear">Reset</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bug: {
					project: '',
					type: '',
					frequency: '',
					ponderance: '',
					priority: '',
					
					version: '',
					title: '',
					remarks: '',
					attachments: '',
					status: '',
					
					_id: '',
					created_date: '',
					last_modified_date: ''
				},
				
				index_Product: 0,
				index_Frequency: 0,
				index_Ponderance: 0,
				index_Priority: 0,
				index_Status: 0,
				
				// 项目
				arrProduct: ['A4', 'A7', 'ES1', 'SL4'],
				// 出现频率
				arrFrequency: ['总是', '有时', '随机', '没有试验', '无法重现', '不适用'],
				// 严重性
				arrPonderance: ['新功能', '细节', '文字', '小调整', '小错误', '很严重', '崩溃', '宕机'],
				// 优先级
				arrPriority: ['无', '低', '中', '高', '小错误', '紧急', '非常紧急'],
				// 状态
				arrStatus: ['新建', '反馈', '认可', '已确认', '已解决', '已关闭']
			}
		},
		onLoad(option) {
			this.init();
			this.bug.project = option.page;
			if (option.item != 'null') {
				this.bug = JSON.parse(decodeURIComponent(option.item));
			}
		},
		methods: {
			init: function() {
				this.bug.project = this.arrProduct[0];
				this.bug.type = "";
				this.bug.frequency = this.arrFrequency[0];
				this.bug.ponderance = this.arrPonderance[0];
				this.bug.priority = this.arrPriority[0];
				
				this.bug.version = "";
				this.bug.title = "";
				this.bug.remarks = "";
				this.bug.attachments = "";
				this.bug.status = this.arrStatus[0];
				
				this.bug._id = "";
				this.bug.created_date = "";
				this.bug.last_modified_date = "";
			},
			bindProductChange: function(e) {
				this.index_Product = e.target.value;
				this.bug.project = this.arrProduct[this.index_Product];
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
			},
			save: function(e) {
				var that = this;
				that.bug.created_date = that.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				that.bug.last_modified_date = that.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				
				uniCloud.callFunction({
					name: "add_bug",
					data: {
						project: that.bug.project,
						type: that.bug.type,
						frequency: that.bug.frequency,
						ponderance: that.bug.ponderance,
						priority: that.bug.priority,
						
						version: that.bug.version,
						title: that.bug.title,
						remarks: that.bug.remarks,
						attachments: that.bug.attachments,
						status: that.bug.status,
						
						_id: that.bug._id,
						created_date: that.bug.created_date,
						last_modified_date: that.bug.last_modified_date
					},
					success(res) {
						if (that.bug._id == '')
							that.bug._id = res.result.data;
						//console.log(JSON.stringify(res));
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
			clear: function(e) {
				this.init();
			},
			uploadFile: function() {
				var that = this;
				uni.chooseImage({
				    count: 1,
				    success(res) {
				        //console.log(res);
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0];
							let date = new Date();
							let cloudPath = that.dateFormat("YYYYmmdd-HHMMSS", date) + ".jpg";
							
				            uniCloud.uploadFile({
				                filePath: filePath,
								cloudPath: cloudPath,
				                success(e) {
									if (e.success) {
										console.log(e.fileID);
									} else {
										uni.showToast({
											title:"上传文件失败",
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
				        }
				    }
				});
			},
			dateFormat: function(fmt, date) {
			    let ret;
			    const opt = {
			        "Y+": date.getFullYear().toString(),        // 年
			        "m+": (date.getMonth() + 1).toString(),     // 月
			        "d+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "M+": date.getMinutes().toString(),         // 分
			        "S+": date.getSeconds().toString()          // 秒
			        // 有其他格式化字符需求可以继续添加，必须转化成字符串
			    };
			    for (let k in opt) {
			        ret = new RegExp("(" + k + ")").exec(fmt);
			        if (ret) {
			            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			        };
			    };
			    return fmt;
			},
			
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
</style>
