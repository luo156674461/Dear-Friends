<template>
    <transition name="qrimg">
        <div class="qr" @click="exit" erf="qr">
            <div>
                <div class="img">
                    <img :src="qrImg" width="100%" height="100%">
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
export default {
    mounted() {
        this.$nextTick(() => {
            if (!this.qrScroll) {
                this.qrScroll = new BScroll(this.$refs.qr, {
                    // click: true,
                    scrollY: true,
                    click: true
                })
            } else {
                this.qrScroll.refresh()
            }

        })
    },
    updated() {
        this.$nextTick(() => {
            if (!this.qrScroll) {
                this.qrScroll = new BScroll(this.$refs.qr, {
                    // click: true,
                    scrollY: true,
                    click: true
                })
            } else {
                this.qrScroll.refresh()
            }

        })
    },
    props: {
        qrImg: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum']),
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'qropne']),
        exit() {
            this.qropne()
        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.qr {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #000;
    transition: all 0.5s;
    z-index: 1000;
    overflow: hidden;

    &.qrimg-enter-active {
        transition: all 0.5s;
    }

    &.qrimg-enter {
        transform: translateX(100%);
    }

    &.qrimg-leave-active {
        transition: all 0.5s;
    }

    &.qrimg-leave-to {
        transform: translateX(100%);
    }

    .img {
        margin-top: 20%;
        width: 100%;
    }
}
</style>