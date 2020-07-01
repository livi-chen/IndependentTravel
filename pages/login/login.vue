<template>
	<view style="padding:0 60rpx 0 60rpx;" class="flex flex-direction align-center justify-center">
		<text style="font-size: 100rpx;margin: 100rpx;">Welcome</text>
		<view class="logininput">
			<input v-model="username" type="text" placeholder="手机号/邮箱/用户名"/>
		</view>
		<view class="logininput">
			<input v-model="password" type="text" password="true" placeholder="密码" />
		</view>
		<button @click="bindLogin" class="loginbtn round">登录</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import BaseApi from 'static/config.js'
	
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			...mapMutations(['login']),
			bindLogin() {
				uni.request({
					url: BaseApi+"/login",
					method: "POST",
					data: {
						name: this.username,
						password: this.password
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							console.log(res.data.data.name);
							console.log(res.data.data.id);
							// this.login(res.data.data.name,res.data.data.id);
							this.login(res.data.data);
							uni.showToast({
								icon: 'none',
								title: '登录成功',
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 100)
						} else {
							uni.showToast({
								icon: 'none',
								title: '用户账号或密码不正确',
							});
						}
					},
					fail: function() {
						console.log("连接失败")
					}
				})
			}
		}
	}
</script>

<style>
.loginbtn{
	background: linear-gradient(170deg, rgba(59, 203, 154, 1) 0%, rgba(65, 138, 113, 1) 100%);
	color: #FFFFFF;
	margin: 60rpx 40rpx 0 40rpx;
	width: 100%;
}
.logininput{
	border-bottom: solid 1px #989898;
	height: 60rpx;
	margin: 40rpx;
	width: 100%;
}
</style>
