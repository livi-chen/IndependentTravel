<!-- 行程 -->
<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>
		<!-- 最近出行 -->
		<view class="title_all">
			<text class="module_title">最近出行</text>
			<view class="module_underline"></view>
		</view>
		<!-- 封面 -->
		<view class="flex justify-center align-center flex-direction">
			<view v-if="journeyflag1" v-for="(item,index) in recenttrip" :key="index" @click="showdetail">
				<view class="flex flex-direction align-center justify-center">
					<view class="flex align-center justify-center">
						<view class="card_cover">
							<view class="card_xingchengcover" :style="{backgroundImage: 'url('+item.cover+')'}">
								<view class="card_covermask" :data-id="item.id" :data-state="1"></view>
							</view>
						</view>
						<view class="card_covertext" :data-id="item.id" :data-state="1">{{item.name}}</view>
					</view>
					<view v-if="item.activityflag" class="common_text common_toast">
						尚未创建任何日程安排
					</view>
				</view>
				<!-- 详细行程 -->
				<view class="cu-timeline" v-if="!item.activityflag">
					<view class="cu-time">{{daynumber}}</view>
					<view class="cu-item text-green cuIcon-radiobox">
						<view class="content card_text card_noticetext">
							<text space="ensp">{{activity[0].activitytime}} {{activity[0].activitytitle}} {{activity[0].activitydes}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content card_text">
							<text space="ensp">{{activity[1].activitytime}} {{activity[1].activitytitle}} {{activity[1].activitydes}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content card_text">
							<text space="ensp">{{activity[2].activitytime}} {{activity[2].activitytitle}} {{activity[2].activitydes}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="!journeyflag1" class="common_text common_toast">无最近出行记录</view>
		</view>
		<!-- 未出发 -->
		<view class="title_all">
			<text class="module_title">未出发</text>
			<view class="module_underline"></view>
		</view>
		<!-- 封面 -->
		<view class="flex flex-direction align-center justify-center">
			<view v-if="journeyflag2" v-for="(item,index) in latertrip" :key="index">
				<view class="card_cover">
					<view class="card_xingchengcover" :style="{backgroundImage: 'url('+item.cover+')'}">
						<view class="card_covermask" :data-id="item.id" :data-state="2"></view>
					</view>
				</view>
				<view class="card_covertext" :data-id="item.id" :data-state="2">{{item.name}}</view>
			</view>
			<view v-if="!journeyflag2" class="common_text common_toast">无记录</view>
		</view>
		<!-- 已结束 -->
		<view class="title_all">
			<text class="module_title">已结束</text>
			<view class="module_underline"></view>
		</view>
		<!-- 封面 -->
		<view @click="showdetail" class="flex flex-direction align-center justify-center">
			<view v-if="journeyflag3" v-for="(item,index) in pasttrip" :key="index" class="flex justify-center align-center">
				<view class="card_cover">
					<view class="card_xingchengcover" :style="{backgroundImage: 'url('+item.cover+')'}">
						<view class="card_covermask" :data-id="item.id" :data-state="3">
						</view>
					</view>
				</view>
				<view class="card_covertext" :data-id="item.id" :data-state="3">{{item.name}}</view>
			</view>
			<view v-if="!journeyflag3" class="common_text common_toast">无记录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import BaseApi from 'static/config.js'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userinfo', 'jid']),
		onShow() {
			//强制登录
			this.checkLogin();
			if (this.hasLogin) {
				this.getRecent();
				this.getPast();
				this.getlater();
			}
		},
		onLoad() {

		},
		data() {
			return {
				xingcheng_title: "马尔代夫七日游",
				daynumber: "DAY 3",
				journeyflag1: false,
				journeyflag2: false,
				journeyflag3: false,
				activity: [{
					activitytime: '9:30-10:20',
					activitytitle: '菲哈后岛',
					activitydes: 'Fihalhohi Fihalhohi'
				}, {
					activitytime: '9:30-10:20',
					activitytitle: '菲哈后岛',
					activitydes: 'Fihalhohi Fihalhohi'
				}, {
					activitytime: '9:30-10:20',
					activitytitle: '菲哈后岛',
					activitydes: 'Fihalhohi Fihalhohi'
				}],
				recenttrip: [],
				pasttrip: [],
				latertrip: []
			}
		},
		methods: {
			...mapMutations(['checkLogin', 'getJourney']),
			showdetail(e) {
				console.log(e.target.dataset.state)
				var tempjourney = {
					"jid": e.target.dataset.id,
					"state": e.target.dataset.state
				}
				this.getJourney(tempjourney);
				setTimeout(function() {
					uni.navigateTo({
						url: "../myxingcheng/myxingcheng",
						success: function() {
							console.log("跳转成功")
						},
						fail: function() {
							console.log("跳转失败")
						}
					})
				}, 1000)
			},
			getPast() {
				uni.request({
					url: BaseApi + '/api/v1/user/' + this.userinfo.id + '/past-journeys',
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						if (res.data.count) {
							this.pasttrip = res.data.journeys;
							for (var i = 0; i < this.pasttrip.length; i++) {
								if (this.pasttrip[i].cover == "None") {
									this.pasttrip[i].cover = "/static/xingchengcover.png"
								}
							}
							this.journeyflag3 = true;
						} else {
							console.log("无已结束行程记录")
						}
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			getlater() {
				uni.request({
					url: BaseApi + '/api/v1/user/' + this.userinfo.id + '/later-journeys',
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						if (res.data.count) {
							// for (var i = 0; i < res.data.count; i++) {
							// 	this.latertrip[i].image = res.data.journeys[i].cover;
							// 	this.latertrip[i].title = res.data.journeys[i].name;
							// 	this.latertrip[i].id = res.data.journeys[i].id;
							// }
							this.journeyflag2 = true;
						} else {
							console.log("无未出发行程记录")
						}
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			//获取最近出行
			getRecent() {
				uni.request({
					url: BaseApi + "api/v1/user/" + this.userinfo.id + "/present-journeys",
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						if (res.data.count) {
							this.recenttrip = res.data.journeys;
							console.log(this.recenttrip);
							for (var p = 0; p < this.recenttrip.length; p++) {
								console.log(this.recenttrip[p]);
								this.recenttrip = this.recenttrip.map(i => {
									this.$set(i, "activityflag", true);
									return i;
								})
								console.log(this.recenttrip);
								//获取该行程的所有活动
								uni.request({
									url: BaseApi + '/api/v1/journey/' + this.recenttrip[p].id + '/activity-by-date',
									method: "GET",
									header: {
										'content-type': 'application/json'
									},
									success: (res) => {
										//如果有活动
										if (res.data.days) {
											var index = 0;
											//判断当前是行程中的第几天
											for (var i = 0; i < res.data.days; i++) {
												if (getApp().getDate() == res.data.data[i].date) {
													index = i;
													console.log("现在是day" + (index + 1));
													this.daynumber = "Day " + (index + 1);
												}
											}
											for (var i = 0; i < res.data.data[index].activity.length; i++) {
												var start = res.data.data[index].activity[i].start_time;
												var end = res.data.data[index].activity[i].end_time
												console.log(start);
												console.log(end);
												//查找当前正在进行的活动
												if (nowDate > Date.parse(start) && nowDate < Date.parse(end)) {
													console.log(res.data.data[index].activity[i].title);
													for (var j = 0; j < 3; j++) {
														if (res.data.data[index].activity[i + j]) {
															this.activity[j].activitytime = new Date(res.data.data[index].activity[i + j].start_time).format(
																'hh:mm') + "-" + new Date(res.data.data[index].activity[i + j].end_time).format('hh:mm');
															this.activity[j].activitytitle = res.data.data[index].activity[i + j].title;
															this.activity[j].activitydes = res.data.data[index].activity[i + j].description;
														} else {
															this.activity[j].activitytime = ''
															this.activity[j].activitytitle = '无更多活动'
															this.activity[j].activitydes = ''
														}
													}
												}

											}
										} else {
											console.log("无活动列表")
											this.recenttrip.activityflag = false;
										}
										this.journeyflag1 = true;
									},
									fail: function() {
										console.log("查询失败")
									}
								})
							}
						}
					},
					fail: function(e) {
						console.log("连接失败",e)
					}
				})
			}
		}
	}
</script>

<style>

</style>
