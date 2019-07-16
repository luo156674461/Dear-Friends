<template>
    <div class="share_box" ref="per">
        <div>
            <div class="head">
                <!-- <div class="shadow"></div> -->
                <div class="share" @click="qurqr">
                    <!-- <van-icon name="qr" class="qr_icon" /> -->
                    <i class="qr_icon code_ico"></i>
                    <span class="txt">分享</span>
                    <Icon type="ios-arrow-forward" class="boult" />
                </div>
                <div class="head_rc">
                    <div class="head_top">
                        <!-- <span class="set" @click="set"><van-icon name="setting-o" /></span> -->
                        <!-- 反馈中心 -->
                        <span class="serve" @click="tickling"><img src="../../publi/img/backIcon.png" width="100%" height="100%"></span>
                    </div>
                    <div class="head_mes">
                        <div class="via" v-if="uploadShow">
                            <Upload :action="headPortraitApi" :defaultList="defaultListJust" :data="dataUser" ref="chartView"></Upload>
                        </div>
                        <div class="via" @click="choose" v-if="headPortraitShow"><span class="via_txt">{{mess.user.match(/^./)[0]}}</span></div>
                        <div class="mes">
                            <div class="user">
                                <span class="fact_name">{{mess.user}}</span>
                                <span class="vip" v-if="vipShow"><span class="grade">vip{{level}}</span></span>
                            </div>
                            <div class="cell">
                                <span class="cellnum">{{cell}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="opt-one">
                    <div class="user_control" @click="account">
                        <i class="icon user"></i>
                        <span class="txt">账号管理</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                        <span class="dot" v-if="dot"></span>
                    </div>
                    <div class="funds" @click="fundopen">
                        <i class="icon purse"></i>
                        <span class="txt">积分钱包</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <!-- <div class="funds" @click="matrix">
                            <van-icon name="todo-list-o" class="user_icon" />
                            <span class="txt">矩阵历史</span>
                            <Icon type="ios-arrow-forward" class="boult" />
                        </div> -->
                    <!-- <div class="ant" @click="history">
                            <van-icon name="todo-list-o" class="user_icon" />
                            <span class="txt">我的历史</span>
                            <Icon type="ios-arrow-forward" class="boult" />
                        </div> -->
                </div>
                <div class="opt-two">
                    <div class="order_form" @click="orderopen">
                        <i class="icon single"></i>
                        <span class="txt">我的订单</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <div class="order_form" @click="hang">
                        <i class="icon hangsingle"></i>
                        <span class="txt">我的挂单</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <div class="funds" @click="team">
                        <i class="icon team"></i>
                        <span class="txt">我的团队</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <div class="order_form" @click="store">
                        <i class="icon store"></i>
                        <span class="txt">积分商城</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                    <div class="funds" @click="notice">
                        <i class="icon notice_ico"></i>
                        <span class="txt">系统公告</span>
                        <Icon type="ios-arrow-forward" class="boult" />
                    </div>
                </div>
            </div>
            <div class="but">
                <!-- <Button long @click.native="logout" class="cancel">暂停矩阵</Button> -->
                <Button long @click.native="quit" class="exit">退出登录</Button>
            </div>
            <div class="reminder" v-if="hintShow">
                <div class="can">
                    <h2>提示</h2>
                    <p>是否确认暂停矩阵，暂停之后将失去所有直推用户</p>
                    <Button type="primary" @click.native="hint_l">确定</Button>
                    <Button type="error" ghost @click.native="hint_c">取消</Button>
                </div>
            </div>
            <div class="hint" v-if="exShow" @click="h_ex">
                <div class="can">
                    <p>{{msg_txt}}</p>
                </div>
            </div>
        </div>
        <transition name="lump">
            <router-view class="lump"></router-view>
        </transition>
    </div>
</template>
<script>
import Bus from '../../Bus.js'
import Cancel from '../nomFunction/widget/Cancel';
import axios from 'axios';
import Upload from '../nomFunction/widget/Upload_h';
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    inject: ['reload'],
    data() {
        return {
            init_token: '',
            user: '',
            cell: '',
            level: '',
            wallet: [],
            // user_mill: [],
            r: {},
            feed: ' ',
            userinfo: {},
            dot: true,
            vipShow: false,
            hintShow: false, // 注销提示
            trade_password: 0,
            msg_txt: '',
            exShow: false, // 提示
            dataUser: {},
            defaultListJust: [],
            headPortraitApi: 'https://www.onetwoshare.net/api/logo_upload/',
            headPortraitShow: true,
            uploadShow: false
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'perhint', 'pernum']),
    },
    watch: {
        //查询参数改变，再次执行数据获取方法
        '$route': {
            handler(to, from) {
                if (to.name === '个人信息') {
                    this.getMess()
                    this.byValue()
                    this.getVal()
                }
            }
        },
        deep: true
    },
    methods: {
        ...mapMutations(['byValue', 'getMess', 'perh', 'add', 'min', 'vanish', 'act']),
        // 退出
        quit() {
            let _this = this;
            this.$Modal.confirm({
                title: '提示',
                content: '确认退出吗?',
                onOk() {
                    sessionStorage.removeItem('mess');
                    localStorage.removeItem('active');
                    _this.$router.push('/login');
                }
            })
        },
        // 头像选择
        choose() {
            this.headPortraitShow = false
            this.uploadShow = true
        },
        logout() {
            this.getMess()
            this.byValue()
            this.hintShow = true
        },
        hint_l() {
            this.hintShow = false
            this.getMess()
            this.byValue()
            let _this = this
            this.$Modal.warning({
                render: (h) => {
                    var vm = _this;
                    return h(Cancel)
                },
                onOk() {
                    let params = {}
                    params.trade_password = _this.trade_password
                    let token = _this.$des.encrypt(`${_this.mess.token}${_this.arrNum}`)
                    _this.$api.post(`_quit/?user=${_this.mess.user}&token=${token}`, params, r => {
                        if (r.state === 200) {
                            _this.exShow = true
                            _this.msg_txt = r.msg
                        } else if (r.state === 400) {
                            _this.exShow = true
                            _this.msg_txt = r.msg
                        }
                    })
                }
            })
        },
        hint_c() {
            this.hintShow = false
        },
        h_ex() {
            this.exShow = false
        },
        tickling() {
            var _this = this
            this.$Modal.confirm({
                render: (h) => {
                    return h('div', [
                        h('h2', '反馈中心'),
                        h('Input', {
                            props: { type: 'textarea', rows: 4, placeholder: '请输入信息' },
                            on: {
                                'on-change'(event) {
                                    _this.feed = event.target.value
                                }
                            }
                        })
                    ])
                },
                onOk() {
                    _this.getMess()
                    _this.byValue()
                    let params = {}
                    params.feedback = _this.feed
                    let token = _this.$des.encrypt(`${_this.init_token}${_this.arrNum}`)
                    if (_this.feed === ' ') {
                        _this.$Message.warning({
                            content: '内容不能为空'
                        })
                    } else {
                        _this.$api.post(`question_feedback/?token=${token}&user=${_this.user}`, params, r => {
                            _this.$Modal.warning({
                                'title': r.msg
                            })
                        })
                    }


                }
            })
        },
        qurqr() {
            if (this.userinfo.allow_plus_ten === '0') {
                let _this = this
                this.$Modal.warning({
                    title: '要开启矩阵才能分享哦！',
                    onOk() {
                        _this.$router.push({ path: '/' })
                    }
                })
            } else {
                this.$router.push({ path: '/qr_code' })
            }

        },
        account() {
            this.$router.push({ name: '用户管理', query: { info: this.r } })


        },
        fundopen() {
            this.$router.push({ name: '资金管理', query: { wallet: this.wallet } })
        },
        // matrix() {
        //     this.$router.push({ name: '矩阵历史' })
        // },
        // history() {
        //     this.$router.push({ name: '我的历史' })
        // },
        orderopen() {
            this.$router.push({ name: '我的订单' })
            sessionStorage.setItem('sign', JSON.stringify(true))
        },
        hang() {
            this.$router.push({ name: '我的挂单' })
        },
        store() {
            this.$router.push({ name: '积分商城' })
        },
        team() {
            this.$router.push({ name: '我的团队' })
        },
        notice() {
            this.$router.push({ name: '系统公告' })
        },
        getVal() {
            this.user = this.mess.user
            this.init_token = this.mess.token
            let token = this.$des.encrypt(`${this.init_token}${this.arrNum}`)
            this.$api.get(`get_user_info/?token=${token}&user=${this.user}`, {}, r => {
                if (r.logo_url === '') {
                    this.headPortraitShow = true
                    this.uploadShow = false
                } else {
                    this.headPortraitShow = false
                    this.uploadShow = true
                    this.defaultListJust.push({ url: `https://www.onetwoshare.net${r.logo_url}` })
                    this.$refs.chartView
                }
                r.payment_method.identify = r.identify
                r.perhint = false
                r.num = 4
                this.userinfo = r
                if (r.level !== ' ') {
                    this.vipShow = true
                    if (r.vips === '1') {
                        r.level = 'S'
                    }
                } else {
                    this.vipShow = false
                }


                let payment = r.payment_method
                for (let k in payment) {
                    switch (payment[k]) {
                        case '1':
                            r.num--
                            break;
                        default:
                            r.perhint = true
                            break;
                    }
                }
                if (r.num === 0) {
                    r.perhint = false
                    this.dot = false
                }
                this.r = this.$des.encrypt(JSON.stringify(r)) //路由传值加密
                this.cell = this.$des.decrypt(r.cell)
                this.level = r.level
                this.wallet = this.$des.encrypt(JSON.stringify(r.wallet))
                // var num = '5'
                // for (var i = 0; i < r.user_mill.length; i++) {
                //     r.user_mill[i].mill_id = '矿机ID：' + r.user_mill[i].mill_id
                // }
                // this.user_mill = this.$des.encrypt(JSON.stringify(r.user_mill))
            })
        }
    },
    created() {
        this.$nextTick(() => {
            this.getMess()
            this.byValue()
            this.dataUser.user = this.mess.user
            this.getVal()
            this.act(3)
        })
        Bus.$on('cancelinfo', content => {
            this.trade_password = content.pass
        })
    },
    mounted() {

    },
    updated() {

        this.$nextTick(() => {
            if (!this.perScroll) {
                this.perScroll = new BScroll(this.$refs.per, {
                    click: true,
                    scrollY: true
                })

            } else {
                this.perScroll.refresh()
            }

        })
    },
    components: {
        Cancel,
        Upload
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
@import "../../publi/scss/mixin";

.share_box {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;

    .reminder {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.2);
        z-index: 10;

        .can {
            position: absolute;
            top: 20%;
            left: 9%;
            padding: 3%;
            background: #fff;
            border-radius: 4px;

            h2 {
                text-align: center;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                opacity: 1;
            }

            p {
                padding: 4% 0;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                opacity: 1;
            }

            .ivu-btn {
                float: right;
                margin-right: 4%;
            }
        }
    }

    .hint {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.2);
        z-index: 10;

        .can {
            position: absolute;
            top: 20%;
            left: 7.5%;
            padding: 3%;
            background: #fff;
            border-radius: 4px;

            p {
                padding: 4% 0;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 0, 0, 1);
                opacity: 1;
            }
        }
    }

    .lump {
        transition: all 0.3s;

        &.lump-enter-active {
            transition: all 0.3s;
        }

        &.lump-enter {
            transform: translateX(100%);
        }

        &.lump-leave-active {
            transition: all 0.3s;
        }

        &.lump-leave-to {
            transform: translateX(100%);
        }
    }

    .head {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 98px;
        @include bg-img('../../publi/img/finance', 100% 100%);
        opacity: 0.8;

        .shadow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(230, 230, 250, 0.5);
        }

        .share {
            display: flex;
            position: absolute;
            right: 0;
            top: 58%;
            width: 72px;
            height: 28px;
            line-height: 28px;
            padding: 4px 0;
            padding-left: 5px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.46);
            opacity: 1;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            z-index: 100;

            .qr_icon {
                flex: 0 0 18px;
                margin: 0 4px;
                width: 18px;
                height: 18px;
                font-size: 18px;
                opacity: 1;
            }

            .code_ico {
                @include bg-img('../../publi/img/code_ico', 100% 100%)
            }

            .txt {
                flex: 1;
                height: 18px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 1.3;
                color: rgba(71, 133, 241, 1);
                opacity: 1;
            }

            .boult {
                flex: 0 0 13px;
                width: 13px;
                height: 13px;
                font-size: 13px;
                line-height: 18px;
                // transform: translateY(-7px);
                color: rgba(71, 133, 241, 1);
                opacity: 1;
                border-radius: 2px;
            }
        }

        .head_rc {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            padding: 2% 5% 0;
            width: 100%;
            z-index: 5;

            .head_top {
                width: 100%;
                height: 24px;
                color: #fff;
                line-height: 24px;

                .serve {
                    display: inline-block;
                    float: right;
                    width: 24px;
                    height: 24px;
                }
            }

            .head_mes {
                display: flex;
                width: 100%;
                height: 54px;

                .via {
                    flex: 0 0 54px;
                    margin-right: 10px;
                    width: 54px;
                    height: 54px;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.46);
                    border-radius: 50%;
                    opacity: 1;
                    text-align: center;
                    overflow: hidden;

                    img {
                        border-radius: 50%;
                    }

                    .via_txt {
                        display: inline-block;
                        font-size: 30px;
                        font-family: PingFang SC;
                        font-weight: 300;
                        line-height: 1.75;
                    }
                }

                .mes {
                    flex: 1;
                    font-size: 16px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;

                    .user {
                        box-sizing: border-box;
                        vertical-align: top;
                        height: 20px;
                        line-height: 20px;

                        .fact_name {
                            font-size: 20px;
                            max-width: 100px;
                            margin-right: 5px;
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .vip {
                            display: inline-block;
                            text-align: center;
                            width: 44px;
                            line-height: 16px;
                            background: rgba(253, 185, 50, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.46);
                            opacity: 1;
                            border-radius: 4px;

                            .grade {
                                display: inline-block;
                                font-size: 14px;
                                font-family: SF Pro Text;
                                font-weight: 400;
                                line-height: 20px;
                                color: rgba(255, 255, 255, 1);
                                opacity: 1;
                            }
                        }
                    }

                    .cell {
                        box-sizing: border-box;
                        vertical-align: top;
                        margin-top: 10px;
                        height: 30px;

                        .cellnum {
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: 500;
                            line-height: 20px;
                            color: rgba(255, 255, 255, 1);
                            opacity: 1;
                        }
                    }

                }
            }
        }

    }

    .content {
        padding: 5% 5% 0 5%;
        opacity: 1;


        .icon {
            display: inline-block;
            transform: translateY(6px);
            height: 22px;
            width: 22px;
            border-radius: 50%;
        }

        .user {
            @include bg-img('../../publi/img/user_ico', 100% 100%)
        }

        .purse {
            @include bg-img('../../publi/img/iconintegral', 100% 100%)
        }

        .single {
            @include bg-img('../../publi/img/single_ico', 100% 100%)
        }

        .hangsingle {
            @include bg-img('../../publi/img/hangsingle_ico', 100% 100%)
        }

        .team {
            @include bg-img('../../publi/img/team_ico', 100% 100%)
        }

        .store {
            @include bg-img('../../publi/img/store_ico', 100% 100%)
        }

        .notice_ico {
            @include bg-img('../../publi/img/notice_ico', 100% 100%)
        }

        .opt-one {
            font-size: 16px;
            padding: 0 15px;
            margin-bottom: 12px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;

            div {
                border-bottom: 1px solid rgba(190, 193, 204, 0.4);
            }

            div:last-child {
                border: none;
            }

            .txt {
                margin-left: 5px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 20px;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }

            .user_control {
                position: relative;
                padding: 10px 0;
                line-height: 20px;


                .dot {
                    display: inline-block;
                    position: absolute;
                    top: 16%;
                    right: 0;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #f00;
                }

                .boult {
                    transform: translateY(2px);
                    font-size: 25px;
                    line-height: 26px;
                    float: right;
                    color: #ccc;
                }
            }

            .funds {
                padding: 10px 0;
                line-height: 20px;

                .txt {
                    margin-left: 5px;
                }

                .boult {
                    transform: translateY(8px);
                    font-size: 25px;
                    line-height: 26px;
                    float: right;
                    color: #ccc;
                }
            }

            .ant {
                padding: 10px 0;
                line-height: 20px;

                .txt {
                    margin-left: 5px;
                }

                .boult {
                    transform: translateY(7px);
                    font-size: 25px;
                    line-height: 26px;
                    float: right;
                    color: #ccc;
                }
            }
        }

        .opt-two {
            font-size: 16px;
            padding: 0 15px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;

            div {
                border-bottom: 1px solid rgba(190, 193, 204, 0.4);
            }

            div:last-child {
                border: none;
            }



            .order_form {
                padding: 10px 0;
                line-height: 20px;

                .txt {
                    margin-left: 5px;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 20px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }

                .boult {
                    transform: translateY(8px);
                    font-size: 25px;
                    line-height: 26px;
                    float: right;
                    color: #ccc;
                }
            }

            .funds {
                padding: 10px 0;
                line-height: 20px;

                .txt {
                    margin-left: 5px;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 20px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;

                }

                .boult {
                    transform: translateY(8px);
                    font-size: 25px;
                    line-height: 26px;
                    float: right;
                    color: #ccc;
                }
            }

        }
    }

    .but {
        width: 100%;
        height: 330px;
        padding: 5% 5% 0;
        box-sizing: border-box;

        .cancel {
            margin-bottom: 5%;
            background: rgba(86, 144, 243, 1);
            color: rgba(255, 255, 255, 1);
        }

        .exit {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(86, 144, 243, 1);
            color: rgba(86, 144, 243, 1);
        }

        .ivu-btn {
            flex: 1;
            opacity: 1;
            border-radius: 3px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            opacity: 1;
        }
    }
}
</style>