<template>
    <div class="passalter">
        <transition name="alter">
            <router-view class="alter"></router-view>
        </transition>
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">密码修改</span>
        </div>
        <div class="content">
            <div class="skip" @click="login">
                <!-- <div class="img"><img :src="i.img" width="100%" height="100%"></div> -->
                <span class="txt">登录密码修改</span>
                <Icon type="ios-arrow-forward" class="boult" />
            </div>
            <div class="skip" @click="deal">
                <!-- <div class="img"><img :src="i.img" width="100%" height="100%"></div> -->
                <span class="txt">交易密码修改</span>
                <Icon type="ios-arrow-forward" class="boult" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    created() {
        this.getMess()
        this.byValue()
    },
    mounted() {

    },
    updated() {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['mess', 'newinfo', 'arrNum', 'loadShow']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess', 'loadopen', 'loadcut']),
        exit() {
            this.$router.go(-1)
        },
        login() {
            // this.$router.push({ path: i.path, query: { info: this.$route.query.info } })
            this.$router.push({ path: '/loginpass' })

        },
        deal() {
            this.$router.push({ path: '/dealpass' })
        },
    },
    components: {}
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.passalter {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    transition: all 0.5s;
    z-index: 1000;
    overflow: hidden;

    .alter {
        transition: all 1s;

        &.alter-enter-active {
            transition: all 1s;
        }

        &.alter-enter {
            transform: translateX(100%);
        }

        &.alter-leave-active {
            transition: all 1s;
        }

        &.alter-leave-to {
            transform: translateX(100%);
        }
    }

    .head {
        display: flex;
        padding: 0 3%;
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;

        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 2%;
            font-size: 20px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
            border-radius: 2px;
        }

        .name {
            flex: 1;
            margin-right: 20px;
            text-align: center;
            line-height: 2.3;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }

    .content {
        padding: 0 5%;

        div {
            display: flex;
            line-height: 3;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            // color: rgba(255, 255, 255, 1);
            opacity: 1;
            padding: 3%;
            margin-bottom: 12px;
            background: linear-gradient(270deg, rgba(144, 112, 252, 1) 0%, rgba(105, 78, 246, 1) 100%);
            box-shadow: 0px 7px 20px rgba(170, 101, 249, 0.3);
            opacity: 1;
            border-radius: 5px;

            .txt {
                flex: 1;
                color: rgba(255, 255, 255, 1);
            }

            .ivu-icon {
                line-height: 3;
                flex: 0 0 20px;
                font-size: 20px;
                transform: translateY(-2%);
                color: rgba(59, 63, 75, 1);
                opacity: 1;
                border-radius: 2px;
            }
        }
    }
}
</style>