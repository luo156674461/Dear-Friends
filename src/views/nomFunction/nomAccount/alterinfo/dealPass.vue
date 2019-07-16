<template>
    <div class="deal_pass">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">交易密码修改</span>
        </div>
        <div class="content">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <div class="dealPassword">
                    <span class="dealpass">交易密码：</span>
                    <FormItem prop="dealpass">
                        <Input name="dealpass" type="password" v-model="formInline.dealpass" placeholder="请输入新交易密码" style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_captcha">
                    <span class="veridy">验证码：</span>
                    <FormItem prop="veridy" class="in_ver">
                        <Input name="veridy" type="text" v-model="formInline.veridy" placeholder="请输入验证码" style="width: 100%" @input="bright" />
                    </FormItem>
                    <div class="verify_box" @click="refreshCode">
                        <Sidentify :identifyCode="identifyCode"></Sidentify>
                    </div>
                </div>
                <div class="me_cell_ver">
                    <span class="cell_ver">短信验证</span>
                    <FormItem prop="cell_ver">
                        <Input name="cell_ver" type="text" v-model="formInline.cell_ver" placeholder="请输入短信验证码" style="width: 100%" />
                    </FormItem>
                    <Button type="primary" @click="gain" class="note" :disabled="disabled">{{cell_txt}}</Button>
                </div>
                <div class="push">
                    <Button type="primary" @click="alter('formInline')" class="sign" long>修改</Button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Sidentify from '../../../enroll/identify'
export default {
    created() {
        this.getMess()
        this.byValue()
        this.refreshCode()
        this.info = JSON.parse(this.$des.decrypt(this.$route.query.info))
    },
    mounted() {

    },
    updated() {

    },
    data() {
        const deaValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('交易密码不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('交易密码只能是数字'))
            } else {
                callback();
            }
        };
        const veridyValidate = (rule, value, callback) => {
            if (value != this.identifyCode) {
                callback(new Error('验证码不正确'))
            } else {
                callback()
            }
        };
        // const cellVerValidate = (rule, value, callback) => {
        //     if (value != this.formInline.cell_ver) {
        //         callback(new Error('短信验证码不正确'))
        //     } else {
        //         callback()
        //     }
        // };
        return {
            formInline: {
                dealpass: '',
                veridy: '',
                cell_ver: '',
            },
            info: '',
            cell_txt: '获取',
            disabled: true,
            ruleInline: {
                dealpass: [
                    { required: true, validator: deaValidate, trigger: 'blur' },
                    { type: 'string', len: 6, message: '密码只能6位', trigger: 'blur' },
                ],
                veridy: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { validator: veridyValidate, trigger: 'blur' }
                ],
                cell_ver: [
                    { required: true, message: '短信验证码不能为空', trigger: 'blur' },
                ]
            },
            identify: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            identifyCode: '',

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
        bright(v) {
            if (this.formInline.veridy === this.identifyCode) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        },
        gain() {
            if (this.formInline.veridy === this.identifyCode) {
                this.disabled = true
                let params = {}
                params.sms = 'reset_trade_pass'
                params.cell = this.$des.decrypt(this.info.cell)
                this.$api.post(`_sms`, params, r => {
                    if (r.state === 200) {
                        this.$Modal.warning({
                            title: r.msg,
                        })
                    } else if (r.state === 400) {
                        let _this = this
                        this.$Modal.warning({
                            title: r.msg,
                            onOk() {
                                clearInterval(tiem)
                                _this.cell_txt = '获取'
                                _this.disabled = false
                            }
                        })
                    }
                    this.cell_txt = 60
                    let tiem = setInterval(() => {
                        --this.cell_txt
                        if (this.cell_txt == 0) {
                            clearInterval(tiem)
                            this.cell_txt = '获取'
                            this.disabled = false
                        }
                    }, 1000)
                })
            }

        },
        alter(name) {
            this.byValue()
            this.getMess()
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = {}
                    params.trade_password = this.formInline.dealpass
                    params.cell = this.$des.decrypt(this.info.cell)
                    params.random_code = this.formInline.cell_ver
                    let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                    this.$api.post(`rs_trade_passwd/?user=${this.mess.user}&token=${token}`, params, r => {
                        let _this = this
                        if (r.state === 200) {
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {
                                    _this.$router.push({ path: '/personage' })
                                }
                            })
                        } else if (r.state === 400) {
                            this.$Modal.warning({
                                title: r.msg
                            })
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                    this.refreshCode()
                }
            })
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        refreshCode() {
            this.identifyCode = '';
            this.makeCode(this.identifyCode, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identify[this.randomNum(0, this.identify.length)]
            }
        },
        randomChar(l) {
            var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
            var tmp = "";
            var timestamp = new Date().getTime();
            for (var i = 0; i < l; i++) {
                tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
            }
            return timestamp + tmp;
        }
    },
    components: {
        Sidentify
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.deal_pass {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    transition: all 0.5s;
    z-index: 1000;
    overflow: hidden;

    .head {
        display: flex;
        padding: 0 3%;
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        opacity: 1;

        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 3.5%;
            font-size: 20px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
            border-radius: 2px;
        }

        .name {
            flex: 1;
            margin-right: 20px;
            text-align: center;
            line-height: 2.6;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }

    .content {
        padding: 0 5%;
        margin-top: 10%;

        div {
            display: flex;

            span {
                flex: 0 0 100px;
                width: 100px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 1.5;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }

            .verify_box {
                margin-top: 1%;
                height: 30px;
            }
        }

        .note {
            /*flex: 0 0 40px;*/
            height: 30px;
        }

        .push {
            margin-top: 20%;
        }
    }
}
</style>