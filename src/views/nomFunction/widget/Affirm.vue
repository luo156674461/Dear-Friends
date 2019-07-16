<template>
    <div class="affirm">
        <h2>确认信息</h2>
        <div class="x"></div>
        <div v-if="msg.mark === 'front' ? true : false" class="just">
            <div class="username">
                <span class="txt">姓名：</span>
                <Input v-model="justinfo.username" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="sex">
                <span class="txt">性别：</span>
                <Input v-model="justinfo.sex" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="race">
                <span class="txt">族：</span>
                <Input v-model="justinfo.race" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="id_card">
                <span class="txt">身份证号：</span>
                <Input v-model="justinfo.id_card" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="birthday">
                <span class="txt">出生日期：</span>
                <Input v-model="justinfo.birthday" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="address">
                <span class="txt">地址：</span>
                <Input v-model="justinfo.address" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="email">
                <span class="txt">电子邮箱：</span>
                <Input v-model="justinfo.email" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="qq">
                <span class="txt">QQ：</span>
                <Input v-model="justinfo.qq" placeholder="Enter something..." style="width: 100%" />
            </div>
        </div>
        <div v-if="msg.mark === 'back' ? true : false" class="against">
            <div class="id_ress">
                <span class="txt">注册地址：</span>
                <span class="mass">{{againstinfo.issued_by}}</span>
            </div>
            <div class="valid_date">
                <span class="txt">注册日期：</span>
                <span class="mass">{{againstinfo.valid_date}}</span>
            </div>
        </div>
        <div v-if="msg.mark === 'bank' ? true : false" class="bankcard">
            <div class="bank">
                <span class="txt">银行名：</span>
                <Input v-model="bankcard.bank" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="number">
                <span class="txt">银行卡号：</span>
                <Input v-model="bankcard.number" placeholder="Enter something..." style="width: 100%" />
            </div>
        </div>
        <div v-if="msg.mark === 1 ? true : false" class="bankcard">
            <div class="bank">
                <span class="txt">银行名：</span>
                <Input v-model="handbankcard.bank" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="number">
                <span class="txt">银行卡号：</span>
                <Input v-model="handbankcard.number" placeholder="Enter something..." style="width: 100%" />
            </div>
        </div>
        <div v-if="msg.mark === 'wechat' ? true : false" class="wechat">
            <span class="txt">认证成功</span>
        </div>
        <div v-if="msg.mark === 'alipay' ? true : false" class="wechat">
            <span class="txt">认证成功</span>
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
            if (this.msg.mark === 'front') {
                this.justinfo.username = this.msg.id_info.name
                this.justinfo.sex = this.msg.id_info.gender
                this.justinfo.race = this.msg.id_info.race
                this.justinfo.id_card = this.msg.id_info.id_card_number
                this.justinfo.birthday = this.msg.id_info.birthday
                this.justinfo.address = this.msg.id_info.address
                this.justinfo.pass = this.msg.id_info.Password
                this.justinfo.email = this.msg.id_info.email
                this.justinfo.qq = this.msg.id_info.qq
                this.justinfo.img = this.msg.img

            }


            if (this.msg.mark === 'back') {
                this.againstinfo.issued_by = this.msg.id_info.issued_by
                this.againstinfo.valid_date = this.msg.id_info.valid_date
                this.againstinfo.img = this.msg.img
                Bus.$emit('againstinfo', this.againstinfo)

            }

            if (this.msg.mark === 'bank') {
                this.bankcard.bank = this.msg.bank_info.bank
                this.bankcard.number = this.msg.bank_info.number
                this.bankcard.img = this.msg.img
                // sessionStorage.setItem('bank' this.bankcard.bank)
            }

            if (this.msg.mark === 'wechat') {
                Bus.$emit('wechatImg', this.msg.img)
            }

            if (this.msg.mark === 'alipay') {
                Bus.$emit('alipaytImg', this.msg.img)
            }
            // this.info = this.newinfo

            // Bus.$emit('bankcard', this.)
        })
    },
    updated() {
        // if (this.justinfo.username.length > 0) {
        //     this.$set(this.msg, 'num', 1)
        // } else if (this.againstinfo.issued_by.length > 0) {
        //     this.$set(this.msg, 'num', 2)
        // } else if (this.bankcard.bank > 0) {
        //     this.$set(this.msg, 'num', 3)
        // }
    },
    props: {
        msg: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            justinfo: {
                username: '',
                sex: '',
                race: '',
                id_card: '',
                birthday: '',
                address: '',
                pass: '',
                img: '',
                email: '',
                qq: ''
            },
            againstinfo: {
                issued_by: '',
                valid_date: '',
                img: '',
            },
            bankcard: {
                bank: '',
                number: '',
                img: '',
            },
            handbankcard: {
                bank: '',
                number: ''
            },
            show: false,
            defaultList: [],
            visible: false,
            uploadList: []
        }
    },
    computed: {

    },
    watch: {
        justinfo: {
            handler(newVal, oldVal) {
                Bus.$emit('justinfo', newVal)
            },
            deep: true
        },
        bankcard: {
            handler(newVal, oldVal) {
                Bus.$emit('bankcard', newVal)
            },
            deep: true
        },
        handbankcard: {
            handler(newVal, oldVal) {
                Bus.$emit('handbankcard', newVal)
            },
            deep: true
        }
    },
    methods: {
        handleprogerss(event, file) {
            this.show = false
        },
        handleSuccess(res, file) {
            file.url = file.response.msg.img
        },
        handleerror(error, file) {},
        handleFormatError(file) {

            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {

            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {

            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.affirm {
    padding: 0 5%;

    h2 {
        text-align: center
    }

    .x {
        height: 1px;
        border: 1px dashed #ccc;
    }

    .just {
        div {
            margin-top: 10px;
            display: flex;

            span {
                flex: 0 0 80px;
                text-align: right;
                transform: translateY(15px);
            }
        }
    }

    .against {
        div {
            margin-top: 10px;
            display: flex;

            .txt {
                flex: 0 0 80px;
                text-align: right;
                transform: translateY(15px);
            }

            .mass {
                flex: 1;
                text-align: center;
                transform: translateY(15px);
            }
        }
    }

    .bankcard {
        div {
            margin-top: 10px;
            display: flex;

            .txt {
                flex: 0 0 80px;
                text-align: right;
                transform: translateY(15px);
            }

            .mass {
                flex: 1;
                text-align: center;
                transform: translateY(15px);
            }
        }

    }

    .wechat {
        .txt {
            display: block;
            text-align: center;
            font-size: 16px;
        }

    }

}
</style>