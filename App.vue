<script>
	import Vue from 'vue'
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['hasLogin', 'userinfo', 'journeyinfo']),
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			getDate() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day;
				return timer;
			}
			// format() {
			// var o = {
			//         "M+": this.getMonth() + 1, //月份
			//         "d+": this.getDate(), //日
			//         "h+": this.getHours(), //小时
			//         "m+": this.getMinutes(), //分
			//         "s+": this.getSeconds(), //秒
			//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
			//         "S": this.getMilliseconds() //毫秒
			//     };
			//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			//     for (var k in o)
			//         if (new RegExp("(" + k + ")").test(fmt))
			//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			//     return fmt;
			// },
			// nestedSearch(obj, keyChain) {
			// 	const keys = keyChain.split(".");
			// 	return keys.reduce((p, n) => {
			// 		p = p[n];
			// 		return p;
			// 	}, obj)
			// },
			// //获取最近出行
			// getRecent() {
			// 	uni.request({
			// 		url: '/api/v1/user/' + this.userinfo.id + '/journeys',
			// 		method: "GET",
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success: (res) => {
			// 			console.log(res.data);
			// 			if (res.data.count) {
			// 				console.log(res.data.journeys[res.data.count - 1].name);
			// 				var recenttrip = res.data.journeys[res.data.count - 1];
			// 				var nowDate = Date.parse(getApp().getTime());
			// 				this.journeyinfo.xingcheng_title = recenttrip.name;
			// 				console.log(this.journeyinfo.xingcheng_title);
			// 				console.log(nowDate);
			// 				if (nowDate > Date.parse(recenttrip.start_time)) {
			// 					if (nowDate > Date.parse(recenttrip.end_time)) {
			// 						console.log("已结束");
			// 					} else {
			// 						console.log("正在进行");
			// 						uni.request({
			// 							url: '/api/v1/journey/' + '6' + '/activity-by-date',
			// 							method: "GET",
			// 							header: {
			// 								'content-type': 'application/json'
			// 							},
			// 							success: (res) => {
			// 								if (res.data.days) {
			// 									var index = 0;
			// 									for (var i = 0; i < res.data.days; i++) {
			// 										if (getApp().getDate() == res.data.data[i].date) index = i;
			// 									}
			// 									for (var i = 0; i < res.data.data[index].activity.length; i++) {
			// 										var start = this.nestedSearch(res.data.data[index], 'activity.' + i + '.start_time');
			// 										var end = this.nestedSearch(res.data.data[index], 'activity.' + i + '.end_time');
			// 										if (nowDate > Date.parse(start) && nowDate < Date.parse(end)) 
			// 										console.log("现在是day" + index+"---"+start+"---"+end);
			// 									}
			// 									console.log(this.nestedSearch(res.data.data, '0.activity.0.title'))
			// 								} else {
			// 									console.log("无活动列表")
			// 								}
			// 							},
			// 							fail: function() {
			// 								console.log("查询失败")
			// 							}
			// 						})
			// 					}
			// 				} else {
			// 					console.log("还未开始");
			// 				}
			// 				console.log("llalalla")
			// 			} else {
			// 				console.log("无最近出行记录");
			// 			}
			// 		},
			// 		fail: function() {
			// 			console.log("连接失败")
			// 		}
			// 	})
			// }
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/common.css";

	/* #endif */


	@font-face {
		font-family: 'iconfont';
		/* project id 1788298 */
		src: url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.eot');
		src: url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1788298_e3uq4u29c28.svg#iconfont') format('svg');

	}

	@font-face {
		font-family: 'PingFang';
		src: url('~@/fonts/PingFang.ttf');
	}
</style>
