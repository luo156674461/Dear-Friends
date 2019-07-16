<template>
    <div class="appeal">
        <div class="img"><img src="../../publi/img/scene.png" width="100%" height="100%"></div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            </div>
            <div class="content">
                <div class="contHead">
                    <div class="left">
                        <h1 class="txt">申诉</h1>
                    </div>
                </div>
                <div class="contCentre">
                    <div class="cont">
                        <div class="option">
                            <div class="name"><span class="title">买家</span><span class="txt">{{info.buyer}}</span></div>
                            <div class="name"><span class="title">卖家</span><span class="txt">{{info.seller}}</span></div>
                            <Input v-model="value" type="textarea" :autosize="{ minRows: 8, maxRows: 5 }" placeholder="请输入申诉内容。。。" />
                        </div>
                    </div>
                </div>
                <div class="but">
                    <Button type="warning" long class="con" @click="cancel">取消</Button>
                    <Button type="error" long @click="appeal">申诉</Button>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            value: '',
            info: {}
        }
    },
    created() {
        this.info = JSON.parse(this.$des.decrypt(this.$route.query.info))

    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
            this.$router.push({ name: '我的订单' })
        },
        cancel() {
            this.$router.push({ name: '我的订单' })
        },
        appeal() {
            this.getMess()
            this.byValue()
            let params = {}
            params.order_id = this.info.order_id
            params.author = this.mess.user
            params.feedback = this.value
            if (this.value === ' ') {
                this.$Message.warning({
                    content: '内容不能为空'
                })
            } else {
                let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                this.$api.post(`seller_confirm/?token=${token}&user=${this.mess.user}`, params, r => {
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ name: '我的订单' })
                        }
                    })
                })
            }

        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.appeal {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    transition: all 0.5s;
    z-index: 1000;

    .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 280px;
    }

    .head {
        padding: 0 3%;
        width: 100%;
        height: 40px;
        color: #000;
        z-index: 5;

        .arrowIcon {
            margin-top: 8px;
            font-size: 20px;

        }
    }

    .content {
        margin-top: 2%;
        padding: 0 5%;
        color: #fff;

        .contHead {
            position: relative;
            display: flex;
            margin-bottom: 5%;
            z-index: 10;

            .left {
                flex: 1;

                .txt {
                    text-align: center;
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 1;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
            }
        }

        .contCentre {
            background: #fff;
            color: #5d5755;

            .cont {
                height: 260px;

                .pay {
                    padding-bottom: 2%;
                    font-size: 14px;
                    font-weight: 700;
                    color: #000;
                    border-bottom: 1px solid #ccc;
                }

                .option {
                    position: relative;
                    text-align: right;
                    font-size: 14px;
                    z-index: 10;

                    div {
                        overflow: hidden;
                        margin-bottom: 10px;

                        span {
                            display: inline-block;
                            float: left;
                            font-size: 14px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            line-height: 1.5;
                            color: rgba(255, 255, 255, 1);
                            opacity: 1;
                        }

                        .txt {
                            margin-left: 3%;
                            color: rgba(0, 0, 0, 1);
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .but {
            display: flex;
            padding: 5%;
            margin-top: 10%;


            .ivu-btn {
                flex: 1;

                opacity: 1;
                border-radius: 5px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 1.5;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }

            .con {
                background: rgba(254, 157, 75, 1);
                margin-right: 3%;
            }
        }
    }
}
</style>