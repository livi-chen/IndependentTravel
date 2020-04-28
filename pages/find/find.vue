<!-- 发现 -->
<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>
		<!-- 导航栏 -->
		<view class="find_head">
			<view class="find_head-wrap">
				<view class="find_input-wrap">
					<!--搜索icon -->
					<text class="find_texticon">&#xe600;</text>
					<!-- 搜索框 -->
					<input type="text" placeholder="中文/拼音/首字母" />
				</view>
				<!-- 右上角角标 -->
				<image class="find_head-righticon" src="/static/shaixuan.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #FFFFFF;
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
		font-family: iconfont;
		font-size: 36rpx;
		margin-right: 20rpx;
	}
</style>
