<!-- 创建行程 -->
<template>
	<view class="add_main">
		<view>
			<view class="add_sub">
				<text class="add_texticon">&#xe61e;</text>
				<text class="add_tittle">行程名称</text>
			</view>
			<view>
				<input class="add_input add_text" style="width: 630rpx;margin-top: 20rpx;margin-bottom: 20rpx;" placeholder="请输入..." />
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="add_texticon">&#xe70b;</text>
				<text class="add_tittle">起止时间</text>
			</view>
			<view class="add_items">
				<button class="add_btn" @click="showCalendar" v-if="startDate">{{startDate}}</button>
				<text class="add_text" style="margin-left: 35rpx;margin-right: 35rpx;">-</text>
				<button class="add_btn" @click="showCalendar" v-if="endDate">{{endDate}}</button>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="add_texticon">&#xe619;</text>
				<text class="add_tittle">目的地</text>
			</view>
			<view class="add_items">
				<button class="add_btn" style="width: 140rpx;">{{destination}}</button>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="add_texticon">&#xe6dc;</text>
				<text class="add_tittle">预算</text>
			</view>
			<view class="add_items">
				<input class="add_input add_text" style="width:210rpx;margin-right: 38rpx;" placeholder="请输入..." />
				<text class="add_text">元</text>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="add_texticon">&#xe662;</text>
				<text class="add_tittle">封面</text>
			</view>
			<view class="add_items">
				<button class="add_btn" style="height:132rpx;width: 132rpx;">
					<text class="add_texticon add_photo">&#xe609;</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//目的地
				destination: "杭州",
				//开始日期
				startDate: '2020-05-23',
				//结束日期
				endDate: '2020-05-30'
			}
		},
		onLoad() {
			//传递目前的日期范围给日历页面
			setInterval(() => {
				uni.$emit('updateDate', {
					startdate: this.startDate,
					enddate: this.endDate
				})
			}, 10)
			//监听日历页面传过来的日期范围
			uni.$on('checkDate', this.changeDate)
		},
		onUnload() {
			//撤销监听
			uni.$off('checkDate', this.changeDate)
		},
		methods: {
			//跳转到日历页面
			showCalendar() {
				console.log("已点击")
				uni.navigateTo({
					url: '/pages/calendar/calendar',
					success: function(data) {
						console.log('跳转成功', data)
					},
					fail: function(data) {
						console.log('跳转失败', data)
					}
				});
			},
			//处理日历页面传过来的数据
			changeDate(e) {
				console.log(e.data[0].toString() + "&" + e.data[1].toString());
				//更新开始日期
				this.startDate = e.data[0].toString();
				//更新结束日期
				this.endDate = e.data[1].toString();
			}
		}
	}
</script>

<style>
	.add_main {
		padding-left: 44rpx;
		width: 690rpx;
	}

	.add_sub {
		display: flex;
		align-items: center;
	}

	.add_texticon {
		font-family: iconfont;
		font-size: 28rpx;
		margin-right: 18rpx;
	}

	.add_items {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		align-items: center;
		justify-content: flex-start;
	}

	.add_tittle {
		font-size: 28rpx;
	}

	.add_input {
		border-radius: 12rpx;
		height: 26rpx;
		background-color: rgba(243, 243, 243, 1);
		opacity: 1;
		padding: 14rpx;
	}

	.add_text {
		font-size: 28rpx;
	}

	.add_btn {
		width: 238rpx;
		border-radius: 12rpx;
		height: 66rpx;
		background-color: rgba(243, 243, 243, 1);
		font-size: 28rpx;
		margin-left: 0rpx;
		margin-right: 0rpx;
		padding-left: 0rpx;
		padding-right: 0rpx;
	}

	.add_photo {
		color: rgba(145, 145, 145, 1);
		font-size: 72rpx;
		margin-right: 0rpx;
		position: relative;
		top: -24rpx;
	}

	button::after {
		border: none;
	}
</style>
