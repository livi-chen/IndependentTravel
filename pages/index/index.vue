<!-- 主页 -->
<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>
		<!-- 导航栏 -->
		<view class="index_head">
			<view class="index_head-wrap">
				<view class="index_input-wrap">
					<!--搜索icon -->
					<text class="index_texticon">&#xe600;</text>
					<!-- 搜索框 -->
					<input type="text" placeholder="中文/拼音/首字母" />
				</view>
				<!-- 右上角角标 -->
				<image class="index_head-righticon" src="/static/shaixuan.png" mode="aspectFit"></image>
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
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.index_head {
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

	.index_head-wrap {
		width: 100%;
		position: relative;
		top: 0;
		display: inline-flex;
		align-items: center;
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

	.index_texticon {
		font-family: iconfont;
		font-size: 36rpx;
		margin-right: 20rpx;
	}
</style>
