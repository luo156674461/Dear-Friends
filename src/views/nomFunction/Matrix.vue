<template>
    <div class="matrix">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">矩阵历史</span>
        </div>
        <div class="seek">
            <Button class="screen" @click="screen">
                筛选
                <Icon type="md-arrow-dropdown" />
            </Button>
            <!-- <Input v-model="seek" placeholder="请输入时间" style="width: 100%" @on-change="imp(seek)" /> -->
            <Button class="intiem" @click="intiem">
                选择时间
            </Button>
            <div class="tiem" v-if="intiemShow">
                <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="confirm(currentDate)" />
            </div>
            <ul class="status" v-if="statShow">
                <Checkbox v-model="index" :label="i" v-for="(i, index) in matrix" :key="index" @on-change="reveal(i)" class="chec" ref="chec">{{i.split("_")[0]}}</Checkbox>
            </ul>
        </div>
        <div class="content" ref="mat">
            <div>
                <div class="box" v-for="(i, index) in historyInfo" :key="index">
                    <div class="time">
                        <span class="flag"></span>
                        <span class="num">{{new Date(parseInt(i[6].split("_")[2]) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\//g,"-")}}</span>
                        <span class="ful">完成</span>
                    </div>
                    <div class="past" ref="past">
                        <div class="type_100" v-if="i[0].split('_')[3] == 100 ? true : false"></div>
                        <div class="type_200" v-if="i[0].split('_')[3] == 200 ? true : false"></div>
                        <div class="type_500" v-if="i[0].split('_')[3] == 500 ? true : false"></div>
                        <div class="type_1000" v-if="i[0].split('_')[3] == 1000 ? true : false"></div>
                        <div class="type_2000" v-if="i[0].split('_')[3] == 2000 ? true : false"></div>
                        <div class="matrixBox">
                            <div class="img_bc1">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                <div class="img_bc2">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                    <div class="img_bc3">
                                        <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                        <div class="img_dot1">
                                            <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                                </div>
                                            <div class="img_dot2">
                                                <img src="../../publi/img/then.png" width="100%" height="100%">
                                </div>
                                                <div class="img_dot3">
                                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                                </div>
                                                    <div class="tier_one">
                                                        <span class="host">{{i[0].split("_")[1]}}</span>
                                                    </div>
                                                    <div class="tier_two">
                                                        <span class="deputy_one">
                                        <span>{{i[1].split("_")[1]}}</span>
                                                        <p v-if="i[1].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                        <span class="deputy_two">
                                        <span>{{i[2].split("_")[1]}}</span>
                                                        <!-- <p v-if="i[2].split('_')[5] == sa ? true : false">[直推]</p> -->
                                                        <p v-if="i[2].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                    </div>
                                                    <div class="tier_three">
                                                        <span class="below1">
                                        <span>{{i[3].split("_")[1]}}</span>
                                                        <!-- <p v-if="i[3].split('_')[5] == sa ? true : false">[直推]</p> -->
                                                        <p v-if="i[3].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                        <span class="below2">
                                        <span>{{i[4].split("_")[1]}}</span>
                                                        <!-- <p v-if="i[4].split('_')[5] == sa ? true : false">[直推]</p> -->
                                                        <p v-if="i[4].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                        <span class="below3">
                                        <span>{{i[5].split("_")[1]}}</span>
                                                        <!-- <p v-if="i[5].split('_')[5] == sa ? true : false">[直推]</p> -->
                                                        <p v-if="i[5].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                        <span class="below4">
                                        <span>{{i[6].split("_")[1]}}</span>
                                                        <!-- <p v-if="i[6].split('_')[5] == sa ? true : false">[直推]</p> -->
                                                        <p v-if="i[6].indexOf('sa') != -1 ? true : false">[直推]</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
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
        let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
        this.$api.get(`get_history_array/?user=${this.mess.user}&token=${token}`, {}, r => {
            this.historyInfo = r.msg
        })
    },
    mounted() {},
    updated() {
        this.$nextTick(() => {
            for (let i = 0, max = this.historyInfo.length; i < max; i++) {
                if (this.historyInfo[i][0].split("_")[3] == 100) {
                    this.$refs.past[i].style.backgroundColor = 'rgba(255, 255, 255, 1)'
                }
                if (this.historyInfo[i][0].split("_")[3] == 200) {
                    this.$refs.past[i].style.backgroundColor = 'rgba(206, 226, 254, 1)'
                }
                if (this.historyInfo[i][0].split("_")[3] == 500) {
                    this.$refs.past[i].style.backgroundColor = 'rgba(255, 255, 255, 1)'
                }
                if (this.historyInfo[i][0].split("_")[3] == 1000) {
                    this.$refs.past[i].style.backgroundColor = 'rgba(206, 226, 254, 1)'
                }
                if (this.historyInfo[i][0].split("_")[3] == 2000) {
                    this.$refs.past[i].style.backgroundColor = 'rgba(255, 255, 255, 1)'
                }
            }

            if (!this.matScroll) {
                this.matScroll = new BScroll(this.$refs.mat, {
                    tap: 'exit,imp,reveal,intiem,confirm',
                    scrollY: true
                })

            } else {
                this.matScroll.refresh()
            }

        })
    },
    data() {
        return {
            seek: '',
            single: '',
            matrix: ['只看当天_0', '100积分_1', '200积分_2', '500积分_3'],
            showNum: 0,
            statShow: false,
            intiemShow: false,
            inTime: '',
            historyInfo: [],
            cliNow: false,
            cliOne: false,
            cliTen: false,
            cliFive: false,
            arr: {},
            currentDate: new Date(),
            minDate: new Date('2019-01-01')
        }
    },
    computed: {
        ...mapState(['mess', 'newinfo', 'arrNum', 'loadShow']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess', 'loadopen', 'loadcut']),
        exit() {
            this.$router.go(-1)
        },
        screen() {
            this.statShow = !this.statShow
            if (this.statShow) {
                this.getMess()
                this.byValue()
                let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                this.$api.get(`get_history_array/?user=${this.mess.user}&token=${token}`, {}, r => {
                    this.historyInfo = r.msg
                })
                this.cliNow = false
                this.cliOne = false
                this.cliTen = false
                this.cliFive = false
                this.arr = {}
            }
        },
        intiem() {
            this.intiemShow = !this.intiemShow
        },
        confirm(v) {
            this.getMess()
            this.byValue()
            this.intiemShow = false
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_history_array/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.historyInfo = r.msg.filter(b => new Date(new Date(parseInt(b[6].split("_")[2]) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ').replace(/\//g, "-").split(" ")[0]).getTime() === new Date(v).getTime())
            })
        },
        reveal(n) {
            this.showNum = n.split("_")[1]
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_history_array/?user=${this.mess.user}&token=${token}`, {}, r => {
                for (let i = 0, max = r.msg.length; i < max; i++) {
                    if (r.msg[i][0].split("_")[3] === '100') {
                        r.msg[i].num = 1
                    } else if (r.msg[i][0].split("_")[3] === '200') {
                        r.msg[i].num = 2
                    } else if (r.msg[i][0].split("_")[3] === '500') {
                        r.msg[i].num = 5
                    }
                    r.msg[i].time = new Date(parseInt(r.msg[0][6].split("_")[2]) * 1000).toLocaleString().split(" ")[0]
                }
                if (this.showNum == 0) {
                    this.cliNow = !this.cliNow
                    if (this.cliNow) {
                        this.arr.now = 0
                    } else {
                        this.arr.now = ' '
                    }
                }

                if (this.arr.now === 0) {
                    if (this.showNum == 1) {
                        this.cliOne = !this.cliOne
                        if (this.cliOne) {
                            this.arr.one = 1
                        } else {
                            this.arr.one = ' '
                        }
                    }
                } else {
                    if (this.showNum == 1) {
                        this.cliOne = !this.cliOne
                        if (this.cliOne) {
                            this.arr.one = 1
                        } else {
                            this.arr.one = ' '
                        }
                    }
                }


                if (this.arr.now === 0) {
                    if (this.showNum == 2) {
                        this.cliTen = !this.cliTen
                        if (this.cliTen) {
                            this.arr.ten = 2
                        } else {
                            this.arr.ten = " "
                        }
                    }
                } else {
                    if (this.showNum == 2) {
                        this.cliTen = !this.cliTen
                        if (this.cliTen) {
                            this.arr.ten = 2
                        } else {
                            this.arr.ten = " "
                        }
                    }
                }

                if (this.arr.now === 0) {
                    if (this.showNum == 3) {
                        this.cliFive = !this.cliFive
                        if (this.cliFive) {
                            this.arr.five = 5
                        } else {
                            this.arr.five = " "
                        }
                    }
                } else {
                    if (this.showNum == 3) {
                        this.cliFive = !this.cliFive
                        if (this.cliFive) {
                            this.arr.five = 5
                        } else {
                            this.arr.five = " "
                        }
                    }
                }

                if (this.arr.now === 0) {
                    this.historyInfo = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                    let ten = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                    if (this.arr.one === 1) {
                        this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                        if (this.arr.ten == 2) {
                            this.historyInfo = ten.filter(b => b.num !== 5)
                            if (this.arr.five == 5) {
                                this.historyInfo = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                            } else {
                                this.historyInfo = ten.filter(b => b.num !== 5)
                            }
                        } else {
                            this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                            if (this.arr.five == 5) {
                                this.historyInfo = ten.filter(b => b.num !== 2)
                            } else {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                            }
                        }
                    } else {
                        this.historyInfo = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                        let five = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                        if (this.arr.ten == 2) {
                            this.historyInfo = this.historyInfo.filter(b => b.num === 2)
                            if (this.arr.five == 5) {
                                this.historyInfo = five.filter(b => b.num !== 1)
                            } else {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 2)
                            }
                        } else {
                            this.historyInfo = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                            if (this.arr.five == 5) {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 5)
                            } else {
                                this.historyInfo = r.msg.filter(b => b.time === new Date().toLocaleString().split(" ")[0])
                            }
                        }
                    }
                } else {
                    this.historyInfo = r.msg
                    let ten = r.msg
                    if (this.arr.one === 1) {
                        this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                        if (this.arr.ten == 2) {
                            this.historyInfo = ten.filter(b => b.num !== 5)
                            if (this.arr.five == 5) {
                                this.historyInfo = r.msg
                            } else {
                                this.historyInfo = ten.filter(b => b.num !== 5)
                            }
                        } else {
                            this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                            if (this.arr.five == 5) {
                                this.historyInfo = ten.filter(b => b.num !== 2)
                            } else {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 1)
                            }
                        }
                    } else {
                        this.historyInfo = r.msg
                        let five = r.msg
                        if (this.arr.ten == 2) {
                            this.historyInfo = this.historyInfo.filter(b => b.num === 2)
                            if (this.arr.five == 5) {
                                this.historyInfo = five.filter(b => b.num !== 1)
                            } else {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 2)
                            }
                        } else {
                            this.historyInfo = r.msg
                            if (this.arr.five == 5) {
                                this.historyInfo = this.historyInfo.filter(b => b.num === 5)
                            } else {
                                this.historyInfo = r.msg
                            }
                        }
                    }

                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.matrix {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    overflow: hidden;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;

    .head {
        display: flex;
        padding: 0 2%;
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

    .seek {
        width: 100%;
        position: relative;
        padding: 3% 3% 5%;
        display: flex;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(59, 63, 75, 1);
        opacity: 1;

        .screen {
            flex: 0 0 86px;
            width: 86px;
            text-indent: -36%;
            margin-right: 3%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;

            .ivu-icon {
                position: absolute;
                top: 30%;
                left: 38%;
                font-size: 24px;
                color: rgba(126, 179, 252, 1);
                opacity: 1;
            }
        }

        .intiem {
            flex: 1;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .tiem {
            width: 100%;
            position: absolute;
            top: 74%;
            right: 1%;
            z-index: 11;
        }

        .status {
            position: absolute;
            top: 82%;
            left: 3%;
            padding: 4% 12%;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(105, 167, 252, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 5px;
            z-index: 10;
        }
    }

    .content {
        position: absolute;
        top: 110px;
        left: 0;
        bottom: 0;
        padding: 0 3%;
        width: 100%;
        overflow: hidden;

        .time {
            padding: 3% 0;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(112, 112, 112, 1);
            opacity: 1;
            overflow: hidden;

            .flag {
                width: 3%;
                height: 18px;
                transform: translateY(15%);
                margin-left: 1%;
                margin-right: 1.5%;
                display: inline-block;
                background: rgba(126, 179, 252, 1);
                opacity: 1;
            }

            .num {
                display: inline-block;
                height: 17px;
                margin-right: 0.5%;
            }

            .ful {
                display: inline-block;
                height: 17px;
            }
        }

        .past {
            position: relative;
            padding: 4.5%;
            height: 228px;
            background: rgba(255, 255, 255, 1);
            // border: 1px solid rgba(105, 167, 252, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 10px;
            overflow: hidden;

            .type_100 {
                position: absolute;
                top: 13%;
                left: 3%;
                width: 32%;
                height: 12%;
                background: url('../../publi/img/100point.png') no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }

            .type_200 {
                position: absolute;
                top: 13%;
                left: 3%;
                width: 32%;
                height: 12%;
                background: url('../../publi/img/200point.png') no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }

            .type_500 {
                position: absolute;
                top: 13%;
                left: 3%;
                width: 32%;
                height: 12%;
                background: url('../../publi/img/500point.png') no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }

            .type_1000 {
                position: absolute;
                top: 13%;
                left: 3%;
                width: 32%;
                height: 12%;
                background: url('../../publi/img/1000point.png') no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }

            .type_2000 {
                position: absolute;
                top: 13%;
                left: 3%;
                width: 32%;
                height: 12%;
                background: url('../../publi/img/2000point.png') no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }

            p {
                position: relative;
                z-index: 10;
                font-size: 12px;
                font-family: PingFang SC;
                color: rgba(242, 164, 166, 0.5);
                line-height: 1.5 !important;
                transform: translateY(-90%);
            }

            .matrixBox {
                overflow: hidden;
                position: relative;

                .img_bc1 {
                    position: absolute;
                    top: 4%;
                    left: 10%;
                    width: 80%;
                    height: 64%;

                }

                .img_bc2 {
                    position: absolute;
                    top: 60%;
                    left: -17%;
                    width: 80%;
                    height: 64%;

                }

                .img_bc3 {
                    position: absolute;
                    top: 60%;
                    left: 38%;
                    width: 80%;
                    height: 64%;
                    z-index: 2;

                }

                .img_dot1 {
                    position: absolute;
                    top: 27%;
                    left: 3%;
                    width: 15%;
                    height: 15%;
                }

                .img_dot2 {
                    position: absolute;
                    top: 2%;
                    left: 75%;
                    width: 23%;
                    height: 25%;
                }

                .img_dot3 {
                    position: absolute;
                    top: 60%;
                    left: 81%;
                    width: 15%;
                    height: 15%;
                    z-index: 1;
                }

                .tier_one {
                    text-align: center;

                    .host {
                        position: relative;
                        z-index: 1;
                        width: 24%;
                        height: 34px;
                        max-height: 34px;
                        max-width: 80px;
                        display: inline-block;
                        font-size: 16px;
                        line-height: 2.1;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(59, 63, 75, 1);
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        opacity: 1;
                        border-radius: 5px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }

                .tier_two {
                    display: flex;
                    margin: 11.5% 0;

                    .deputy_one {
                        flex: 1;
                        text-align: center;

                        span {
                            position: relative;
                            z-index: 2;
                            display: inline-block;
                            width: 50%;
                            height: 36px;
                            max-width: 80.19px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .deputy_two {
                        flex: 1;
                        text-align: center;

                        span {
                            position: relative;
                            z-index: 2;
                            display: inline-block;
                            width: 50%;
                            height: 36px;
                            max-width: 80.19px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                    }
                }

                .tier_three {
                    display: flex;
                    text-align: center;
                    margin-bottom: 1%;

                    .below1 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-width: 72.16px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .below2 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-width: 72.16px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .below3 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-width: 72.16px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .below4 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-width: 72.16px;
                            max-height: 36px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }


                }
            }
        }

    }
}
</style>