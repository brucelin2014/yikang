<template>
	<view class="container">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">设备名称</view>
				<input class="uni-list-cell-db" name="input" placeholder="" v-model="device.name" />
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">硬盘序列号</view>
				<view class="uni-list-cell-db">{{device.serial_number}}</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">网卡序列号</view>
				<view class="uni-list-cell-db">{{device.mac}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">ip地址</view>
				<view class="uni-list-cell-db">{{device.ip_address}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">可用空间</view>
				<view class="uni-list-cell-db">{{device.available_space}}</view>
			</view>

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">注册日期</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(device.registration_date)}}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">有效日期</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(device.available_date)}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">温度</view>
				<view class="uni-list-cell-db">{{device.temperature}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">湿度</view>
				<view class="uni-list-cell-db">{{device.humidity}}</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">创建日期</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(device.created_date)}}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">最后更新</view>
				<view class="uni-list-cell-db">{{$datetime.substrDate(device.last_modified_date)}}</view>
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
				device: {
					name: '',
					serial_number: '',
					mac: '',
					ip_address: '',
					available_space: '',
					
					registration_date: '',
					available_date: '',
					temperature: '',
					humidity: '',

					_id: '',
					created_date: '',
					last_modified_date: '',
				},
				
				status_class: 'uni-input'
			}
		},
		onLoad(option) {
			this.init();
			this.device.project = option.page;
			if (option.item != 'null' && option.item != undefined) {
				//console.log(decodeURIComponent(option.item));
				this.device = JSON.parse(decodeURIComponent(option.item));
				//this.status_class = this.getStatusClass(this.getStatusIndex(this.device.status));
			}
		},
		methods: {
			init: function() {
				this.device.name = "";
				this.device.serial_number = "";
				this.device.mac = "";
				this.device.ip_address = "";
				this.device.available_space = "";
				
				this.device.registration_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				this.device.available_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				this.device.temperature = "";
				this.device.humidity = "";
				
				this.device._id = "";
				this.device.created_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				this.device.last_modified_date = this.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				
				this.status_class = this.getStatusClass(0);
			},
			save: function(e) {
				var that = this;
				if (that.device._id == '')
					that.device.created_date = that.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				that.device.last_modified_date = that.$datetime.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
				that.uploadFile(function() {
					//console.log(JSON.stringify(that.device));
					uniCloud.callFunction({
						name: "add_device",
						data: {
							name: that.device.name,
							serial_number: that.device.serial_number,
							mac: that.device.mac,
							ip_address: that.device.ip_address,
							available_space: that.device.available_space,
							
							registration_date: that.device.registration_date,
							available_date: that.device.available_date,
							temperature: that.device.temperature,
							humidity: that.device.humidity,
							
							_id: that.device._id,
							created_date: that.device.created_date,
							last_modified_date: that.device.last_modified_date
						},
						success(res) {
							if (that.device._id == '')
								that.device._id = res.result.data;
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
		background-color: #dee1e6;
		border-radius: 10rpx;
	}
	.uni-list-cell {
		display: flex;
		padding: 10rpx;
	}
	.uni-list-cell-left {
		display: flex;
		align-items: center;
		width: 27%;
	}
	.uni-list-cell-db {
		color: #000000;
		background-color: #FFFFFF;
		width: 73%;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #dee1e6;
	}
	
	.uni-btn-v {
		display: flex;
		margin: 10rpx;
		width: 100%;
	}
</style>
