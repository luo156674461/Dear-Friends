<template>
    <div class="cancel">
            <div class="img"><img src="../../publi/img/scene.png" width="100%" height="100%"></div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            </div>
            <div class="content">
                <div class="contHead">
                    <div class="left">
                        <p class="txt">完成</p>
                        <span class="hint">订单已完成，无法查看支付信息</span>
                    </div>
                </div>
                <div class="contCentre">
                    <div class="top">
                        <div class="total">
                            <p>交易总额</p>
                            <span class="money">￥{{info.amount}}</span>
                        </div>
                    </div>
                    <div class="cont">
                        <div class="option">
                            <div class="name"><span class="title">买家</span>{{info.buyer}}</div>
                            <div class="name"><span class="title">联系对方</span>{{cells}}</div>
                            <div class="name"><span class="title">卖家</span>{{info.seller}}</div>
                            <div class="unit"><span class="title">单价</span>1</div>
                            <div class="quantity"><span class="title">数量</span>{{info.amount}}</div>
                            <div class="time"><span class="title">下单时间</span>{{info.ctime.replace('T',' ').split('.')[0]}}</div>
                            <div class="mark"><span class="title">订单号</span>{{info.order_id}}</div>
<!--                             <div class="secret"><span class="title">转账密钥</span>{{info.order_id}}</div> -->
                        </div>
                    </div>
                </div>
                <div class="but">
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import SmallPlace from './SmallPlace';
export default {
    created() {
        this.getMess()
        this.byValue()
        this.info = this.$route.query.info
        if (this.mess.user === this.info.buyer) {
               this.cells = this.info.seller_cell
            } else  {
                 this.cells = this.info.buyer_cell
            }
        // for (let i = 0, max = this.info.cells.length; i < max; i++) {
        //       for (let k in this.info.cells[i]) {
        //           if (this.mess.user !== k) {
        //             this.cells = this.info.cells[i][k]
        //           }
        //       }
        //     }
    },
    mounted() {},
    data() {
        return {
            info: {},
            cells: ''
        }
    }, 
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
           this.$router.push({ path: '/orderform' })
           sessionStorage.setItem('sign', JSON.stringify(false));
        },
    },
    components: {
        SmallPlace,
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.cancel {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    transition: all 0.5s;
    z-index: 2000;

    .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 280px;
    }

    .head {
        position: relative;
        padding: 0 3%;
        width: 100%;
        height: 40px;
        color: #000;
        z-index: 5;

        .arrowIcon {
            margin-top: 8px;
            font-size: 20px;

        }
    }

    .content {
        position: relative;
        margin-top: 6%;
        padding: 0 5%;
        color: #fff;
        z-index: 5;

        .contHead {
            display: flex;
            margin-bottom: 4%;

            .left {
                flex: 1;

                .txt {
                    margin-bottom: 5px;
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 1;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }

                .hint {
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 20px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
            }
        }

        .contCentre {
            background: #fff;
            color: #5d5755;

            .top {
                padding: 5%;
                display: flex;

                .total {
                    p {
                        transform: translateX(3px);
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;
                    }

                    .money {
                        font-size: 20px;
                        font-family: SF Pro Display;
                        font-weight: 500;
                        line-height: 24px;
                        color: rgba(245, 65, 94, 1);
                        opacity: 1;
                    }

                }

            }

            .cont {
                margin-top: 15px;

                .pay {
                    padding-bottom: 5px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #000;
                    border-bottom: 1px solid #ccc;
                }

                .option {
                    text-align: right;
                    padding: 0 5%;

                    div {
                        overflow: hidden;
                        margin-bottom: 10px;
                        font-size: 13px;
                        font-family: PingFang SC;
                        font-weight: 300;
                        line-height: 20px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;

                        span {
                            display: inline-block;
                            float: left;
                            font-size: 13px;
                            font-family: PingFang SC;
                            font-weight: 300;
                            line-height: 20px;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .but {
            padding: 30px 10px 0;

            .ivu-btn {
                background: rgba(254, 157, 75, 1);
                opacity: 1;
                border-radius: 5px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 25px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }
        }
    }
}
</style>