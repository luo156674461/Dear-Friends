<template>
    <div class="forget">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
        </div>
        <div class="content">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <div class="me_cell">
                    <span class="cell">手机号</span>
                    <FormItem prop="cell">
                        <Input name="cell" type="text" v-model="formInline.cell" placeholder="请输入手机号" style="width: 100%" @input="bright" />
                    </FormItem>
                </div>
                <div class="me_pass">
                    <span class="pass">密&nbsp&nbsp&nbsp码：</span>
                    <FormItem prop="pass">
                        <Input name="pass" type="password" v-model="formInline.pass" placeholder="请输入新密码" style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_affpass">
                    <span class="affpass">确认密码：</span>
                    <FormItem prop="affpass">
                        <Input name="affpass" type="password" v-model="formInline.affpass" placeholder="请输入再确认密码" style="width: 100%" />
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
                    <Button type="primary" @click.stop="gaing" class="note" :disabled="disabled">{{cell_txt}}</Button>
                </div>
                <div class="push">
                    <Button type="primary" @click="alter('formInline')" class="sign" long>修改</Button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Sidentify from '../enroll/identify'
export default {
    created() {
        this.refreshCode()
        // let time = this.$des.encrypt(new Date().getTime())
        // this.$api.get(`user_info/?token=${time}`, {}, r => {
        //     this.userslist = r
        // })
    },
    mounted() {},
    updated() {
      
    },
    data() {
        const pwdValidate = (rule, value, callback) => {
            this.$refs.formInline.validateField('affpass');
            if (value == '') {
                callback(new Error('密码不能为空'));
            } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value)) {
                callback(new Error('密码要字母开头'))
            } else {
                callback();
            }
        };
        const pwdCheckValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('密码不能为空'));
            } else if (this.formInline.pass != value) {
                callback(new Error('密码不一致'));
            } else {
                callback()
            }
        };
        const veridyValidate = (rule, value, callback) => {
            if (value != this.identifyCode) {
                callback(new Error('验证码不正确'))
            } else {
                callback()
            }
        };
        return {
            formInline: {
                cell: '',
                pass: '',
                affpass: '',
                veridy: '',
                cell_ver: ''
            },
            info: '',
            cell_txt: '获取',
            disabled: true,
            ruleInline: {
                cell: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { type: 'string', len: 11, message: '手机号为11位', trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: pwdValidate, trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' },
                    { type: 'string', max: 16, message: '密码不能大于16位', trigger: 'blur' },
                ],
                affpass: [
                    { required: true, validator: pwdCheckValidate, trigger: 'blur' }

                ],
                veridy: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { validator: veridyValidate, trigger: 'blur' }
                ],
                cell_ver: [
                    { required: true, message: '短信验证码不能为空', trigger: 'blur' },
                    // { validator: cellVerValidate, trigger: 'blur' }
                ]
            },
            identify: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            identifyCode: '',
            isCellInList: 0
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'jumpReg', 'byValue']),
        exit() {
            this.jumpReg()
        },
        bright(v) {
            if (this.formInline.veridy === this.identifyCode && this.formInline.cell.length !== 0 && this.formInline.pass.length !== 0) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        },
        gaing() {
            if (this.formInline.veridy === this.identifyCode && this.formInline.cell.length !== 0) {
                this.disabled = false
                let params = {}
                params.sms = 'reset_pass'
                params.cell = this.formInline.cell
                this.$api.gaing(`_sms`, params, r => {
                    this.disabled = true
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
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = {}
                    params.password = this.$des.encrypt(this.formInline.pass)
                    params.cell = this.formInline.cell
                    params.random_code = this.formInline.cell_ver
                    this.$api.post(`unregister_reset_passwd/`, params, r => {
                        console.log(r)
                        let _this = this
                        if (r.state === 200) {
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {
                                    _this.exit()
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
<style rel="stylesheet/scss" lang="scss">
.forget {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #fff;

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
            height: 30px;
        }

        .push {
            margin-top: 20%;
        }
    }
}
</style>