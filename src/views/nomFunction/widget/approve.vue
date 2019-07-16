<template>
    <div :class="txt === '已认证' ? 'approve' : 'alive'">{{txt}}</div>
</template>
<script>
export default {
    mounted() {
        this.app()
    },
    props: {
        pay: {
            type: Object,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            txt: ''
        }
    },
    computed: {},
    methods: {
        app() {
            if (this.pay.identify === '1' && this.path === '/identity') {
                this.txt = '已认证'
            } else if (this.pay.payment_method.method_bankcard === '1' && this.path === '/dankcard') {
                this.txt = '已认证'
            } else if (this.pay.payment_method.method_wechat === '1' && this.path === '/weixin') {
                this.txt = '已认证'
            } else if (this.pay.payment_method.method_alipay === '1' && this.path === '/alipay') {
                this.txt = '已认证'
            } else {
                this.txt = '未认证'
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.approve {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(59, 63, 75, 1);
    opacity: 0.6;
}

.alive {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(59, 63, 75, 1);
    opacity: 0.6;
}
</style>