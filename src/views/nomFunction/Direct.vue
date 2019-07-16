<template>
    <div class="direct">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">转账</span>
        </div>
        <div class="content">
            <div class="import">
                <Form ref="userinfo" :model="userinfo" :rules="ruleInlineOne" inline v-if="show === 1 ? true : false">
                    <div class="phone">
                        <span class="txt">电 话</span>
                        <FormItem prop="phone">
                            <Input name="phone" type="text" v-model="userinfo.phone" placeholder="电话号码" style="width: 100%" />
                        </FormItem>
                    </div>
                    <div class="amount">
                        <span class="txt">数量</span>
                        <FormItem prop="amount">
                            <Input name="amount" type="text" v-model="userinfo.amount" placeholder="转账数量" style="width: 100%" />
                        </FormItem>
                    </div>
                </Form>
                <Form ref="passinfo" :model="passinfo" :rules="ruleInlineWen" inline v-if="show === 2 ? true : false">
                    <div class="pass">
                        <span class="txt">密 码</span>
                        <FormItem prop="pass">
                            <Input name="pass" type="password" v-model="passinfo.pass" placeholder="密码" style="width: 100%" />
                        </FormItem>
                    </div>
                </Form>
            </div>
            <div class="but">
                <Button type="primary" long @click="direct">确 定</Button>
            </div>
        </div>
    </div>
</template>
<script>
import UserInfo from './widget/UserInfo';
import { mapState, mapMutations } from 'vuex';
export default {
    created() {
        this.amountNum = Number(JSON.parse(this.$des.decrypt(this.$route.query.amount)))

    },
    mounted() {

    },
    data() {
        const amountValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('数量不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('数量必须数字'))
            } else if (value > this.amountNum) {
                callback(new Error('输入的数量以超出你的积分'));
            } else {
                callback()
            }
        };
        const phoneValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('电话号码不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('电话号码必须数字'))
            } else {
                callback();
            }
        };
        const pwdValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('密码不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('密码只能是数字'))
            } else {
                callback();
            }
        };
        return {
            uesrName: '',
            amountNum: 0,
            show: 1,
            userinfo: {
                phone: '',
                amount: ''
            },
            ruleInlineOne: {
                phone: [
                    { required: true, validator: phoneValidate, trigger: 'blur' },
                    { type: 'string', len: 11, message: '手机号为11位', trigger: 'blur' }
                ],
                amount: [
                    { required: true, validator: amountValidate, trigger: 'blur' },
                ]
            },
            passinfo: {
                pass: ''
            },
            ruleInlineWen: {
                pass: [
                    { required: true, validator: pwdValidate, trigger: 'blur' },
                    { type: 'string', len: 6, message: '密码只能6位', trigger: 'blur' },
                ]
            },


        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess']),
        exit() {
            this.getMess()
            this.byValue()
            this.$router.go(-1)
        },
        direct() {
            if (this.show === 1) {
                this.getMess()
                this.byValue()
                this.$refs['userinfo'].validate((valid) => {
                    if (valid) {
                        let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                        this.$api.get(`transfer_point/${this.userinfo.phone}/?user=${this.mess.user}&token=${token}`, {}, r => {

                            this.userinfo.user_name = r.msg.user_name
                            if (r.state === 200) {
                                let _this = this
                                this.$Modal.confirm({
                                    render: (h) => {
                                        var vm = this;
                                        return h(UserInfo, { props: { msg: this.userinfo, } })
                                    },
                                    onOk() {
                                        _this.show = 2
                                    }
                                })
                            } else if (r.state === 400) {
                                let _this = this
                                this.$Modal.confirm({
                                    title: r.msg,
                                    onOk() {

                                    }
                                })
                            }


                        })
                        // this.$router.push('/login');
                    } else {
                        this.$Message.error('Fail!');
                        this.refreshCode()
                    }
                })
            } else {
                this.getMess()
                this.byValue()
                this.$refs['passinfo'].validate((valid) => {
                    if (valid) {
                        let params = {}
                        params.trade_pwd = this.passinfo.pass
                        params.amount = this.userinfo.amount
                        params.cell = this.$des.encrypt(this.userinfo.phone)
                        let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                        this.$api.post(`transfer_point/?user=${this.mess.user}&token=${token}`, params, r => {
                            if (r.state === 200) {
                                let _this = this
                                this.$Modal.confirm({
                                    title: r.msg,
                                    onOk() {
                                      _this.$router.push({ path: '/personage' })
                                    }
                                })
                            } else if (r.state === 400) {
                                let _this = this
                                this.$Modal.confirm({
                                    title: r.msg,
                                    onOk() {
                                       _this.show = 1
                                    }
                                })
                            }
                        })
                        // this.$router.push('/login');



                    } else {
                        this.$Message.error('Fail!');
                        this.refreshCode()
                    }
                })
            }

        }
    },
    components: {
        UserInfo
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.direct {
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
            margin-top: 8px;
            font-size: 20px;
            cloor: rgba(59, 63, 75, 1);
            opacity: 1;
            border-radius: 2px;
        }

        .name {
            flex: 1;
            margin-right: 20px;
            
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }

    .content {
        padding: 0 5%;

        .import {
            padding: 12px 10px;
            margin-top: 25px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 10px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;

            .phone {
                margin-top: 10%;
            }

            .amount {
                margin-top: 5%;
            }

            .pass {
                margin-top: 10%;
            }

            div {
                display: flex;

                span {
                    flex: 0 0 100px;
                    width: 100px;
                    height: 20px;
                    text-align: center;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 32px;
                    color: rgba(59, 63, 75, 1);
                    opacity: 1;
                }
            }
        }

        .but {
            padding: 0 5%;
            margin-top: 10%;
            width: 100%;
            border-radius: 3px;

            .ivu-btn {
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 25px;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
                background: rgba(64, 114, 252, 1);
                border-radius: 3px;
                border: 1px solid rgba(64, 114, 252, 1);
            }
        }
    }
}
</style>