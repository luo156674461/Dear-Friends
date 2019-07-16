<template>
    <div class="dankcard" ref="bank">
        <div>
            <div class="lode_box" v-if="loadShow">
                <Lode></Lode>
            </div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">银行卡</span>
            </div>
            <div class="interval">
                <span class="txt">银行卡信息填写</span>
                <div class="icon"><img src="../../../publi/img/bank_icon.png" width="100%" height="100%"></div>
                </div>
                <div class="fillIn">
                    <p> 银行卡信息填写 </p>
                    <div class="category" >
                        <span class="title">所属银行</span>
                        <div class="in_ver">
                            <Input v-model="message" placeholder="请选择所属银行" style="width: 100%" disabled />
                        </div>
                        <Icon type="ios-arrow-down" @click="ShouPup"/>
                    </div>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <div class="userline">
                            <span class="title">开户行：</span>
                            <FormItem prop="line" class="in_ver">
                                <Input name="line" v-model="formInline.line" placeholder="请输入支行名" style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div>
                        <div class="username">
                            <span class="title">开户人：</span>
                            <FormItem prop="name" class="in_ver">
                                <Input name="name" v-model="formInline.name" placeholder="请输入持卡人姓名" style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div>
                        <div class="usermark">
                            <span class="title">卡号：</span>
                            <FormItem prop="mark" class="in_ver">
                                <Input name="mark" v-model="formInline.mark" placeholder="请输入卡号" style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div>
                       <!--  <div class="userpass">
                            <span class="title">交易密码：</span>
                            <FormItem prop="pass" class="in_ver">
                                <Input name="pass" v-model="formInline.pass" placeholder="请输入交易密码" style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div> -->
                        <!--                         <div class="area">
                            <span class="title">所属区域：</span>
                            <span class="txt">{{area}}</span>
                        </div> -->
                        <!--  <div class="deanname">
                            <span class="title">银行名称：</span>
                            <span class="txt">{{deanname}}</span>
                        </div> -->
                        <!-- <div class="deannumber">
                            <span class="title">银行卡号：</span>
                            <FormItem prop="name" class="in_ver">
                                <Input name="name" v-model="formInline.name" placeholder="Enter something..." style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div> -->
                        <!--  <div class="deannumber">
                            <span class="title">交易密码：</span>
                            <FormItem prop="name" class="in_ver">
                                <Input name="name" type="password" v-model="formInline.name" placeholder="Enter something..." style="width: 100%" class="txt" clearable />
                            </FormItem>
                        </div> -->
                        <!-- <div class="province">
                            <span class="title">省/州/地区：</span>
                            <Input v-model="province" placeholder="Enter something..." style="width: 300px" class="txt" />
                        </div> -->
                        <!-- <div class="city">
                            <span class="title">城/市/地区：</span>
                            <Input v-model="city" placeholder="Enter something..." style="width: 300px" class="txt" />
                        </div> -->
                        <!-- <div class="branchname">
                            <span class="title">分/支行名称：</span>
                            <FormItem prop="branchname" class="in_ver">
                                <Input name="branchname" v-model="formInline.branchname" placeholder="Enter something..." style="width: 195px" class="txt" clearable />
                            </FormItem>
                        </div> -->
                    </Form>
                    <van-popup v-model="show" position="bottom" :overlay="true">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
                    </van-popup>
                </div>
                <!-- <p class="text">银行信息上传</p> -->
                <!-- <transition name="discern">
                    <div class="material" v-if="flag">
                        <Button shape="circle" type="primary" @click="manual" v-if="show">手动</Button>
                        <div class="just">
                            <div class="shade" v-if="justshow">
                                <div>
                                    <span class="txt">银行正面</span>
                                    <span class="title">(已验证)</span>
                                </div>
                            </div>
                            <Upload :action="justApi" :defaultList="defaultListJust"></Upload>
                        </div>
                        <div class="but">
                            <Button type="primary" ghost long @click="submit" v-if="info.payment_method.method_bankcard  === '1' ? false : true" class="put">提交</Button>
                        </div>
                    </div>
                </transition> -->
                <!-- <transition name="input">
                    <div class="material" v-if="!flag" @click="out">
                        <div class="just">
                            <div class="shade" v-if="justshow">
                                <div>
                                    <span class="txt">银行正面</span>
                                    <span class="title">(已验证)</span>
                                </div>
                            </div>
                            <Upload_h :action="justApi_h" :defaultList="defaultListJust" ref="chartView"></Upload_h>
                        </div>
                    </div>
                </transition> -->
                <div class="but">
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
import Affirm from '../widget/Affirm';
import BScroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex';
import Bus from '../../../Bus.js'
import Upload from '../widget/Upload';
import Upload_h from '../widget/Upload_h';
import Lode from '../widget/lode';
import alter from '../../nomFunction/widget/alter';
export default {
    created() {
        this.getMess()
        this.byValue()
        this.info = JSON.parse(this.$des.decrypt(this.$route.query.info))
        this.getmass()
        this.deanname = JSON.parse(sessionStorage.getItem('bank'))
        Bus.$on('cancelinfo', content => {
            this.trade_password = content.pass
        })
    },
    mounted() {
        // Bus.$on('bankcard', content => {
        //     if (content.bank) {
        //         this.deanname = content.bank
        //         this.number = content.number
        //         this.img = content.img
        //     }

        // })
        // Bus.$on('handbankcard', content => {
        //     this.deanname = content.bank
        //     this.number = content.number
        // })
        // this.$nextTick(() => {
        //     if (!this.bankScroll) {
        //         this.bankScroll = new BScroll(this.$refs.bank, {
        //             // click: true,
        //             scrollY: true,
        //             tap: "exit,submit,manual,out"
        //         })
        //     } else {
        //         this.bankScroll.refresh()
        //     }

        // })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.bankScroll) {
                // this.perScroll.destroy()
                this.bankScroll = new BScroll(this.$refs.bank, {
                    // click: true,
                    scrollY: true,
                    tap: "exit,submit,ShouPup,onCancel,onConfirm,onChange,submit_ago"
                })
            } else {
                this.bankScroll.refresh()
            }

        })
    },
    data() {
        const userValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('卡号不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('卡号只能是数字'))
            } else {
                callback();
            }
        };
        // const pwdValidate = (rule, value, callback) => {
        //     if (value == '') {
        //         callback(new Error('密码不能为空'));
        //     } else if (!/^[1-9]\d*$/.test(value)) {
        //         callback(new Error('密码只能是数字'))
        //     } else {
        //         callback();
        //     }
        // };
        return {
            formInline: {
                line: '',
                name: '',
                mark: '',
                // pass: '',
            },
            trade_password: '',
            modal1: false,
            closable: false,
            hint_txt: '',
            win: 0,
            ruleInline: {
                line: [
                    { required: true, message: '卡行名不能为空', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                mark: [
                    { required: true, validator: userValidate, trigger: 'blur' }
                ],
                // pass: [
                //     { required: true, validator: pwdValidate, trigger: 'blur' },
                // ],
            },
            message: '中国银行',
            columns: ['中国银行', '招商银行', '中国工商银行', '中国农业银行', '中国建设银行', '平安银行', '交通银行', '中信银行', '兴业银行', '关大银行', '民生银行'],
            show: false,
            info: {},
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
            this.getMess()
            let params = {}
            params.bank_img = this.message
            params.bank = this.formInline.line
            params.name = this.formInline.name
            params.number = this.formInline.mark
            // params.bank_img = this.formInline.pass
            this.loadopen()
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`flush_bankcard/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                let _this = this
                if (r.state == 200) {
                    this.loadcut()
                    // this.postPass()
                    this.$Modal.success({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ name: '个人信息' })
                        }
                    })


                }
            })
        },
        ShouPup() {
            this.show = true
        },
        onCancel() {
            this.show = false
        },
        onConfirm(picker, value, index) {
            this.show = false
            // this.message = value
        },
        onChange(picker, value, index) {
            this.message = value
        },
        // manual() {
        //     // let _this = this
        //     this.out()
        //     let msg = {
        //         mark: 1
        //     }
        //     let _this = this
        //     this.$Modal.confirm({
        //         title: '',
        //         render: (h) => {
        //             var vm = this;
        //             return h(Affirm, { props: { msg: msg } })
        //         },
        //         onOk() {}

        //     })
        // },
        // postPass() {
        //     this.getMess()
        //     this.byValue()
        //     let params = {}
        //     params.trade_password = this.formInline.pass
        //     let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
        //     this.$api.post(`set_trade_passwd/?token=${tmp_token}&user=${this.mess.user}`, params, r => {})
        // },
        getmass() {
            if (this.info.payment_method.method_bankcard === '1') {
                this.show = false
                this.loadopen()
                let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                this.justshow = true
                this.$api.get(`bankcard_info/?token=${tmp_token}&user=${this.mess.user}`, {}, r => {
                    if (r.state == 200) {
                        this.loadcut()
                        this.message = r.msg[0].bank_img
                        this.formInline.line = r.msg[0].bank
                        this.formInline.name = r.msg[0].name
                        this.formInline.mark = r.msg[0].number
                        // this.number = r.msg[0].number
                        // this.province = r.msg[0].provience
                        // this.city = r.msg[0].city
                        // this.defaultListJust.push({ url: r.msg[0].bank_img })
                        this.$refs.chartView
                    }
                })
            } else {
                this.justshow = false
                this.loadcut()
            }
        }
    },
    components: {
        Upload,
        Lode,
        Affirm,
        Upload_h,
        alter
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.dankcard {
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

    &.discern-enter-active {
        transition: all 0.5s;
    }

    &.discern-enter {
        transform: translateX(50%);
    }

    &.discern-leave-active {
        transition: all 0.5s;
    }

    &.discern-leave {
        transform: translateX(50%)
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
            cloor: rgba(59, 63, 75, 1);
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
        background: url('../../../publi/img/bank_back.png') no-repeat;
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
        position: relative;
        padding: 0 5%;
        margin: 8% 0 10% 0px;

        p {
            margin-bottom: 15px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        div {
            display: flex;
            padding: 0;
            margin-bottom: 3%
        }

        .title {
            flex: 0 0 100px;
            width: 100px;
            height: 20px;
            text-align: left;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 2;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .txt {
            padding: 0;
            flex: 1;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 2;
            color: rgba(59, 63, 75, 1);
            opacity: 1;

        }

        .category {
            .ivu-icon {
                flex: 0 0 30px;
                margin-left: 5%;
                font-size: 30px;
                font-weight: 400;
                line-height: 1;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
                border-radius: 2px;
            }
        }

    }

    .text {
        margin-bottom: 5%;
        padding: 0 12px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(59, 63, 75, 1);
        opacity: 1;
    }

    // .material {
    //     padding: 0 5%;
    //     position: relative;
    //     margin-bottom: 10%;



    //     .ivu-btn {
    //         background: rgba(64, 114, 252, 1);
    //         opacity: 1;
    //         border-radius: 3px;
    //         font-size: 18px;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         line-height: 25px;
    //         color: rgba(255, 255, 255, 1);
    //         opacity: 1;
    //     }

    //     .just {
    //         position: relative;
    //         width: 150px;
    //         height: 150px;
    //         margin: 0 auto 40px;
    //         background: rgba(238, 239, 242, 1);
    //         opacity: 1;
    //         overflow: hidden;

    //         .ivu-icon {
    //             position: absolute;
    //             top: 20%;
    //             left: 35%;
    //             font-size: 50px;
    //             color: #ccc;
    //         }

    //         .shade {
    //             position: absolute;
    //             top: 0;
    //             left: 0;
    //             width: 150px;
    //             height: 150px;
    //             z-index: 5;
    //             text-align: center;
    //             overflow: hidden;


    //             div {
    //                 box-sizing: border-box;
    //                 width: 100%;
    //                 height: 100%;
    //                 background: rgba(0, 0, 0, .3);
    //                 overflow: hidden;

    //                 .txt {
    //                     margin-top: 56px;
    //                 }

    //                 span {
    //                     display: block;
    //                     font-size: 13px;
    //                     font-family: PingFang SC;
    //                     font-weight: 300;
    //                     line-height: 2;
    //                     color: rgba(255, 255, 255, 1);
    //                     opacity: 1;
    //                 }

    //             }

    //         }
    //     }

    //     .shade {
    //         background: rgba(0, 0, 0, 0.1);
    //     }
    // }

    .but {
        padding: 0 5%;
        margin-bottom: 5%;

        .ivu-btn {

            background: rgba(64, 114, 252, 1);
            opacity: 1;
            border-radius: 3px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
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