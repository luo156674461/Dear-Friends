import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    state: {
        token: ''
    },
    mess: {}, // 储存用户信息、token和随机token
    arrNum: 0, // 存储 随机token
    appear: false, //超时页面的v-if
    start: false, // 注册页的v-if
    show: false,
    perhint: false, //认证提醒
    pernum: 0, //认证提醒数
    fundShow: false,
    millShow: false,
    orderShow: false,
    suspendShow: false,
    loadShow: false, // 加载中页的v-if
    newiInfo: {},
    qrshow: false,
    // 导航显示
    nav: false,
    headShow: false, // 交易头部
    active: 0, //导航
    scrnWidth: 0, // 屏幕宽
    scrnHeight: 0, // 屏幕高
    showEmpty: true,
}

// 定义所需的 mutations
const mutations = {
    inWidth(state) {
        state.scrnWidth = JSON.parse(sessionStorage.getItem('width'))
    },
    inHeight(state) {
        state.scrnHeight = JSON.parse(sessionStorage.getItem('height'))
    },
    set_token(state, token) {
        state.token = token
        sessionStorage.token = token
    },
    del_token(state) {
        state.token = ''
        sessionStorage.removeItem('token')
    },
    //提取用户信息和主token和随机token
    getMess(state) {
        state.mess = JSON.parse(sessionStorage.getItem('mess'));
        // 随机token为空跳回登录页
        if (state.mess.time.length === 0) {
            this.$router.push({ path: '/login' })
        }
    },
    // 提取随机token 再重新记录
    byValue(state) {
        state.arrNum = state.mess.time[state.mess.time.length - 1]
        state.mess.time.pop()
        sessionStorage.setItem('mess', JSON.stringify(state.mess));
    },
    // 超时页面的弹出
    change(state) {
        state.appear = !state.appear
    },
    // 注册页的弹出
    jumpReg(state) {
        state.start = !state.start
    },
    eye(state) {
        state.show = !state.show
    },
    fundopen(state) {
        state.fundShow = !state.fundShow
    },
    millopen(state) {
        state.millShow = !state.millShow
    },
    orderopen(state) {
        state.orderShow = !state.orderShow
    },
    suspendopen(state) {
        state.suspendShow = !state.suspendShow
    },
    // 加载中页的弹出
    loadopen(state) {
        state.loadShow = true
    },
    // 加载中页的收回
    loadcut(state) {
        state.loadShow = false
    },
    qropne(state) {
        state.qrshow = !state.qrshow
    },
    // 认证提醒
    perh(state) {
        state.perhint = true
    },
    vanish(state) {
        state.perhint = false
    },
    add(state) {
        state.pernum++
    },
    min(state) {
        state.pernum--
    },

    // 导航显示
    navApp(state) {
        state.nav = true
    },
    // 导航消失
    navDis(state) {
        state.nav = false
    },
    // 交易头部
    headT(state) {
        state.headShow = true
    },
    headF(state) {
        state.headShow = false
    },
    // 导航
    act(state, payload) {
        state.active = payload
    },
    showEmptyTrue(state) {
        state.showEmpty = true
    },
    showEmptyFalse(state) {
        state.showEmpty = false
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    state,
    mutations
})