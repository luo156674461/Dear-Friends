<template>
    <div class="set">
        <div class="head">
            <van-icon name="arrow-left" class="arrowIcon" @click="exit" />
            <span class="name">设置</span>
        </div>
         <section>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h1 class="header_name">{{mess.user}}</h1>
                        <el-button type="primary" circle size="small" class="exit" @click.native="logout">退出</el-button>
                    </div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
export default {
    created() {
      this.getMess()
      this.byValue()
    },
    mounted() {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['mess', 'arrNum',])
    },
    methods: {
        ...mapMutations(['getMess', 'byValue']),
      exit() {
        this.$router.go(-1)
      },
      logout() {
            var _this = this;
            this.$Modal.confirm({
                title: '提示',
                content: '确认退出吗?',
                onOk() {
                    sessionStorage.removeItem('mess');
                    localStorage.removeItem('active');
                    _this.$router.push('/login');
                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.set {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    transition: all 0.5s;
    z-index: 1000;

    .head {
        display: flex;
        width: 100%;
        height: 40px;
        background: #000;
      
        .arrowIcon {
            flex: 0 0 20px;
            margin-top: 8px;
            font-size: 20px;
            color: #ccc;
        }
        .name {
            flex: 1;
            margin-right: 20px;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            color: #ccc;
        }
    }

    button {
        font-size: 12px;
        position: relative;

        .grid-content {
            position: relative;
            height: 60px;
            background: $color-primary;
            text-align: center;
            line-height: 60px;

            .header_name {
                display: inline-block;
            }

            .exit {
                position: absolute;
                top: 28%;
                right: 3%;
                border-radius: 50%;
            }
        }
    }
}
</style>