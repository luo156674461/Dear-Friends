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
                case '2':
                    return '使用中'
                    break;
                default:
                    return '已过期'
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