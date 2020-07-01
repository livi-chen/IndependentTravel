<!-- 发现 -->
<template>
	<view>
		<view class="page_header">
			<!-- 状态栏占位 -->
			<view class="status_bar"></view>
			<view style="overflow: hidden;">
				<view class="find_topshadow" style="background: #FFFFFF;">
					<!-- 导航栏 -->
					<view class="find_head">
						<view class="find_head-wrap">
							<view class="find_input-wrap">
								<!--搜索icon -->
								<text class="texticon">&#xe600;</text>
								<!-- 搜索框 -->
								<input type="text" placeholder="中文/拼音/首字母" />
							</view>
							<!-- 右上角角标 -->
							<image class="find_head-righticon" src="/static/shaixuan.png" mode="aspectFit" @click="showModal" data-target="DrawerModalR"></image>
						</view>
					</view>
					<!-- 筛选栏 -->
					<view class="find_filter">
						<view class="find_filteritems find_curitem">
							<text class="find_label">综合</text>
							<text class="texticon find_texticon">&#xe6b7;</text>
						</view>
						<view class="find_filteritems">
							<text class="find_label">按热度排序</text>
							<text class="texticon find_texticon">&#xe6b7;</text>
						</view>
						<view class="find_filteritems">
							<text class="find_label">按时间排序</text>
							<text class="texticon find_texticon">&#xe6b7;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 行程列表 -->
		<view class="cu-card article" @click="Toxingchengdetail" v-for="(item,index) in journeylist" :key="index" style="margin-bottom: 5%;">
			<view class="cu-item shadow">
				<view class="content">
					<image src="../../static/index/xingchengimg_index.png" mode="aspectFill"></image>
					<view class="desc">
						<view class="card_top">
							<view class="title">
								<view class="text-cut">{{item.name}}</view>
							</view>
							<text class="card_fare">人均{{item.budget}}元</text>
						</view>
						<view class="text-content">{{item.name}} - {{item.destination}}</view>
						<view style="display: flex;margin-top: 20rpx;">
							<image class="card_userimg" src="../../static/userimg_mini.png"></image>
							<text class="card_username">{{item.username}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @click="hideModal">
			<view class="cu-dialog basis-lg" @click.stop="">
				<view class="find_modaltop">
					<text class="find_modaltitle">筛选</text>
				</view>
				<text class="find_modalsubtitle">发布时间</text>
				<view class="find_modalcontent">
					<button class="cu-btn find_modalbtn" style="width: 144rpx;">全部</button>
					<button class="cu-btn find_modalbtn">一年内</button>
					<button class="cu-btn find_modalbtn">三年内</button>
					<button class="cu-btn find_modalbtn">2019年7月1日</button>
					<text>-</text>
					<button class="cu-btn find_modalbtn">2019年7月8日</button>
				</view>
				<text class="find_modalsubtitle">目的地</text>
				<view class="find_modalcontent">
					<button class="cu-btn find_modalbtn" style="width: 144rpx;">全部</button>
					<button class="cu-btn find_modalbtn" style="width: 144rpx;">杭州</button>
					<button class="cu-btn find_modalbtn">黑龙江</button>
					<button class="cu-btn find_modalbtn" style="width: 144rpx;">广东</button>
					<button class="cu-btn find_modalbtn">哈尔滨</button>
					<button class="cu-btn find_modalbtn"><text class="texticon" style="margin:0">&#xe600;</text>搜索</button>
				</view>
				<text class="find_modalsubtitle">预算</text>
				<view class="find_modalcontent" style="justify-content: left;">
					<button class="cu-btn find_modalbtn" style="margin-right: 50rpx;">0-5000</button>
					<button class="cu-btn find_modalbtn">5000-10000</button>
					<input class="find_modalinput" placeholder="请输入..." />
					<text style="font-size: 28rpx;margin: 20rpx;">元 - </text>
					<input class="find_modalinput" placeholder="请输入..." />
					<text style="font-size: 28rpx;margin: 20rpx;">元</text>
				</view>
				<view class="find_modalbottom">
					<button class="cu-btn round" style="height:72rpx;width: 200rpx;color: #979797;">取消</button>
					<button class="cu-btn round" style="height:72rpx;width: 200rpx;background:linear-gradient(90deg,rgba(59,203,154,1) 0%,rgba(65,138,113,1) 100%);color:#FFFFFF;">确定</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import BaseApi from '../../static/config.js'
	export default {
		data() {
			return {
				xingcheng_title: "马尔代夫七日游",
				xingcheng_content: "“马尔代夫”人们奉送它无数动人的美称和华丽桂冠，誉其为“印度洋上的翡...",
				username: "张三SanSan",
				fare: 40231,
				CustomBar: this.CustomBar,
				modalName: null,
				journeylist:[]
			}
		},
		onReady(){
			this.gettuiJourney();
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Toxingchengdetail(){
				uni.navigateTo({
					url: "../xingchengdetail/xingchengdetail",
					success: function(data) {
						console.log("跳转到他人行程详情页面")
					}
				})
			},
			getUser(uid, i) {
				uni.request({
					url: BaseApi + "/api/v1/user/" + uid,
					method: "GET",
					success: (res) => {
						this.journeylist[i].username = res.data.name
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			gettuiJourney(){
				uni.request({
					url:BaseApi+'/api/v1/journey/explore/8',
					method:"GET",
					success:(res)=>{
						this.journeylist = res.data.data;
						console.log(this.journeylist)
						//为每一项添加用户头像
						this.journeylist = this.journeylist.map(i => {
							this.$set(i, "userimg", "../../static/userimg_mini.png");
							this.$set(i, "username", "");
							return i;
						})
						console.log(this.journeylist)
						for (var i = 0; i < this.journeylist.length; i++) {
							this.getUser(this.journeylist[i].owner_id, i)
						}
					},
					fail:function(){
						console.log("连接失败")
					}
				})
			}
		}
	}
</script>

<style>
	.find_head {
		display: flex;
		padding: 0 0 0 30rpx;
		background-color: #FFFFFF;
		height: 96rpx;
		width: 700rpx;
	}

	.find_head-wrap {
		width: 100%;
		position: relative;
		top: 0;
		display: inline-flex;
		align-items: center;
	}

	.find_input-wrap {
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

	.find_head-righticon {
		flex: 1;
		display: flex;
		width: 28rpx;
		height: 28rpx;
		align-content: flex-end;
	}

	.find_texticon {
		font-size: 16rpx;
	}

	.find_label {
		font-size: 28rpx;
		margin-right: 10rpx;
	}

	.find_filter {
		justify-content: space-around;
		display: flex;
		flex-direction: row;
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
		padding-top: 10rpx;
	}

	.find_topshadow {
		box-shadow: 0px 0px 15px #e6e6e6;
	}

	.find_filteritems {
		display: flex;
		align-items: center;
	}

	.find_curitem {
		color: #418A71;
	}

	.find_modaltitle {
		font-size: 48rpx;
		color: #000000;
		font-weight: bold;

	}

	.find_modaltop {
		text-align: start;
		margin: 30rpx 0 0 30rpx;
	}

	.find_modalsubtitle {
		font-size: 20rpx;
		color: #000000;
		font-weight: 400;
		margin: 0 0 0 30rpx;
	}

	.find_modalcontent {
		display: flex;
		justify-content: space-between;
		padding: 15px 15px 0 15px;
		flex-wrap: wrap;
		align-items: baseline;
	}

	.find_modalbtn {
		font-family: PingFang;
		color: #434343;
		margin-bottom: 30rpx;
	}

	.find_modalinput {
		border-radius: 12rpx;
		height: 26rpx;
		background-color: rgba(243, 243, 243, 1);
		opacity: 1;
		padding: 14rpx;
		max-width: 160rpx;
		font-size: 28rpx;
	}
	.find_modalbottom{
		display: flex;
		justify-content: space-evenly;
		margin: 300rpx 0 50rpx 0;
	}
</style>
