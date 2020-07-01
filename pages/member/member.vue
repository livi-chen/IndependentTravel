<template>
	<view style="padding: 0 30rpx 0 30rpx;">
		<view class="flex justify-around align-center">
			<button plain="true" class="bg-white flex align-center justify-center" style="font-size:28rpx;boder:solid 1px #418A71;height: 30px;">全选</button>
			<button class="member_label" style="font-size: 28rpx;">全不选</button>
			<button class="member_label" style="font-size: 28rpx;">仅自己</button>
		</view>
		<view class="member_items" v-for="(item,index) in members" :key="index">
			<view class="flex align-center">
				<image src="../../static/mine/userimg_mine.png" class="member_userimg"></image>
				<text class="text-df">{{item.membername}}</text>
			</view>
			<view class="cu-tag round member_label1" :style="item.membership=='发起人'? bgstyle1:bgstyle2">{{item.membership}}</view>
		</view>
		<view class="flex justify-center">
			<button class="member_btn">邀请好友</button>
		</view>
	</view>
</template>

<script>
	import BaseApi from '../../static/config.js'
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['journey']),
		onNavigationBarButtonTap() {

		},
		data() {
			return {
				members: [{
						"membername": "红红",
						"membership": "发起人"
					}, {
						"membername": "小明",
						"membership": "成员"
					},
					{
						"membername": "旺旺Wang",
						"membership": "成员"
					},
					{
						"membername": "小路luulu",
						"membership": "成员"
					}
				],
				bgstyle1: {
					"background": "#418a71"
				},
				bgstyle2: {
					"background": "#E8BA00"
				}
			}
		},
		methods: {
			getAllMember() {
				uni.request({
					url: BaseApi + '/api/v1/journey/' + this.journey.jid + '/members',
					method: "GET",
					success: (res) => {
						this.members = res.data
					},
					fail: function() {
						console.log("读取失败")
					}
				})
			}
		}
	}
</script>

<style>
	.member_userimg {
		width: 72rpx;
		height: 72rpx;
		margin-right: 80rpx;
	}

	.member_items {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 50rpx 0 50rpx 0;
	}

	.member_label {
		height: 60rpx;
		background: rgba(222, 222, 222, 1);
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.member_label1 {
		width: 146rpx;
		height: 44rpx;
		background: rgba(65, 138, 113, 1);
		border-radius: 22rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.member_label2 {
		width: 146rpx;
		height: 44rpx;
		background: #E8BA00;
		border-radius: 22rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.member_btn {
		width: 622rpx;
		height: 72rpx;
		border: 2rpx solid rgba(255, 255, 255, 1);
		background: linear-gradient(269deg, rgba(65, 138, 113, 1) 0%, rgba(59, 203, 154, 1) 100%);
		box-shadow: 0rpx 0rpx 12rpx rgba(65, 138, 113, 1);
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 60rpx;
	}
</style>
