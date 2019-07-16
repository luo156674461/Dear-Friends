<template>
    <div class="orderform">
        <div class="lode_box" v-if="loadShow">
            <Lode></Lode>
        </div>
        <div class="top-ops">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">订单</span>
        </div>
        <div class="list-container">
            <div class="deal">
                <span class="purchase" @click="inp(1)" :class="num === 1 ? 'active' : ''">进行中</span>
                <span class="sell" @click="inp(2)" :class="num === 2 ? 'active' : ''">已完成</span>
            </div>
            <div class="empty" v-if="showEmpty">
                <span class="txt">空空的哦</span>
            </div>
        </div>
        <transition name="lum">
            <router-view class="lum" v-if="isRouts"></router-view>
        </transition>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Buy from './widget/buy';
import Sell from './widget/sell';
import BScroll from 'better-scroll';
import Lode from './widget/lode';
export default {
    components: {

    },
    name: "life",
    data() {
        return {
            showNum: 0,
            num: 1,
            isRouts: true
        };
    },
    computed: {
        ...mapState(['mess', 'orderShow', 'arrNum', 'loadShow', 'showEmpty']),
    },
    created() {
        // this.num = JSON.parse(sessionStorage.getItem('num'))
        // this.num = sessionStorage.getItem('num')
        // this.in_buyer()
        if (JSON.parse(sessionStorage.getItem('sign'))) {
            this.inp(1)
        } else {
            this.inp(2)
        }
        this.getOrer()
    },
    mounted() {

    },
    updated() {

    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'loadopen', 'loadcut']),
        exit() {
            this.$router.push({ path: '/personage' })
            sessionStorage.removeItem('sign');
            sessionStorage.removeItem('finNum');
        },

        inp(n) {
            this.getMess()
            this.byValue()
            this.num = n
            if (n == 1) {
                // let arr1 = []
                // let arr2 = []
                // arr1 = this.listInfo.filter(o => o.sell_status === '-1')
                // arr2 = this.listInfo.filter(i => i.sell_status === '0')
                // arr1.push(...arr2)
                // this.listInfo = arr1
                // sessionStorage.setItem('listInfo', JSON.stringify(this.listInfo))
                this.$router.push({ name: '进行中' })
                this.routsShow()
            } else if (n == 2) {
                // sessionStorage.setItem('listInfo', JSON.stringify(this.listInfo))
                this.$router.push({ name: '已完成' })
                this.routsShow()

            }
        },
        getOrer() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_order_info/total_finish/?token=${token}&user=${this.mess.user}`, {}, r => {
                sessionStorage.setItem('finNum', JSON.stringify(r.msg));
            })
        },
        routsShow() {
            this.isRouts = false;
            this.$nextTick(function() {
                this.isRouts = true;
            })
        }
    },
    components: {
        Buy,
        Sell,
        Lode
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';

.orderform {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    z-index: 1000;

    .lum {
        transition: all 0.3s;

        &.lum-enter-active {
            transition: all 0.3s;
        }

        &.lum-enter {
            transform: translateX(100%);
        }

        &.lum-leave-active {
            transition: all 0.3s;
        }

        &.lum-leave-to {
            transform: translateX(100%);
        }
    }

    .lode_box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.1);
        z-index: 10;
    }

    .top-ops {
        display: flex;
        margin-bottom: 1%;
        padding: 0 3%;
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;

        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 3%;
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

    .list-container {
        position: absolute;
        top: 40px;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;


        .deal {
            display: flex;
            text-align: center;
            line-height: 43px;
            height: 43px;
            width: 100%;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0px 1px 0px rgba(84, 85, 88, 0.1);

            .purchase {
                flex: 1;
                line-height: 43px;
                height: 43px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(64, 114, 252, 1);
                opacity: 0.5;
            }

            .sell {
                flex: 1;
                line-height: 43px;
                height: 43px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(64, 114, 252, 1);
                opacity: 0.5;
            }

            .active {
                position: relative;
                line-height: 43px;
                height: 43px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(64, 114, 252, 1);
                opacity: 1;

                &::before {
                    content: " ";
                    display: inline-block;
                    position: absolute;
                    bottom: 0;
                    left: 30%;
                    height: 2px;
                    width: 40%;
                    background: rgba(52, 105, 253, 1);
                    opacity: 1;
                }
            }
        }

        .status {
            display: flex;
            width: 100%;
            padding: 15px 10px 0;

            .st-name {
                flex: 1;
                padding: 8px 1%;
                text-align: center;

                .txt {
                    padding: 10% 0;
                    background: rgba(208, 212, 223, 1);
                    border-radius: 14px;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 300;
                    line-height: 20px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
            }

            .st-name_s {
                flex: 1;
                padding: 8px 1px;
                text-align: center;

                .txt {
                    padding: 10% 0;
                    background: rgba(208, 212, 223, 1);
                    border-radius: 14px;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 300;
                    line-height: 20px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }

            }

            .active {
                background: rgba(64, 114, 252, 1) !important;
            }
        }

        .empty {
            position: absolute;
            top: 43px;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;
            z-index: 10;

            .txt {
                display: inline-block;
                margin-top: 54%;
                letter-spacing: 8px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }
        }


    }
}
</style>