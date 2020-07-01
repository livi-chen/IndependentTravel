<template>
	<view>
		<image class="detail_img" src="../../static/xingchengimg.png"></image>
		<view style="padding: 0 30rpx 0 30rpx;">
			<view class="title">{{xingcheng_title}}</view>
			<view class="detail_infobar">
				<view style="display: flex;align-items: center;">
					<image class="card_userimg" src="../../static/userimg_mini.png"></image>
					<text class="card_username">{{username}}</text>
				</view>
				<text class="detail_fare">¥{{fare}}</text>
			</view>
			<view style="display: flex;flex-direction: row;">
				<view style="margin-right: 60rpx;">
					<text class="module_title" style="margin: 0;" @click="toggle()">日程安排</text>
					<view v-show="flag" class="module_underline" style="width: 128rpx;margin: 0;"></view>
				</view>
				<view>
					<text class="module_title" style="margin: 0;" @click="toggle()">详情</text>
					<view v-show="!flag" class="module_underline" style="margin: 0;"></view>
				</view>
			</view>
			
			<view class="flex" style="margin-top: 30rpx;" v-for="(item,index) in arrange.data" :key="index">
				<view :class="item.leftclass">
					<text style="font-size: 80rpx;">{{index<9?"0"+(index+1):index+1}}</text>
					<view>
						<text style="font-size: 16rpx;">{{item.DayState}}</text>
						<progress :percent="item.percent" :activeColor="item.progressactive" backgroundColor="rgba(65,138,113,0.33)"
						 stroke-width="5" style="border-radius: 8rpx;margin-top: 3px;"></progress>
					</view>
				</view>
				<view style="width:300%;overflow: hidden;font-size: 14px;">
					<text class="common_text" style="margin: 16rpx 50rpx;">{{item.date}}</text>
					<!-- 详细行程 -->
					<view class="cu-timeline" style="background-color: rgba(0,0,0,0);">
						<!-- 	<view class="cu-item text-green cuIcon-radiobox" style="padding: 10rpx 0 10rpx 100rpx;">
							<view class="content card_text card_noticetext">
								<text> {{item.}}-10:20 菲哈后岛,fFihalhohi R...</text>
							</view>
						</view> -->
						<!-- <view class="cu-item">
							<view class="content card_text">
								<text>9:30-10:20 菲哈后岛,fFihalhohi R...</text>
							</view>
						</view> -->
						<view :class="items.activityclass" v-for="(items,sub) in item.activity" :key="sub">
							<view class="content card_text">
								<text space="ensp" :style="items.fontstyle">{{items.start_time}}-{{items.end_time}} {{items.title}},{{items.description}}</text>
								<text v-if="!items.length">暂无安排</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xingcheng_title: "马尔代夫七日游",
				username: "张三SanSan",
				fare: 40231,
				flag: true,
				arrange: [{}],
				leftclass: ['cu-card', 'mxc_leftCard'],
				activityclass: ['cu-item'],
				fontstyle: {
					color: "#979797"
				}
			}
		},
		onReady() {
			this.getAllbillinfo();
		},
		methods: {
			toggle() {
				return this.flag = !this.flag;
			},
			async getAllbillinfo() {
				//读取行程详细信息
				var [error, res] = await uni.request({
					url: BaseApi + '/api/v1/journey/' + this.journey.jid,
					method: "GET"
				})
				this.budget = res.data.budget;
				uni.setNavigationBarTitle({
					title: res.data.name
				});
				//获取账单详情
				uni.request({
					url: BaseApi + "/api/v1/journey/" + this.journey.jid + "/billinfos",
					method: "GET",
					success: (res) => {
						for (var i = 0; i < res.data.billinfos.length; i++) {
							this.fare += res.data.billinfos[i].cost / res.data.billinfos[i].count;
						}
						this.remain = this.budget - this.fare;
					},
					fail: function() {
						console.log("连接失败")
					}
				})
				//获取该行程所有的日程安排
				uni.request({
					url: BaseApi + "/api/v1/journey/" + this.journey.jid + "/activity-by-date",
					method: "GET",
					success: (res) => {
						//判断行程状态
						switch (this.journey.state) {
							//最近出行(进行中)
							case "1":
								this.arrange = res.data;
								this.arrange.data = this.arrange.data.map(i => {
									this.$set(i, "DayState", "trip is over");
									this.$set(i, "percent", 100);
									this.$set(i, "progressactive", "#FFFFFF");
									this.$set(i, "leftclass", ['cu-card', 'mxc_leftCard', 'mxc_bggreen']);
									return i;
								})
								//判断当前是第几天
								for (var i = 0; i < this.arrange.days; i++) {
									this.arrange.data[i].activity = this.arrange.data[i].activity.map(i => {
										this.$set(i, "activityclass", ['cu-item', 'text-green', 'cuIcon-radiobox']);
										this.$set(i, "fontstyle", {
											color: "#000000"
										});
										return i;
									})
									//正在进行的日子
									if (Date.parse(getApp().getDate()) == Date.parse(this.arrange.data[i].date)) {
										this.arrange.data[i].DayState = "on the road"
										console.log("现在是day" + (i + 1));
										var index = 0;
										for (var j = 0; j < this.arrange.data[i].activity.length; j++) {
											//正在进行的活动
											if (Date.parse(getApp().getTime()) < Date.parse(this.arrange.data[i].activity[j].end_time) && Date.parse(
													getApp().getTime()) > Date.parse(this.arrange.data[i].activity[j].start_time)) {
												index = j;
												this.arrange.data[i].activity[j].activityclass = ['cu-item', 'text-green', 'cuIcon-radiobox'];
												this.arrange.data[i].activity[j].fontstyle = {
													color: "#418A71"
												}
											}
											//过去的活动
											else if (Date.parse(getApp().getTime()) < Date.parse(this.arrange.data[i].activity[j].end_time) && Date.parse(
													getApp().getTime()) > Date.parse(this.arrange.data[i].activity[j].start_time)) {
												this.arrange.data[i].activity[j].activityclass = ['cu-item', 'mxc_hide'];
											}
											//未来的活动
											else {
												this.arrange.data[i].activity[j].activityclass = ['cu-item'];
												this.arrange.data[i].activity[j].fontstyle = {
													color: "#979797"
												}
											}
										}
									}
									//已经过去的日子
									else if (Date.parse(getApp().getDate()) < Date.parse(this.arrange.data[i].date)) {
										this.this.arrange.data[i].activity.activityclass = ['cu-item', 'text-green', 'cuIcon-radiobox']
										this.fontstyle = {
											color: "#000000"
										}
									}
									//即将到来的日子
									else {
										this.arrange.data[i].DayState = "not to travel"
										this.arrange.data[i].percent = 0;
										this.arrange.data[i].leftclass = ['cu-card', 'mxc_leftCard', 'mxc_bgwhite']
										this.activityclass = ['cu-item']
										this.fontstyle = {
											color: "#979797"
										}
									}
								}
								console.log(this.arrange);
								break;
								//未出发
							case "2":
								this.arrange = res.data;
								this.arrange.data = this.arrange.data.map(i => {
									this.$set(i, "DayState", "not to travel");
									this.$set(i, "percent", 0);
									this.$set(i, "progressactive", "#FFFFFF");
									this.$set(i, "leftclass", ['cu-card', 'mxc_leftCard', 'mxc_bgwhite']);
									return i;
								})
								for (var i = 0; i < this.arrange.data.length; i++) {
									this.arrange[i].date = this.arrange[i].date.replace(/-/g, '/');
									this.arrange[i].date = new Date(this.arrange[i].date).format('yyyy年M月d日');
									this.arrange.data[i].activity = this.arrange.data[i].activity.map(i => {
										this.$set(i, "activityclass", ['cu-item']);
										this.$set(i, "fontstyle", {
											color: "#979797"
										});
										return i;
									})
									for (var j = 0; j < this.arrange.data.activity.length; j++) {
										this.arrange[i].activity[j].start_time = this.this.arrange[i].activity[j].start_time.replace(/-/g, '/');
										this.arrange[i].activity[j].start_time = new Date(this.arrange[i].activity[j].start_time).format('h:mm');
										this.arrange[i].activity[j].end_time = this.this.arrange[i].activity[j].end_time.replace(/-/g, '/');
										this.arrange[i].activity[j].end_time = new Date(this.arrange[i].activity[j].end_time).format('h:mm');
									}
								}
								console.log(this.arrange);
								break;
								//已结束
							case "3":
								this.arrange = res.data;
								this.arrange.data = this.arrange.data.map(i => {
									this.$set(i, "DayState", "trip is over");
									this.$set(i, "percent", 100);
									this.$set(i, "progressactive", "#FFFFFF");
									this.$set(i, "leftclass", ['cu-card', 'mxc_leftCard', 'mxc_bggreen']);
									return i;
								})
								console.log(this.arrange.data.length)
								for (var i = 0; i < this.arrange.data.length; i++) {
									// console.log(this.arrange.length)
									this.arrange.data[i].date = this.arrange.data[i].date.replace(/-/g, '/');
									this.arrange.data[i].date = new Date(this.arrange.data[i].date).format('yyyy年M月d日');
									this.arrange.data[i].activity = this.arrange.data[i].activity.map(i => {
										this.$set(i, "activityclass", ['cu-item', 'text-green', 'cuIcon-radiobox']);
										this.$set(i, "fontstyle", {
											color: "#000000"
										});
										return i;
									})
									for (var j = 0; j < this.arrange.data[i].activity.length; j++) {
										this.arrange.data[i].activity[j].start_time = this.arrange.data[i].activity[j].start_time.replace(/-/g,
											'/');
										this.arrange.data[i].activity[j].start_time = new Date(this.arrange.data[i].activity[j].start_time).format(
											'h:mm');
										this.arrange.data[i].activity[j].end_time = this.arrange.data[i].activity[j].end_time.replace(/-/g, '/');
										this.arrange.data[i].activity[j].end_time = new Date(this.arrange.data[i].activity[j].end_time).format(
											'h:mm');
									}
								}
								console.log(this.arrange);
								break;
						}
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			}
		}
	}
</script>

<style>
	.detail_img {
		width: 100%;
	}

	.detail_fare {
		font-size: 28rpx;
		font-weight: bold;
		line-height: 40rpx;
		color: rgba(65, 138, 113, 1);
	}

	.detail_infobar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0 30rpx 0;
	}
</style>
