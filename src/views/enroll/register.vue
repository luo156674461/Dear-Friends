<template>
    <div class="box">
        <div class="shade"></div>
        <div class="meter">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <div class="me_user">
                    <span class="user">用户名：</span>
                    <FormItem prop="user">
                        <Input name="user" type="text" v-model="formInline.user" placeholder="请输入用户名" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_pass">
                    <span class="pass">密&nbsp&nbsp&nbsp码：</span>
                    <FormItem prop="pass">
                        <Input name="pass" type="password" v-model="formInline.pass" placeholder="请输入密码" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_affpass">
                    <span class="affpass">确认密码：</span>
                    <FormItem prop="affpass">
                        <Input name="affpass" type="password" v-model="formInline.affpass" placeholder="请输入密码" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_cell">
                    <span class="cell">手机号：</span>
                    <FormItem prop="cell">
                        <Input name="cell" type="text" v-model="formInline.cell" placeholder="请输入手机号" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <!-- <div class="me_identity">
                    <span class="identity">身份证：</span>
                    <FormItem prop="identity">
                        <Input name="identity" type="text" v-model="formInline.identity" placeholder="请输入身份证号" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_email">
                    <span class="identity">邮箱：</span>
                    <FormItem prop="me_email">
                        <Input name="me_email" type="text" v-model="formInline.email" placeholder="请输入邮箱" clearable style="width: 100%" />
                    </FormItem>
                </div>
                <div class="me_qq">
                    <span class="identity">QQ：</span>
                    <FormItem prop="me_qq">
                        <Input name="me_qq" type="text" v-model="formInline.qq" placeholder="请输入QQ" clearable style="width: 100%" />
                    </FormItem>
                </div> -->
                <div class="me_captcha">
                    <span class="veridy">验证码：</span>
                    <FormItem prop="veridy" class="in_ver">
                        <Input name="veridy" type="text" v-model="formInline.veridy" placeholder="请输入验证码" clearable style="width: 100px" />
                    </FormItem>
                    <div class="verify_box" @click="refreshCode">
                        <Sidentify :identifyCode="identifyCode"></Sidentify>
                    </div>
                </div>
                <div class="push">
                    <Button type="success" @click="enroll('formInline')" class="sign">注册</Button>
                    <Button type="error" @click="backtrack" class="ret">返回</Button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import Sidentify from './identify'  // 验证码页面
import { mapMutations } from 'vuex'
export default {
    created() {
        this.refreshCode()
    },
    props: ['regVal', 'userslist'],
    data() {
        const userValidate = (rule, value, callback) => {
            var isInList = this.getuserInfoFlag();
             // 判断用户名是否相同
            if (isInList == 1) {
                callback(new Error('用户名已使用'))
            } else { 
                callback();
            }
        };
        const pwdValidate = (rule, value, callback) => {
            // 密码的判断
            if (value == '') {
                 // 密码是否为空
                callback(new Error('密码不能为空'));
            } else if (value.lenght < 6) {
                // 密码位数
                callback(new Error('密码不能少于6位'));
            } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value)) {
                // 密码大小写
                callback(new Error('Passwords should be numeric and alphabetic'))
            } else {
                callback();
                this.$refs.formInline.validateField('affpass');
            }
        };
        const pwdCheckValidate = (rule, value, callback) => {
            // 重新输入密码的判断
            if (value == '') {
                 // 密码是否为空
                callback(new Error('密码不能为空'));
            } else if (this.formInline.pass != value) {
                //密码与重新输入密码是否相同
                callback(new Error('The new password and the confirmation password should be the same'));
            } else if (value.lenght < 6) {
                // 密码位数
                callback(new Error('The password length cannot be less than 6 bits'));
            } else {
                callback()
            }
        };
        const veridyValidate = (rule, value, callback) => {
            //验证码判断
            if (value != this.identifyCode) {
                //验证码是否输入正确
                callback(new Error('Verification code error'))
            } else if (value == '') {
                //验证码是否为空
                callback(new Error('Please fill in the user veridy'))
            } else {
                callback()
            }
        };
        return {
            formInline: {
                user: '', // 用户名
                pass: '', // 密码
                affpass: '', // 重新输入密码
                cell: '', // 手机号
                identity: '', //身份证号
                veridy: '', //验证码
                email: '', // 邮箱
                qq: '' // qq
            },
            ruleInline: {
                user: [ // 用户名
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' },
                    { validator: userValidate, trigger:'blur'}
                ],
                pass: [ // 密码
                    { required: true, validator: pwdValidate, trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ],
                affpass: [ // 重新输入密码
                    { required: true, validator: pwdCheckValidate, trigger: 'blur' }

                ],
                cell: [ // 手机号
                    { required: true, message: 'Please fill in the user cell', trigger: 'blur' },
                    { type: 'string', len: 11, message: 'The number length cannot be less than 11 bits', trigger: 'blur' }
                ],
                identity: [ //身份证号
                    { required: true, message: 'Please fill in the user identity', trigger: 'blur' },
                    { type: 'string', len: 18, message: 'The identity length cannot be less than 18 bits', trigger: 'blur' }
                ],
                veridy: [  //验证码
                    { required: true, validator: veridyValidate, trigger: 'blur' }
                ]
            },
            identify: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 验证码的随机数
            identifyCode: '' // 密码
        }
    },
    methods: {
        ...mapMutations(['jumpReg']),
        enroll(name) {
            // console.log(this.regVal)
            var params = {};
            params.password = this.$des.encrypt(this.formInline.pass);
            params.cell = this.$des.encrypt(this.formInline.cell);
            params.user = this.formInline.user;
            params.idcard = this.$des.encrypt(this.formInline.identity);
            // params.email = this.formInline.email
            // params.qq = this.formInline.qq
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.post(`register/?token=${this.regVal}`, params, r => {
                        console.log(r)
                    })
                    this.jumpReg()
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                    this.refreshCode()
                }
            })
            // this.jumpReg()
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 验证码刷新
        refreshCode() {
            this.identifyCode = '';
            this.makeCode(this.identifyCode, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identify[this.randomNum(0, this.identify.length)]
            }
        },
        backtrack() {
            this.jumpReg()
        },
        //用户名是否相同
        getuserInfoFlag() {
            var flag = 0;
            for (var i = 0; i < this.userslist.length; i++) {
                if (this.formInline.user == this.userslist[i].user) {
                    flag = 1;
                }
            }
            return flag
        }
    },
    components: {
        Sidentify
    }
}
</script>
<style scoped>
.box {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 1000;
}

.shade {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(7, 17, 27, .2);
    z-index: 5
}

.meter {
    flex: 1;
    position: absolute;
    top: 20%;
    left: 12%;
    border-radius: 20px;
    padding: 5%;
    height: 56%;
    background: #fff;
    z-index: 10;
}

.meter div {
    padding: 0 3px;
    margin-bottom: 13px;
    text-align: center;
}

.meter div span {
    display: inline-block;
    transform: translateY(6px);
    width: 60px;
    font-weight: 700;
}

.me_captcha {
    box-shadow: border-box;
    vertical-align: top;
}

.me_captcha .verify_box {
    position: absolute;
    bottom: 7%;
    right: 3%;
    display: inline-block;
    vertical-align: top;
    width: 30%;
    height: 8%;
}

.me_captcha .in_ver {
    transform: translateX(-7px);
    padding-right: 20px;
    margin-right: 50px;
}

.me_captcha .veridy {
    display: inline-block;
    transform: translate(-6px, 6px);
}

.push {
    display: flex;
    margin-top: 10px
}

.push .sign {
    flex: 1
}

.push .ret {
    flex: 1
}
</style>