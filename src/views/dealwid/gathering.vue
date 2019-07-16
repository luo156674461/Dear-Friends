<template>
    <div class="cancel" ref="canc">
        <div>
            <div class="img"><img src="../../publi/img/scene.png" width="100%" height="100%"></div>
                <div class="head">
                    <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                </div>
                <div class="content">
                    <div class="contHead">
                        <div class="left">
                            <p class="txt">确定收款</p>
                            <span class="hint">订单已付款成功</span>
                        </div>
                    </div>
                    <div class="contCentre">
                        <div class="top">
                            <div class="total">
                                <p>交易总额</p>
                                <span class="money">{{info.total_price}}</span>
                            </div>
                        </div>
                        <div class="cont">
                            <div class="option">
                                <div class="name"><span class="title">买家</span>{{info.buyer}}</div>
                                <div class="name"><span class="title">联系对方</span>{{cells}}</div>
                                <div class="unit"><span class="title">单价</span>1</div>
                                <div class="quantity"><span class="title">数量</span>{{info.amount}}</div>
                                <div class="time"><span class="title">下单时间</span>{{info.ctime.replace('T',' ').split('.')[0]}}</div>
                                <div class="mark"><span class="title">订单号</span>{{info.order_id}}</div>
<!--                                 <div class="secret"><span class="title">转账密钥</span>{{info.order_id}}</div> -->
                                <div class="proof"><Button type="success" @click="checkProof">查看凭证</Button></div>
                            </div>
                        </div>
                    </div>
                    <div class="but">
                        <Button type="success" long @click="confirm" class="con" :disabled="disabled">确定收款 <span class="num">剩余{{txttime}}</span></Button>
                        <Button type="error" long @click="appeal" class="state">申诉</Button>
                    </div>
                </div>
            </div>
            <qrImg :qrImg="qrImg" v-if="qrshow"></qrImg>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import qrImg from './qr_img'
import BScroll from 'better-scroll'
export default {
    created() {
        this.info = JSON.parse(sessionStorage.getItem('listInfo'))
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
        // let begin = new Date(this.info.s_timer[0].substring(0, 19).replace(/-/g, '/')).getTime()
        let over = new Date(this.info.s_timer[1].substring(0, 19).replace(/-/g, '/')).getTime()
        let now = Number(new Date())
        let restiem = over - now
        let Timeout = setInterval(() => {
            restiem = restiem - 1000
            this.txttime = `${parseInt((restiem % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}时${parseInt((restiem % (1000 * 60 * 60)) / (1000 * 60))}分${String((restiem % (1000 * 60)) / 1000).split('.')[0]}秒`
            //判断支付时间
            if (parseInt((restiem % (1000 * 60 * 60)) / (1000 * 60)) === 1) {
                this.disabled = true
            }
        }, 1000)
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.cancScroll) {
                this.cancScroll = new BScroll(this.$refs.canc, {
                    // click: true,
                    scrollY: true,
                    click: true
                })
            } else {
                this.cancScroll.refresh()
            }

        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.cancScroll) {
                this.cancScroll = new BScroll(this.$refs.canc, {
                    // click: true,
                    scrollY: true,
                    click: true
                })
            } else {
                this.cancScroll.refresh()
            }

        })
    },
    data() {
        return {
            info: {},
            txttime: '',
            disabled: false,
            qrImg: '',
            cells: ''
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'qrshow']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'qropne']),
        exit() {
            this.$router.push({ path: '/orderform' })
            sessionStorage.setItem('sign', JSON.stringify(true));
        },
        checkProof() {
            this.qropne()
            this.qrImg = `https://www.onetwoshare.net${this.info.certificate_url}`
            // let _this = this
            // this.$Modal.warning({
            //     render: (h) => {
            //         return h('img', { attrs: { 'src':  }, style: { width: '100%' } })
            //     }
            // })
        },
        confirm() {
            this.getMess()
            this.byValue()
            let params = {}
            params.order_id = this.info.order_id
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`seller_confirm/?token=${token}&user=${this.mess.user}`, params, r => {
                let _this = this
                if (r.state === 200) {
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ path: '/orderform' })
                        }
                    })
                } else if (r.state === 400) {
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ path: '/orderform' })
                        }
                    })
                }
            })
        },
        appeal() {
            this.$router.push({ name: '申诉', query: { info: this.$des.encrypt(JSON.stringify(this.info)) } })

        }
    },
    components: {
        qrImg
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
    transition: all 0.5s;
    z-index: 1000;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    overflow: hidden;

    // .imgProof {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     bottom: 0;
    //     width: 100%;
    //     z-index: 100;
    //     background: rgba(7, 17, 27, 0.1);

    //     .img_box {
    //         width: 100%;
    //         height: 100%;
    //         padding: 3% 5%;
    //         border-radius: 20px;

    //         img {
    //           padding: 0 2%;
    //           border-radius: 10px;  
    //         }
    //     }
    // }

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
        margin-top: 24px;
        padding: 0 5%;
        color: #fff;
        z-index: 5;

        .contHead {
            display: flex;
            margin-bottom: 14px;

            .left {
                flex: 1;

                .txt {
                    margin-bottom: 5px;
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 30px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
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

        .contCentre {
            padding: 15px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;

            .top {
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
                padding: 15px;

                .pay {
                    padding-bottom: 5px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #000;
                    border-bottom: 1px solid #ccc;
                }

                .option {
                    text-align: right;
                    font-size: 14px;

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

                    .proof {
                        margin-top: 20px;

                        .ivu-btn {
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
        }

        .but {
            display: flex;
            padding: 20px 0 0 0;

            .con {
                flex: 1;
                opacity: 1;
                border-radius: 5px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 25px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }

            .state {
                flex: 0 0 100px;
                opacity: 1;
                border-radius: 5px;
                font-size: 14px;
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