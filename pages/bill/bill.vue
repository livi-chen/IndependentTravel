<template>
	<view style="padding: 0 30rpx 0 30rpx;margin-top: 50rpx;">
		<view class="flex align-center">
			<view class="flex justify-between align-center common_topbox">
				<view class="flex align-center">
					<text class="common_text" style="color: #418A71;width: 60px;line-height: 56rpx;" space="emsp">旅 行 账 本</text>
					<view class="common_round"></view>
				</view>
				<view class="flex flex-direction">
					<text class="common_textmini">个人预算</text>
					<text class="common_textbig">{{budget}}</text>
				</view>
				<view class="flex flex-direction">
					<text class="common_textmini">实际支出</text>
					<text class="common_textbig">{{fare}}</text>
				</view>
				<view class="flex flex-direction">
					<text class="common_textmini">还可以花</text>
					<text class="common_textbig">{{remain}}</text>
				</view>
			</view>
		</view>
		<view class="flex">
			<view style="margin-right: 60rpx;">
				<text @click="changemodel(0)" class="module_title" style="margin: 0;">全部</text>
				<view v-show="current === 0" class="module_underline" style="margin: 0;"></view>
			</view>
			<view style="margin-right: 60rpx;">
				<text @click="changemodel(1)" class="module_title" style="margin: 0;">只看我</text>
				<view v-show="current === 1" class="module_underline" style="margin: 0;width: 96rpx;"></view>
			</view>
			<view>
				<text @click="changemodel(2)" class="module_title" style="margin: 0;">只看未结清</text>
				<view v-show="current === 2" class="module_underline" style="margin: 0;width: 160rpx;"></view>
			</view>
		</view>

		<view v-if="current === 0 && isbill">
			<view v-for="(item,index) in billinfos" :key="index" @click="opendetail(item)" class="cu-card" style="margin-left: 0;padding: 30rpx;margin-top: 40rpx;">
				<view class="flex justify-between align-center">
					<view class="flex align-center">
						<image src="../../static/userimg_mini.png" style="width: 72rpx;height: 72rpx;margin-right: 40rpx;"></image>
						<view class="flex flex-direction">
							<text class="bill_text" style="margin-bottom: 10rpx;">{{item.label_name}}·{{item.description}}</text>
							<text class="bill_textmini">{{item.owner_id}}在{{item.date}}记了一笔</text>
						</view>
					</view>
					<button disabled="true" plain="true" class="bill_label flex" :style="billstatestyle">{{bill_state}}</button>
				</view>
				<view class="flex align-center justify-between" style="padding: 30rpx 0 30rpx 0;">
					<text class="bill_textmini">{{item.paid_count}}/{{item.count}}</text>
					<progress :percent="(item.paid_count/item.count)*100" activeColor=" #418A71" backgroundColor="rgba(65,138,113,0.33)"
					 stroke-width="3" style="width: 360rpx;"></progress>
					<text class="bill_text" style="color: #418A71;">¥{{item.cost}}</text>
				</view>
				<view v-if="item.isExpend" v-for="(member,index) in memberName" :key="member" class="flex justify-between align-center"
				 style="margin-bottom: 16rpx;">
					<view class="flex align-center">
						<image src="../../static/userimg_mini.png" style="width: 30rpx;height: 30rpx;margin-right: 30rpx;"></image>
						<text class="bill_textmini" :style="{color:memberstyle[index]}">{{member}}</text>
					</view>
					<text class="bill_textmini" :style="{color:memberstyle[index]}">¥{{item.cost/item.count}}</text>
				</view>
			</view>
		</view>

		<view v-if="current === 1">
			<view v-for="(item,index) in memberbill" :key="index" @click="openbillitems(item)" class="cu-card" style="margin-left: 0;padding: 30rpx;margin-top: 40rpx;">
				<view class="flex align-center justify-between" style="margin-bottom: 10rpx;">
					<view class="flex align-center">
						<image src="../../static/userimg_mini.png" style="width: 72rpx;height: 72rpx;margin-right: 30rpx;"></image>
						<text class="common_text">{{item.name}}</text>
					</view>
					<view style="margin-bottom: 10rpx;">
						<text class="common_text" style="margin-right: 10rpx;">向我支付</text>
						<text class="common_text" space="ensp" style="color: #418A71;">¥ {{item.bill}}</text>
					</view>
				</view>
				<view v-if="item.isExpend" v-for="(items,sub) in item.billinfos" :key="sub">
					<text class="bill_textmini text-bold" style="margin-bottom: 10rpx;">{{items.date}}</text>
					<view class="flex justify-between align-center" style="margin-bottom: 10rpx;" v-for="(subitem,subindex) in items.billitems"
					 :key="subindex">
						<text class="common_text" space="ensp">{{subitem.labelname}} · {{subitem.description}}</text>
						<view>
							<text class="common_text" style="margin-right: 30rpx;color: #418A71;" space="ensp">
								¥ {{subitem.cost}} / {{subitem.count}}
							</text>
							<text class="texticon">&#xe61e;</text>
						</view>
					</view>

					<view class="flex justify-center" style="margin-top: 30rpx;">
						<button plain="true" class="bill_btn flex common_text texticon" style="width: 250rpx;">&#xe61e; 提醒他</button>
					</view>
				</view>
			</view>
		</view>

		<view v-if="current === 2">
			<view v-for="(item,index) in mybill" :key="index" @click="openbillitems(item)" class="cu-card" style="margin-left: 0;padding: 30rpx;margin-top: 40rpx;">
				<view class="flex align-center justify-between" style="margin-bottom: 10rpx;">
					<view class="flex align-center">
						<image src="../../static/userimg_mini.png" style="width: 72rpx;height: 72rpx;margin-right: 30rpx;"></image>
						<text class="common_text">{{item.membername}}</text>
					</view>
					<view style="margin-bottom: 10rpx;">
						<text class="common_text" style="margin-right: 10rpx;">向他支付</text>
						<text class="common_text" space="ensp" style="color: #418A71;">¥ {{item.bill}}</text>
					</view>
				</view>
				<view v-if="item.isExpend" v-for="(items,sub) in item.billinfos" :key="sub">
					<text class="bill_textmini text-bold" style="margin-bottom: 10rpx;">{{items.date}}</text>
					<view class="flex justify-between align-center" style="margin-bottom: 10rpx;" v-for="(subitem,subindex) in items.billitems"
					 :key="subindex">
						<text class="common_text" space="ensp">{{subitem.labelname}} · {{subitem.description}}</text>
						<view>
							<text class="common_text" style="margin-right: 30rpx;color: #418A71;" space="ensp">
								¥ {{subitem.cost}} / {{subitem.count}}
							</text>
							<text class="texticon">&#xe61e;</text>
						</view>
					</view>

					<view class="flex justify-center" style="margin-top: 30rpx;">
						<button plain="true" class="bill_btn flex common_text texticon" style="width: 250rpx;">&#xe61e; 提醒他</button>
					</view>
				</view>
			</view>
		</view>

		<view v-if="!isbill">无账单记录</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import BaseApi from 'static/config.js'

	export default {
		computed: mapState(['journey', 'userinfo']),
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "../accounts/accounts",
				success: function() {
					console.log("跳转成功")
				},
				fail: function() {
					console.log("跳转失败")
				}
			})
		},
		onReady() {
			this.getAllbillinfo();
		},
		data() {
			return {
				bill_state: "未结清",
				memberName: ["红红"],
				current: 0,
				budget: 0,
				fare: 0,
				remain: 0,
				billinfos: [{}],
				mybillinfo: [],
				otherbillinfo: [],
				isbill: false,
				billstatestyle: {
					"border-color": "#418A71",
					color: "#418A71",
					"background-color": "#FFFFFF"
				},
				memberstyle: [],
				memberbill: [],
				mybill: []
			}
		},
		methods: {
			async changemodel(num) {
				this.current = num;
				this.isbill = true;
				if (this.current == 1 && this.memberbill.length == 0) {
					if (this.mybillinfo.length == 0) {
						this.isbill = false;
					} else {
						for (var i = 0; i < this.mybillinfo.length; i++) {
							var [error, res] = await uni.request({
								url: BaseApi + "/api/v1/bill_info/" + this.mybillinfo[i].id + "/items",
								method: "GET"
							})
							var tempmemberbill = res.data.items;
							var flag = false;
							var tempindex = 0;
							for (var k = 0; k < tempmemberbill.length; k++) {
								if (tempmemberbill[k].user_id != this.userinfo.id) {
									for (var j = 0; j < this.memberbill.length; j++) {
										if (tempmemberbill[k].user_id == this.memberbill[j].userid) {
											flag = true;
											tempindex = j;
										}
									}
									if (!flag) {
										var [error, res] = await uni.request({
											url: BaseApi + "/api/v1/user/" + tempmemberbill[k].user_id,
											method: "GET"
										})
										this.memberbill.push({
											"userid": tempmemberbill[k].user_id,
											"name": res.data.name,
											"bill": this.mybillinfo[i].cost / this.mybillinfo[i].count,
											"isExpend": false,
											"billinfos": [{
												"date": this.mybillinfo[i].date,
												"billitems": [{
													"id": this.mybillinfo[i].id,
													"state": tempmemberbill[k].state,
													"labelname": this.mybillinfo[i].label_name,
													"description": this.mybillinfo[i].description,
													"cost": this.mybillinfo[i].cost,
													"count": this.mybillinfo[i].count
												}]
											}]
										})
									} else {
										this.memberbill[tempindex].bill += this.mybillinfo[i].cost / this.mybillinfo[i].count;
										var isfind = false;
										var tempi = 0;
										for (var a = 0; a < this.memberbill[tempindex].billinfos.length; a++) {
											if (this.mybillinfo[i].date == this.memberbill[tempindex].billinfos[a].date) {
												isfind = true;
												tempi = a;
											}
										}
										if (!isfind) {
											this.memberbill[tempindex].billinfos.push({
												"date": this.mybillinfo[i].date,
												"billitems": [{
													"id": this.mybillinfo[i].id,
													"state": tempmemberbill[k].state,
													"labelname": this.mybillinfo[i].label_name,
													"description": this.mybillinfo[i].description,
													"cost": this.mybillinfo[i].cost,
													"count": this.mybillinfo[i].count
												}]
											})
										} else {
											this.memberbill[tempindex].billinfos[tempi].billitems.push({
												"id": this.mybillinfo[i].id,
												"state": tempmemberbill[k].state,
												"labelname": this.mybillinfo[i].label_name,
												"description": this.mybillinfo[i].description,
												"cost": this.mybillinfo[i].cost,
												"count": this.mybillinfo[i].count
											})
										}

									}
								}
							}
						}
					}
				}
				if (this.current == 2 && this.mybill.length == 0) {
					if (this.otherbillinfo.length == 0) {
						this.isbill = false;
					}
					console.log("temparr")
					for (var i = 0; i < this.otherbillinfo.length; i++) {
						var [error, res] = await uni.request({
							url: BaseApi + "/api/v1/bill_info/" + this.otherbillinfo[i].id + "/items",
							method: "GET"
						})
						var temparr = res.data.items;
						console.log(temparr)
						var ff = false;
						for (var p = 0; p < temparr.length; p++) {
							if (temparr[p].user_id == this.userinfo.id) {
								ff = true;
								console.log("hahhaha")
								if (this.mybill.length) {
									var flag = false;
									var temp = 0;
									for (var t = 0; t < this.mybill.length; t++) {
										if (this.otherbillinfo[i].owner_id == this.mybill[t].membername) {
											flag = true;
											temp = t;
										}
									}
									if (!flag) {
										this.mybill.push({
											"membername": this.otherbillinfo[i].owner_id,
											"isExpend": false,
											"bill": this.otherbillinfo[i].cost / this.otherbillinfo[i].count,
											"billinfos": [{
												"date": this.otherbillinfo[i].date,
												"billitems": [{
													"labelname": this.otherbillinfo[i].label_name,
													"description": this.otherbillinfo[i].description,
													"cost": this.otherbillinfo[i].cost,
													"count": this.otherbillinfo[i].count,
													"state": temparr[p].state
												}]
											}]
										})
									} else {
										this.mybill[temp].bill += this.otherbillinfo[i].cost / this.otherbillinfo[i].count;
										var f = false;
										var temp2 = 0;
										for (var b = 0; b < this.mybill.otherbillinfo.length; b++) {
											if (this.otherbillinfo[i].date == this.mybill.otherbillinfo[b].date) {
												f = true;
												temp2 = b;
											}
										}
										if (f) {
											this.mybill[temp].billinfos[temp2].billitems.push({
												"labelname": this.otherbillinfo[i].label_name,
												"description": this.otherbillinfo[i].description,
												"cost": this.otherbillinfo[i].cost,
												"count": this.otherbillinfo[i].count,
												"state": temparr[p].state
											})
										} else {
											this.mybill[temp].billinfos.push({
												"date": this.otherbillinfo[i].date,
												"billitems": [{
													"labelname": this.otherbillinfo[i].label_name,
													"description": this.otherbillinfo[i].description,
													"cost": this.otherbillinfo[i].cost,
													"count": this.otherbillinfo[i].count,
													"state": temparr[p].state
												}]
											})
										}
									}
								} else {
									this.mybill.push({
										"membername": this.otherbillinfo[i].owner_id,
										"isExpend": false,
										"bill": this.otherbillinfo[i].cost / this.otherbillinfo[i].count,
										"billinfos": [{
											"date": this.otherbillinfo[i].date,
											"billitems": [{
												"labelname": this.otherbillinfo[i].label_name,
												"description": this.otherbillinfo[i].description,
												"cost": this.otherbillinfo[i].cost,
												"count": this.otherbillinfo[i].count,
												"state": temparr[p].state
											}]
										}]
									})
								}
							}
						}
						if (ff == false) {
							this.isbill = false;
						}
					}
				}
			},
			async getAllbillinfo() {
				//读取行程详细信息
				var [error, res] = await uni.request({
					url: BaseApi + '/api/v1/journey/' + this.journey.jid,
					method: "GET"
				})
				this.budget = res.data.budget;
				uni.request({
					url: BaseApi + "/api/v1/journey/" + this.journey.jid + "/billinfos",
					method: "GET",
					success: (res) => {
						this.billinfos = res.data.billinfos;
						console.log(this.billinfos)
						for (var i = 0; i < this.billinfos.length; i++) {
							this.getUser(this.billinfos[i].owner_id, i);
							console.log(this.billinfos[i].date)
							this.billinfos[i].date = this.billinfos[i].date.replace(/-/g, '/');
							this.billinfos[i].date = new Date(this.billinfos[i].date).format('M月dd日');
							console.log(this.billinfos[i].date)
							if (this.bill_paynum == this.billinfos[i].count) {
								this.bill_state = "已结清";
								this.billstatestyle = {
									"border-color": "#418A71",
									color: "#FFFFFF",
									"background-color": "#418A71"
								}
							}

							if (this.billinfos[i].owner_id == this.userinfo.id) {
								//获取所有我创建的账单
								this.mybillinfo.push(this.billinfos[i]);
							} else {
								//获取所有不是我创建的账单
								this.otherbillinfo.push(this.billinfos[i]);
							}
							this.fare += this.billinfos[i].cost / this.billinfos[i].count;
						}
						this.billinfos = this.billinfos.map(i => {
							this.$set(i, "isExpend", false);
							return i;
						})
						this.remain = this.budget - this.fare;
						this.isbill = true;
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			getUser(uid, i) {
				uni.request({
					url: BaseApi + "/api/v1/user/" + uid,
					method: "GET",
					success: (res) => {
						this.billinfos[i].owner_id = res.data.name
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			},
			async opendetail(item) {
				if (item.isExpend == false) {
					var [error, res] = await uni.request({
						url: BaseApi + "/api/v1/bill_info/" + item.id + "/items",
						method: "GET"
					})
					var tempitems = res.data.items;
					for (var i = 0; i < tempitems.length; i++) {
						var [error, res] = await uni.request({
							url: BaseApi + "/api/v1/user/" + tempitems[i].user_id,
							method: "GET",
						})
						this.memberName[i] = res.data.name
						if (tempitems[i].status === 1) {
							this.memberstyle[i] = "#418A71"
						} else {
							this.memberstyle[i] = "#000000"
						}
					}
				}
				item.isExpend = !item.isExpend;
			},
			async openbillitems(item) {
				item.isExpend = !item.isExpend;
			}
		}
	}
</script>

<style>
	.bill_text {
		font-size: 28rpx;
	}

	.bill_textmini {
		font-size: 20rpx;
	}

	.bill_label {
		width: 110rpx;
		height: 50rpx;
		font-size: 24rpx;
		padding: 10rpx 0 10rpx 0;
		justify-content: center;
		align-items: center;
		border-radius: 32rpx;
		margin: 0;
	}

	.bill_btn {
		height: 60rpx;
		font-size: 24rpx;
		padding: 10rpx 0 10rpx 0;
		justify-content: center;
		align-items: center;
		border-radius: 32rpx;
		margin: 0;
		border-color: #418A71;
		color: #418A71;
		background-color: #FFFFFF;
	}
</style>
