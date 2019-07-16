<template>
    <!-- 购买页面 -->
    <div class="purlist" ref="pur">
        <div>
            <!-- 搜索框 -->
            <div class="seek">
                <div class="seekImg">
                    <img src="../../publi/img/Seek_Icon.png" width="100%" height="100%">
                </div>
                    <input type="text" id="seekTxt" placeholder="请输入用户名和积分数" @input="seek" v-model="val">
                </div>
                <div class="jump" @click="jump" v-if="headShow">我的订单</div>
                <!-- 购买列表 -->
                <div class="purchase" v-for="(i, index) in limit" :key="index">
                    <div class="bus-name">
                        <span class="txtimg">{{i.user.match(/^./)[0]}}</span>
                        <span class="name">{{i.user}}</span>
                    </div>
                    <div class="deal-mess">
                        <div class="total">
                            <span class="quantity">数量：{{i.amount}}</span>
                            <span class="quota">限额：100 - {{i.amount}}</span>
                        </div>
                        <!-- <div class="single">
                            <span class="txt">单价</span>
                            <span class="price" v-for="(j, index) in i.price_info" :key="index" v-if="j.market === i.b_type ? true : false">{{j.price}}</span>
                        </div> -->
                    </div>
                    <div class="bus-tail">
                        <img :src="j" v-for="(j, index) in i.img_urls" :key="index">
                        <Button type="error" @click="goPlace(i)">出售中</Button>
                    </div>
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
        this._into()
        this.userInfo = JSON.parse(sessionStorage.getItem('gUserInfo'))

    },
    mounted() {
        this.$nextTick(() => {
            this.purScroll = new BScroll(this.$refs.pur, {
                click: true
            })
        })
    },
    data() {
        return {
            limit: [],
            wallet: [],
            val: '',
            imgArr: {
                0: 'https://www.onetwoshare.net/static/front/bank.png',
                1: 'https://www.onetwoshare.net/static/front/alipay.png',
                2: 'https://www.onetwoshare.net/static/front/wechat.png'
            },
            // 搜索框
            model: '',
            userInfo: []
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'headShow']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'loadopen', 'loadcut']),
        jump() {
            this.$router.push({ name: '我的订单' })
            sessionStorage.setItem('sign', JSON.stringify(true));
        },
        seek(v) {
            if (this.val.length !== 0) {
                if (/^[1-9]\d*$/.test(this.val)) {
                    this.limit = this.limit.filter(i => i.amount.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
                } else {
                    this.limit = this.limit.filter(i => i.user.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
                }

            } else {
                this._into()
            }

        },
        _into() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_market_limit/S/?token=${token}&user=${this.mess.user}`, {}, r => {
                this.limit = r.msg.filter(l => l.amount !== '0.00')
                for (var i = 0; i < this.limit.length; i++) {
                    this.limit[i].img_urls = []
                }
                this.loadcut()

                //     let arr = []
                for (let m = 0; m < this.limit.length; m++) {
                    this.limit[m].allow_payment = this.limit[m].allow_payment.split(',')

                    for (let i = 0; i < this.limit[m].allow_payment.length; i++) {
                        var a = this.limit[m].allow_payment[i]
                        this.limit[m].img_urls.push(this.imgArr[a])
                    }
                }
            })

        },
        goPlace(val) {
            // 身份验证
            this.getMess()
            this.byValue()
            this.loadopen()
            if (this.mess.user !== val.user) {
                if (this.userInfo.payment_method.method_bankcard === '0') {
                    let _this = this
                    this.$Modal.confirm({
                        render: (h) => {
                            return h('h2', '请完善银行卡信息')
                        },
                        onOk() {
                            _this.$router.push({ path: '/personage' })
                        },
                        onCancel() {
                            _this.loadcut()
                        }
                    })
                    // 身份验证通过
                } else {
                    // 订单验证
                    this.getMess()
                    this.byValue()
                    this.wallet = this.userInfo.wallet

                    let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                    this.$api.get(`get_order_info/peding/?token=${token}&user=${this.mess.user}`, {}, r => {
                        let _this = this
                        // this.wallet = this.wallet.filter(w => w.market === val.b_type)

                        this.wallet[0].limit_id = val.limit_id
                        this.wallet[0].buyer = val.user
                        this.wallet[0].allow_payment = val.allow_payment.join(',')
                        this.wallet[0].limit_amount = val.amount
                        this.wallet[0].b_min = val.b_min
                        this.wallet[0].t_type = val.t_type
                        //订单是否为空
                        if (r.msg.length === 0) {
                            this.loadcut()
                            this.$router.push({ name: '购买', query: { getlimit: this.wallet[0] } })
                        } else {
                            //订单不为空
                            for (let i = 0; i < r.msg.length; i++) {
                                //订单状态-1,0
                                if (r.msg[i].buy_status === '-1' || r.msg[i].buy_status === '0') {
                                    this.loadcut()
                                    this.$Modal.warning({
                                        title: '请先完成已有的订单',
                                        onOk() {
                                            _this.$router.push({ path: '/orderform' })
                                        }
                                    })
                                } else {
                                    this.loadcut()
                                    this.$router.push({ name: '购买', query: { getlimit: this.wallet[0] } })
                                }
                            }
                        }
                    })

                }
            } else {
                this.loadcut()
                this.$Message.info({
                    content: '用户不能下自己的订单',
                    top: 100,
                    duration: 3
                })
            }
        },
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.purlist {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 5%;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    background: rgba(228, 230, 236, 0.2);
    opacity: 1;

    .seek {
        display: flex;
        position: relative;
        padding-left: 40px;
        margin-bottom: 30px;
        width: 100%;
        height: 34px;
        background: rgba(228, 230, 236, 1);
        opacity: 1;
        border-radius: 5px;

        .seekImg {
            flex: 0 0 20px;
            position: absolute;
            top: 24%;
            left: 3%;
            width: 20px;
            height: 20px;
        }

        #seekTxt {
            flex: 1;
            font-family: PingFang SC;
            font-size: 16px;
            border: none;
            background: none;
        }
    }

    .jump {
        width: 80px;
        border-bottom: 1px solid rgba(86, 144, 243, 1);
        position: absolute;
        text-align: center;
        top: 35px;
        right: 1px;
        font-size: 15px;
        font-family: PingFang SC;
        color: rgba(86, 144, 243, 1);
        font-weight: 400;
        z-index: 10000;
    }

    .purchase {
        padding: 10px;
        margin-top: 20px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
        opacity: 1;
        border-radius: 5px;

        .bus-name {
            padding: 5px;
            font-size: 14px;

            .txtimg {
                display: inline-block;
                margin-right: 10px;
                text-align: center;
                font-size: 16px;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #003377;
                color: #fff;
            }

            .name {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }

            .count {
                display: inline-block;
                float: right;

                span {
                    padding: 0 10px;
                    font-size: 12px;
                }

                .time {
                    padding-right: 0;
                }
            }
        }

        .deal-mess {
            padding: 5px;
            display: flex;

            .total {
                flex: 1;

                span {
                    display: block;
                }



                .quantity {
                    margin-bottom: 5px;
                    font-size: 13px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 18px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }

                .quota {
                    font-size: 13px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 18px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .single {
                flex: 1;

                span {
                    display: block;
                    text-align: right;
                }

                .price {
                    font-size: 16px;
                    font-weight: 700;
                    color: #00AA00;
                }
            }
        }

        .bus-tail {
            padding: 5px;
            overflow: hidden;

            img {
                margin-right: 2%;
                width: 6%;
                height: 1%;
                opacity: 1;
            }

            .ivu-btn {
                float: right;
                padding: 2% 10%;
                background: rgba(245, 65, 94, 1);
                opacity: 1;
                border-radius: 17px;
                font-size: 15px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 21px;
                color: rgba(255, 255, 255, 1);
                opacity: 1
            }
        }
    }
}
</style>