//test
export default {
	increment({commit}) {
		commit('INCREMENT')
	},
	decrement({commit}) {
		commit('DECREMENT')
	},
	// 弹出超时页面
	inchange({commit}) {
		commit('change')
	}
}

