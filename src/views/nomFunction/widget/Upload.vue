<template>
    <div class="upload">
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" v-if="flag">
                    </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
        </div>
        <Upload v-if="show" ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-preview="handlepreview" :on-progress="handleprogerss" :on-success="handleSuccess" :on-error="handleerror" :format="['jpg','jpeg','png']" :max-size="512" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="action" :data="data" style="display: inline-block;width:100%; height:100%">
            <div style="display: inline-block;width:100%; height:100%">
                <Icon type="ios-add-circle-outline" v-if="show" />
            </div>
        </Upload>
        <Button type="info" @click="empty" class="emp">清空</Button>
    </div> 
</template>
<script>
import Affirm from './Affirm';
import Bus from '../../../Bus.js';
import { mapState, mapMutations } from 'vuex';
export default {
    created() {
        this.flag = false
    },
    mounted() {
        this.flag = true
        this.uploadList = this.$refs.upload.fileList;
        let tiem = setTimeout(() => {
            this.uploadList = this.$refs.upload.fileList;
            if (this.defaultList.length > 0) {
                this.show = false
            } else {
                this.show = true
            }
        }, 1000)
        if (this.defaultList.length > 0) {
            this.show = false
        } else {
            this.show = true
        }

        // Bus.$on('img', content => {
        //     this.$nextTick(() => {
        //         this.defaultList.push({
        //             url: content
        //         })
        //     })
        // })
    },
    updated() {
        // this.uploadList = this.$refs.upload.fileList;
    },
    props: {
        action: {
            type: String,
            required: true
        },
        defaultList: {
            type: Array,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            imgName: '',
            visible: false,
            uploadList: [],
            show: true,
            flag: true,


        }
    },
    computed: {
        ...mapState(['newInfo'])

    },
    watch: {
        defaultList: {
            handler(newVal, oldVal) {

            },
            deep: true
        }
    },
    methods: {
        ...mapMutations(['loadopen', 'loadcut']),
        empty() {
            this.uploadList = []
            this.show = true
        },
        handlepreview(file) {
        },
        handleprogerss(event, file, fileList) {
            this.show = false
            this.loadopen()
        },
        handleSuccess(res, file, fileList) {
            file.url = `https://www.onetwoshare.net${file.response.msg.img}`
            this.uploadList = []
            this.uploadList.push(file)
            this.loadcut()

            var _this = this
            this.$Modal.confirm({
                render: (h) => {
                    var vm = this;
                    return h(Affirm, { props: { msg: file.response.msg, } })
                },
                onOk() {}
            })

        },
        handleerror(error, file) {
            this.loadcut()
            var _this = this;
            this.$Modal.confirm({
                title: file.msg,
                onOk() {
                    _this.uploadList = []
                    _this.show = true;
                }
            })
        },
        handleFormatError(file) {

            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {

            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' 已超出512k'
            });
        },
        handleBeforeUpload(file) {

            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        }
    },
    components: {
        Affirm
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.upload {
    width: 100%;
    height: 100%;

    .ivu-upload /deep/ .ivu-upload-drag {
        width: 100%;
        height: 100%;
    }

    .emp {
        position: absolute;
        top: 30%;
        right: -56%;
        z-index: 100;
        border-radius: 3px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 25px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
    }

    .ivu-icon {
        // position: absolute;
        // top: 20%;
        // left: 35%;
        line-height: 3;
        font-size: 50px;
        color: #ccc;
    }

    .demo-upload-list {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}
</style>