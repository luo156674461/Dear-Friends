<template>
    <div class="past">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">历史</span>
        </div>
        <div class="content">
            <div class="con_head">
                <span class="date">日期</span>
                <span class="integral">积分变动</span>
                <span class="remark">类型</span>
            </div>
            <div class="info_box" ref="pad">
                <div>
                    <div class="con" v-for="(i, index) in padtinfo" :key="index">
                        <span class="con_date">
                        <span class="time">{{i.c_time}}</span>
                        </span>
                        <span class="con_integral">{{i.message}}</span>
                        <span class="con_remark">{{i.l_type}}</span>
                    </div>
                    <div class="loae" v-if="lodeShow">
                        <LittleLode></LittleLode>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import LittleLode from './widget/littleLode';
import BScroll from 'better-scroll';
export default {
    created() {
        this.getMess()
        this.byValue()
        this.$nextTick(() => {
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`point_log/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.padtinfo = r.msg.reverse()
                for (let i = 0, max = r.msg.length; i < max; i++) {
                    r.msg[i].c_time = r.msg[i].c_time.replace('T', ' ').split('.')[0]
                }

            })
        })
    },
    mounted() {
        this.load()
        // this.$nextTick(() => {
        //     if (!this.padScroll) {
        //         this.padScroll = new BScroll(this.$refs.pad, {
        //             // click: true,
        //             scrollY: true,
        //             tap: 'exit,load'
        //         })
        //     } else {
        //         this.padScroll.refresh()
        //     }

        // })
    },
    data() {
        return {
            padtinfo: [],
            lodeShow: false
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
            this.$router.go(-1)
        },
        // 刷新
        load() {
            this.$nextTick(() => {
                if (!this.padScroll) {
                    this.padScroll = new BScroll(this.$refs.pad, {
                        pullUpLoad: true,
                        click: true,
                        scrollY: true,
                        probeType: 3
                    })
                    // 下拉刷新
                    this.padScroll.on('scroll', (pos) => {
                        if (pos.y > 50) {

                        }
                    })
                    this.padScroll.on('touchEnd', (pos) => {
                        //下拉刷新
                        if (pos.y > 50) {
                            // this.num = this.num + 1
                        }
                        // 上拉加载
                        if (this.padScroll.maxScrollY > pos.y + 10) {
                            this.padScroll.refresh()
                        }
                    })
                    // 上拉加载
                    this.padScroll.on('scrollEnd', () => {
                        // if (this.padScroll.y <= (this.padScroll.maxScrollY + 50)) {
                        //     this.num = this.num + 1
                        //     this.lodeShow = true
                        //     this.getMess()
                        //     this.byValue()
                        //     let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                        //     this.$api.get(`get_order_info/finished/${this.num}/?token=${token}&user=${this.mess.user}`, {}, r => {
                        //         if (r.msg.length === 0) {
                        //             this.lodeShow = false
                        //         } else {
                        //             this.listInfo.push(...r.msg)
                        //             this.lodeShow = false
                        //         }

                        //     })
                        // }
                    })

                } else {
                    this.sellerScroll.refresh()
                }

                // this.matscroll.finishPullUp()

            })
        }
    },
    components: {
        LittleLode
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.past {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    z-index: 1000;

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

    .content {
        padding: 0 5%;
        margin-top: 5%;

        .con_head {
            display: flex;
            text-align: center;
            background: rgba(86, 144, 243, 1);
            box-shadow: 0px 3px 6px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;

            span {
                flex: 1;
                padding: 9px 0;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }
        }

        .info_box {
            position: absolute;
            top: 18%;
            left: 0;
            bottom: 0;
            width: 100%;
            overflow: hidden;

            .con {
                display: flex;
                text-align: center;
                margin-top: 5px;
                padding: 3% 0;

                span {
                    flex: 1;
                    font-size: 14px;
                    font-family: SF Pro Text;
                    font-weight: 400;
                    line-height: 16px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;

                    .day {
                        display: block;
                        margin-bottom: 2px;
                    }
                }

                .con_integral {}
            }
        }

    }
}
</style>