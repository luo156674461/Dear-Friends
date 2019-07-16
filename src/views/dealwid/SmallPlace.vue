<template>
    <div class="small">
        <h3>确认取消交易</h3>
        <p>如果您已经向卖家付款，请千万不要取消交易</p>
        <span>取消规则：</span>
        <span>买方当日累计5笔取消，会限制当日买入功能</span>
        <Radio v-model="single" @on-change="select">我确定还没有付款给对方</Radio>
    </div>
</template>
<script>
import Bus from '../../Bus.js'
export default {
    mounted() {
        Bus.$emit('single', this.single)
    },
    props: {
        
    },
    data() {
      return {
          single: false
      }
    },
    computed: {
        
    },
    methods: {
      select(v) {
        Bus.$emit('single', v)
      }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
.small {
    h3 {
        text-align: center;
        color: #000;
    }
    p {
        padding: 10px 0;
        font-size: 15px;
        color: #000;
    }
    span {
        display: block;
        font-size: 10px;
    }
    .ivu-radio-wrapper {
        padding: 10px 5px 0;
        margin-top: 10px;
        font-size: 14px;
        color: #000;
    }
}
</style>