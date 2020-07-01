<template>
	<view style="padding: 0 30rpx 0 30rpx;">
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe61e;</text>
				<text class="share_title">活动名称</text>
			</view>
			<view>
				<input class="share_input share_text" :placeholder="activity_title" />
			</view>
		</view>
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe619;</text>
				<text class="share_title">目的地</text>
			</view>
			<button type="default" plain="true" class="share_btn" style="border: 2rpx solid #939393;color: #434343;">{{destination}}</button>
		</view>
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe6dc;</text>
				<text class="share_title">总开销</text>
			</view>
			<view class="share_items" style="justify-content: space-between;">
				<view class="share_items">
					<input class="share_input share_text" style="width: 200rpx;" placeholder="0" />
					<text class="share_text" style="margin-left: 30rpx;">元</text>
				</view>
				<view class="share_items">
					<image src="../../static/uncheck.png" style="width:40rpx;height: 40rpx;margin-right: 10rpx;"></image>
					<text class="share_text">隐藏开销</text>
				</view>
			</view>
		</view>
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe657;</text>
				<text class="share_title">游记感想</text>
			</view>
			<view>
				<textarea placeholder="请输入旅游感想..." maxlength="200" v-model="sentiment" class="share_input share_text" style="height: 250rpx;width: auto;"></textarea>
				<text class="share_inputinner">{{sentiment.length}}/200</text>
			</view>
		</view>
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe662;</text>
				<text class="share_title">照片</text>
			</view>
			<view>
				<button class="share_input" style="height:132rpx;width: 132rpx;">
					<text class="texticon share_photo">&#xe609;</text>
				</button>
			</view>
		</view>
		<view>
			<view class="share_sub">
				<text class="texticon">&#xe61b;</text>
				<text class="share_title">复制定价</text>
			</view>
			<view class="share_items" style="justify-content: space-between;">
				<view class="share_items">
					<input class="share_input share_text" style="width: 200rpx;" placeholder="0" />
					<text class="share_text" style="margin-left: 30rpx;">元</text>
				</view>
				<view class="share_items">
					<image src="../../static/uncheck.png" style="width:40rpx;height: 40rpx;margin-right: 10rpx;"></image>
					<text class="share_text">免费</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity_title: "马尔代夫七日游",
				sentiment: "",
				destination: "马尔代夫"
			}
		},
		methods: {

		}
	}
</script>

<style>
	.share_sub {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.share_title {
		font-size: 28rpx;
		color: #000000;
	}

	.share_input {
		border-radius: 12rpx;
		background-color: rgba(243, 243, 243, 1);
		opacity: 1;
		padding: 14rpx;
		margin: 0;
	}

	.share_text {
		font-size: 28rpx;
	}

	.share_photo {
		margin: 0;
		font-size: 72rpx;
		top: -40rpx;
		position: relative;
		color: rgba(145, 145, 145, 1);
	}

	.share_inputinner {
		font-size: 24rpx;
		color: #434343;
		float: right;
		position: relative;
		bottom: 60rpx;
		margin: 0 30rpx;
	}

	.share_items {
		display: flex;
		align-items: center;
	}

	.share_btn {
		margin: 0;
		font-size: 14px;
		width: 200rpx;
	}

	button::after {
		border: none;
	}
</style>
