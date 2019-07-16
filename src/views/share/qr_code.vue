<template>
    <div class="qrBox" @click="ret" ref="qrBox">
        <div class="txt_con" ref="txt">
            <span class="name">{{mess.user}}</span>
            <span class="txt">邀请好友完成矩阵获取收益</span>
        </div>
        <div class="be"></div>
        <div class="yard"><img :src="qrimg" width="100%" height="100%"></div>
            <div class="hint"></div>
        </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            qrimg: ''
        }
    },
    computed: {
        ...mapState(['mess'])
    },
    methods: {
        ...mapMutations(['getMess']),
        ret() {
            this.$router.go(-1)
        }
    },
    created() {
      this.$nextTick(() => {
      })
    },
    mounted() {
        this.getMess()
        this.qrimg = `${this.$api.show_root}/qc_code/?user=${this.mess.user}`
    }
};
</script>
<style scoped lang="scss">
@import '~scss_vars';
@import "../../publi/scss/mixin";

// @include bg-img('../../publi/img/100cover', 103% 106%)
.qrBox {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(86, 144, 243, 1);
    opacity: 1;
    z-index: 100;
    overflow: hidden;

    .txt_con {
        margin-top: 36%;
        text-align: center;
        z-index: 10;

        .name {
            display: block;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 300;
            line-height: 20px;
            color: rgba(32, 160, 255, 1);
            opacity: 1;
            text-align: center;
        }

        .txt {
            display: block;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 100;
            line-height: 17px;
            color: rgba(205, 205, 205, 1);
            opacity: 1;
        }
    }

    .be {
        position: absolute;
        left: 7.3%;
        top: 10%;
        width: 85%;
        height: 72%;
        @include bg-img('../../publi/img/qr_ba', 100% 100%);
        z-index: -1;

    }

    .yard {
        position: absolute;
        top: 30.5%;
        left: 16.5%;
        width: 67%;
        height: 40%;
        z-index: 5;


    }

    .hint {
        position: absolute;
        bottom: 23%;
        left: 17%;
        width: 65%;
        height: 6%;
        @include bg-img('../../publi/img/qr_text', 100% 100%)
    }


}
</style>