<template>
	<view>
		<view class="flex justify-between align-center accounts_padding" style="background-color: #418A71;height: 144rpx;">
			<text class="accounts_text accounts_textwhite">{{billsort}}</text>
			<view class="flex flex-direction align-end">
				<text class="accounts_textmini accounts_textwhite">{{formula}}</text>
				<text class="accounts_textbig accounts_textwhite">{{result}}</text>
			</view>
		</view>
		<view class="flex justify-between align-center" style="background-color: #EDF5F2;height: 80rpx;padding: 0 20rpx 0 20rpx;">
			<text class="texticon" style="margin: 0;color: #418A71;">&#xe7e6;</text>
			<text class="accounts_textmini" style="color: #418A71;">收款人</text>
			<text style="color: #418A71;">|</text>
			<image src="../../static/userimg_mini.png" style="width: 40rpx;height: 40rpx;"></image>
			<image src="../../static/userimg_mini.png" style="width: 40rpx;height: 40rpx;"></image>
			<image src="../../static/userimg_mini.png" style="width: 40rpx;height: 40rpx;"></image>
			<image src="../../static/userimg_mini.png" style="width: 40rpx;height: 40rpx;"></image>
			<text class="texticon accounts_textmini" space="ensp" style="color: #418A71;">旺旺Wang...等6人 &#xe61f;</text>
		</view>
		<view class="flex flex-wrap align-center justify-between" @click="checksort">
			<view v-for="(item,index) in sort" :key="item.sortname" :data-billsort="item.sortname" class="flex flex-direction align-center"
			 style="padding: 40rpx 40rpx 0 40rpx;">
				<image :src="item.iconsrc" :data-billsort="item.sortname" style="width: 56rpx;height: 56rpx;margin-bottom: 10rpx;"></image>
				<text :style="{color: item.sortcolor}" :data-billsort="item.sortname" class="accounts_textmini">{{item.sortname}}</text>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;">
			<view class="flex align-center" style="padding: 0 20rpx 0 20rpx;margin-bottom: 20rpx;">
				<text class="texticon">&#xe70b;</text>
				<text class="common_text">{{createdate}}</text>
				<text style="margin: 0 20rpx;">|</text>
				<text class="texticon">&#xe657;</text>
				<input v-model="billdesc" class="common_text" style="color: #aaaaaa;" placeholder="写点什么记录一下..." />
			</view>
			<view class="flex flex-wrap justify-between" @click="calculate">
				<view v-for="item in calc" :key="item" class="flex justify-center align-center accounts_calcbox" :data-id="item">
					<text class="accounts_textbig" :data-id="item">{{item}}</text>
				</view>
				<view class="flex justify-center align-center accounts_calcbox" data-id="0">
					<text class="accounts_textbig" data-id="0">0</text>
				</view>
				<view class="flex justify-center align-center accounts_calcbox" data-id=".">
					<text class="accounts_textbig" data-id=".">.</text>
				</view>
				<view class="flex justify-center align-center accounts_calcbox" data-id="del">
					<text class="accounts_textbig texticon" style="margin: 0;" data-id="del">&#xe627;</text>
				</view>
				<view class="flex justify-center align-center accounts_calcbox" style="background-color: #418A71;color: #FFFFFF;"
				 data-id="=">
					<text class="accounts_textbig texticon" data-id="=">OK</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseApi from '../../static/config.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: mapState(['journey', 'userinfo']),
		onNavigationBarButtonTap() {
			uni.request({
				url: BaseApi + '/api/v1/bill_item/new',
				method: "POST",
				data: {
					journey_id: this.journey.jid,
					owner_id: this.userinfo.id,
					label_id: this.billlabel_id,
					description: this.billdesc,
					cost: this.result
				},
				success: (res) => {
					uni.showToast({
						title: '账单创建成功!'
					})
				},
				fail: function() {
					console.log("连接失败")
				}
			})
		},
		data() {
			return {
				formula: '0',
				result: '0',
				createdate: "2.14",
				sort: [{
						iconsrc: "../../static/accounts/canyin.png",
						sortname: "餐饮",
						sortcolor: "#F0BE73"
					},
					{
						iconsrc: "../../static/accounts/jiaotong.png",
						sortname: "交通",
						sortcolor: "#589ABA"
					},
					{
						iconsrc: "../../static/accounts/gouwu.png",
						sortname: "购物",
						sortcolor: "#C675B0"
					},
					{
						iconsrc: "../../static/accounts/zhusu.png",
						sortname: "住宿",
						sortcolor: "#95BA87"
					},
					{
						iconsrc: "../../static/accounts/yule.png",
						sortname: "娱乐",
						sortcolor: "#CC7D5E"
					},
					{
						iconsrc: "../../static/accounts/yiliao.png",
						sortname: "医疗",
						sortcolor: "#418A71"
					},
					{
						iconsrc: "../../static/accounts/techan.png",
						sortname: "特产",
						sortcolor: "#C44F6A"
					},
					{
						iconsrc: "../../static/accounts/menpiao.png",
						sortname: "门票",
						sortcolor: "#33559E"
					},
					{
						iconsrc: "../../static/accounts/xiaofei.png",
						sortname: "小费",
						sortcolor: "#A7A58C"
					},
					{
						iconsrc: "../../static/accounts/renqing.png",
						sortname: "人情",
						sortcolor: "#8A8A8A"
					}
				],
				calc: ["1", "2", "3", "×", "4", "5", "6", "+", "7", "8", "9", "-"],
				billsort: '餐饮',
				billlabel_id: 1,
				billdesc: '这是一笔珍贵的账单~'
			}
		},
		methods: {
			calculate(e) {
				if (this.result != '0') {
					this.formula = "0";
					this.result = '0'; //上个计算结果,清空内容
				}
				var str = '' + this.formula; //输入内容时,将输入框内容转为字符串类型
				var len = str.length;
				var arr = ["+", "-", "×"];
				var num = ('' + parseFloat(str.split('').reverse().join(''))).split('').reverse().join(''); //parseInt(str.split('').reverse().join('')))是获取输入框内最后一串数字,再反转回来 ,num为输入框内最后一串数字
				var nlen = num.length;
				if ((num != '0' && e.target.dataset.id != '.') || (e.target.dataset.id == '.' && num.indexOf(".") == -1)) { //输入框内最后一串数字不为0时拼接字符串
					if (arr.indexOf(str.charAt(len - 1)) != -1 && arr.indexOf(e.target.dataset.id) != -1) { //若一开始输入内容为运算符,输入无效
						return;
					}
					this.formula += e.target.dataset.id; //拼接输入内容
				} else {
					if (e.target.dataset.id == '.') { //若num中已有小数点,输入内容为小数点,视为无效
						return;
					} else if (!(arr.indexOf(e.target.dataset.id) != -1)) { //判断输入框内最后一个字符不为运算符
						this.formula = str.substring(0, str.length - nlen) + e.target.dataset.id; //输入框内最后一串数字为0时,删除0拼接
					}
				}

				if (e.target.dataset.id == 'del') {
					var str = this.formula;
					if (str.length == 1) {
						this.formula = "0";
					} else {
						this.formula = str.substr(0, str.length - 4);
					}
				}

				if (e.target.dataset.id == '=') {
					var str = this.formula;
					str = str.replace('×', '*').replace('=', ''); //替换运算符
					try {
						this.result = eval(str); //若用户输入内容不符合运算规则,不计算
					} catch (error) {
						return;
					}
				}
			},
			//选择分类
			checksort(e) {
				this.billsort = e.target.dataset.billsort
				switch (this.billsort) {
					case '餐饮':
						this.billlabel_id = 1;
						break;
					case '交通':
						this.billlabel_id = 2;
						break;
					case '购物':
						this.billlabel_id = 3;
						break;
					case '住宿':
						this.billlabel_id = 4;
						break;
					case '娱乐':
						this.billlabel_id = 5;
						break;
					case '医疗':
						this.billlabel_id = 6;
						break;
					case '特产':
						this.billlabel_id = 7;
						break;
					case '门票':
						this.billlabel_id = 8;
						break;
					case '小费':
						this.billlabel_id = 9;
						break;
					case '人情':
						this.billlabel_id = 10;
						break;
				}
			}
		},
	}
</script>

<style>
	.accounts_padding {
		padding: 0 30rpx 0 30rpx;
	}

	.accounts_textmini {
		font-size: 24rpx;
	}

	.accounts_text {
		font-size: 48rpx;
	}

	.accounts_textbig {
		font-size: 56rpx;
	}

	.accounts_textwhite {
		color: #FFFFFF;
	}

	.accounts_calcbox {
		width: 184rpx;
		height: 120rpx;
	}
</style>
