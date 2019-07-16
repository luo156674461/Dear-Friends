<template>
    <div class="site">
        <transition name="r_site">
            <router-view class="r_site"></router-view>
        </transition>
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">我的收货地址</span>
            <span class="add_s" @click="add">添加新地址</span>
        </div>
        <div class="content">
            <div class="siteList" v-if="false">
                <div class="s_logo"><span></span></div>
                <div class="s_info">
                    <div class="info_h">
                        <span class="h_name"></span>
                        <span class="h_phone"></span>
                    </div>
                    <div class="info_s"></div>
                </div>
                <div class="s_edit" @click="edit">编辑</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    created() {
      
    },
    mounted() {},
    updated() {

    },
    data() {
        return {
           
        }
    },
    computed: {
        ...mapState(['mess', 'newinfo', 'arrNum', 'loadShow']),
    },
    methods: {
        ...mapMutations(['byValue', 'getMess', 'loadopen', 'loadcut']),
        exit() {
            this.$router.go(-1)
        },
        edit() {
            this.$router.push({ name: '添加地址' })
        },
        add() {
            this.$router.push({ name: '添加地址' })
        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.site {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    overflow: hidden;
    background: url('../../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    background-color: #fff;

    .r_site {
        transition: all 1s;

        &.r_site-enter-active {
            transition: all 1s;
        }

        &.r_site-enter {
            transform: translateX(100%);
        }

        &.r_site-leave-active {
            transition: all 1s;
        }

        &.r_site-leave-to {
            transform: translateX(100%);
        }
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
            width: 20px;
            margin-top: 3%;
            font-size: 20px;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
            border-radius: 2px;
        }

        .name {
            flex: 1;
            text-align: center;
            line-height: 2.6;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }

        .add_s {
            flex: 0 0 70px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 3.5;
            color: rgba(59, 63, 75, 1);
            opacity: 1;
        }
    }

    .content {

        .siteList {
            display: flex;
            padding: 3%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(59, 63, 75, 1);
            opacity: 1;

            .s_logo {
                flex: 0 0 40px;
                width: 40px;
                text-align: center;
                overflow: hidden;
                margin-top: 3.5%;

                span {
                    display: inline-block;
                    padding: 7% 17% 8% 15%;
                    margin: 13% 8% 0% 0%;
                    background: rgba(7, 17, 27, 0.2);
                    border-radius: 50%;
                    box-sizing: border-box;
                }
            }

            .s_info {
                flex: 1;

                .info_h {
                    .h_name {
                        font-size: 15px;
                        margin-right: 4%;
                    }

                    .h_phone {}
                }

                .info_s {}
            }

            .s_edit {
                flex: 0 0 60px;
                width: 60px;
                text-align: center;
                margin-top: 5.5%;
            }
        }
    }
}
</style>