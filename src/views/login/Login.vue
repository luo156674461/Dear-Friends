<template>
    <div class="login" ref="login">
        <div>
            <div class="logo_box">
                <div class="logo"><img src="../../publi/img/logo.png" width="100%" height="100%"></div>
                    <div class="logo_txt">
                        <p class="h_txt">ONE TWO SHARE</p>
                        <p class="txt">这是一个次时代的生态循环共享社区</p>
                    </div>
                </div>
                <div class="from">
                    <el-form :model="ps_data" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
                        <el-form-item>
                        </el-form-item>
                        <el-form-item prop="cell">
                            <!-- <span class="icon"><img src="../../publi/img/user_icon.png" width="100%" height="100%"></span> -->
                            <span class="user_txt">用户</span>
                            <el-input type="text" v-model="ps_data.cell" auto-complete="off" placeholder="请输入电话号码"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <!--  <span class="icon_pass"><img src="../../publi/img/pass_icon.png" width="100%" height="100%"></span> -->
                            <span class="pass_txt">密码</span>
                            <el-input :type="type" v-model="ps_data.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
                            <span class="eye_icon" @click="eye" v-if="eyeShow ? true : false"><img src="../../publi/img/eye_display.png" width="100%" height="100%"></span>
                            <span class="eye_icon" @click="eye" v-if="!eyeShow ? true : false"><img src="../../publi/img/eye_hidden.png" width="100%" height="100%"></span>
                        </el-form-item>
                        <span class="find" @click="forget">忘记密码?</span>
                        <el-form-item style="width:100%;">
                            <!--               <el-button type="success" style="width:100%;" @click.native.prevent="lasrRegister" :loading="logining">用户注册</el-button> -->
                        </el-form-item>
                        <el-form-item style="width:100%;">
                            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                        </el-form-item>
                        <div class="hint" v-if="hintShow" @click="popup">
                            <Alert type="error">{{report}}</Alert>
                        </div>
                    </el-form>
                </div>
                <div class="content">
                    <div class="txt_h">
                        <p>如何开始游戏</p>
                        <p>How To Start The Game</p>
                    </div>
                    <p class="state_c"><span>·</span>注册并开始您的矩阵</p>
                    <p class="state_e">register and begin your game of matrix</p>
                    <p class="state_c"><span>·</span>推荐两位朋友加入矩阵</p>
                    <p class="state_e">share it with your friend and join with you</p>
                    <p class="state_c"><span>·</span>无限收取您的循环收益</p>
                    <p class="state_e">make profits by expending matrix</p>
                </div>
                <a href=""></a>
            </div>
            <transition name="sign">
                <div v-if="start" class="show">
                    <ForGet></ForGet>
                    <!-- <Register :regVal="regVal" ></Register> -->
                </div>
            </transition>
        </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import Register from '../enroll/register' // 注册页面
import ForGet from '../forget'
// import { state } from '../../mock/dynamic_background.js'
import BScroll from 'better-scroll';
export default {
    created() {
        // let time = this.$des.encrypt(new Date().getTime())
        // this.$api.get(`user_info/?token=${time}`, {}, r => {
        //     this.userslist = r
        //     console.log(r)
        // })
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.loginScroll) {
                this.loginScroll = new BScroll(this.$refs.login, {
                    scrollY: true,
                    click: true
                })
            } else {
                this.loginScroll.refresh()
            }
        })
    },
    data() {
        var checkCell = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
        return {
            hintShow: false,
            logining: false,
            eyeShow: false, // 密码显示
            type: 'password',
            ps_data: {
                cell: '',
                password: ''
            },
            rules2: {
                cell: [
                    { type: 'string', len: 11, message: '手机号错误', trigger: 'blur' },
                    { validator: checkCell, trigger: 'blur' }
                    //{ validator: validaePass }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                    //{ validator: validaePass2 }
                ]
            },
            checked: true,
            regVal: '',
            userslist: [],
            report: '',
            forgShow: false
        };
    },
    computed: {
        ...mapState(['arr', 'start'])
    },
    methods: {
        ...mapMutations(['getMess', 'jumpReg', 'navDis']),
        ...mapActions(['setToken']),
        handleReset2() {
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev) {
            var _this = this;
            var enArr = []; // 存储token
            // 产生随机token
            for (var i = 1000; i > 0; i--) {
                enArr.push(i)
            }

            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    var loginParams = { cell: this.$des.encrypt(this.ps_data.cell), password: this.$des.encrypt(this.ps_data.password), time: enArr };
                    this.$api.login('login', loginParams, r => {
                        if (r.state === 200) {
                            loginParams.token = r.rm_str
                            loginParams.user = r.user_name
                            sessionStorage.setItem('mess', JSON.stringify(loginParams));
                            sessionStorage.setItem('goFor', JSON.stringify(false));
                            this.getMess()
                            this.$router.push({ path: '/' })
                        } else {
                            this.report = r.msg
                            this.hintShow = true
                        }

                    })
                } else {
                    return false;
                }
            })
        },
        // 忘记密码
        forget() {
            this.jumpReg()
        },
        randomChar(l) {
            var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
            var tmp = "";
            var timestamp = new Date().getTime();
            for (var i = 0; i < l; i++) {
                tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
            }
            return timestamp + tmp;
        },
        // lasrRegister() {
        //     let ic_time = new Date().getTime()
        //     let token = this.$des.encrypt(this.randomChar(19)).replace(/ /g, '+')
        //     let time = this.$des.encrypt(new Date().getTime())

        //     this.$api.get(`user_info/?token=${time}`, {}, r => {
        //         this.userslist = r

        //     })
        //     this.$api.get(`set_register_cache/?token=${token}`, {}, r => {
        //         if (r.status === 200) {
        //             this.regVal = token
        //             this.jumpReg()
        //         }
        //     })

        // },
        popup() {
            this.hintShow = false
            this.logining = false
        },
        // 密码显
        eye() {
            this.eyeShow = !this.eyeShow
            if (this.eyeShow) {
                this.type = 'text'
            } else {
                this.type = 'password'
            }
        },
    },
    components: {
        Register,
        ForGet
    }
}
</script>
<style lang="scss" scoped>
.login {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;

    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    z-index: 100;
    overflow: hidden;
    box-sizing: border-box;


    .logo_box {
        display: flex;
        padding: 14% 5%;
        overflow: hidden;
        box-sizing: border-box;

        .logo {
            flex: 0 0 83px;
            width: 83px;
        }

        .logo_txt {
            flex: 1;
        }

        .h_txt {
            margin-top: 8%;
            font-size: 20px;
            font-family: Roboto;
            font-weight: bold;
            line-height: 1.5;
            color: rgba(15, 26, 71, 1);
            opacity: 1;
        }

        .txt {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 0.67;
        }
    }

    .from {
        padding: 0 8%;
        overflow: hidden;

        .el-form-item {
            margin-bottom: 14%;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        }

        .hint {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            background: rgba(7, 17, 27, 0.1);
            z-index: 11;

            .ivu-alert {
                position: absolute;
                top: 25%;
                left: 20%;
                padding: 30px;
            }
        }

        .login-container {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            width: 100%;
            // height: 1%;
            padding: 0 35px 15px 35px;
            position: relative;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 3px rgba(167, 174, 194, 0.5);
            opacity: 1;
            border-radius: 5px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 22px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;

            .user_txt {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                color: rgba(228, 230, 236, 1);
                opacity: 1;
                display: inline-block;

            }

            .pass_txt {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                color: rgba(228, 230, 236, 1);
                opacity: 1;
                display: inline-block;
            }

            // .icon {
            //     display: inline-block;
            //     position: absolute;
            //     top: 24%;
            //     left: 5%;
            //     width: 7%;
            //     height: 42%;
            //     z-index: 10;
            // }

            // .icon_pass {
            //     display: inline-block;
            //     position: absolute;
            //     top: 24%;
            //     left: 4%;
            //     width: 8.5%;
            //     height: 52%;
            //     z-index: 10;
            // }

            .eye_icon {
                display: inline-block;
                position: absolute;
                top: 42%;
                right: 3%;
                width: 11%;
                height: 60%;
                z-index: 10;
            }



            .title {
                margin: 0px auto 40px auto;
                text-align: center;
                color: #fff;
            }

            .remember {
                margin: 0px 0px 35px 0px;
                color: #000;
            }

            .find {
                float: right;
                display: inline-block;
                cursor: pointer;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(112, 112, 112, 1);
                opacity: 0.7;
                transform: translateY(-80%);
            }

            .find:hover {
                color: rgba(127, 255, 212, 1)
            }



        }

    }






    // .show {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     bottom: 0;
    //     right: 0;
    //     transition: all 0.5s;
    //     z-index: 10;

    //     &.sign-enter-active {
    //         transition: all 0.5s
    //     }

    //     &.sign-enter {
    //         transform: translateX(100%);
    //     }

    //     &.sign-leave-active {
    //         transition: all 0.5s;
    //     }

    //     &.sign-leave-to {
    //         transform: translateX(100%);
    //     }
    // }

    .content {
        width: 100%;
        height: 500px;
        margin-top: 5%;
        padding: 10% 12%;
        background: url('../../publi/img/login_scene.png') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;

        .txt_h {
            margin-top: 5%;
            margin-bottom: 7%;

            p {
                text-align: center;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }

            p:nth-child(2) {
                position: relative;
                font-size: 14px;
                font-family: Roboto;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                opacity: 1;

                &::after {
                    position: absolute;
                    bottom: -80%;
                    left: 40%;
                    content: "";
                    color: #000;
                    clear: both;
                    width: 22%;
                    height: 2px;
                    background: rgba(255, 255, 255, 1);
                    opacity: 1;
                    display: inline-block;
                }
            }
        }

        .state_c {
            position: relative;
            padding: 6% 8%;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            opacity: 1;

            span {
                position: absolute;
                top: 23%;
                left: 3%;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
                display: inline-block;
            }
        }

        .state_e {
            padding: 0 8%;
            font-size: 12px;
            font-family: Roboto;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        }
    }
}
</style>`