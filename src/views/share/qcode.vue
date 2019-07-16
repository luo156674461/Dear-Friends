<template>
    <div class="qcode" ref="qco">
        <div>
            <div class="logo">
                <div class="img"><img src="../../publi/img/logo.png" width="100%" height="100%"></div>
                    <p>注册</p>
                </div>
                <div class="meter">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <div class="share_user">
                            <span class="share_user">推荐人</span>
                            <FormItem>
                                <Input name="share_user" type="text" v-model="share_user" readonly style="width: 100%" />
                            </FormItem>
                        </div>
                        <div class="me_user">
                            <span class="user">用户名</span>
                            <FormItem prop="user">
                                <Input name="user" type="text" v-model="formInline.user" placeholder="请输入用户名" style="width: 100%" />
                            </FormItem>
                        </div>
                        <div class="me_pass">
                            <span class="pass">登录密码</span>
                            <FormItem prop="pass">
                                <Input name="pass" type="password" v-model="formInline.pass" placeholder="请输入密码" style="width: 100%" />
                            </FormItem>
                        </div>
                        <div class="me_affpass">
                            <span class="affpass">确认密码</span>
                            <FormItem prop="affpass">
                                <Input name="affpass" type="password" v-model="formInline.affpass" placeholder="请输入密码" style="width: 100%" />
                            </FormItem>
                        </div>
                        <div class="dealPassword">
                            <span class="dealpass">交易密码</span>
                            <FormItem prop="dealpass">
                                <Input name="dealpass" type="password" v-model="formInline.dealpass" placeholder="请输入交易密码" style="width: 100%" />
                            </FormItem>
                        </div>
                        <div class="me_cell">
                            <span class="cell">手机号</span>
                            <FormItem prop="cell">
                                <Input name="cell" type="text" v-model="formInline.cell" placeholder="请输入手机号" style="width: 100%" @input="bright" />
                            </FormItem>
                        </div>
                        <!-- <div class="me_identity"> 
                    <span class="identity">身份证：</span>
                    <FormItem prop="identity">
                        <Input name="identity" type="text" v-model="formInline.identity" placeholder="请输入身份证号" style="width: 100%" />
                    </FormItem>
                </div> -->
                        <div class="me_captcha">
                            <span class="veridy">验证码</span>
                            <FormItem prop="veridy" class="in_ver">
                                <Input name="veridy" type="text" v-model="formInline.veridy" placeholder="请输入验证码" style="width: 90%" @input="bright" />
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
                    </Form>
                </div>
                <div class="push">
                    <Button type="primary" @click="enroll('formInline')" class="sign">注册</Button>
                </div>
                <a href=""></a>
            </div>
        </div>
</template>
<script>
import Sidentify from '../enroll/identify'
import BScroll from 'better-scroll';
import { mapMutations, mapState } from 'vuex'
export default {
    created() {
        this.refreshCode()
        this.$nextTick(() => {
            this.share_user = this.$des.decrypt(this.$route.query.token.replace(/ /g, '+')).slice(8)
            if (this.share_user) {
                this.tmp_token = this.$des.encrypt(this.randomChar(19));
                this.$api.get('set_register_cache/?token=' + this.tmp_token, {}, r => {})
            }
            let time = this.$des.encrypt(new Date().getTime())
            this.$api.get(`user_info/?token=${time}`, {}, r => {
                this.userslist = r
                // console.log(this.userslist)
            })
        })
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.qcoScroll) {
                this.qcoScroll = new BScroll(this.$refs.qco, {
                    click: true,
                    scrollY: true,
                })
            } else {
                this.qcoScroll.refresh()
            }

        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.qcoScroll) {
                this.qcoScroll = new BScroll(this.$refs.qco, {
                    click: true,
                    scrollY: true,
                })
            } else {
                this.qcoScroll.refresh()
            }

        })
    },
    data() {
        const userValidate = (rule, value, callback) => {
            var isInList = this.getuserInfoFlag();
            if (isInList == 1) {
                callback(new Error('用户名已存在'))
            } else if (value.lenght > 10) {
                callback(new Error('用户名不能大于10位'))
            } else {
                callback();
            }
        };
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
        const deaValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('交易密码不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('交易密码只能是数字'))
            } else {
                callback();
            }
        };
        const cellValidate = (rule, value, callback) => {
            let isCellInList = this.getcellInfoFlag();
            if (isCellInList == 1) {
                callback(new Error('手机号码已存在'))
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
                user: '',
                pass: '',
                affpass: '',
                dealpass: '',
                cell: '',
                identity: '',
                veridy: '',
                cell_ver: ''
            },
            cell_txt: '获取',
            disabled: true,
            share_user: '',
            tmp_token: '',
            userslist: '',
            ruleInline: {
                user: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { validator: userValidate, trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: pwdValidate, trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' },
                    { type: 'string', max: 16, message: '密码不能大于16位', trigger: 'blur' },
                ],
                affpass: [
                    { required: true, validator: pwdCheckValidate, trigger: 'blur' }

                ],
                dealpass: [
                    { required: true, validator: deaValidate, trigger: 'blur' },
                    { type: 'string', len: 6, message: '密码只能6位', trigger: 'blur' },
                ],
                cell: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { type: 'string', len: 11, message: '手机号为11位', trigger: 'blur' },
                    { validator: cellValidate, trigger: 'blur' }
                ],
                // identity: [
                //     { required: true, message: '身份证不能为空', trigger: 'blur' },
                //     { type: 'string', len: 18, message: '身份证为18位', trigger: 'blur' }
                // ],
                veridy: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { validator: veridyValidate, trigger: 'blur' }
                ],
                cell_ver: [
                    { required: true, message: '短信验证码不能为空', trigger: 'blur' },
                ]
            },
            identify: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            identifyCode: ''
        }
    },
    watch: {},
    computed: {
        ...mapState(['mess', 'arrNum', ]),

    },
    methods: {
        ...mapMutations(['jumpReg']),
        bright() {
            let isCellInList = this.getcellInfoFlag();
            if (this.formInline.veridy === this.identifyCode && isCellInList !== 1 && this.formInline.cell !== '') {
                this.disabled = false
            } else {
                this.disabled = true
            }
        },
        gain() {
            let isCellInList = this.getcellInfoFlag();
            if (this.formInline.veridy === this.identifyCode && isCellInList !== 1 && this.formInline.cell !== '') {
                this.disabled = true
                let params = {}
                params.sms = 'register'
                params.cell = this.formInline.cell
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
                        this.disabled = true
                            --this.cell_txt

                        if (this.cell_txt === 0) {
                            clearInterval(tiem)
                            this.cell_txt = '获取'
                            this.disabled = false
                        }
                    }, 1000)
                })
            }
        },
        enroll(name) {
            // console.log(this.regVal)
            let params = {};
            params.password = this.$des.encrypt(this.formInline.pass);
            params.cell = this.$des.encrypt(this.formInline.cell);
            params.user = this.formInline.user;
            params.trade_pwd = this.formInline.dealpass
            params.random_code = this.formInline.cell_ver
            params.belong = this.share_user;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.post(`share_register/?token=${this.tmp_token}`, params, r => {
                        // this.postPass()
                        if (r.state === 200) {
                            let _this = this
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {
                                    _this.$router.push('/login');
                                }
                            })
                        } else if (r.state === 400) {
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {}
                            })
                        }

                    })

                } else {
                    this.$Message.error('Fail!');
                    this.refreshCode()
                }
            })
            // this.jumpReg()

        },
        // postPass() {
        //     let params = {}
        //     params.trade_password = 
        //     let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
        //     this.$api.post(`set_trade_passwd/?token=${tmp_token}&user=${this.mess.user}`, params, r => {})
        // },
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
        getuserInfoFlag() {
            var flag = 0;
            for (var i = 0; i < this.userslist.length; i++) {
                if (this.formInline.user.toLowerCase() == this.userslist[i].user.toLowerCase()) {
                    flag = 1;
                }
            }
            return flag
        },
        getcellInfoFlag() {
            let cellflag = 0;
            for (var i = 0; i < this.userslist.length; i++) {
                let cell = this.$des.decrypt(this.userslist[i].u_cell)
                if (this.formInline.cell == cell) {
                    cellflag = 1;
                }
            }
            return cellflag
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
<style scoped>
.qcode {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    opacity: 1;
    z-index: 1000;
}

.logo {
    overflow: hidden;
    box-shadow: border-box;
    margin-bottom: 4%;
}

.logo .img {
    margin: 6% auto;
    width: 26.67%;
    height: 100px;
    box-shadow: border-box;
}

.logo p {

    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1;
    color: rgba(59, 63, 75, 1);
    opacity: 1
}

.meter {
    padding: 0 15%;


}

.meter div {
    display: flex;
    text-align: center;
}

.meter div span {

    flex: 0 0 70px;
    /*transform: translateY(6px);*/
    width: 100px;
    height: 22px;
    font-size: 16px;
    text-align: left;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(59, 63, 75, 1);
    opacity: 1;
}



.meter .ivu-form-item {
    padding: 0 !important;
    flex: 1;
    /*background: rgba(190, 193, 204, 0.3);
    border: 1px solid rgba(143, 147, 159, 0.2980392156862745);*/
    opacity: 1;
    border-radius: 3px;
    margin-bottom: 10%;
}

.meter .ivu-form-item .ivu-form-item-error-tip {
    margin-left: 10%;
}

.meter .note {
    /*flex: 0 0 40px;*/
    height: 30px;
}

.me_captcha {
    box-shadow: border-box;
    vertical-align: top;
}

.me_captcha .verify_box {
    position: absolute;
    bottom: 17%;
    right: -5%;
    display: inline-block;
    vertical-align: top;
    width: 128px;
    height: 45px;
}

.me_captcha .in_ver {
    /*transform: translateX(-7px);*/
    padding-right: 20px;
    margin-right: 50px;
}

.me_captcha .veridy {
    display: inline-block;
    /*transform: translate(-6px, 6px);*/
}

.push {
    margin: 5% 25%;
    display: flex;
    background: rgba(64, 114, 252, 1);
    opacity: 1;
    border-radius: 125px;
}

.push .sign {
    flex: 1;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 125px;
}

.push .ret {
    flex: 1
}
</style>