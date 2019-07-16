<template>
    <div class="funds" ref="fun">
        <div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">资金</span>
                <span class="history" @click="history">积分历史</span>
            </div>
            <div class="content">
                <!-- 总资金 -->
                <div class="always">
                    <!-- <div class="img"><img src="../../publi/img/money_top_ba.png"></div> -->
                        <div class="left">
                            <span class="txt">可用积分余额</span>
                            <span class="num">{{wallet[0].amount}}</span>
                        </div>
                        <div class="right">
                            <Button @click="straight">会员互转</Button>
                        </div>
                    </div>
                    <div class="funBox">
                        <!-- 100 -->
                        <div class="cont">
                            <div class="top">
                                <div class="title"><img src="../../publi/img/100point_money.png" width="100%" height="100%"></div>
                                </div>
                                <div class="bottom">
                                    <div class="li_left">
                                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                                            <div class="txt">冻结</div>
                                            <div class="num">{{wallet[0].five_freeze}}</div>
                                        </div>
                                        <div class="li_right">
                                            <div class="txt">收益</div>
                                            <div class="num">{{wallet[0].five_profit}}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 200 -->
                                <div class="cont">
                                    <div class="top">
                                        <div class="title"><img src="../../publi/img/200point_money.png" width="100%" height="100%"></div>
                                        </div>
                                        <div class="bottom">
                                            <div class="li_left">
                                                <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                                                    <div class="txt">冻结</div>
                                                    <div class="num">{{wallet[0].ten_freeze}}</div>
                                                </div>
                                                <div class="li_right">
                                                    <div class="txt">收益</div>
                                                    <div class="num">{{wallet[0].ten_profit}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 500 -->
                                        <div class="cont">
                                            <div class="top">
                                                <div class="title"><img src="../../publi/img/500point_money.png" width="100%" height="100%"></div>
                                                </div>
                                                <div class="bottom">
                                                    <div class="li_left">
                                                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                                                            <div class="txt">冻结</div>
                                                            <div class="num">{{wallet[0].twenty_freeze}}</div>
                                                        </div>
                                                        <div class="li_right">
                                                            <div class="txt">收益</div>
                                                            <div class="num">{{wallet[0].twenty_profit}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href=""></a>
                                    </div>
                                </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            activeNames: '1',
            wallet: [],
        }
    },
    computed: {
        ...mapState(['mess'])
    },
    methods: {
        ...mapMutations(['getMess']),
        exit() {
            this.$router.go(-1)
        },
        history() {
            this.$router.push({ path: '/past' })
        },
        straight() {
            this.$router.push({ name: '直通交易', query: { amount: this.$des.encrypt(JSON.stringify(this.wallet[0].amount)) } })
        },
        // oneTurn() {
        //     this.$Modal.confirm({
        //         title: '是否要把收益转化为可用积分',
        //         onOk() {

        //         }
        //     })
        // },
        // twoTurn() {
        //     this.$Modal.confirm({
        //         title: '是否要把收益转化为可用积分',
        //         onOk() {

        //         }
        //     })
        // },
        // fiveTurn() {
        //     this.$Modal.confirm({
        //         title: '是否要把收益转化为可用积分',
        //         onOk() {

        //         }
        //     })
        // }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.funScroll) {
                this.funScroll = new BScroll(this.$refs.fun, {
                    // click: true,
                    scrollY: true,
                    click: true
                    // tap: 'exit,straight,history'
                })
            } else {
                this.funScroll.refresh()
            }

        })
    },
    created() {
        this.wallet = JSON.parse(this.$des.decrypt(this.$route.query.wallet))
    },
    updated() {
        this.$nextTick(() => {
            if (!this.funScroll) {
                this.funScroll = new BScroll(this.$refs.fun, {
                    // click: true,
                    scrollY: true,
                    // tap: 'exit,straight,history'
                    click: true
                })
            } else {
                this.funScroll.refresh()
            }

        })
    },
};
</script>
<style scoped lang="scss">
@import '~scss_vars';
@import "../../publi/scss/mixin";

.funds {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    z-index: 1000;
    overflow: hidden;
    
    .head {
        display: flex;
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
            text-indent: 9%;
            text-align: center;
            line-height: 2.3;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .history {
            flex: 0 0 60px;
            height: 35px;
            text-align: center;
            border-bottom: 1px solid rgba(86, 144, 243, 1);
            line-height: 3;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(86, 144, 243, 1);
            opacity: 1;
        }
    }

    .content {
        .always {
            display: flex;
            position: relative;
            height: 102px;
            padding: 2% 5%;
            overflow: hidden;
            @include bg-img('../../publi/img/money_top_ba', 100% 100%);

            .img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                 
                img {
                    height: 198%;
                    width: 100%;
                    transform: translateY(-24%);
                }
            }
            .left {
                flex: 1;
            }

            .right {
                flex: 1;
                text-align: center;
                padding-top: 25px;
            }

            .txt {
                display: block;
                margin-top: 5%;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 25px;
                color: rgba(255, 255, 255, 1);
                opacity: 0.7;
            }

            .num {
                display: block;
                margin-top: 2%;
                font-size: 28px;
                font-family: SF Pro Display;
                font-weight: 400;
                line-height: 34px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }

            .ivu-btn {
                background: rgba(255, 255, 255, 1);
                padding: 1px 25px 3px;
                margin-left: 35%;
                border-radius: 5px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                line-height: 2;
                color: rgba(86, 144, 243, 1);
                opacity: 1;
            }
        }

        .funBox {
            padding: 0 3%;

            .cont {
                padding: 6.5% 3%;
                margin-top: 10px;
                position: relative;
                overflow: hidden;
                height: 180px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;

                .img {
                    width: 44px;
                    height: 28px;
                    position: absolute;
                    top: -8%;
                    left: 19%;
                }


                .txt {
                    display: block;
                    margin-bottom: 10px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 18px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }

                .num {
                    position: relative;
                    display: block;
                    text-align: center;
                    font-size: 24px;
                    font-family: SF Pro Display;
                    font-weight: 500;
                    line-height: 24px;
                    color: rgba(253, 131, 50, 1);
                    opacity: 1;
                }

                .top {
                    width: 100%;
                    height: 45px;
                    margin-bottom: 17px;
                    border-bottom: 1px solid rgba(126, 179, 252, 1);

                    .title {
                        width: 40%;
                        height: 34px;
                    }
                }

                .bottom {
                    display: flex;

                    .li_left {
                        position: relative;
                        flex: 1;

                        .num {
                            &::after {
                                position: absolute;
                                top: 15%;
                                right: -2%;
                                content: "";
                                display: inline-block;
                                clear: both;
                                width: 2px;
                                height: 20px;
                                background: rgba(126, 179, 252, 1);
                                opacity: 0.6;
                            }
                        }
                    }

                    .li_right {
                        flex: 1;
                    }
                }
            }
        }

    }

    .interval {
        height: 13px;
        background: rgba(7, 17, 27, 0.1);
    }
}
</style>