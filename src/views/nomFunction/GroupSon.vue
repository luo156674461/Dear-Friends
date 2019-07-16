<template>
    <div class="son" ref="son">
        <div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">直推人员列表</span>
            </div>
            <div class="content">
                <!-- 总资金 -->
                <!-- <p>直推人员列表</p> -->
                <!-- 500 -->
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item :title="i.user" :name="index" v-for="(i, index) in groupLiInfo" :key="index">
                        <div class="list">
                            <div class="left">
                                <span class="txt">用户名</span>
                                <span class="cont">{{i.user}}</span>
                            </div>
                            <div class="rigth">
                                <span class="txt">电话</span>
                                <span class="cont">{{i.cell}}</span>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
                <!-- 1000 -->
                <!-- <van-collapse v-model="activeNames" accordion>
                <van-collapse-item title="1000" :name="index + 1" v-for="(i,index) in wallet" :key="index">
                    amount：<h2>{{i.amount}}</h2>
                    capital：<h2>{{i.capital}}</h2>
                    freeze：<h2>{{Number(i.freeze_limit) + Number(i.freeze_mill)}}</h2>
                </van-collapse-item>
            </van-collapse> -->
                <!-- 2000 -->
                <!--   <van-collapse v-model="activeNames" accordion>
                <van-collapse-item title="2000" :name="index + 1" v-for="(i,index) in wallet" :key="index">
                    amount：<h2>{{i.amount}}</h2>
                    capital：<h2>{{i.capital}}</h2>
                    freeze：<h2>{{Number(i.freeze_limit) + Number(i.freeze_mill)}}</h2>
                </van-collapse-item>
            </van-collapse> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            activeNames: '1',
            groupLiInfo: [],
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum'])
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
        exit() {
            this.$router.go(-1)
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.sonScroll) {
                this.sonScroll = new BScroll(this.$refs.son, {
                    // click: true,
                    scrollY: true,
                    tap: "exit"
                })
            } else {
                this.sonScroll.refresh()
            }

        })
    },
    created() {
        this.getMess()
        this.byValue()
        this.groupLiInfo = JSON.parse(this.$des.decrypt(this.$route.query.info))
        for (let i = 0, max = this.groupLiInfo.length; i < max; i++) {
            this.groupLiInfo[i].cell = this.$des.decrypt(this.groupLiInfo[i].cell)
        }
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';

.son {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;
    z-index: 1000;

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
            color: rgba(59, 63, 75, 1);
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
        // position: absolute;
        // top: 40px;
        // left: 0;
        // bottom: 0;
        padding: 5%;
        width: 100%;
        opacity: 1;

        p {
            margin-bottom: 2%;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 21px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .van-collapse-item {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(92, 107, 148, 0.17);
            opacity: 1;
            border-radius: 5px;
        }

        .list {
            display: flex;

            .txt {
                display: block;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 20px;
                color: rgba(109, 112, 120, 1);
                opacity: 1;
            }

            .cont {
                display: block;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 300;
                line-height: 20px;
                color: rgba(109, 112, 120, 1);
                opacity: 1;

            }

            .left {
                flex: 1;

                .cont {
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .rigth {
                flex: 1;
                text-align: left;
            }
        }
    }

}
</style>