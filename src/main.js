import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
// import 'babel-polyfill'
// import 'es6-promise/auto'
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
// Es6Promise.polyfill()
// if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
// if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

//未知 

// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import 'video.js/dist/video-js.css';
require('vue-video-player/src/custom-theme.css');
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';

//UI依赖
import Vant from './vant-ui.config.js';
import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import './publi/iconf/style.css'

//封装api的引入  this.$api.get(``, params, r => {})  this.$api.post(``, params, r => {})
import api from './api/http';
Vue.prototype.$api = api;

//封装加密的引入  this.$des.encrypt()加密   this.$des.decrypt()解密
import des from './tools';
Vue.prototype.$des = des;

// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化


Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(iView)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(Vant)

// if(Number.parseInt === undefined) Number.parseInt = window.parseInt;
// if(Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

const router = new VueRouter({
    routes
})


//路由全局监听
router.beforeEach((to, from, next) => {
    //登入清除信息
    if (to.path == '/login' || to.path == '/forget'  || to.path == '/qcode/') {
        sessionStorage.removeItem('mess');
        store.commit('navDis')
    } else {
        store.commit('navApp')
    }
    //提取相关用户信息和主token、随机token
    let mess = JSON.parse(sessionStorage.getItem('mess'));
    //判断是否是分享注册
    if (!to.path.indexOf('/qcode')) {
        next()
        // 判断mess是否为空和不是在登入页面
    } else if (!mess && to.path != '/login') {
        next({ path: '/login' })
    } else {
        //判断是否拿到相关用户信息和主token、随机token和不是在登入页面
        if (mess !== null) {
            let user_name = mess.user
            let init_token = mess.token
            let time = new Date().getTime()
            let cache = des.encrypt(`${user_name}:${init_token}:${time}`)
            //判断主token是否超时
            api.router_check(`cache_deny/?cache=${cache}`, {}, r => {
                if (r.state === 200) {
                    next()
                } else if (r.state === 400) {
                    sessionStorage.removeItem('mess'); // 清除数据
                    store.dispatch('inchange') // 弹出超时页面
                } else if (r.state === 500) {
                    api.router_check(`cache_deny/?cache=${cache}`, {}, r => {})
                    next()
                }
            })
        }
        next()
    }
})



new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }

})
// store.dispatch('setToken', routes)