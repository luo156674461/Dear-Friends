<template>
    <div class="weixin" ref="char">
        <div>
            <div class="lode_box" v-if="loadShow">
                <Lode></Lode>
            </div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">微信</span>
            </div>
            <div class="interval">
                <span class="txt">微信信息填写</span>
                <div class="icon"><img src="../../../publi/img/wachat_icon.png" width="100%" height="100%"></div>
                </div>
                <div class="fillIn">
                    <div class="weixinNum">
                        <span class="title">微信账号：</span>
                        <Input v-model="weixinNum" placeholder="请输入微信账号" style="width: 100%" class="txt" />
                    </div>
                </div>
                <div class="material">
                    <div class="txt">收款二维码</div>
                    <div class="just">
                        <!-- <div class="shade" v-if="justshow">
                            <div>
                                <span class="txt">收款二维码</span>
                                <span class="title">(已验证)</span>
                            </div>
                        </div> -->
                        <Upload :action="weixinApi" :defaultList="defaultListJust" ref="chartView" :data="dataUser"></Upload>
                    </div>

                    <Button type="primary" ghost long @click="submit_ago" class="put">提交</Button>
                </div>
                <div class="reminder">
                    <p>温馨提示：</p>
                    <p>1、若需要更改【客户信息】、【证件号码】等其他内容。请联系客服</p>
                    <p>2、身份资料已银行资料要审核通过后，方可交易。请阁下及时上载资料，以免影响阁下的交易。</p>
                </div>
            </div>
            <Modal title="提示" v-model="modal1" class-name="vertical-center-modal" :closable="closable" @on-ok="ok">
                <p>{{hint_txt}}</p>
            </Modal>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Bus from '../../../Bus.js';
import Upload from '../widget/Upload';
import Lode from '../widget/lode';
import alter from '../../nomFunction/widget/alter';
export default {
    created() {
        this.getMess()
        this.byValue()
        this.dataUser.user = this.mess.user
        this.info = JSON.parse(this.$des.decrypt(this.$route.query.info))
        this.getmass()
         Bus.$on('cancelinfo', content => {
            this.trade_password = content.pass
        })
    },
    mounted() {
        Bus.$on('wechatImg', content => {
            this.img = content
        })
        this.$nextTick(() => {
            if (!this.charScroll) {
                this.charScroll = new BScroll(this.$refs.char, {
                    // click: true,
                    scrollY: true,
                    tap: 'exit,submit,submit_ago'
                })
            } else {
                this.charScroll.refresh()
            }

        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.charScroll) {
                this.charScroll = new BScroll(this.$refs.char, {
                    // click: true,
                    scrollY: true,
                    tap: 'exit,submit,submit_ago'
                })
            } else {
                this.charScroll.refresh()
            }

        })
    },
    data() {
        return {
            weixinNum: 0,
            defaultListJust: [],
            weixinApi: 'https://www.onetwoshare.net/api/wechat_upload/',
            justshow: false,
            info: {},
            dataUser: {},
            trade_password: '',
            modal1: false,
            closable: false,
            hint_txt: '',
            win: 0,
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
        getmass() {
            if (this.info.payment_method.method_wechat === '1') {
                this.loadopen()
                let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                this.justshow = true
                this.$api.get(`wechat_info/?token=${tmp_token}&user=${this.mess.user}`, {}, r => {
                    if (r.state == 200) {
                        this.loadcut()
                        this.weixinNum = r.msg[0].wechat_account
                        this.defaultListJust.push({ url: `https://www.onetwoshare.net${r.msg[0].wechat_code}`})
                    }
                })
            } else {
                this.justshow = false
            }
        },
        ok() {
            this.byValue()
            this.getMess()
            if( this.win == 1) {
               this.submit() 
            }else {
               this.$Modal.warning({
                title: this.hint_txt
               })
            }
        },
        submit_ago() {
            this.byValue()
            this.getMess()
            let _this = this
            this.$Modal.warning({
                render: (h) => {
                    var vm = _this;
                    return h(alter)
                },
                onOk() {
                    _this.byValue()
                    _this.getMess()
                    // _this.$Modal.remove()
                    // 
                    let params = {}
                    params.trade_pwd = _this.trade_password
                    let tmp_token = this.$des.encrypt(`${_this.mess.token}${_this.arrNum}`)
                    _this.$api.post(`passwd_access/?token=${tmp_token}&user=${_this.mess.user}`, params, r => {
                        _this.modal1 = true
                        if (r.state === 200) {
                            _this.hint_txt = r.msg
                            _this.win = 1
                        } else if (r.state === 400) {
                            _this.hint_txt = r.msg
                             _this.win = 2
                        }
                    })
                }
            })
        },
        submit() {
            this.byValue()
            let params = {}
            params.wechat_account = this.weixinNum
            // params.wechat_code = this.img
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`flush_wechat/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                let _this = this
                if (r.state == 200) {
                    this.loadcut()
                    this.$Modal.success({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ name: '个人信息' })
                        }
                    })

                    this.$refs.chartView
                }
            })
        }
    },
    components: {
        Upload,
        Lode,
        alter
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.weixin {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    transition: all 0.5s;
    z-index: 1000;
    overflow: hidden;

    .lode_box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.1);
        z-index: 10;
    }

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

    .interval {
        display: flex;
        padding: 0 5%;
        width: 100%;
        height: 65px;
        background: url('../../../publi/img/wechet_back.png') no-repeat;
        background-size: 100% 100%;

        .txt {
            flex: 1;
            font-size: 18px;
            text-align: left;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 60px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        }

        .icon {
            flex: 0 0 46px;
            margin-top: 10px;
            width: 46px;
            height: 38px;
        }
    }

    .fillIn {
        padding: 0 5%;
        margin-bottom: 10%;

        .weixinNum {
            width: 100%;
            margin-top: 18px;
        }

        .title {
            display: block;
            margin-bottom: 21px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .txt {
            padding: 0;
            flex: 1;
        }

        .weixinNum {
            .title {
                line-height: 30px;
            }
        }
    }

    .material {
        padding: 0 5%;
        position: relative;
        margin-bottom: 5%;

       

        .txt {
            margin-bottom: 15px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .put {
            background: rgba(64, 114, 252, 1);
            border-radius: 3px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        }



        .just {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto 40px;
            background: rgba(238, 239, 242, 1);
            opacity: 1;



            .ivu-icon {
                position: absolute;
                top: 20%;
                left: 35%;
                font-size: 50px;
                color: #ccc;
            }

            .shade {
                position: absolute;
                top: 0;
                left: 0;
                width: 150px;
                height: 150px;
                z-index: 5;
                text-align: center;
                overflow: hidden;


                div {
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .3);
                    overflow: hidden;

                    .txt {
                        margin-top: 56px;
                    }

                    span {
                        display: block;
                        font-size: 13px;
                        font-family: PingFang SC;
                        font-weight: 300;
                        line-height: 2;
                        color: rgba(255, 255, 255, 1);
                        opacity: 1;
                    }

                }

            }
        }

        .shade {
            background: rgba(0, 0, 0, 0.1);
        }
    }

    .reminder {
        padding: 0 5%;

        p {
            margin-bottom: 9px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 300;
            line-height: 20px;
            color: rgba(109, 112, 120, 1);
            opacity: 1;
        }
    }
}
</style>