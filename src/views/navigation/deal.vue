<template>
    <!-- 交易页面 -->
    <div class="deal">
        <div class="lode_box" v-if="loadShow">
            <Lode></Lode>
        </div>
        <!-- 头部 -->
        <div class="deal-head" v-if="headShow">
            <!-- <span class="buy" @click="buy(1)" :class="headNun === 1 ? 'active' : ''">我要购买</span>
            <span class="sell" @click="sell(2)" :class="headNun === 2 ? 'active' : ''">我要出售</span> -->
            
            <span class="buy" @click="sell(2)" :class="headNun === 2 ? 'active' : ''">买单</span>
            <span class="sell" @click="buy(1)" :class="headNun === 1 ? 'active' : ''">卖单</span>
            
        </div>
        <div class="deaBuy-head" v-if="!headShow">
            <span class="txt">{{txt}}</span>
        </div>
        <!-- 内容 -->
        <div class="deal-content" ref="deal">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Lode from '../nomFunction/widget/lode';
export default {
    inject: ['reload'],
    data() {
        return {
            headNun: 2,
            txt: ''
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'loadShow', 'headShow', 'scrnHeight']),
    },
    methods: {
        ...mapMutations(['suspendopen', 'getMess', 'byValue', 'loadopen', 'loadcut', 'headT', 'act']),
        buy(n) {
            this.headNun = n
            this.txt = '我要购买'
            this.$router.push({ name: '我要购买' })
        },
        sell(n) {
            this.headNun = n
            this.txt = '我要出售'
            this.$router.push({ name: '我要出售' })

        },
        getUserInfo() {
            this.getMess()
            this.byValue()
            let user_token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_user_info/?token=${user_token}&user=${this.mess.user}`, {}, r => {
                sessionStorage.setItem('gUserInfo', JSON.stringify(r));
            })
        },
        supenop() {
            this.byValue()
            this.getMess()
            this.user = this.mess.user
            this.init_token = this.mess.token
            var token = this.$des.encrypt(`${this.init_token}${this.arrNum}`)
            this.$api.get(`get_user_info/?token=${token}&user=${this.user}`, {}, r => {
                if (r.payment_method.method_alipay === '0' && r.payment_method.method_bankcard === '0' && r.payment_method.method_wechat === '0') {
                    let _this = this
                    this.$Modal.confirm({
                        render: (h) => {
                            return h('h2', '请完善支付信息')
                        },
                        onOk() {
                            _this.$router.push({ path: '/personage' })
                        }
                    })
                } else {
                    this.$router.push({ name: '挂单' })
                }
            })
        }
    },
    created() {
        this.getMess()
        this.byValue()
        this.sell(this.headNun)
        this.headT()
        this.act(1)
        sessionStorage.setItem('act', JSON.stringify(1));
        this.getUserInfo()
    },
    mounted() {
    
    },
    components: {
        Lode
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.deal {
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    opacity: 1;
    overflow: hidden;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;


    .lode_box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.1);
        opacity: 1;
        z-index: 10;
    }

    .deal-head {
        display: flex;
        width: 100%;
        height: 45px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px dashed #ccc;

        span {
            flex: 1;
            padding: 10px 0;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: rgba(64, 114, 252, 1);
            opacity: 0.5;
        }

        .active {
            position: relative;
            color: #00f;
            opacity: 1;

            &::after {
                content: " ";
                display: inline-block;
                position: absolute;
                bottom: 0;
                left: 25%;
                border: 1px solid #00f;
                width: 50%;
                height: 2px;
                opacity: 1;
            }
        }

        .ivu-icon {
            float: right;
            transform: translateY(4px);
        }
    }

    .deaBuy-head {
        width: 100%;
        height: 45px;
        text-align: center;
        font-size: 14px;

        span {
            display: inline-block;
            line-height: 45px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }

    .deal-content {
        position: absolute;
        top: 45px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;

        
    }
}
</style>