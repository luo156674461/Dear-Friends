<template>
    <div>{{statxt}}</div>
</template>
<script>
export default {
    mounted() {
    },
    props: {
        status: {
            type: String,
            required: true
        }
    },
    computed: {
        statxt() {
            switch (this.status) {
                case '-1':
                    return '进行中'
                    break;
               case '0':
                    return '待收款'
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