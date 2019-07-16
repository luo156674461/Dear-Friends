<template>
    <div class="box" ref="buyer">
        <div>
            <div class="shop-list" v-for="(b, index) in listInfo" :key="index" @click="enter(b)">
                <div class="shop-name">
                    <span class="name">订单号：<span class="txt">{{b.order_id}}</span></span>
                    <span class="coin-state"><Buy :status="b.sell_status" :seller="b.buyer"></Buy></span>
                </div>
                <div class="shop-mess">
                    <div class="mess1">
                        <span class="name">时间</span>
                        <span class="time">{{b.ctime}}</span>
                    </div>
                    <div class="mess2">
                        <span class="name">数量</span>
                        <span class="quan">{{b.amount.split('.')[0]}}</span>
                    </div>
                    <div class="mess3">
                        <span class="name">订单类型</span>
                        <span class="totalPrice">{{b.t_type === 'B' ? '购买' : '出售'}}</span>
                    </div>
                </div>
                <div class="buyer">买家：{{b.buyer}}</div>
                <div class="buyer">卖家：{{b.seller}}</div>
            </div>
        </div>
        <a href=""></a>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Buy from './widget/buy';
import Sell from './widget/sell';
import BScroll from 'better-scroll';
export default {
    components: {

    },
    name: "life",
    data() {
        return {
            num: 1,
            showNum: 0,
            listInfo: [],
        };
    },
    computed: {
        ...mapState(['mess', 'orderShow', 'arrNum', 'loadShow']),
    },
    created() {
        this.progress()

    },
    mounted() {
        this.$nextTick(() => {
            if (!this.buyerScroll) {
                this.buyerScroll = new BScroll(this.$refs.buyer, {
                    scrollY: true,
                    tap: 'enter'
                })
            } else {
                this.buyerScroll.refresh()
            }
        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.buyerScroll) {
                this.buyerScroll = new BScroll(this.$refs.buyer, {
                    scrollY: true,
                    tap: 'enter'
                })
            } else {
                this.buyerScroll.refresh()
            }
        })
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'loadopen', 'loadcut', 'showEmptyTrue', 'showEmptyFalse']),
        progress() {
            this.loadopen()
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_order_info/progress/?token=${token}&user=${this.mess.user}`, {}, r => {
                if (r.msg.length !== 0) {
                    r.msg[0].ctime = r.msg[0].ctime.replace('T', ' ').split('.')[0]
                }

                this.listInfo = r.msg
                this.loadcut()
                if (this.listInfo.length === 0) {
                    this.showEmptyTrue()
                } else {
                    this.showEmptyFalse()
                }
            })
        },
        enter(val) {
            if (val.t_type === 'B') {
                if (val.sell_status == -1) {
                    if (this.mess.user !== val.buyer) {
                        sessionStorage.setItem('listInfo', JSON.stringify(val))
                        this.$router.push({ name: '取消下单' })
                    } else {
                        sessionStorage.setItem('order', JSON.stringify(val.order_id))
                        this.$router.push({ name: '下单' })
                    }
                } else if (val.sell_status == 0) {

                    if (this.mess.user === val.can_cancel) {
                        // if (this.mess.user !== val.buyer) {
                        this.$router.push({ name: '取消下单' })
                        sessionStorage.setItem('listInfo', JSON.stringify(val))
                        // }
                    } else {
                        if (this.mess.user !== val.buyer) {
                            sessionStorage.setItem('listInfo', JSON.stringify(val))
                            this.$router.push({ name: '确定收款' })
                        } else {
                            this.$router.push({ name: '取消下单' })
                            sessionStorage.setItem('listInfo', JSON.stringify(val))
                        }
                    }
                }
            } else if (val.t_type === 'S') {
                if (val.sell_status == -1) {
                    if (val.buyer === val.can_cancel) {
                        sessionStorage.setItem('listInfo', JSON.stringify(val))
                        this.$router.push({ name: '取消下单' })
                    } else {
                        if (this.mess.user === val.can_cancel) {
                            sessionStorage.setItem('listInfo', JSON.stringify(val))
                            this.$router.push({ name: '取消下单' })
                        } else {
                            sessionStorage.setItem('order', JSON.stringify(val.order_id))
                            this.$router.push({ name: '下单' })
                        }
                    }


                } else if (val.sell_status == 0) {
                    if (this.mess.user === val.buyer) {
                        sessionStorage.setItem('listInfo', JSON.stringify(val))
                        this.$router.push({ name: '取消下单' })
                    } else {
                        sessionStorage.setItem('listInfo', JSON.stringify(val))
                        this.$router.push({ name: '确定收款' })
                    }
                }
            }

        }
    },
    components: {
        Buy,
        Sell
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';

.box {
    margin-top: 5%;
    position: absolute;
    top: 82px;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 5%;
    overflow: hidden;
    background: rgba(228, 230, 236, 0.2);
    opacity: 1;

    .shop-list {
        padding: 15px;
        margin-bottom: 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
        opacity: 1;
        border-radius: 5px;

        .shop-name {
            margin-bottom: 20px;
            font-size: 16px;
            color: #000;

            .name {
                color: #ccc;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(59, 63, 75, 1);
                opacity: 1;

                .txt {
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 22px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .coin-state {
                float: right;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(254, 157, 75, 1);
                opacity: 1;
            }
        }

        .shop-mess {
            display: flex;

            .mess1 {
                flex: 1;

                .name {

                    text-align: left;

                }

                .time {
                    display: block;
                    text-align: left;
                    font-size: 12px;
                    font-family: SF Pro Text;
                    font-weight: 300;
                    line-height: 14px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .mess2 {
                flex: 1;

                .quan {
                    display: block;
                    text-align: center;
                    font-size: 12px;
                    font-family: SF Pro Text;
                    font-weight: 300;
                    line-height: 14px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .mess3 {
                flex: 1;

                .totalPrice {
                    display: block;
                    text-align: center;
                    font-size: 12px;
                    font-family: SF Pro Text;
                    font-weight: 300;
                    line-height: 14px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .name {
                display: block;
                text-align: center;
                margin-bottom: 5px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 20px;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }
        }

        .buyer {
            display: inline-block;
            margin-top: 5px;
            margin-right: 20px;
        }
    }
}
</style>