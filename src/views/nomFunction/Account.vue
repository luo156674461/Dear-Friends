<template>
    <!-- 账号管理 -->
    <div class="account">
        <!--         <transition name="lump"> -->
        <router-view class="lump"></router-view>
        <!-- </transition> -->
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">账号管理</span>
        </div>
        <div class="content" ref="acc">
            <div>
                <div class="information" v-for="(i, index) in routerLi" :key="index" @click="inrou(i)">
                    <div class="img"><img :src="i.img"></div>
                        <span class="txt">{{i.name}}</span>
                        <div class="app">
                            <Approve :pay="pay" :path="i.path" v-if="index >= 3 ? false : true"></Approve>
                        </div>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <a href=""></a>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Approve from './widget/approve';
// import Identity from '../../publi/img/identity1.png';
import Dankcard from '../../publi/img/bank_img.png';
import Weixin from '../../publi/img/wechat_img.png';
import Alipay from '../../publi/img/alipay_img.png';
import Site from '../../publi/img/site.png';
import MountPass from '../../publi/img/trim_mount_pass.png';
import DealPass from '../../publi/img/trim_deal_pass.png';
export default {
    created() {
        this.pay = JSON.parse(this.$des.decrypt(this.$route.query.info))
        this.routerLi = this.$router.options.routes[5].children[0].children
        for (let i = 0, max = this.routerLi.length; i < max; i++) {
            // for (let m = 0, max = i; m < i; m++) {
            this.routerLi[i].img = this.img[i]
            // }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.accScroll) {
                this.accScroll = new BScroll(this.$refs.acc, {
                    click: true,
                    scrollY: true
                })

            } else {
                this.accScroll.refresh()
            }

        })
    },
    data() {

        return {
            pay: {},
            routerLi: {},
            img: [
                // Identity,
                Dankcard,
                Weixin,
                Alipay,
                MountPass,
                DealPass,
                Site
            ]

        }
    },
    computed: {
        ...mapState(['mess']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess']),
        exit() {
            this.getMess()
            this.byValue()
            this.$router.go(-1)
        },
        inrou(i) {
            this.getMess()
            this.byValue()
            this.$router.push({ path: i.path, query: { info: this.$route.query.info } })
        }

    },
    components: {
        Approve
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.account {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    overflow: hidden;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;

    .lump {
        transition: all 1s;

        &.lump-enter-active {
            transition: all 1s;
        }

        &.lump-enter {
            transform: translateX(100%);
        }

        &.lump-leave-active {
            transition: all 1s;
        }

        &.lump-leave-to {
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
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 1;
        color: rgba(59, 63, 75, 1);

        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 3.5%;
        }

        .name {
            flex: 1;
            margin-right: 20px;
            text-align: center;
            line-height: 40px;
        }
    }

    .interval {
        height: 13px;
        background: #ccc;
    }

    .content {
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0px;
        padding: 5%;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;
        overflow: hidden;

        .information {
            display: flex;
            height: 90px;
            margin-bottom: 12px;
            line-height: 3.5;
            background: rgba(253, 253, 254, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 5px;
            // &:nth-child(2) {
            //     background: linear-gradient(89deg, rgba(90, 213, 137, 1) 0%, rgba(128, 232, 168, 1) 100%);
            //     box-shadow: 0px 7px 20px rgba(104, 218, 148, 0.3);
            //     opacity: 1;
            //     border-radius: 5px;
            // }

            // &:nth-child(3) {
            //     background: linear-gradient(90deg, rgba(78, 148, 246, 1) 0%, rgba(107, 173, 251, 1) 84%, rgba(108, 174, 251, 1) 87%, rgba(112, 178, 252, 1) 100%);
            //     box-shadow: 0px 7px 20px rgba(101, 168, 249, 0.3);
            //     opacity: 1;
            //     border-radius: 5px;
            // }

            .img {
                flex: 0 0 55px;
                width: 55px;
                height: 90px;
                margin-right: 3%;



                img {
                    transform: translate(-18%, -12%);
                }


            }

            .txt {
                flex: 1;
                margin-left: 5px;
                font-size: 18px;
                line-height: 5;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                opacity: 1;
            }

            .app {
                flex: 0 0 42px;
                margin-right: 10px;
                width: 42px;
                height: 20px;
                transform: translateY(36px);
            }

            .boult {
                flex: 0 0 25px;
                transform: translateY(35px);
                font-size: 25px;
                height: 25px;
                float: right;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }
        }
    }




}
</style>