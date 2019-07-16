<template>
    <div class="affirm">
        <h2>确认信息</h2>
        <div class="x"></div>
        <div class="just">
            <div class="username">
                <span class="txt">用户名：</span>
                <span class="con">{{username}}</span>
            </div>
            <div class="usernum">
                <span class="txt">电话：</span>
                <span class="con">{{phone}}</span>
            </div>
            <div class="sex">
                <span class="txt">数量：</span>
                <span class="con">{{amount}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '../../../Bus.js'

export default {
    created() {

    },
    mounted() {
        // this.uploadList = this.$refs.upload.fileList;

        this.$nextTick(() => {
            this.username = this.msg.user_name
            this.phone = this.msg.phone
            this.amount = this.msg.amount
        })
    },
    updated() {},
    props: {
        msg: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            phone: '',
            amount: '',
            username: ''
        }
    },
    computed: {

    },
    watch: {},
    methods: {

    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.affirm {
    padding: 0 10px;

    h2 {
        text-align: center;
        font-size:22px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 2;
        opacity: 1;
    }

    .x {
        height: 1px;
        border: 1px dashed #ccc;
    }

    .just {
        .Password {
            margin-top: 10px;

            .ivu-form {
                display: flex;
            }

            div {
                flex: 1;
                width: 100%;
                // transform: translateY(-11%);
            }
        }

        div {
            margin-top: 10px;
            display: flex;

            span {
                text-align: center;
                transform: translateY(50%);
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 1.5;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }

            .txt {
                flex: 0 0 80px;
            }

            .con {
                flex: 1;
                text-align: left;
            }
        }
    }

}
</style>