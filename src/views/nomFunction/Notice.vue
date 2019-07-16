<template>
    <div class="notice" ref="noticeCon">
        <div>
            <div class="head">
                <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
                <span class="name">系统公告</span>
            </div>
            <div class="context" v-if="conShow">
                <div class="conBox">
                    <div class="top">
                        <div class="title">{{noticeInfo.title}}</div>
                        <div class="c_time">{{noticeInfo.c_time}}</div>
                    </div>
                    <pre class="message">{{noticeInfo.message}}</pre>
                </div>
            </div>
            <div class="empty" v-if="!conShow">暂无公告</div>
        </div>
        <a href=""></a>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    created() {
        this.into()
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.noticeConScroll) {
                this.noticeConScroll = new BScroll(this.$refs.noticeCon, {
                    scrollY: true,
                    tap: "exit"
                })
            } else {
                this.noticeConScroll.refresh()
            }
        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.noticeConScroll) {
                this.noticeConScroll = new BScroll(this.$refs.noticeCon, {
                    scrollY: true,
                    tap: "exit"
                })
            } else {
                this.noticeConScroll.refresh()
            }
        })
    },
    data() {
        return {
            noticeInfo: {},
            conShow: true
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess']),
        exit() {
            this.byValue()
            this.$router.go(-1)
        },
        into() {
            this.conShow = false
            this.byValue()
            this.getMess()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`notices/?token=${token}&user=${this.mess.user}`, {}, r => {
                r.msg.c_time = r.msg.c_time.replace('T', ' ').split('.')[0]
                if (r.msg.message === '') {
                    this.conShow = false
                } else {
                    this.conShow = true
                }
                this.noticeInfo = r.msg

            })
        }
    },
    components: {}
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../publi/scss/mixin";

.notice {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-size: 100% 100%;
    background-color: rgba(244, 245, 248, 1);
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

    .context {
        margin: 3% 5%;
        padding: 3%;
        font-family: Microsoft YaHei;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        border-radius: 10px;
        color: rgba(76, 76, 76, 1);

        .top {
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 1);

            .title {
                font-size: 22px;
                font-weight: 600;
            }

            .c_time {
                font-size: 10px;
                font-weight: 400;
                margin-top: 8px;
                width: 55%;
                padding-left: 5px;
                @include bg-img('../../publi/img/system_tiem', 100% 100%)


            }
        }


        .message {
            font-size: 15px;
            text-align: left;
            font-weight: 500;
            letter-spacing: 0.5px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }


    }

    .empty {
        margin: 3% 5%;
        padding: 3%;
        font-family: PingFang SC;
        text-align: center;
        background: rgba(150, 163, 197, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        color: #fff;
        opacity: 1;
        font-size: 20px;
        font-weight: 600;
        border-radius: 10px;

    }
}
</style>