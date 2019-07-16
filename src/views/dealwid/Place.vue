<template>
    <div class="place">
        <div class="content" ref="deal">
            <div>
                <div class="top-ops">
                    <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                </div>
                <div class="img"><img src="../../publi/img/finance.png" width="100%" height="100%"></div>
                    <div class="contHead">
                        <div class="left">
                            <p class="txt">请付款</p>
                            <span class="hint">您已经下单成功，请及时付款</span>
                        </div>
                    </div>
                    <div class="contCentre clearfix">
                        <div class="bill">
                            <div class="top">
                                <div class="total">
                                    <p>请向以下账户付款</p>
                                    <span class="money">￥{{placeinfo.amount}}</span>
                                </div>
                                <div class="single">
                                    <p class="unitCost">交易单价：1</p>
                                    <span class="quantity">交易数量：{{placeinfo.amount}}</span>
                                </div>
                            </div>
                            <div class="pay">
                                <span class="txt_pay">支付方式</span>
                                <div class="phone">
                                    <span>联系对方:</span>
                                    <span>{{cells}}</span>
                                </div>
                            </div>
                            <div class="option">
                                <van-radio-group v-model="radio">
                                    <van-cell-group>
                                        <van-row v-if="bankval === '0' ? true : false">
                                            <div class="cardimg"><img src="../../publi/img/credit-card.png"></div>
                                                <van-cell title="银行卡支付" clickable @click="card(0)">
                                                    <van-radio name="1" />
                                                </van-cell>
                                        </van-row>
                                        <van-row v-if="alipayval === '1' ? true : false">
                                            <div class="alipayimg"><img src="../../publi/img/alipay.png" ></div>
                                                <van-cell title="支付宝支付" clickable @click="alipay(1)">
                                                    <van-radio name="2" />
                                                </van-cell>
                                        </van-row>
                                        <van-row v-if="wechatval === '2' ? true : false">
                                            <div class="wechatimg"><img src="../../publi/img/weixin.png" ></div>
                                                <van-cell title="微信支付" clickable @click="wechat(2)">
                                                    <van-radio name="3" />
                                                </van-cell>
                                        </van-row>
                                    </van-cell-group>
                                </van-radio-group>
                            </div>
                            <div class="upload">
                                <Upload ref="upload" :action="`https://www.onetwoshare.net/api/certificate_upload/?user=${this.mess.user}`" show-upload-list :data="parmas" :on-success="success" :default-file-list="list" :before-upload="handleBeforeUpload" clearFiles>
                                    <Button icon="ios-cloud-upload-outline">上传凭证</Button>
                                </Upload>
                            </div>
                        </div>
                        <div class="cont" v-if="num === '' ? false : true">
                            <div class="card" v-if="num === 0 ? true : false">
                                <div class="name"><span>收款人</span>{{placeinfo.bankcardinfo.name}}</div>
                                <div class="bank"><span>银行卡信息</span>{{placeinfo.bankcardinfo.bank}}</div>
                                <div class="number"><span>银行卡号</span>{{placeinfo.bankcardinfo.number}}</div>
                                <div class="limit_id"><span>转账密钥</span>{{order_id}}</div>
                            </div>
                            <div class="alipay" v-if="num === 1 ? true : false">
                                <div class="alipay_code"><span>收款二维码</span>
                                    <div class="lcon" @click="qr(1)">
                                        <van-icon name="qr" />
                                    </div>
                                </div>
                                <div class="limit_id"><span>转账密钥</span>{{order_id}}</div>
                            </div>
                            <div class="wechat" v-if="num === 2 ? true : false">
                                <div class="alipay_code"><span>收款二维码</span>
                                    <div class="lcon" @click="qr(2)">
                                        <van-icon name="qr" />
                                    </div>
                                </div>
                                <div class="limit_id"><span>转账密钥</span>{{order_id}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="but">
                        <Button type="warning" class="call" v-if="placeinfo.t_type === 'B' ? true : false" @click="call">取消</Button>
                        <Button type="success" class="ensure" :disabled="disabled" @click="paid">
                            <span class="txt">付款</span>
                            <span class="time">
                                <Icon type="ios-clock-outline" />
                                <span class="num">剩余{{txttime}}</span>
                            </span>
                        </Button>
                    </div>
                    <div class="warn">
                        <p>交易提醒！</p>
                        <p>买方两小时内不付款，取消订单，连续两次因此原因而取消订单，账户不能交易，需要要申请客服解封。</p>
                    </div>
                </div>
            </div>
            <qrImg :qrImg="qrImg" v-if="qrshow"></qrImg>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import SmallPlace from './SmallPlace';
import Bus from '../../Bus.js'
import qrImg from './qr_img'
export default {
    created() {
        this.order_id = JSON.parse(sessionStorage.getItem('order'))
        this.parmas.order_id = this.order_id
        this.lock()
        this.getMess()
        this.byValue()
        let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
        this.$api.get(`get_order_info/single/?token=${tmp_token}&user=${this.mess.user}&order_id=${this.order_id}`, {}, r => {
            if (this.mess.user === r.msg.buyer) {
               this.cells = r.msg.seller_cell
            } else  {
                 this.cells = r.msg.buyer_cell
            }
            // for (let i = 0, max = r.msg.cells.length; i < max; i++) {
            //   for (let k in r.msg.cells[i]) {
            //       if (this.mess.user !== k) {
            //         this.cells = r.msg.cells[i][k]
            //       }
            //   }
            // }
            this.placeinfo = r.msg
            let payment_allow = this.placeinfo.payment_allow.split(',')
            for (let p = 0; p < payment_allow.length; p++) {
                if (payment_allow[p] === '0') {
                    this.bankval = '0'
                } else if (payment_allow[p] === '1') {
                    this.alipayval = '1'
                } else if (payment_allow[p] === '2') {
                    this.wechatval = '2'
                }
            }
            let begtiem = new Date().getTime()
            let endtiem = new Date(this.placeinfo.timer[1].substring(0, 19).replace(/-/g, '/')).getTime()
            let restiem = endtiem - begtiem

            // 支付时间是否存在
            if (r.msg.timer.length !== 0) {
                let Timeout = setInterval(() => {
                    restiem = restiem - 1000
                    // this.txttime = `${parseInt((restiem % (1000 * 60 * 60)) / (1000 * 60))}分${String((restiem % (1000 * 60)) / 1000).split('.')[0]}秒`
                    this.txttime = `${parseInt((restiem % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}时${parseInt((restiem % (1000 * 60 * 60)) / (1000 * 60))}分${String((restiem % (1000 * 60)) / 1000).split('.')[0]}秒`

                    //判断支付时间
                    if (parseInt((restiem % (1000 * 60 * 60)) / (1000 * 60)) === 1) {
                        this.disabled = true
                    }
                }, 1000)
            } else {
                let _this = this
                clearInterval(Timeout)
                this.$Modal.warning({
                    title: '您已超出支付时间',
                    onOk() {
                        _this.$router.push({ path: '/orderform' })
                    }
                })
            }

        })


    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        Bus.$on('single', content => {
            this.single = content
        })
        this.$nextTick(() => {
            this.dealScroll = new BScroll(this.$refs.deal, {
                click: true
            })
        })
    },
    updated() {


    },
    data() {
        return {
            loading: true,
            single: '',
            v: false,
            placeinfo: {},
            limit_id: '',
            txttime: '',
            radio: '',
            num: '',
            qrImg: '',
            order_id: '',
            parmas: {},
            disabled: true,
            list: [],
            uploadList: [],
            bankval: '',
            alipayval: '',
            wechatval: '',
            cells: ''
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'qrshow']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'qropne']),
        // retreat() {
        //   this.$router.push({ path: '/orderform' })
        // },
        exit() {
            this.getMess()
            this.byValue()

            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`un_lock_order/?token=${tmp_token}&user=${this.mess.user}`, this.parmas, r => {
                this.$router.push({ path: '/orderform' })
                sessionStorage.setItem('sign', JSON.stringify(true));
            })

            // sessionStorage.removeItem('order_id');

        },
        call() {
            this.getMess()
            this.byValue()
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`cancel_order_by_hand/?token=${tmp_token}&user=${this.mess.user}`, this.parmas, r => {
                let _this = this
                this.$Modal.warning({
                    title: r.msg,
                    onOk() {
                        _this.$router.push({ path: '/orderform' })
                    }
                })

            })
        },
        lock() {
            this.getMess()
            this.byValue()
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`lock_order/?token=${tmp_token}&user=${this.mess.user}`, this.parmas, r => {})
        },
        paid() {
            this.getMess()
            this.byValue()
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)

            this.$api.post(`buyer_paid/?token=${tmp_token}&user=${this.mess.user}`, this.parmas, r => {
                let _this = this
                this.$Modal.warning({
                    content: r.msg,
                    onOk() {
                        _this.$router.push({ path: '/orderform', query: { order_id: _this.order_id } })
                        _this.disabled = true
                        // sessionStorage.removeItem('order_id');
                    }
                })


            })
        },
        card(n) {
            this.radio = '1'
            this.num = n
        },
        alipay(n) {
            this.radio = '2'
            this.num = n
        },
        wechat(n) {
            this.radio = '3'
            this.num = n
        },
        qr(n) {
            this.qropne()
            if (n === 1) {
                this.qrImg = this.placeinfo.alipayinfo.alipay_code

            } else if (n === 2) {
                this.qrImg = this.placeinfo.wechatinfo.wechat_code

            }
        },
        handleBeforeUpload() {
            if (this.uploadList.length >= 1) {
                this.$refs.upload.fileList = [];
                this.uploadList = this.$refs.upload.fileList;

                return true
            }
        },
        success(response, file, fileList) {
            if (file.response.state === 200) {
                this.disabled = false
            } else {
                this.disabled = true
            }

        }
    },
    components: {
        SmallPlace,
        qrImg
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.place {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    transition: all 0.5s;
    z-index: 1000;

    .content {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        color: #fff;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;

        .top-ops {
            position: relative;
            display: flex;
            padding: 0 3%;
            width: 100%;
            height: 40px;
            opacity: 1;
            z-index: 5;

            .arrowIcon {
                flex: 0 0 20px;
                font-size: 20px;
                line-height: 40px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
                border-radius: 2px;
            }
        }

        .img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 280px;
        }


        // .clearfix {
        //     zoom: 1;

        //     &::after {
        //         content: "";
        //         display: block;
        //         clear: both;
        //     }
        // }

        .contHead {
            position: relative;
            padding: 0 5%;
            margin-bottom: 14px;
            width: 100%;
            overflow: hidden;
            z-index: 5;

            .left {
                margin-top: 25px;

                .txt {
                    margin-bottom: 5px;
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 30px;
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
            position: relative;
            padding: 0 5%;
            width: 100%;
            color: #5d5755;
            box-sizing: border-box;


            .bill {
                position: relative;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
                opacity: 1;
                border-radius: 5px;

                .top {
                    padding: 15px 15px 0 15px;
                    display: flex;

                    .total {
                        flex: 1;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;

                        .money {
                            display: inline-block;
                            margin-top: 5px;
                            font-size: 20px;
                            font-family: SF Pro Display;
                            font-weight: 500;
                            line-height: 24px;
                            color: rgba(252, 33, 68, 1);
                            opacity: 1;
                        }
                    }

                    .single {
                        flex: 1;
                        margin-top: 5px;
                        font-size: 13px;
                        font-family: PingFang SC;
                        font-weight: 300;
                        line-height: 18px;
                        color: rgba(143, 147, 159, 1);
                        opacity: 1;

                        span {
                            display: inline-block;
                            margin-top: 5px;
                        }

                    }
                }

                .pay {
                    display: flex;
                    margin-top: 35px;
                    padding: 0 0 11px 12px;

                    .txt_pay {
                        flex: 0 0 120px;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;
                    }

                    .phone {
                        flex: 1;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 20px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;
                    }
                }

                .option {
                    // position: relative;
                    margin: 0;
                    padding: 0 30% 12% 10%;
                    border-radius: 5px;

                    .van-row {
                        position: relative;

                        .cardimg {
                            position: absolute;
                            top: 23%;
                            left: -12%;
                            display: inline-block;
                            padding: 3px 0 2px;
                            width: 25px;
                            height: 25px;
                            text-align: center;
                            border-radius: 50%;
                            font-size: 16px;
                            z-index: 10;

                            img {
                                padding: 4px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: #DDAA00;
                            }
                        }

                        .alipayimg {
                            position: absolute;
                            top: 23%;
                            left: -12%;
                            padding: 3px 0 2px;
                            width: 25px;
                            height: 25px;
                            text-align: center;
                            border-radius: 50%;
                            font-size: 16px;
                            z-index: 10;

                            img {
                                padding: 4px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: #00BFFF;
                            }
                        }

                        .wechatimg {
                            position: absolute;
                            top: 23%;
                            left: -12%;
                            padding: 3px 0 2px;
                            width: 25px;
                            height: 25px;
                            text-align: center;
                            border-radius: 50%;
                            font-size: 16px;
                            z-index: 10;

                            img {
                                padding: 4px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: #00FF7F;
                            }
                        }
                    }
                }

                .upload {
                    position: absolute;
                    right: 0%;
                    bottom: 1%;

                    .ivu-btn {
                        float: right;
                        padding: 2px 4%;
                        border: 1px solid rgba(143, 147, 159, 0.2980392156862745);
                        opacity: 1;
                        line-height: 0;
                        border-radius: 5px;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(59, 63, 75, 1);
                    }
                }
            }


            .cont {
                padding: 15px;
                margin: 5px 0 30px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
                opacity: 1;
                border-radius: 5px;

                .card {
                    text-align: right;

                    div {
                        margin-bottom: 13px;
                        overflow: hidden;
                        font-size: 13px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 18px;
                        color: rgba(59, 63, 75, 1);
                        opacity: 1;

                        &:last-of-type {
                            margin-bottom: 0;
                        }

                        span {
                            float: left;
                            display: inline-block;
                            font-size: 13px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            line-height: 18px;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                        }
                    }
                }

                .alipay {
                    font-size: 14px;
                    text-align: right;

                    div {
                        margin-top: 10px;
                        padding: 5px 0;
                        overflow: hidden;

                        .lcon {
                            display: inline-block;
                            margin: 0;
                            padding: 0;
                        }

                        span {
                            float: left;
                            display: inline-block;
                        }
                    }
                }

                .wechat {
                    font-size: 14px;
                    text-align: right;

                    div {
                        margin-top: 10px;
                        padding: 5px 0;
                        overflow: hidden;

                        .lcon {
                            display: inline-block;
                            margin: 0;
                            padding: 0;
                        }

                        span {
                            float: left;
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }

    .but {
        display: flex;
        margin-top: 30px;
        padding: 0 5%;

        .call {
            flex: 0 0 92px;
            width: 92px;
            height: 40px;
            margin-right: 5px;
            background: rgba(254, 157, 75, 1);
            opacity: 1;
            border-radius: 5px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        }

        .ensure {
            flex: 1;
            // background: rgba(228, 230, 236, 1);
            border: 1px solid rgba(228, 230, 236, 1);
            opacity: 1;
            border-radius: 5px;

            .txt {
                margin-right: 5px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(143, 147, 159, 1);
                opacity: 1;
            }

            .ivu-icon {
                font-size: 14px;
                transform: translateY(-1px);
            }

            .num {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(143, 147, 159, 1);
                opacity: 1;
            }
        }
    }

    .warn {
        margin-top: 2%;
        padding: 5%;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 300;
        line-height: 20px;
        color: rgba(109, 112, 120, 1);
        opacity: 1;

        p {
            margin-bottom: 1.5%;
        }
    }
}
</style>