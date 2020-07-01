<!-- 创建行程 -->
<template>
	<view class="add_main">
		<view>
			<view class="add_sub">
				<text class="texticon add_texticon">&#xe61e;</text>
				<text class="add_title">行程名称</text>
			</view>
			<view>
				<input v-model="name" class="add_input add_text" style="width: 630rpx;margin-top: 20rpx;margin-bottom: 20rpx;"
				 placeholder="请输入..." />
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="texticon add_texticon">&#xe70b;</text>
				<text class="add_title">起止时间</text>
			</view>
			<view class="add_items">
				<button class="add_btn" @click="showCalendar" v-if="startDate">{{startDate}}</button>
				<text class="add_text" style="margin-left: 35rpx;margin-right: 35rpx;">-</text>
				<button class="add_btn" @click="showCalendar" v-if="endDate">{{endDate}}</button>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="texticon add_texticon">&#xe619;</text>
				<text class="add_title">目的地</text>
			</view>
			<view class="add_items">
				<button class="add_btn" style="width: 140rpx;" @click="selectCity">{{destination}}</button>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="texticon add_texticon">&#xe6dc;</text>
				<text class="add_title">预算</text>
			</view>
			<view class="add_items">
				<input v-model="budget" class="add_input add_text" style="width:210rpx;margin-right: 38rpx;" placeholder="请输入..." />
				<text class="add_text">元</text>
			</view>
		</view>
		<view>
			<view class="add_sub">
				<text class="texticon add_texticon">&#xe662;</text>
				<text class="add_title">封面</text>
			</view>
			<view class="add_items">
				<image v-if="image" class="uni-uploader__img" style="height:200rpx;" :src="image" :data-src="image[0]" @click="chooseImage"></image>
				<button v-if="!image" class="add_btn" style="height:132rpx;width: 132rpx;" @click="chooseImage">
					<text class="texticon add_texticon add_photo">&#xe609;</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import BaseApi from 'static/config.js'
	import permision from "@/colorui/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	
	export default {
		computed: mapState(['forcedLogin', 'hasLogin','userinfo']),
		data() {
			return {
				//目的地
				destination: "杭州",
				//开始日期
				startDate: '2020-05-20',
				//结束日期
				endDate: '2020-05-22',
				name: '',
				budget: 0,
				image: '',
				sourceTypeIndex: 2,
				sizeTypeIndex: 2,
			}
		},
		onShow() {
			//强制登录
			this.checkLogin();
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
			//监听选择目的地页面传过来的目的地
			uni.$on('checkCity', this.changeCity)
		},
		onUnload() {
			//撤销监听
			uni.$off('checkDate', this.changeDate)
			uni.$off('checkCity', this.changeCity)
			this.image= ''
		},
		onNavigationBarButtonTap() {
			uni.request({
				url:BaseApi+"/api/v1/journey/new",
				method: "POST",
				data: {
					name: this.name,
					owner_id:this.userinfo.id,
					destination:this.destination,
					start_time:this.startDate,
					end_time:this.endDate,
					budget: this.budget
				},
				dataType: 'json',
				header: {
					'content-type': 'application/json'
				},
				success:(res)=>{
					uni.uploadFile({
						url: "/api/v1/journey/"+res.data.id+"/update-image",
						method: "POST",
						filePath:this.image,
						name:"image",
						success:(res)=>{
							console.log("图片上传成功")
							console.log(res.data);
							uni.showToast({
								title:"创建行程成功!"
							})
							uni.redirectTo({
								url:"../xingcheng/xingcheng",
								success:function(){
									console.log("跳转成功")
								},
								fail:function(){
									console.log("跳转失败")
								}
							})
						},
						fail:function(){
							console.log("连接失败")
						}
					})
					console.log("创建成功")
				},
				fail:function(){
					console.log("连接失败")
				}
			})
		},
		methods: {
			...mapMutations(['checkLogin']),
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
			},
			//跳转到选择目的地页面
			selectCity() {
				console.log("已点击")
				uni.navigateTo({
					url: '/pages/destination/destination',
					success: function(data) {
						console.log('跳转成功', data)
					},
					fail: function(data) {
						console.log('跳转失败', data)
					}
				});
			},
			//处理目的地页面传过来的数据
			changeCity(e) {
				console.log(e.data.toString());
				//更新目的地
				this.destination = e.data.toString();
			},
			//预览封面
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.image
				})
			},
			//选择图片
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				// if (this.imageList.length === 9) {
				// 	let isContinue = await this.isFullImg();
				// 	console.log("是否继续?", isContinue);
				// 	if (!isContinue) {
				// 		return;
				// 	}
				// }
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths);
						this.image = res.tempFilePaths[0];
						console.log(this.image);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			// isFullImg: function() {
			// 	return new Promise((res) => {
			// 		uni.showModal({
			// 			content: "是否清空现有图片？",
			// 			success: (e) => {
			// 				if (e.confirm) {
			// 					this.imageList = [];
			// 					res(true);
			// 				} else {
			// 					res(false)
			// 				}
			// 			},
			// 			fail: () => {
			// 				res(false)
			// 			}
			// 		})
			// 	})
			// },
			//权限验证
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
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

	.add_title {
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
