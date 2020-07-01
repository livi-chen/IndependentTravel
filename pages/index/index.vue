<!-- 主页 -->
<template>
	<view>
		<view class="page_header">
			<!-- 状态栏占位 -->
			<view class="status_bar"></view>
			<!-- 导航栏 -->
			<view class="index_head">
				<view class="index_head-wrap">
					<view class="index_input-wrap">
						<!--搜索icon -->
						<text class="texticon">&#xe600;</text>
						<!-- 搜索框 -->
						<input type="text" placeholder="中文/拼音/首字母" />
					</view>
					<!-- 右上角角标 -->
					<image class="index_head-righticon" src="/static/shaixuan.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 轮播 -->
		<swiper class="card-swiper" :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</view>
			</swiper-item>
		</swiper>
		<!-- 最近出行 -->
		<view class="title_all">
			<text class="module_title">最近出行</text>
			<view class="module_underline"></view>
		</view>
		<!-- 封面 -->
		<view class="flex flex-direction justify-center align-center">
			<view v-if="journeyflag" class="flex flex-direction align-center justify-center">
				<view class="flex align-center justify-center">
					<view class="card_cover">
						<view class="card_xingchengcover" :style="{backgroundImage: 'url('+xingcheng_image+')'}">
							<view class="card_covermask"></view>
						</view>
					</view>
					<view class="card_covertext">{{xingcheng_title}}</view>
				</view>
				<view v-if="!activityflag" class="common_text common_toast">
					尚未创建任何日程安排
				</view>
				<!-- 详细行程 -->
				<view class="cu-timeline" v-if="activityflag">
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
			<view v-if="!journeyflag" class="common_text common_toast">
				无最近行程记录
			</view>
		</view>
		<!-- 推荐行程 -->
		<view class="title_all">
			<text class="module_title">推荐行程</text>
			<view class="module_underline"></view>
		</view>

		<view class="cu-card article" v-for="(item,index) in hotjourney" :key="index" style="margin-bottom: 5%;">
			<view class="cu-item shadow">
				<view class="content">
					<image src="../../static/index/xingchengimg_index.png" mode="aspectFill"></image>
					<view class="desc">
						<view class="title">
							<view class="text-cut">{{item.name}}</view>
						</view>
						<view class="text-content">{{item.name}}-{{item.destination}}-{{item.budget}}</view>
						<view style="display: flex;margin-top: 20rpx;">
							<image class="card_userimg" src="../../static/userimg_mini.png"></image>
							<text class="card_username">{{item.username}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import BaseApi from 'static/config.js'

	export default {
		computed: mapState(['hasLogin', 'userinfo']),
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/index/banner.png'
				}, {
					id: 1,
					type: 'image',
					url: '/static/index/banner.png',
				}, {
					id: 2,
					type: 'image',
					url: '/static/index/banner.png'
				}, {
					id: 3,
					type: 'image',
					url: '/static/index/banner.png'
				}, {
					id: 4,
					type: 'image',
					url: '/static/index/banner.png'
				}, {
					id: 5,
					type: 'image',
					url: '/static/index/banner.png'
				}, {
					id: 6,
					type: 'image',
					url: '/static/index/banner.png'
				}],
				direction: '',
				isCard: false,
				xingcheng_title: "马尔代夫七日游",
				xingcheng_content: "“马尔代夫”人们奉送它无数动人的美称和华丽桂冠，誉其为“印度洋上的翡...",
				xingcheng_image: '../../static/xingchengcover.png',
				username: "张三SanSan",
				daynumber: "DAY 3",
				journeyflag: false,
				activityflag: false,
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
				hotjourney: []
			}
		},
		onShow() {
			if (this.hasLogin) {
				this.getRecent();
			}
		},
		onReady() {
			this.Tui()
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// nestedSearch(obj, keyChain) {
			// 	const keys = keyChain.split(".");
			// 	return keys.reduce((p, n) => {
			// 		p = p[n];
			// 		return p;
			// 	}, obj)
			// },
			//获取最近出行
			getRecent() {
				uni.request({
					url: BaseApi + '/api/v1/user/' + this.userinfo.id + '/present-journeys',
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						var tempjourney;
						var tempactivity;
						//如果没有正在进行中的行程,则获取过去的行程
						if (!res.data.count) {
							uni.request({
								url: BaseApi + '/api/v1/user/' + this.userinfo.id + '/past-journeys',
								method: "GET",
								success: (res) => {
									tempjourney = res.data.journeys[res.data.count - 1];
									this.xingcheng_title = tempjourney.name;
									//获取该行程的所有活动
									uni.request({
										url: BaseApi + '/api/v1/journey/' + tempjourney.id + '/activity-by-date',
										method: "GET",
										success: (res) => {
											this.daynumber = "Day " + res.data.days;
											console.log(this.daynumber)
											tempactivity = res.data.data[res.data.days - 1]
											console.log(tempactivity)
											for (var j = 0; j < 3; j++) {
												if (tempactivity.activity[j]) {
													this.activity[j].activitytime = new Date(tempactivity.activity[j].start_time).format(
														'hh:mm') + "-" + new Date(tempactivity.activity[j].end_time).format('hh:mm');
													this.activity[j].activitytitle = tempactivity.activity[j].title;
													this.activity[j].activitydes = tempactivity.activity[j].description;
												} else {
													this.activity[j].activitytime = ''
													this.activity[j].activitytitle = '无更多活动'
													this.activity[j].activitydes = ''
												}
											}
											this.journeyflag = true;
										},
										fail: function() {
											console.log("连接失败")
										}
									})
								},
								fail: function() {
									console.log("连接失败")
								}
							})
						}
						//有正在进行中的行程
						else {
							console.log("kdkhdkas")
							tempjourney = res.data.journeys[res.data.count - 1];
							this.xingcheng_title = tempjourney.name;
							console.log(tempjourney.id)
							//获取该行程的所有活动
							uni.request({
								url: BaseApi + '/api/v1/journey/' + tempjourney.id + '/activity-by-date',
								method: "GET",
								success: (res) => {
									var tempindex = 0;
									var tempflag = false;
									//获取现在是第几天并显示
									for (var i = 0; i < res.data.days; i++) {
										if (getApp().getTime() == res.data.data[i].date) {
											tempindex = i;
											tempflag = true;
										}
									}
									if (tempflag) {
										this.daynumber = "Day " + (tempindex + 1);
										console.log(this.daynumber)
										//获取今天的活动
										tempactivity = res.data.data[tempindex].activity;
										var f = 0;
										//获取正在进行的活动
										for (var j = 0; j < tempactivity.length; j++) {
											if (Date.parse(getApp().getTime()) > Date.parse(tempactivity[j].start_time) && Date.parse(getApp().getTime()) <
												Date.parse(tempactivity[j].end_time)) {
												f = j;
											}
										}
										//显示活动列表
										for (var k = 0; k < 2; k++) {
											if (tempactivity[f + k]) {
												this.activity[k].activitytime = new Date(tempactivity[f].start_time).format(
													'hh:mm') + "-" + new Date(tempactivity[f].end_time).format('hh:mm');
												this.activity[k].activitytitle = tempactivity[f].title;
												this.activity[k].activitydes = tempactivity[f].description;
											} else {
												this.activity[k].activitytime = ''
												this.activity[k].activitytitle = '无更多活动'
												this.activity[k].activitydes = ''
											}
										}
										this.activityflag = true;
									}
									this.journeyflag = true;
								},
								fail: function() {
									console.log("连接失败")
								}
							})
						}
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			getUser(uid, i) {
				uni.request({
					url: BaseApi + "/api/v1/user/" + uid,
					method: "GET",
					success: (res) => {
						this.hotjourney[i].username = res.data.name
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			//获取推荐行程
			Tui() {
				uni.request({
					url: BaseApi + '/api/v1/journey/explore/3',
					method: "GET",
					success: (res) => {
						this.hotjourney = res.data.data;
						//为每一项添加用户头像
						this.hotjourney = this.hotjourney.map(i => {
							this.$set(i, "userimg", "../../static/userimg_mini.png");
							this.$set(i, "username", "");
							return i;
						})
						for (var i = 0; i < this.hotjourney.length; i++) {
							this.getUser(this.hotjourney[i].owner_id, i)
						}
					},
					fail: function() {
						console.log("连接成功")
					}
				})
			}
		}
	}
</script>

<style>
	.index_head {
		display: flex;
		background-color: #FFFFFF;
		height: 96rpx;
		width: 100%;
	}

	.index_head-wrap {
		width: 100%;
		position: relative;
		top: 0;
		display: inline-flex;
		align-items: center;
		padding: 0 0 0 30rpx;
	}

	.index_input-wrap {
		height: 56rpx;
		width: 578rpx;
		padding: 0 0 0 16rpx;
		background-color: #EAEEEC;
		font-size: 28rpx;
		color: #979797;
		display: flex;
		align-items: center;
		border-radius: 16rpx;
	}

	.index_head-righticon {
		flex: 1;
		display: flex;
		width: 28rpx;
		height: 28rpx;
		align-content: flex-end;
	}
</style>
