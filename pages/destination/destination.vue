<template>
	<view>
		<view class="page_header" style="top: 86rpx;">
			<view class="desti_head">
				<view class="desti_head-wrap">
					<view class="desti_input-wrap">
						<!--搜索icon -->
						<text class="texticon">&#xe600;</text>
						<!-- 搜索框 -->
						<input type="text" placeholder="中文/拼音/首字母" />
					</view>
					<!-- 右上角角标 -->
					<text style="font-size: 28rpx;color: #979797;">取消</text>
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar  + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true" @click="getCity">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding desti_index">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<block v-for="(item,i) in citylist[index]" :key="i">
							<view class="cu-item" v-for="(arr,sub) in item" :key="sub" :data-name="arr">
								<text style="font-size: 14px;color: #434343;" :data-name="arr">{{arr}}</text>
							</view>
						</block>
					</view>
				</view>
			</block>
		</scroll-view>

		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
					{{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	import BaseApi from 'static/config.js'
	import city from '../../static/city.js'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				citylist: [{}],
				cityselected: '杭州',
			}
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
			this.citySort();
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top;
				console.log(that.boxTop);
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top;
				console.log(that.barTop);
			}).exec()
		},
		methods: {
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
				console.log("getcur-----" + this.listCur);
				console.log("custombar" + this.CustomBar);
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur;
				console.log("setcur-----" + this.listCur);
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur;
				console.log("curID-----" + this.listCurID);
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			//获取城市
			citySort() {
				// uni.request({
				// 	url: BaseApi + "/static/citySort.json",
				// 	method: "GET",
				// 	header: {
				// 		'content-type': 'application/json'
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data.data);
				// 		this.citylist = res.data.data;
				// 	},
				// 	fail: function() {
				// 		console.log("连接失败");
				// 	}
				// })
				this.citylist = city;
			},
			getCity(e) {
				console.log(e.target.dataset.name);
				this.cityselected = e.target.dataset.name;
				uni.$emit('checkCity', {
					data: this.cityselected
				});
				uni.switchTab({
					url: "../add/add",
					success: function() {
						console.log("跳转成功")
					},
					fail: function() {
						console.log("跳转失败")
					}
				});
			}
		}
	}
</script>

<style>
	.desti_head {
		display: flex;
		padding: 0 0 0 30rpx;
		background-color: #FFFFFF;
		height: 96rpx;
		width: 700rpx;
	}

	.desti_head-wrap {
		width: 100%;
		position: relative;
		top: 0;
		display: inline-flex;
		align-items: center;
		justify-content: space-around;
	}

	.desti_input-wrap {
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

	.desti_index {
		font-size: 20rpx;
		color: #979797;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0rpx;
		bottom: 0rpx;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
