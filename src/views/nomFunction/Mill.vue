<template>
    <div class="funds">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">设置</span>
        </div>
        <div class="interval"></div>
        <div class="content" ref="ore">
            <div>
                <van-collapse v-model="active" class="series">
                    <van-collapse-item title="锁定期：30" name="1">
                        <Button type="primary" @click="lift('30-earn')" :disabled="disabled">一健提取</Button>
                        <van-collapse v-model="activeNames" accordion>
                            <van-collapse-item :title="i.mill_id" :name="index" v-for="(i, index) in thirdty" :key="index" :class="i.status === '2' ? 'usable' : 'pastdue'">
                                <div class="mation">
                                    <span class="begin">起始：{{i.create_date}}</span>
                                    <span class="finish">结束：{{i.end_date}}</span>
                                    <span class="currency">币种：{{i.b_type}}</span>
                                    <span class="money">冻结资产：{{i.b_lock}} 个</span>
                                    <span class="percentile">算力值：{{i.rate * 100}}% / 天</span>
                                    <span class="percentile">燃烧分红：{{i.below_profit}}</span>
                                    <div :class="i.status === '2' ? 'use' : 'past'">
                                        <span class="state"><Status :status="i.status"></Status></span>
                                        <span :class="i.status === '2' ? 'use-den' : 'past-den'"></span>
                                    </div>
                                    <Button :type="type" :loading="disabled" :disabled="disabled" v-if="i.status === '2' ? false : true">{{liftTxt}}</Button>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                    <van-collapse-item title="锁定期：60" name="2" class="series">
                        <Button type="primary" @click="lift('60-earn')" :disabled="disabled">一健提取</Button>
                        <van-collapse v-model="activeNames" accordion>
                            <van-collapse-item :title="i.mill_id" :name="index" v-for="(i, index) in sixty" :key="index" :class="i.status === '2' ? 'usable' : 'pastdue'">
                                <div class="mation">
                                    <span class="begin">起始：{{i.create_date}}</span>
                                    <span class="finish">结束：{{i.end_date}}</span>
                                    <span class="currency">币种：{{i.b_type}}</span>
                                    <span class="money">冻结资产：{{i.b_lock}} 个</span>
                                    <span class="percentile">算力值：{{i.rate * 100}}% / 天</span>
                                    <span class="percentile">燃烧分红：{{i.below_profit}}</span>
                                    <div :class="i.status === '2' ? 'use' : 'past'">
                                        <span class="state"><Status :status="i.status"></Status></span>
                                        <span :class="i.status === '2' ? 'use-den' : 'past-den'"></span>
                                    </div>
                                    <Button :type="type" :loading="disabled" :disabled="disabled" v-if="i.status === '2' ? false : true">{{liftTxt}}</Button>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                    <van-collapse-item title="锁定期：90" name="3" class="series">
                        <Button type="primary" @click="lift('90-earn')" :disabled="disabled">一健提取</Button>
                        <van-collapse v-model="activeNames" accordion>
                            <van-collapse-item :title="i.mill_id" :name="index" v-for="(i, index) in ninty" :key="index" :class="i.status === '2' ? 'usable' : 'pastdue'">
                                <div class="mation">
                                    <span class="begin">起始：{{i.create_date}}</span>
                                    <span class="finish">结束：{{i.end_date}}</span>
                                    <span class="currency">币种：{{i.b_type}}</span>
                                    <span class="money">冻结资产：{{i.b_lock}} 个</span>
                                    <span class="percentile">算力值：{{i.rate * 100}}% / 天</span>
                                    <span class="percentile">燃烧分红：{{i.below_profit}}</span>
                                    <div :class="i.status === '2' ? 'use' : 'past'">
                                        <span class="state"><Status :status="i.status"></Status></span>
                                        <span :class="i.status === '2' ? 'use-den' : 'past-den'"></span>
                                    </div>
                                    <Button :type="type" :loading="disabled" :disabled="disabled" v-if="i.status === '2' ? false : true">{{liftTxt}}</Button>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                    <van-collapse-item title="锁定期：180" name="4" class="series">
                        <Button type="primary" @click="lift('180-earn')" :disabled="disabled">一健提取</Button>
                        <van-collapse v-model="activeNames" accordion>
                            <van-collapse-item :title="i.mill_id" :name="index" v-for="(i, index) in eighteens" :key="index" :class="i.status === '2' ? 'usable' : 'pastdue'">
                                <div class="mation">
                                    <span class="begin">起始：{{i.create_date}}</span>
                                    <span class="finish">结束：{{i.end_date}}</span>
                                    <span class="currency">币种：{{i.b_type}}</span>
                                    <span class="money">冻结资产：{{i.b_lock}} 个</span>
                                    <span class="percentile">算力值：{{i.rate * 100}}% / 天</span>
                                    <span class="percentile">燃烧分红：{{i.below_profit}}</span>
                                    <div :class="i.status === '2' ? 'use' : 'past'">
                                        <span class="state"><Status :status="i.status"></Status></span>
                                        <span :class="i.status === '2' ? 'use-den' : 'past-den'"></span>
                                    </div>
                                    <Button :type="type" :loading="disabled" :disabled="disabled" v-if="i.status === '2' ? false : true">{{liftTxt}}</Button>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                    <van-collapse-item title="锁定期：360" name="5" class="series">
                        <Button type="primary" @click="lift('360-earn')" :disabled="disabled">一健提取</Button>
                        <van-collapse v-model="activeNames" accordion>
                            <van-collapse-item :title="i.mill_id" :name="index" v-for="(i, index) in thirdtySix" :key="index" :class="i.status === '2' ? 'usable' : 'pastdue'">
                                <div class="mation">
                                    <span class="begin">起始：{{i.create_date}}</span>
                                    <span class="finish">结束：{{i.end_date}}</span>
                                    <span class="currency">币种：{{i.b_type}}</span>
                                    <span class="money">冻结资产：{{i.b_lock}} 个</span>
                                    <span class="percentile">算力值：{{i.rate * 100}}% / 天</span>
                                    <span class="percentile">燃烧分红：{{i.below_profit}}</span>
                                    <div :class="i.status === '2' ? 'use' : 'past'">
                                        <span class="state"><Status :status="i.status"></Status></span>
                                        <span :class="i.status === '2' ? 'use-den' : 'past-den'"></span>
                                    </div>
                                    <Button :type="type" :loading="disabled" :disabled="disabled" v-if="i.status === '2' ? false : true">{{liftTxt}}</Button>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import Status from './widget/status';
export default {
    data() {
        return {
            active: ['1'],
            activeNames: '1',
            thirdty: [],
            sixty: [],
            ninty: [],
            eighteens: [],
            thirdtySix: [],
            loading: false,
            user_mill: []
        }
    },
    computed: {
        ...mapState(['mess', 'millShow', 'arrNum']),
        disabled() {
            for (let i = 0; i < this.user_mill.length; i++) {
                switch (this.user_mill[i].status) {
                    case '3':
                        return false
                        break;
                    case '4':
                        return true
                        break;
                    default:
                        return false
                }

            }
        },
        liftTxt() {
            for (let i = 0; i < this.user_mill.length; i++) {
                switch (this.user_mill[i].status) {
                    case '3':
                        return '可提取'
                        break;
                    case '4':
                        return '正提取'
                        break;
                    case '5':
                        return '提取成功'
                        break;
                    case '6':
                        return '提取失败'
                        break;
                }
            }
        },
        type() {
            for (let i = 0; i < this.user_mill.length; i++) {
                switch (this.user_mill[i].status) {
                    case '3':
                        return 'warning'
                        break;
                    case '4':
                        return
                        break;
                    case '5':
                        return 'success'
                        break;
                    case '6':
                        return 'error'
                        break;
                }
            }
        }
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
            this.$router.go(-1)
        },
        lift(n) {
            this.byValue()
            let token=this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            let pastDdue = this.user_mill.filter(s => s.methods === n).filter(j => j.status === '3')a
            this.$api.post(`get_profit/?token=${token}&user=${this.mess.user}`, pastDdue, r=>{
                if(r.state === 200) {
                    this.$set(pastDdue[0], 'status', '4')
                }
            })
        }
    },
   created() {
     this.user_mill = JSON.parse(this.$des.decrypt(this.$route.query.user_mill))
   },
    mounted() {
        this.getMess()
        this.byValue()
        this.thirdty = this.user_mill.filter(t => t.methods === '30-earn')
        this.sixty = this.user_mill.filter(s => s.methods === '60-earn')
        this.ninty = this.user_mill.filter(n => n.methods === '90-earn')
        this.eighteens = this.user_mill.filter(e => e.methods === '180-earn')
        this.thirdtySix = this.user_mill.filter(h => h.methods === '360-earn')
        return new Promise((resolve) => {
            this.$nextTick(() => {
                this.oreScroll = new BScroll(this.$refs.ore, {
                    click: true
                })
            })
            resolve()
        })

    },
    updated() {},
    components: {
        Status
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';

.funds {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 200;

    .head {
        display: flex;
        width: 100%;
        height: 40px;
        background: #000;
      
        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 8px;
            font-size: 20px;
            color: #ccc;
        }
        .name {
            flex: 1;
            margin-right: 20px;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            color: #ccc;
        }
    }
    .interval {
        height: 13px;
        background: rgba(7, 17, 27, 0.1);
    }

    .content {
        position: absolute;
        top: 53px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;

        .ivu-btn-primary {
            margin-left: 75%;
        }

        .series {
            .usable {
                display: block;
                margin: 5px;
                border: 1px solid #0f0;
            }



            .pastdue {
                display: block;
                margin: 5px;
                border: 1px solid #f00;
            }

            .mation {
                position: relative;
                .ivu-btn.ivu-btn-loading {
                    float: right;
                }
                .use {
                    position: absolute;
                    top: 35%;
                    right: 4%;
                    padding: 2px 5px;
                    border: 1px solid #0f0;
                    color: #0f0;

                    .state {
                        display: inline-block;
                    }

                    .use-den {
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        margin-left: 3px;
                        transform: translateY(-19%);
                        border-radius: 50%;
                        background: #0f0;
                    }
                }

                .past {
                    position: absolute;
                    top: 35%;
                    right: 4%;
                    padding: 2px 5px;
                    border: 1px solid #f00;
                    color: #f00;

                    .state {
                        display: inline-block;
                    }

                    .past-den {
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        margin-left: 3px;
                        transform: translateY(-19%);
                        border-radius: 50%;
                        background: #f00;
                    }
                }
            }

            span {
                display: block;
            }


        }
    }
}
</style>