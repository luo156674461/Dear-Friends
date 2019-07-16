<template>
    <div class="buy">
        <router-view></router-view>
        <div class="buyHead">
            <div class="moneyinfo">
                <span class="limit">限额（数量）：100 - {{deaBuy.limit_amount.split('.')[0]}}</span>
            </div>
        </div>
        <div class="content">
            <div class="buyfew">
                <div class="inp">
                    <Input v-model="buyfew" placeholder="请输入数字" style="width: 100%" size="large" />
                </div>
                <div class="hint">
                    <Button type="primary" ghost @click="whole">{{toss}}</Button>
                </div>
            </div>
            <ul class="definite">
                <li @click="def(count1)">{{count1}}</li>
                <li @click="def(count2)">{{count2}}</li>
                <li @click="def(count3)">{{count3}}</li>
                <li @click="def(count4)">{{count4}}</li>
                <li @click="def(count5)">{{count5}}</li>
            </ul>
            <!-- <div class="display">
                <Input v-model="buyfew" style="width: 100%" size="large" disabled />
            </div> -->
            <p>该订单需要您在30分之内支付</p>
        </div>
        <div class="button">
            <Button class="cancel" @click="exit">取消</Button>
            <Button type="primary" class="place" @click="place">下单</Button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    created() {
        this.getMess()
        this.byValue()
        this.deaBuy = this.$route.query.getlimit
        if (this.deaBuy.t_type === 'S') {
            this.toss = '全部购买'
        } else {
            this.toss = '全部出售'
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.headF()
        })
    },
    data() {
        return {
            buyfew: '',
            deaBuy: [],
            per_price: 0,
            count1: 100,
            count2: 500,
            count3: 1000,
            count4: 2000,
            count5: 5000,
            toss: ''
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'headF', 'headT']),
        exit() {
            this.$router.go(-1)
            this.headT()
        },
        whole() {
            if (this.deaBuy.t_type === 'S') {
                this.buyfew = this.deaBuy.limit_amount.split('.')[0]
            } else {
                if (this.deaBuy.amount.split('.')[0] >   this.deaBuy.limit_amount.split('.')[0]) {
                    this.buyfew = this.deaBuy.limit_amount.split('.')[0]
                } else {
                    this.buyfew = this.deaBuy.amount.split('.')[0]
                }

            }

        },
        def(val) {
            this.buyfew = val
        },
        place() {
            this.getMess()
            this.byValue()
            if (this.deaBuy.t_type === 'S') {
                if (this.buyfew > Number(this.deaBuy.limit_amount.split('.')[0])) {
                    this.$Message.info({
                        content: '您已超出最大值',
                        top: 100,
                        duration: 3
                    })
                    return
                } else if (this.buyfew % 100 !== 0) {
                    this.$Message.info({
                        content: '购买数量必须是100的倍数',
                        top: 100,
                        duration: 3
                    })
                    return
                } else {
                    let params = {}
                    params.limit_id = this.deaBuy.limit_id
                    params.amount = this.buyfew
                    params.pay_method = this.deaBuy.allow_payment
                    let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                    this.$api.post(`create_order/buy/?token=${tmp_token}&user=${this.mess.user}`, params, r => {

                        if(r.state === 200) {
                           this.deaBuy.order_id = r.msg.order_id
                           sessionStorage.setItem('order', JSON.stringify(r.msg.order_id))
                           this.$router.push({ name: '下单', query: { info: this.deaBuy } })
                        } else if (r.state === 400) {
                            this.$Modal.warning({
                                title: r.msg
                            })
                        }
                    })
                }
            } else {
                if (this.buyfew > Number(this.deaBuy.amount.split('.')[0])) {
                    this.$Message.info({
                        content: '您的积分不足',
                        top: 100,
                        duration: 3
                    })
                    return
                } else if (this.buyfew % 100 !== 0) {
                    this.$Message.info({
                        content: '出售数量必须是100的倍数',
                        top: 100,
                        duration: 3
                    })
                    return
                } else if (this.buyfew > this.deaBuy.limit_amount.split('.')[0]) {
                    this.$Message.info({
                        content: '您已超出最大值',
                        top: 100,
                        duration: 3
                    })
                    return
                } else  {
                    let params = {}
                    params.limit_id = this.deaBuy.limit_id
                    params.amount = this.buyfew
                    params.pay_method = this.deaBuy.allow_payment
                    let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                    this.$api.post(`create_order/sell/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                        if(r.state === 200) {
                            sessionStorage.setItem('sign', JSON.stringify(true));
                            this.$router.push({ name: '我的订单' })
                        } else if (r.state === 400) {
                            this.$Modal.warning({
                                title: r.msg
                            })
                        }
                        
                    })
                }
            }



        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.buy {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 13px;
    background: #fff;
    z-index: 1000;

    .buyHead {
        width: 100%;
        background: rgba(86, 144, 243, 1);
        opacity: 1;
        border-radius: 5px;

        .moneyinfo {
            padding: 12px 15px;

            .limit {
                margin-bottom: 5px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 25px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }
        }
    }

    .content {
        margin-top: 30px;

        .buyfew {
            width: 100%;
            display: flex;

            .inp {
                flex: 1;
                padding-top: 2px;
                margin-right: 10px;

                .ivu-input {
                    font-size: 16px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 22px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .hint {
                flex: 0 0 98px;
                width: 98px;
                background: rgba(238, 245, 254, 1);
                border: 1px solid rgba(86, 144, 243, 1);
                opacity: 1;
                border-radius: 5px;

                .ivu-btn {
                    font-size: 16px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 22px;
                    color: rgba(86, 144, 243, 1);
                    opacity: 1;
                }
            }
        }

        .definite {
            width: 100%;
            margin-top: 20px;

            text-align: center;
            overflow: hidden;

            li {
                float: left;
                padding: 11px 39px;
                margin-right: 10px;
                margin-bottom: 20px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 25px;
                color: rgba(86, 144, 243, 1);
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(86, 144, 243, 1);
                opacity: 1;
                border-radius: 3px;
            }
        }

        p {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 300;
            line-height: 20px;
            color: rgba(167, 174, 194, 1);
            opacity: 1;
        }
    }

    .button {
        margin-top: 20%;
        padding: 0 10px;
        display: flex;

        .cancel {
            flex: 1;
            margin-right: 10px;
            background: rgba(228, 230, 236, 1);
            border-radius: 5px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .place {
            flex: 1;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }
}
</style>