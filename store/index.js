import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
	    userinfo:{},
		journey:{}
	},
	mutations: {
		login(state, provider) {
			// state.userName = userName || '新用户';
			// state.userID = userID;
			// console.log(state.userName+'-----'+state.userID);
			state.hasLogin = true;
			state.userinfo = provider;
			console.log(state.userinfo);
		},
		logout(state) {
			// state.userName = "";
			// state.userID = 0;
			state.hasLogin = false;
			state.userinfo = {};
		},
		getJourney(state,provider){
			state.journey= provider;
		},
		checkLogin(state){
			if (!state.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					confirmColor: "#418A71",
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (state.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
})

export default store
