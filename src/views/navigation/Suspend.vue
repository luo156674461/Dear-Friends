<template>
    <div class="Suspend">
        <div class="head">
            挂单信息填写
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row type="flex">
                <Col span='30'>
                <FormItem label="用户"> 
                    <Input type="text" v-model="formInline.user" readonly />
                </FormItem>
                <FormItem label="付款方式">
                    <CheckboxGroup v-model="fruit">
                        <Checkbox label="0" v-if="pay.method_bankcard === '1' ? true : false">
                            <div class="img"><img src="../../publi/img/bank.png" width="100%" height="100%"></div>银行卡
                        </Checkbox>
                        <Checkbox label="1" v-if="pay.method_alipay === '1' ? true : false">
                            <div class="img"><img src="../../publi/img/alipay.png" width="100%" height="100%"></div>支付宝
                        </Checkbox>
                        <Checkbox label="2" v-if="pay.method_wechat === '1' ? true : false">
                            <div class="img"><img src="../../publi/img/wechat.png" width="100%" height="100%"></div>微信
                        </Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="交易类型">
                    <Select v-model="model" style="width:200px" @on-change="del">
                        <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                   <!--  <input type="text" name="" @input="formInline.amount=formInline.amount.replace(/[^\d]/g,'')" v-model="formInline.amount" :min="0" > -->
                    <InputNumber :min="0" v-model="formInline.amount" @input="judge"></InputNumber>
                    <span class="txt">{{judgetxt}}</span>
                </FormItem>
                <FormItem label="限额(最少数)">
                    <InputNumber :min="100" v-model="formInline.minamount" disabled></InputNumber>
                </FormItem>
<!--                 <FormItem label="备注">
                    <Input type="text" v-model="formInline.remarks" />
                </FormItem> -->
                </Col>
            </Row>
        </Form>
        <div class="but">
            <Button type="primary" long @click="handleSubmit" :loading="loading">提交挂单</Button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    inject: ['reload'],
    created() {
        this.getMess()
        this.byValue()
        this.act(2)
        this.formInline.user = this.mess.user
        this.init_token = this.mess.token
        let token = this.$des.encrypt(`${this.init_token}${this.arrNum}`)
        this.$api.get(`get_user_info/?token=${token}&user=${this.formInline.user}`, {}, r => {
            this.waller = r.wallet
            this.payment_method = r.payment_method
            if (r.payment_method.method_bankcard === '0') {
                let _this = this
                this.$Modal.confirm({
                    render: (h) => {
                        return h('h2', '请完善银行卡信息')
                    },
                    onOk() {
                        _this.$router.push({ path: '/personage' })
                    },
                })
            }
        })
        this.getpay()

    },
    mounted() {
      
    },
    data() {
        return {
            formInline: {
                user: '',
                t_type: '',
                amount: 100,
                remarks: '',
                minamount: 100,
            },
            ruleInline: {},
            fruit: ['0'],
            waller: [],
            b_type: '',
            pay: {},
            judgetxt: '',
            model: '',
            payment_method: {},
            cityList: [{
                    value: 'B',
                    label: '挂买'
                },
                {
                    value: 'S',
                    label: '挂卖'
                }
            ],
            loading: false
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum'])
    },
    methods: {
        ...mapMutations(['suspendopen', 'getMess', 'byValue', 'act']),
        del(v) {
            this.formInline.t_type = v
        },
        exit() {
            this.$router.go(-1)
        },
        judge(val) {
            this.formInline.amount = val
            if (this.formInline.amount > 0 && (val % 100 !== 0)) {
                this.judgetxt = '输入的数量必须是100的倍数'
            } else if (this.formInline.t_type === 'S') {
                if (this.formInline.amount < this.waller[0].amount) {
                    this.judgetxt = `您的积分：${this.waller[0].amount}`
                } else if (this.formInline.amount > this.waller[0].amount) {
                    this.judgetxt = `您的积分不足`
                } else {
                    this.judgetxt = ' '
                }
            } else {
                this.judgetxt = ' '
            }

        },
        getpay() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_limit_payment/?token=${token}&user=${this.mess.user}`, {}, r => {
                this.pay = r.msg
            })
        },
        handleSubmit(name) {
            // this.byValue()
            // this.suspendopen()
            this.loading = true
            this.getMess()
            this.byValue()
            let arr = this.fruit.sort()
            let allow_payment = ''
            for (let i = 0; i < arr.length; i++) {
                allow_payment += arr[i] + ','
            }
            let params = {}
            params.user = this.formInline.user
            params.allow_payment = allow_payment.substr(0, allow_payment.length - 1)
            params.t_type = this.formInline.t_type
            params.amount = this.formInline.amount
            params.b_min = 50
            // 判断积分
            if (this.payment_method.method_bankcard === '0') {
                let _this = this
                this.$Modal.confirm({
                    render: (h) => {
                        return h('h2', '请完善银行卡信息')
                    },
                    onOk() {
                        _this.$router.push({ path: '/personage' })
                        _this.loading = false
                    },
                })
            } else {
                if (this.formInline.t_type === 'S') {
                    if (this.formInline.amount > this.waller[0].amount) {
                        this.$Message.info({
                            content: '您的积分不足',
                            top: 100,
                            duration: 3
                        })
                        return
                    } else if (this.formInline.amount == null) {
                        this.$Message.info({
                            content: '数量不能为空',
                            top: 100,
                            duration: 3
                        })
                        return
                    } else if (this.formInline.amount == 0) {
                        this.$Message.info({
                            content: '数量不能为0',
                            top: 100,
                            duration: 3
                        })
                        return
                    } else if(this.formInline.amount % 100 === 0) {
                        let _this = this
                        let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                        this.$api.post(`up_limit/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {
                                    _this.$router.push({ path: '/deal' })
                                    _this.loading = false
                                    _this.reload()
                                }
                            })
                        })
                    }
                } else {
                    if (this.formInline.amount == null) {
                        this.$Message.info({
                            content: '数量不能为空',
                            top: 100,
                            duration: 3
                        })
                        return
                    } else if (this.formInline.amount == 0) {
                        this.$Message.info({
                            content: '数量不能为0',
                            top: 100,
                            duration: 3
                        })
                        return
                    }  else if(this.formInline.amount % 100 === 0) {
                        let _this = this
                        let tmp_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
                        this.$api.post(`up_limit/?token=${tmp_token}&user=${this.mess.user}`, params, r => {
                            this.$Modal.warning({
                                title: r.msg,
                                onOk() {
                                    _this.$router.push({ path: '/deal' })
                                    _this.loading = false
                                    _this.reload()
                                }
                            })
                        })
                    }

                }
            }


        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.Suspend {
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1000;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(59, 63, 75, 1);
    opacity: 1;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;


    .ivu-form-item {
        // overflow: hidden;

        width: 70%;
    }

    .txt {
        position: absolute;
        left: -2%;
        bottom: -46%;
        line-height: 1;
        display: inline-block;
        margin-left: 6px;
        color: #f00;
    }

    .head {
        margin-bottom: 10px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        background: rgba(255, 255, 255, 1);
        opacity: 1;
    }

    .ivu-form {

        margin-top: 15%;
        padding: 5%;
        opacity: 1;
        z-index: -1;

        .ivu-col {
            margin: 0 auto;
        }

        .ivu-form-item-content {
            width: 72%;
        }

        .ivu-form-item-label {
            text-align: left;

        }

        .ivu-checkbox-wrapper {
            display: flex;
            margin-bottom: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 15px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;

            .img {
                flex: 0 0 15px;
                margin: 0 10px;
                width: 15px;
                height: 15px;
            }

        }



    }

    .amount {
        display: inline-block;
        float: right;
    }

    .but {
        width: 100%;
        padding: 5%;

        .ivu-btn {
            background: rgba(86, 144, 243, 1);
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
}
</style>