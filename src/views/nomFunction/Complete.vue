<template>
    <div class="box" ref="seller">
        <div>
            <div class="shop-list" v-for="(s, index) in listInfo" :key="index" @click="enter(s)">
                <div class="shop-name">
                    <span class="name">订单号：<span class="txt">{{s.order_id}}</span></span>
                    <span class="coin-state"><Sell :status="s.sell_status"></Sell></span>
                </div>
                <div class="shop-mess">
                    <div class="mess1">
                        <span class="name">时间</span>
                        <span class="time">{{s.ctime.replace('T', ' ').split('.')[0]}}</span>
                    </div>
                    <div class="mess2">
                        <span class="name">数量</span>
                        <span class="quan">{{s.amount.split('.')[0]}}</span>
                    </div>
                    <div class="mess3">
                        <span class="name">订单类型</span>
                        <span class="totalPrice">{{s.t_type === 'B' ? '购买' : '出售'}}</span>
                    </div>
                </div>
                <div class="buyer">买家：{{s.buyer}}</div>
                <div class="buyer">卖家：{{s.seller}}</div>
            </div>
            <div class="loae" v-if="lodeShow">
                <LittleLode></LittleLode>
            </div>
        </div>
        <a href=""></a>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Buy from './widget/buy';
import Sell from './widget/sell';
import LittleLode from './widget/littleLode';
import BScroll from 'better-scroll';
export default {
    name: "life",
    data() {
        return {
            num: 1,
            showNum: 0,
            listInfo: [],
            lodeShow: false
        };
    },
    computed: {
        ...mapState(['mess', 'orderShow', 'arrNum', 'loadShow']),
    },
    created() {
        // this.listInfo = JSON.parse(sessionStorage.getItem('listInfo'))
        // this.listInfo = this.$route.query.listInfo
        this.finished()
    },
    mounted() {
        this.load()
        // this.$nextTick(() => {
        //     if (!this.sellerScroll) {
        //         this.sellerScroll = new BScroll(this.$refs.seller, {
        //             scrollY: true,
        //             tap: 'enter'
        //         })
        //     } else {
        //         this.sellerScroll.refresh()
        //     }
        // })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.sellerScroll) {
                this.sellerScroll = new BScroll(this.$refs.seller, {
                    scrollY: true,
                    tap: 'enter'
                })
            } else {
                this.sellerScroll.refresh()
            }
        })
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'loadopen', 'loadcut', 'showEmptyTrue', 'showEmptyFalse']),
        finished() {
            this.loadopen()
            this.getMess()
            this.byValue()
            // let num = JSON.parse(sessionStorage.getItem('finNum'))
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_order_info/finished/${this.num}/?token=${token}&user=${this.mess.user}`, {}, r => {
                // r.msg = r.msg.filter(i => i.sell_status === '2')
                // for (let i = 0, max = r.msg.length; i < max; i++) {
                //     r.msg[i].ctime = r.msg.ctime.replace('T', ' ').split('.')[0]
                // }
                this.listInfo = r.msg
                // let arr = this.listInfo
                // let m
                // for (let i = 0, max = arr.length; i < max; i++) {
                //     for (let j = i + 1, max = arr.length; j < max; j++) {
                //         if (arr[i].timestamp < arr[j].timestamp) {
                //             m = arr[j]
                //             arr[j] = arr[i]
                //             arr[i] = m
                //         }
                //     }
                // }
                // this.listInfo = arr
                if (this.listInfo.length === 0) {
                    this.showEmptyTrue()
                } else {
                    this.showEmptyFalse()
                }
                this.loadcut()
            })
        },
        enter(val) {
            if (val.t_type === 'B') {
                this.$router.push({ name: '取消', query: { info: val } })
            } else if (val.t_type === 'S') {
                this.$router.push({ name: '取消', query: { info: val } })
            }

        },
        // 刷新
        load() {
            this.$nextTick(() => {
                if (!this.sellerScroll) {
                    this.sellerScroll = new BScroll(this.$refs.seller, {
                        pullUpLoad: true,
                        click: true,
                        scrollY: true,
                        probeType: 3
                    })
                    // 下拉刷新
                    this.sellerScroll.on('scroll', (pos) => {
                        if (pos.y > 50) {

                        }
                    })
                    this.sellerScroll.on('touchEnd', (pos) => {
                        //下拉刷新
                        if (pos.y > 50) {
                            // this.num = this.num + 1
                        }
                        // 上拉加载
                        if (this.sellerScroll.maxScrollY > pos.y + 10) {
                            this.sellerScroll.refresh()
                        }
                    })
                    // 上拉加载
                    this.sellerScroll.on('scrollEnd', () => {
                        if (this.sellerScroll.y <= (this.sellerScroll.maxScrollY + 50)) {
                            this.num = this.num + 1
                            this.lodeShow = true
                            this.getMess()
                            this.byValue()
                            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                            this.$api.get(`get_order_info/finished/${this.num}/?token=${token}&user=${this.mess.user}`, {}, r => {
                                if (r.msg.length === 0) {
                                    this.lodeShow = false
                                } else {
                                    this.listInfo.push(...r.msg)
                                    this.lodeShow = false
                                }

                            })
                        }
                    })

                } else {
                    this.sellerScroll.refresh()
                }

                // this.matscroll.finishPullUp()

            })
        },
    },
    components: {
        Buy,
        Sell,
        LittleLode
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

    .loae {
        width: 100%;
        height: 30px;
    }

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