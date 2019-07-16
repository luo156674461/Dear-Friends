<template>
    <div class="hang">
        <div class="lode_box" v-if="loadShow">
            <Lode></Lode>
        </div>
        <div class="top-ops">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">挂单</span>
        </div>
        <div class="seekDox">
            <div class="seek">
                <div class="seekImg">
                    <img src="../../publi/img/Seek_Icon.png" width="100%" height="100%"  >
                </div>
                    <input type="text" id="seekTxt" placeholder="请输入单号" @input="search" v-model="val">
                </div>
            </div>
            <div class="content" ref="hang">
                <div>
                    <div class="shop-list" v-for="(b, index) in listInfo" :key="index">
                        <div class="shop-name">
                            <span class="name">{{b.t_type}}</span>
                            <span class="liid">单号：{{b.limit_id}}</span>
                            <!-- <span class="coin-state"></span> -->
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
                                <span class="name">支付方式</span>
                                <span class="totalPrice"><img :src="j" v-for="(j, index) in b.img_urls" :key="index"></span>
                            </div>
                        </div>
                        <div class="but">
                            <Button type="error" @click="cancel(b)" :disabled="b.status === '已取消' ? true : false">{{b.status}}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Lode from './widget/lode';
export default {
    inject: ['reload'],
    created() {
        this._initGet()
    },
    mounted() {
        this.$nextTick(() => {
            this.hangScroll = new BScroll(this.$refs.hang, {
                scrollY: true,
                tap: "exit,cancel"
            })
        })
    },
    data() {
        return {
            listInfo: [],
            imgArr: {
                0: 'https://www.onetwoshare.net/static/front/bank.png',
                1: 'https://www.onetwoshare.net/static/front/alipay.png',
                2: 'https://www.onetwoshare.net/static/front/wechat.png'
            },
            model: '',
            loading: false,
            options: [],
            val: ''
        }
    },
    computed: {
        ...mapState(['mess', 'orderShow', 'arrNum', 'loadShow']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'loadopen', 'loadcut']),
        exit() {
            this.$router.go(-1)
        },
        cancel(v) {
            this.getMess() 
            this.byValue()
            let params = {
                limit_id: v.limit_id
            }
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`down_limit/?token=${token}&user=${this.mess.user}`, params, r => {
                
                let _this = this
                this.$Modal.warning({
                    title: r.msg,
                    onOk() {
                        _this.$router.push({ path: '/hang' })
                        _this.reload()
                    }
                })
            })
        },
        _initGet() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_user_limit/?token=${token}&user=${this.mess.user}`, {}, r => {
                r.msg = r.msg.filter(l => l.amount !== '0.00')
                r.msg = r.msg.filter(i => i.status === '0').reverse()
                for (let l = 0; l < r.msg.length; l++) {
                    if (r.msg[l].t_type === 'B') {
                        r.msg[l].t_type = '购买'
                    } else {
                        r.msg[l].t_type = '出售'
                    }

                    if (r.msg[l].status === '0') {
                        r.msg[l].status = '取消'
                    }
                    r.msg[l].ctime = r.msg[l].ctime.replace('T', ' ').split('.')[0].substr(5, 14)
                }

                this.listInfo = r.msg
                for (var i = 0; i < this.listInfo.length; i++) {
                    this.listInfo[i].img_urls = []
                }
                for (let m = 0; m < this.listInfo.length; m++) {
                    this.listInfo[m].allow_payment = this.listInfo[m].allow_payment.split(',')

                    for (let i = 0; i < this.listInfo[m].allow_payment.length; i++) {
                        var a = this.listInfo[m].allow_payment[i]
                        this.listInfo[m].img_urls.push(this.imgArr[a])
                    }
                }
            })
        },
        search() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_user_limit/?token=${token}&user=${this.mess.user}`, {}, r => {
                for (let l = 0; l < r.msg.length; l++) {
                    if (r.msg[l].t_type === 'B') {
                        r.msg[l].t_type = '购买'
                    } else {
                        r.msg[l].t_type = '出售'
                    }

                    if (r.msg[l].status === '0') {
                        r.msg[l].status = '取消'
                    } else {
                        r.msg[l].status = '已取消'
                    }
                    r.msg[l].ctime = r.msg[l].ctime.replace('T', ' ').split('.')[0].substr(5, 14)
                }

                // if (/^[0-9]\d*$/.test(this.val)) {
                //     this.listInfo = r.msg.filter(l => l.ctime.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
                // } else {
                this.listInfo = r.msg.filter(l => l.limit_id.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
                // }

                for (let i = 0, max = this.listInfo.length; i < max; i++) {
                    this.listInfo[i].img_urls = []
                }
                for (let m = 0, max = this.listInfo.length; m < max; m++) {
                    this.listInfo[m].allow_payment = this.listInfo[m].allow_payment.split(',')

                    for (let i = 0, max = this.listInfo[m].allow_payment.length; i < max; i++) {
                        var a = this.listInfo[m].allow_payment[i]
                        this.listInfo[m].img_urls.push(this.imgArr[a])
                    }
                }
            })
            // this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
    },
    components: {
        Lode
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.hang {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    z-index: 1000;
    box-sizing: border-box;

    .seekDox {
        padding: 0 5%;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;

        .seek {
            display: flex;
            position: relative;
            margin: 5% 0;
            padding-left: 40px;
            height: 34px;
            background: rgba(228, 230, 236, 1);
            opacity: 1;
            border-radius: 5px;
            box-sizing: border-box;

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
    }


    .lode_box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.1);
        z-index: 10;
    }

    .top-ops {
        display: flex;
        padding: 0 3%;
        margin-bottom: 1%;
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-bottom: 1px solid rgba(190, 193, 204, 0.4);

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
        position: absolute;
        top: 110px;
        left: 0;
        bottom: 0;
        padding: 0 5%;
        width: 100%;
        overflow: hidden;
        background: rgba(228, 230, 236, 0.2);
        opacity: 1;

        .shop-list {
            padding: 0 15px;
            margin-bottom: 12px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 10px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;
            overflow: hidden;

            .shop-name {
                display: flex;
                padding: 15px 0;
                width: 100%;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 22px;
                color: rgba(59, 63, 75, 1);
                opacity: 1;

                .name {
                    flex: 1;
                }

                .liid {
                    flex: 1;
                }

                // .coin-state {
                //     flex: 1;
                //     line-height: 30px;
                // }
            }

            .shop-mess {
                display: flex;
                padding-bottom: 20px;
                text-align: center;

                .mess1 {
                    flex: 1;
                    text-align: left;
                }

                .mess2 {
                    flex: 1;
                }

                .mess3 {
                    flex: 1;

                    .totalPrice {
                        display: inline-block;

                        img {
                            width: 15px;
                            margin: 0 3px;
                        }
                    }
                }

                span {
                    font-size: 12px;
                    font-family: SF Pro Text;
                    font-weight: 300;
                    line-height: 14px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }

                .name {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 300;
                    line-height: 20px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }

            .buyer {
                padding: 10px 0;
            }

            .but {
                text-align: right;
                margin-bottom: 15px;


                .ivu-btn {
                    padding: 5px 20px;
                    background: rgba(245, 65, 94, 1);
                    opacity: 1;
                    border-radius: 14px;
                    font-size: 15px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 21px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
            }
        }
    }
}
</style>