<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <div :class="nav ? 'router_box' : 'router_logo'">
                <router-view v-if="isRouterAlive"></router-view>
            </div>
        </transition>
        <!-- 超时页面 -->
        <Warning v-if="appear"></Warning>
        <van-tabbar v-model="activeV" v-if="nav">
            <van-tabbar-item @click="skip(activeV)">
                <span>{{$router.options.routes[2].name}}</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.home_atc : icon.home">
            </van-tabbar-item>
            <van-tabbar-item @click="skip(activeV)">
                <span>{{$router.options.routes[3].name}}</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.decal_atc : icon.decal">
            </van-tabbar-item>
            <van-tabbar-item @click="skip(activeV)">
                <span>{{$router.options.routes[4].name}}</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.single_atc : icon.single">
            </van-tabbar-item>
            <van-tabbar-item @click="skip(activeV)">
                <span>{{$router.options.routes[5].name}}</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.personage_atc : icon.personage">
            </van-tabbar-item>
                <!-- <van-tabbar-item icon="iconfont iconhome" >{{$router.options.routes[2].name}}</van-tabbar-item> -->
                <!-- <van-tabbar-item icon="iconfont icondeal" @click="skip(activeV)"></van-tabbar-item>
                <van-tabbar-item icon="iconfont iconEverythingWithout" @click="skip(activeV)">{{$router.options.routes[4].name}}</van-tabbar-item>
                <van-tabbar-item icon="iconfont iconpersonage" :info="perhint?  num: ''" @click="skip(activeV)">{{$router.options.routes[5].name}}</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>
<script>
import Warning from './views/hint/Warning'
import Home from './publi/img/home_icon.png'
import Personage from './publi/img/personage_icon.png'
import Decal from './publi/img/decal_icon.png'
import Single from './publi/img/single_icon.png'
import HomeAtc from './publi/img/home_icon_atc.png'
import PersonageAtc from './publi/img/personage_icon_atc.png'
import DecalAtc from './publi/img/decal_icon_atc.png'
import SingleAtc from './publi/img/single_icon_atc.png'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'app',
    components: {
        Warning
    },
    created() {
        this.getViewportSize()
        this.activeV = this.active
        sessionStorage.setItem('width', JSON.stringify(this.getViewportSize().width));
        sessionStorage.setItem('height', JSON.stringify(this.getViewportSize().height));
        this.inWidth()
        this.inHeight()

    },
    mounted() {},
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
            num: 0,
            perhint: '',
            activeV: 0,
            icon: {
                home: Home,
                home_atc: HomeAtc,
                personage: Personage,
                personage_atc: PersonageAtc,
                decal: Decal,
                decal_atc: DecalAtc,
                single: Single,
                single_atc: SingleAtc
            }
        }
    },
    computed: {
        ...mapState(['appear', 'mess', 'arrNum', 'nav', 'active']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'act', 'inWidth', 'inHeight']),
        // 监听路由 使路由刷新
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            })
        },
        skip(v) {
            // this.activeV = this.active
            this.activeV = v
            this.act(v)
            this.$router.push({ path: `${this.$router.options.routes[v+2].path}` })
            this.reload()
            sessionStorage.removeItem('sign');
            sessionStorage.removeItem('finNum');
        },
        getViewportSize() {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        }
    }
}
</script>
<style lang="scss">
body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
}

#app {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: url('./publi/img/bac.png') no-repeat;

    .router_box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 50px;
        width: 100%;
        overflow: hidden;
        background: url('./publi/img/bac.png') no-repeat;
    }

    .router_logo {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: url('./publi/img/bac.png') no-repeat;
    }
}
</style>