<template>
    <div class="funds" ref="fun">
        <div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">团队</span>
            </div>
            <div class="content">
                <!-- 总资金 -->
                <div class="always" @click="driveOne">
                    <div class="top">
                        <div class="title"><img src="../../publi/img/100point_money.png" width="100%" height="100%"></div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                            <span class="txt">直推总人数</span>
                            <span class="num">{{justNum_one}}</span>
                        </div>
                        <div class="rigth">
                            <span class="txt">团队总人数</span>
                            <span class="num">{{totalNum_one}}</span>
                        </div>
                    </div>
                </div>
                <div class="always" @click="driveTwo">
                    <div class="top">
                        <div class="title"><img src="../../publi/img/200point_money.png" width="100%" height="100%"></div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                            <span class="txt">直推总人数</span>
                            <span class="num">{{justNum_two}}</span>
                        </div>
                        <div class="rigth">
                            <span class="txt">团队总人数</span>
                            <span class="num">{{totalNum_two}}</span>
                        </div>
                    </div>
                </div>
                <div class="always" @click="driveFive">
                    <div class="top">
                        <div class="title"><img src="../../publi/img/500point_money.png" width="100%" height="100%"></div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                            <span class="txt">直推总人数</span>
                            <span class="num">{{justNum_five}}</span>
                        </div>
                        <div class="rigth">
                            <span class="txt">团队总人数</span>
                            <span class="num">{{totalNum_five}}</span>
                        </div>
                    </div>
                </div>
                <div class="always" @click="driveFive">
                    <div class="top">
                        <div class="title"><img src="../../publi/img/1000point_money.png" width="100%" height="100%"></div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                            <span class="txt">直推总人数</span>
                            <span class="num">{{justNum_ten}}</span>
                        </div>
                        <div class="rigth">
                            <span class="txt">团队总人数</span>
                            <span class="num">{{totalNum_ten}}</span>
                        </div>
                    </div>
                </div>
                <div class="always" @click="driveFive">
                    <div class="top">
                        <div class="title"><img src="../../publi/img/2000point_money.png" width="100%" height="100%"></div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                        <div class="img"><img src="../../publi/img/pure_dot.png" width="100%" height="100%"></div>
                            <span class="txt">直推总人数</span>
                            <span class="num">{{justNum_twenty}}</span>
                        </div>
                        <div class="rigth">
                            <span class="txt">团队总人数</span>
                            <span class="num">{{totalNum_twenty}}</span>
                        </div>
                    </div>
                </div>
                <!-- <p>直推人员列表</p>
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item title="张三" name="1">
                        <div class="list">
                            <div class="left">
                                <span class="txt">用户名：</span>
                                <span class="cont">张三</span>
                            </div>
                            <div class="rigth">
                                <span class="txt">电话：</span>
                                <span class="cont">11111111111</span>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse> -->
                <!-- 1000 -->
                <!-- <van-collapse v-model="activeNames" accordion>
                <van-collapse-item title="1000" :name="index + 1" v-for="(i,index) in wallet" :key="index">
                    amount：<h2>{{i.amount}}</h2>
                    capital：<h2>{{i.capital}}</h2>
                    freeze：<h2>{{Number(i.freeze_limit) + Number(i.freeze_mill)}}</h2>
                </van-collapse-item>
            </van-collapse> -->
                <!-- 2000 -->
                <!--   <van-collapse v-model="activeNames" accordion>
                <van-collapse-item title="2000" :name="index + 1" v-for="(i,index) in wallet" :key="index">
                    amount：<h2>{{i.amount}}</h2>
                    capital：<h2>{{i.capital}}</h2>
                    freeze：<h2>{{Number(i.freeze_limit) + Number(i.freeze_mill)}}</h2>
                </van-collapse-item>
            </van-collapse> -->
            </div>
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
            groupInfo_one: [], // 100直推信息
            justNum_one: 0, // 100直推人数
            totalNum_one: 0, // 100总人数
            groupInfo_two: [], // 200直推信息
            justNum_two: 0, // 200直推人数
            totalNum_two: 0, // 200总人数
            groupInfo_five: [], // 500直推信息
            justNum_five: 0, //500直推人数
            totalNum_five: 0, //500总人数
            groupInfo_ten: [], //1000直推信息
            justNum_ten: 0, //1000直推人数
            totalNum_ten: 0, //1000总数
            groupInfo_twenty: [], //2000直推信息
            justNum_twenty: 0, //2000直推人数
            totalNum_twenty: 0, //2000总数
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum'])
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
            this.$router.go(-1)
        },
        driveOne() {
            this.$router.push({ name: '直推列表', query: { info: this.$des.encrypt(JSON.stringify(this.groupInfo_one)) } })
        },
        driveTwo() {
            this.$router.push({ name: '直推列表', query: { info: this.$des.encrypt(JSON.stringify(this.groupInfo_two)) } })
        },
        driveFive() {
            this.$router.push({ name: '直推列表', query: { info: this.$des.encrypt(JSON.stringify(this.groupInfo_five)) } })
        },
        one_hundred() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_teamate/100/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.groupInfo_one = r.msg.belongs
                this.totalNum_one = r.msg.teams_counts
                this.justNum_one = r.msg.belongs.length
            })
        },
        two_hundred() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_teamate/200/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.groupInfo_two = r.msg.belongs
                this.totalNum_two = r.msg.teams_counts
                this.justNum_two = r.msg.belongs.length
            })
        },
        five_hundred() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_teamate/500/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.groupInfo_five = r.msg.belongs
                this.totalNum_five = r.msg.teams_counts
                this.justNum_five = r.msg.belongs.length
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.funScroll) {
                this.funScroll = new BScroll(this.$refs.fun, {
                    // click: true,
                    scrollY: true,
                    tap: "exit,drive"
                })
            } else {
                this.funScroll.refresh()
            }

        })
    },
    created() {
        this.one_hundred()
        this.two_hundred()
        this.five_hundred()
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';

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
        // position: absolute;
        // top: 40px;
        // left: 0;
        // bottom: 0;
        padding: 5%;
        width: 100%;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;

        .always {
            padding: 15px 3%;
            margin-bottom: 10px;
            height: 164px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: border-box;

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

            .img {
                width: 44px;
                height: 28px;
                position: absolute;
                top: -8%;
                left: 19%;
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

                .left {
                    position: relative;
                    flex: 1;

                    .num {
                        &::after {
                            position: absolute;
                            top: 15%;
                            right: -3%;
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

                .rigth {
                    flex: 1;
                }
            }

        }

        // p {
        //     margin-bottom: 5px;
        //     font-size: 15px;
        //     font-family: PingFang SC;
        //     font-weight: 400;
        //     line-height: 21px;
        //     color: rgba(59, 63, 75, 1);
        //     opacity: 1;
        // }

        .van-collapse-item {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;
        }

        .list {
            display: flex;

            .txt {
                display: inline-block;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 20px;
                color: rgba(109, 112, 120, 1);
                opacity: 1;
            }

            .cont {
                display: inline-block;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 20px;
                color: rgba(109, 112, 120, 1);
                opacity: 1;
            }

            .left {
                flex: 0 0 100px;
                width: 100px;
            }

            .rigth {
                flex: 1;
                text-align: right;
            }
        }
    }

}
</style>