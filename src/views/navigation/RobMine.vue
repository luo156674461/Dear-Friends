<template>
    <div class="deal">
        <div class="head">
            矿机抢购
        </div>
        <div class="content">
            <div class="category" @click="ShouPup">
                <span class="kindName">矿机类型：{{message}}天</span>
                <Icon type="ios-arrow-down" />
            </div>
            <div class="interval"></div>
            <div class="detail">
                <div class="mode">
                    <span class="time">现在时间：{{gainTiem}}</span>
                    <span class="limitingTime">(抢购 {{time}}- {{enTime}} 时间)</span>
                </div>
                <div class="interval"></div>
                <div class="genre">
                    <div class="typetxt">交易类型</div>
                    <div class="business">
                        <Dropdown trigger="click" @on-click="getDropdown">
                            <span>{{coinName}}<Icon type="ios-arrow-down"></Icon></span>
                            <DropdownMenu slot="list" class="menu">
                                <DropdownItem v-for="(item, index) in msg.wallet" :key="index" :name="item.market">{{item.market}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="interval"></div>
                <div class="pledge">
                    <div class="txt">
                        <span class="txtname">可用金</span>
                        <span class="count">({{amount}})</span>
                    </div>
                    <div class="centage">
                    <div class="slider">
                        <van-slider v-model="value" @change="shVal" />
                    </div>
                        <div class="inp">
                            锁仓金额：<Input v-model="valuenum" placeholder="" style="width: 80px" :disabled="disabledName" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="interval"></div>
            <div class="but">
                <Button type="success" long :disabled="disabled" @click="purchase">提交</Button>
            </div>
            <div class="interval"></div>
            <div class="hint">
                <p>温馨提示：</p>
                <p>1、您的可用金多于1000，方可交易。 如有不足请及时购买</p>
                <p>2、身份资料已银行资料要审核通过后，方可交易。请阁下及时上载资料，以免影响阁下的交易。</p>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker show-toolbar title="选择品种" :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
        </van-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Stepper from '../nomFunction/widget/Stepper';
export default {
    inject:['reload'],
    created() {
        this.$nextTick(() => {
            let beginTiem = Number((new Date(Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${this.time}`.replace(/-/g, "/")))))
            // let endTiem = Number((new Date(Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 18:30:00`.replace(/-/g, "/")))))
            let endTiem = beginTiem + 66600000
            this.enTime = new Date(endTiem).toTimeString().substr(0, 8)
            setInterval(() => {
                this.rateTime = Number(new Date())
                if (this.rateTime < beginTiem && this.rateTime > endTiem) {
                    this.disabled = false
                } else {
                    this.disabled = true
                }
            }, 1000)

            this.getMess()
            this.byValue()
            this.user = this.mess.user
            this.init_token = this.mess.token
            var token = this.$des.encrypt(`${this.init_token}${this.arrNum}`)
            this.$api.get(`get_buy_mill_info/?token=${token}&user=${this.user}`, {}, r => {
                this.msg = r.msg
                console.log(r.msg)
                this.time = r.msg.mill_open_time[0].opentime.split('T')[1]
                for (let i = 0; i < r.msg.mill_info.length; i++) {
                    if (Object.keys(r.msg.mill_info[i])[0].split(':')[1] === 'pr_list') {
                        this.message = Object.keys(r.msg.mill_info[0])[0].split(":")[0]
                        this.columns.push(Object.keys(r.msg.mill_info[i])[0].split(":")[0])
                    }

                }
                this.amount = r.msg.wallet[0].amount
                this.coinName = r.msg.wallet[0].market
            })

        })



    },
    mounted() {

    },
    data() {
        return {
            end: 1,
            busi: 1,
            value: 0,
            valuenum: 0,
            show: false,
            disabled: true,
            message: '',
            columns: [],
            amount: '',
            rateTime: 0,
            visible: false,
            msg: {},
            coinName: '',
            disabledName: false,
            time: '',
            enTime: ''
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
        gainTiem() {
            let template = 'hh:mm:ss'
            let newDate = new Date()
            let date = this.rateTime
            let obj = {
                '(h+)': newDate.getHours() + '',
                '(m+)': newDate.getMinutes() + '',
                '(s+)': newDate.getSeconds() + ''
            }
            for (let key in obj) {
                let reg = new RegExp(key)
                if (reg.test(template)) {
                    let str = RegExp.$1.length === 1 ? obj[key] : ('00' + obj[key]).substr(obj[key].length)
                    template = template.replace(reg, str)
                }
            }
            return template
        }
    },
    watch: {
        valuenum(newVal, oldVal) {

            this.value = (newVal / this.amount) * 100
            if (Number(newVal) > Number(this.amount)) {
                this.valuenum = this.amount
                this.disabledName = true
            }
        }
    },
    methods: {
        ...mapMutations(['dealopen', 'getMess', 'byValue']),

        selected(n) {
            this.end = n
        },
        busied(n) {
            this.busi = n
        },
        shVal(value) {
            this.valuenum = this.amount * (value / 100)
            if (this.valuenum < this.amount) {
                this.disabledName = false
            }
        },
        onChange(picker, value, index) {
            this.message = value.split(':')[0]
        },
        onCancel() {
            this.show = false
        },
        onConfirm(picker, value, index) {
            this.show = false
        },
        ShouPup() {
            this.show = true
        },
        handleOpen() {
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
        },
        getDropdown(n) {
            this.coinName = n
            for (let j = 0; j < this.msg.wallet.length; j++) {
                if (this.msg.wallet[j].market === n) {
                    this.amount = this.msg.wallet[j].amount
                }
            }
        },
        purchase() {
           if(this.amount < 1000 || this.valuenum < 1000) {
                this.$Modal.confirm({title: '交易数量不能少于1000'})
           } else {
            this.getMess()
            this.byValue()

            let params = {}

            params.target = this.message.split(':')[0]
            params.b_type = this.coinName
            params.b_lock = this.valuenum 
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`buy_mill/?token=${token}&user=${this.mess.user}`, params, r => {
                 this.reload()
               if(r.state === 200) {
                this.$Modal.warning({
                    title: r.msg
                })
               } else {
                  this.$Modal.warning({
                    title: r.msg
                  })
               }
            })
           }
        }
    },
    components: {
        Stepper
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.deal {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    width: 100%;
    background: #fff;
    z-index: 1000;

    .head {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 700;
        line-height: 40px;
        background: #000;
        color: #fff;
        text-align: center;
    }

    .content {
        position: absolute;
        top: 40px;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(204, 204, 204, 0.2);

        .category {
            width: 100%;
            text-align: center;
            padding: 10px 0;
            background: #fff;

            .kindName {
                font-size: 18px;
                font-weight: 700;
            }

            .ivu-icon {
                transform: translateY(-3px);
                font-size: 24px;
                color: #ccc;
                font-weight: 400;
            }
        }

        .interval {
            height: 10px;
            background: rgba(7, 17, 27, 0.1);
        }

        .detail {
            background: #fff;
            
            .mode {
                padding: 10px 0;
                font-size: 16px;
                text-align: center;
                font-weight: 700;
                
                .txt {
                    color: #FFD306;
                }

                .time {
                    display: block;
                }

                .limitingTime {
                    display: inline-block;
                    font-size: 12px;
                }
            }

            .genre {
                display: flex;
                padding: 12px;
                font-size: 16px;

                .typetxt {
                    flex: 1;
                    text-align: center;
                    line-height: 54px;
                    font-weight: 700;
                    border-right: 1px solid #ccc;
                }

                .business {
                    flex: 1;
                    font-size: 12px;
                    text-align: center;
               
                    .ivu-dropdown {
                        width: 40%;
                        height: 100%;
                        padding: 15px 0;
                        font-size: 16px;

                        div {
                            display: inline-block;
                        }
                        ul {
                        }
                        .ivu-select-dropdown {
                            margin: 0;
                        }
                    }

                }
            }

            .pledge {
                display: flex;
                padding: 25px 12px;
                line-height: 24px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                .txt {
                    flex: 1;
                    padding-top: 5px;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    transform: translateY(9px);
                    .txtname {
                       display: inline-block;

                    }

                    .count {
                        display: inline-block;
                        margin-left: 5px;
                        transform: translateY(-1px);
                        font-size: 12px;
                    }
                }

                .centage {
                    flex: 1;
                    .slider {
                        
                    }
                    .inp {
                       margin: 25px 0 0 10px;
                       font-size: 14px;
                       font-weight: 700; 

                       .ivu-input-wrapper {
                        margin-left: 10px;

                       }
                    }
                }
            }

            .multiple {
                display: flex;
                padding: 25px 12px;
                line-height: 24px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                .txt {
                    padding-top: 5px;
                    flex: 1;
                    font-size: 16px;
                    font-weight: 700;

                    .count {

                        display: inline-block;
                        margin-left: 5px;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .centage {
                    flex: 1;
                }
            }
        }

        .consult {
            padding: 20px 12px;
            font-size: 16px;
            font-weight: 700;

            .txt {
                display: inline-block;

            }

            .amount {
                display: inline-block;
                float: right;
            }
        }

        .but {
            padding: 10px 70px;
            background: #000;
            .ivu-btn {
                line-height: 0.5;
            }
        }

        .hint {
            position: absolute;
            top: 66%;
            left: 0;
            bottom: 0;
            font-size: 20px;
            font-weight: 700;
            width: 100%;
            padding: 10px 20px;
            color: red;
            background: rgba(7, 17, 27, 0.1);
        }
    }

}
</style>