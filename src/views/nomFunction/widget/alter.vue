<template>
    <div class="cancel">
        <h2>修改</h2>
        <div class="just">
            <Form ref="cancelinfo" :model="cancelinfo" :rules="ruleInline" inline>
                <div class="Password">
                    <span class="txt">密码：</span>
                    <FormItem prop="pass">
                        <Input name="pass" type="password" v-model="cancelinfo.pass" placeholder="请输入交易密码" style="width: 100%" />
                    </FormItem>
                </div>
               <!--  <div class="affpass"> 
                    <span class="affpass">确认密码：</span>
                    <FormItem prop="affpass">
                        <Input name="affpass" type="password" v-model="cancelinfo.affpass" placeholder="请再输入交易密码" style="width: 100%" />
                    </FormItem>
                </div> -->
            </Form>
        </div>
    </div>
</template>
<script>
import Bus from '../../../Bus.js'
export default {
    created() {

    },
    mounted() {

    },
    data() {
        const pwdValidate = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('密码不能为空'));
            } else if (!/^[1-9]\d*$/.test(value)) {
                callback(new Error('密码只能是数字'))
            } else {
                // this.$refs.cancelinfo.validateField('affpass');
                callback();
            }
        };
        // const pwdCheckValidate = (rule, value, callback) => {
        //     if (value == '') {
        //         callback(new Error('密码不能为空'));
        //     } else if (this.cancelinfo.pass != value) {
        //         callback(new Error('密码不一致'));
        //     } else {
        //         callback()
        //     }
        // };
        return {
            cancelinfo: {
                pass: '',
                // affpass: ''
            },
            ruleInline: {
                pass: [
                    { required: true, validator: pwdValidate, trigger: 'blur' },
                    { type: 'string', len: 6, message: '密码等于6位', trigger: 'blur' },
                ],
                // affpass: [
                //     { required: true, validator: pwdCheckValidate, trigger: 'blur' }
                // ],
            }
        }
    },
    watch: {
        cancelinfo: {
            handler(newVal, oldVal) {
                Bus.$emit('cancelinfo', newVal)
            },
            deep: true
        },
    },
    computed: {

    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.cancel {
    padding: 0 5%;

    h2 {
        text-align: center
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
                transform: translateY(-11%);
            }
        }

        div {
            display: flex;

            span {
                flex: 0 0 80px;
                text-align: right;
            }
        }
    }
}
</style>