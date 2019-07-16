<template>
    <div class="identity" ref="iden">
        <div>
            <div class="lode_box" v-if="loadShow">
                <Lode></Lode>
            </div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">身份证</span>
            </div>
            <div class="interval">
                <span class="txt">身份证信息填写</span>
                <div class="icon"><img src="../../../publi/img/identity_icon.png" width="100%" height="100%"></div>
                </div>
                <div class="fillIn">
                    <div class="nationality">
                        <span class="title">姓名：</span>
                        <span class="txt">{{user}}</span>
                    </div>
                    <div class="form">
                        <span class="title">证件类型：</span>
                        <span class="txt">{{type}}</span>
                    </div>
                    <div class="number">
                        <span class="title">证件号码：</span>
                        <span class="txt">{{number}}</span>
                    </div>
                    <div class="cellphone">
                        <span class="title">手机号码：</span>
                        <span class="txt">{{cell}}</span>
                    </div>
                    <div class="email">
                        <span class="title">电子邮箱：</span>
                        <span class="txt">{{email}}</span>
                    </div>
                    <div class="QQ">
                        <span class="title">QQ：</span>
                        <span class="txt">{{qq}}</span>
                    </div>
                </div>
                <!-- <div class="text">个人信息上传</div> -->
               <!--  <div class="material">
                    <div class="just">
                        <div class="shade" v-if="show">
                            <div>
                                <span class="txt">身份证正面</span>
                                <span class="title">(已验证)</span>
                            </div>
                        </div>
                        <Upload :action="justApi" :defaultList="defaultListJust"></Upload>
                    </div>
                    <div class="against">
                        <div class="shade" v-if="show">
                            <div>
                                <span class="txt">身份证反面</span>
                                <span class="title">(已验证)</span>
                            </div>
                        </div>
                        <Upload :action="againstApi" :defaultList="defaultListAgaist"></Upload>
                    </div>
                </div> -->
                <div class="but">
                    <Button type="primary" ghost long @click="submit" v-if="info.identify === '1' ? false : true">提交</Button>
                </div>
                <div class="reminder">
                    <p>温馨提示：</p>
                    <p>1、若需要更改【客户信息】、【证件号码】等其他内容。请联系客服</p>
                    <p>2、身份资料已银行资料要审核通过后，方可交易。请阁下及时上载资料，以免影响阁下的交易。</p>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Bus from '../../../Bus.js'
import Upload from '../widget/Upload';
import Lode from '../widget/lode';
export default {
    inject: ['reload'],
    created() {

        this.getMess()
        this.byValue()
        this.info = JSON.parse(this.$des.decrypt(this.$route.query.info))
        this.number = this.$des.decrypt(this.info.idcard)
        this.cell = this.$des.decrypt(this.info.cell)
        this.getmass()
    },
    mounted() {
        Bus.$on('justinfo', content => {
            if (content.username) {
                this.user = content.username
                this.number = content.id_card
                this.email = content.email
                this.qq = content.qq
                this.justmass = content
            }
        })
        Bus.$on('againstinfo', content => {
            this.againstmass = content
        })
        this.$nextTick(() => {
            if (!this.idenScroll) {
                this.idenScroll = new BScroll(this.$refs.iden, {
                    // click: true,
                    scrollY: true,
                    tap: 'exit,submit'
                })
            } else {
                this.idenScroll.refresh()
            }

        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.idenScroll) {
                this.idenScroll = new BScroll(this.$refs.iden, {
                    // click: true,
                    scrollY: true,
                    tap: 'exit,submit'
                })
            } else {
                this.idenScroll.refresh()
            }

        })
    },
    data() {
        return {
            user: '',
            type: '身份证',
            number: '',
            cell: '',
            email: '',
            qq: '',
            show: false,
            justshow: true,
            againstshow: false,
            justApi: 'https://www.onetwoshare.net/api/id_card_upload/front/',
            againstApi: 'https://www.onetwoshare.net/api/id_card_upload/back/ ',
            defaultListJust: [],
            defaultListAgaist: [],
            info: {},
            justmass: {},
            againstmass: {}
        }
    },
    computed: {
        ...mapState(['mess', 'newinfo', 'arrNum', 'loadShow']),

    },
    methods: {
        ...mapMutations(['byValue', 'getMess', 'loadopen', 'loadcut']),
        exit() {
            this.getMess()
            this.byValue()
            this.$router.go(-1)
        },
        submit() {
            this.getMess()
            this.byValue()
            let params = {}
            params.user = this.info.user
            params.name = this.user
            params.birthday = this.justmass.birthday
            params.gender = this.justmass.sex
            params.id_card_number = this.$des.encrypt(this.justmass.id_card)
            params.address = this.justmass.address
            params.race = this.justmass.race
            params.front_img = this.justmass.img
            params.back_img = this.againstmass.img
            params.valid_date = this.againstmass.valid_date
            params.issued_by = this.againstmass.issued_by
            this.loadopen()
            let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`flush_info/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                if (r.state == 200) {
                    let _this = this
                    this.loadcut()
                    this.$Modal.success({ title: r.msg, onOk() { _this.reload() 
                    _this.$router.push({ name: '个人信息' }) } })
                    
                }
            })
        },
        getmass() {
            if (this.info.identify === '1') {
                let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                this.loadopen()
                this.show = true
                this.$api.get(`idcard_info/?token=${tmp_token}&user=${this.mess.user}`, {}, r => {
                    if (r.state == 200) {
                        this.loadcut()
                        this.user = r.msg[0].name

                        this.number = this.$des.decrypt(r.msg[0].id_card_number)
                        this.defaultListJust.push({ url: r.msg[0].front_img })
                        this.defaultListAgaist.push({ url: r.msg[0].back_img })
                    }
                })
            } else {
                this.show = false
                this.loadcut()
            }
        }
    },
    components: {
        Upload,
        Lode
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.identity {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
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
        background: url('../../../publi/img/identity_back.png') no-repeat;
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
            margin-bottom: 16px;
        }

        .title {
            flex: 0 0 100px;
            width: 100px;
            height: 20px;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 20px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .txt {
            padding: 0;
            flex: 1;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 20px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;

        }

        .username {
            div {
                padding: 0;
                margin: 0;
            }

            .title {
                line-height: 30px;
            }
        }

        .province {
            .title {
                line-height: 30px;
            }
        }

        .city {
            .title {
                line-height: 30px;
            }
        }

        .branchname {
            div {
                padding: 0;
                margin: 0;
            }

            .title {
                line-height: 30px;
            }
        }
    }

    .text {
        margin-bottom: 5%;
        padding: 0 5%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(59, 63, 75, 1);
        opacity: 1;
    }

    .material {
        display: flex;
        padding: 0 5%;
        margin-bottom: 10%;

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

        .just {
            position: relative;
            margin-right: 10px;
            flex: 1;
            border: 1px solid #ccc;
            height: 150px;

        }

        .against {
            flex: 1;
            border: 1px solid #ccc;
            height: 150px;
            position: relative;

            .ivu-icon {
                position: absolute;
                top: 20%;
                left: 35%;
                font-size: 50px;
                color: #ccc;
            }
        }

        .shade {
            background: rgba(0, 0, 0, 0.1);
        }
    }

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