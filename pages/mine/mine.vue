<!-- 我的 -->
<template>
	<view>
		<view class="mine_bg1">
			<view class="mine_bg2">
				<image class="mine_userimg" src="../../static/mine/userimg_mine.png"></image>
				<button v-if="!hasLogin" type="default" class="mine_btn" @click="ToLogin()">请先登录</button>
				<view v-if="hasLogin" class="flex justify-between align-center">
					<text style="margin: 0 50rpx 0 50rpx;">{{userinfo.name}}</text>
					<button type="default" class="mine_btn" @click="LoginOut()">退出登录</button>
				</view>
			</view>
		</view>
		<view class="mine_main">
			<view class="mine_items">
				<image class="mine_icons" src="../../static/mine/notice_mine.png"></image>
				<text class="mine_title">通知中心</text>
				<text class="mine_texticon">&#xe61f;</text>
			</view>
			<view class="mine_items">
				<image class="mine_icons" src="../../static/mine/vip_mine.png"></image>
				<text class="mine_title">会员特权</text>
				<text class="mine_texticon">&#xe61f;</text>
			</view>
			<view class="mine_items">
				<image class="mine_icons" src="../../static/mine/shoucang_mine.png"></image>
				<text class="mine_title" style="width: 112rpx;">收藏夹</text>
				<text class="mine_texticon">&#xe61f;</text>
			</view>
			<view class="mine_items">
				<image class="mine_icons" src="../../static/mine/shezhi_mine.png"></image>
				<text class="mine_title">系统设置</text>
				<text class="mine_texticon">&#xe61f;</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'userinfo'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['logout']),
			ToLogin() {
				uni.navigateTo({
					url: "../login/login",
					success: function(data) {
						console.log("跳转到登录页面")
					}
				})
				// uni.request({
				// 	url:"/apis/api/findusers",
				// 	success:(res) =>{
				// 		console.log(res);
				// 		this.userinfo = res.data;
				// 	}
				// })
			},
			LoginOut() {
				this.logout();
			}

		}
	}
</script>

<style>
	.mine_bg1 {
		background: rgba(133, 170, 157, 1);
		display: flex;
		align-items: center;
		border-radius: 0 0 10% 5%;
		height: 390rpx;
	}

	.mine_bg2 {
		background: rgba(65, 138, 113, 1);
		display: flex;
		align-items: center;
		border-radius: 0 0 20% 5%;
		height: 100%;
		width: 100%;
	}

	.mine_userimg {
		height: 174rpx;
		width: 174rpx;
		margin-left: 66rpx;
	}

	.mine_items {
		width: 630rpx;
		height: 38rpx;
		background: rgba(255, 255, 255, 1);
		opacity: 1;
		border-radius: 58rpx;
		display: flex;
		padding: 30rpx;
		margin: 30rpx 30rpx 0 30rpx;
		box-shadow: 2rpx 2rpx 30rpx #F1F1F1;
	}

	.mine_icons {
		height: 40rpx;
		width: 40rpx;
	}

	.mine_title {
		font-size: 28rpx;
		margin-left: 20rpx;
	}

	.mine_btn {
		font-size: 28rpx;
	}

	.mine_texticon {
		font-family: iconfont;
		font-size: 28rpx;
		margin-left: 420rpx;
		display: flex;
		align-items: center;
	}

	.mine_main {
		margin-top: -90rpx;
		position: relative;
	}
</style>
