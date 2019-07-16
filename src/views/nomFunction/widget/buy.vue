<template>
    <div>{{statxt}}</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    mounted() {
    },
    props: {
        status: {
            type: String,
            required: true
        },
        seller: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState(['mess']),
        statxt() {
            switch (this.status) {
                case '-1':
                   if(this.mess.user === this.seller) {
                     return '待付款'
                   } else {
                     return '待收款'
                   }
                    break;
               case '0':
                    return '已付款'
                    break;
               case '1':
                    return '已取消'
                    break;
               case '2':
                    return '已完成'
                    break;
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
</style>