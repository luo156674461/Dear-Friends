<template>
    <div class="store">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">商城</span>
        </div>
        <div class="context">
            敬请期待！！！
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    created() {

    },
    mounted() {

    },
    data() {
        return {

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
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.store {
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
        text-align: center;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20;
        color: rgba(59, 63, 75, 1);
        opacity: 1;
    }
}
</style>