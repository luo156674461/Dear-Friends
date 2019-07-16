<template>
    <div class="home">
        <transition name="lump">
                <router-view class="lump"></router-view>
        </transition>
    <!--     <div class="head">
            <span class="current">矩阵</span>
        </div> -->
        <!-- <div class="txt" v-if="show">
            <Slides></Slides>
        </div> -->
        <div class="content" ref="mat">
            <div>
                <p class="hint">
                    <span class="txt">亲爱的 （<span class="txt_name">{{mess.user}}</span>） : 以下是您正在进行的矩阵，矩阵完成后系统将自动为您开启新的矩阵，而您的直推在完成自己的矩阵后将一直跟在您的矩阵当中。</span>
                </p>
                <div class="integral">
                    <span class="in_txt">积分</span>
                    <span class="in_num">{{amount}}</span>
                    <span class="wallet" @click="wallet">积分钱包</span>
                    <span class="history" @click="matrix">矩阵历史</span>
                </div>
                <div class="present">
                    <div class="one">
                        <div class="shade" v-if="oneShow">
                        <div class="img_cover"></div>
                            <Button class="but_o" @click="five" ref="oneBut" :loading="loadingOne">开启矩阵</Button>
                        </div>
                        <div class="type" v-if="!oneShow"></div>
                        <div class="matrixBox">
                            <div class="img_bc1">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc2">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc3">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot1">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot2">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot3">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="tier_one">
                                    <span class="host">{{arr_100[0]}}</span>
                            </div>
                            <div class="tier_two">
                                <span class="deputy_one">
                                    <span v-if="arr_100[1] == '0' ? false : true">{{arr_100[1]}}</span>
                                    <div class="dot" v-if="arr_100[1] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe1">[直推]</p>
                                </span>
                                <span class="deputy_two">
                                    <span v-if="arr_100[2] == '0' ? false : true">{{arr_100[2]}}</span>
                                    <div class="dot" v-if="arr_100[2] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe2">[直推]</p>
                                </span>
                            </div>
                            <div class="tier_three">
                                <span class="below1">
                                    <span v-if="arr_100[3] == '0' ? false : true">{{arr_100[3]}}</span>
                                    <div class="dot" v-if="arr_100[3] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe3">[直推]</p>
                                </span>
                                <span class="below2">
                                    <span v-if="arr_100[4] == '0' ? false : true">{{arr_100[4]}}</span>
                                    <div class="dot" v-if="arr_100[4] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe4">[直推]</p>
                                </span>
                                <span class="below3">
                                    <span v-if="arr_100[5] == '0' ? false : true">{{arr_100[5]}}</span>
                                    <div class="dot" v-if="arr_100[5] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe5">[直推]</p>
                                </span>
                                <span class="below4">
                                    <span v-if="arr_100[6] == '0' ? false : true">{{arr_100[6]}}</span>
                                    <div class="dot" v-if="arr_100[6] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="oneSe6">[直推]</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="two">
                        <div class="shade" v-if="twoShow">
                            <div class="img_cover"></div>
                            <Button @click="ten" :class="onePlus === '1' ? 'but_o' : 'but'" :disabled="twoDise" ref="twoBut" :loading="loadingTwo">开启矩阵</Button>
                        </div>
                        <div class="type" v-if="!twoShow"></div>
                        <div class="matrixBox">
                            <div class="img_bc1">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc2">
                                 <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc3">
                                  <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot1">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot2">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot3">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="tier_one">
                                <span class="host">{{arr_200[0]}}</span>
                            </div>
                            <div class="tier_two">
                                <span class="deputy_one">
                                    <span v-if="arr_200[1] == '0' ? false : true">{{arr_200[1]}}</span>
                                    <div class="dot" v-if="arr_200[1] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe1">[直推]</p>
                                </span>
                                <span class="deputy_two">
                                    <span v-if="arr_200[2] == '0' ? false : true">{{arr_200[2]}}</span>
                                    <div class="dot" v-if="arr_200[2] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe2">[直推]</p>
                                </span>
                            </div>
                            <div class="tier_three">
                                <span class="below1">
                                    <span v-if="arr_200[3] == '0' ? false : true">{{arr_200[3]}}</span>
                                    <div class="dot" v-if="arr_200[3] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe3">[直推]</p>
                                </span>
                                <span class="below2">
                                    <span v-if="arr_200[4] == '0' ? false : true">{{arr_200[4]}}</span>
                                    <div class="dot" v-if="arr_200[4] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe4">[直推]</p>
                                </span>
                                <span class="below3">
                                    <span v-if="arr_200[5] == '0' ? false : true">{{arr_200[5]}}</span>
                                    <div class="dot" v-if="arr_200[5] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe5">[直推]</p>
                                </span>
                                <span class="below4">
                                    <span v-if="arr_200[6] == '0' ? false : true">{{arr_200[6]}}</span>
                                    <div class="dot" v-if="arr_200[6] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="twoSe6">[直推]</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="three">
                        <div class="shade" v-if="fiveShow">
                            <div class="img_cover"></div>
                            <Button @click="twenty" :class="twoPlus === '1' ? 'but_o' : 'but'" :disabled="fiveDise" ref="threeBut" :loading="loadingThree">开启矩阵</Button>
                        </div>
                        <div class="type" v-if="!fiveShow"></div>
                        <div class="matrixBox">
                            <div class="img_bc1">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc2">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc3">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot1">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot2">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot3">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                            </div>
                            <div class="tier_one">
                                <span class="host">{{arr_500[0]}}</span>
                            </div>
                            <div class="tier_two">
                                <span class="deputy_one">
                                    <span v-if="arr_500[1] == '0' ? false : true">{{arr_500[1]}}</span>
                                    <div class="dot" v-if="arr_500[1] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe1">[直推]</p>
                                </span>
                                <span class="deputy_two">
                                    <span v-if="arr_500[2] == '0' ? false : true">{{arr_500[2]}}</span>
                                    <div class="dot" v-if="arr_500[2] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe2">[直推]</p>
                                </span>
                            </div>
                            <div class="tier_three">
                                <span class="below1">
                                    <span v-if="arr_500[3] == '0' ? false : true">{{arr_500[3]}}</span>
                                    <div class="dot" v-if="arr_500[3] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe3">[直推]</p>
                                </span>
                                <span class="below2">
                                    <span v-if="arr_500[4] == '0' ? false : true">{{arr_500[4]}}</span>
                                    <div class="dot" v-if="arr_500[4] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe4">[直推]</p>
                                </span>
                                <span class="below3">
                                    <span v-if="arr_500[5] == '0' ? false : true">{{arr_500[5]}}</span>
                                    <div class="dot" v-if="arr_500[5] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe5">[直推]</p>
                                </span>
                                <span class="below4"> 
                                    <span v-if="arr_500[6] == '0' ? false : true">{{arr_500[6]}}</span>
                                    <div class="dot" v-if="arr_500[6] == '0' ? true : false">
                                        <i class="d1"></i>
                                        <i class="d2"></i>
                                        <i class="d3"></i>
                                    </div>
                                    <p v-if="fiveSe6">[直推]</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="four">
                        <div class="shade" v-if="tenShow">
                            <div class="img_cover"></div>
                            <Button @click="twenty" :class="fivePlus === '1' ? 'but_o' : 'but'" :disabled="tenDise" ref="fourBut" :loading="loadingFour">敬请期待</Button>
                        </div>
                        <div class="type" v-if="!tenShow"></div>
                        <div class="matrixBox">
                            <div class="img_bc1">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc2">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_bc3">
                                <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot1">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot2">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="img_dot3">
                                    <img src="../../publi/img/blue_dot.png" width="100%" height="100%">
                            </div>
                            <div class="tier_one">
                                <span class="host"></span>
                            </div>
                            <div class="tier_two">
                               <span class="deputy_one">
                                    <span></span>
                                    <p v-if="fiveSe1">[直推]</p>
                                </span>
                                <span class="deputy_two">
                                    <span></span>
                                    <p v-if="fiveSe2">[直推]</p>
                                </span>
                            </div>
                            <div class="tier_three">
                                <span class="below1">
                                    <span></span>
                                    <p v-if="fiveSe3">[直推]</p>
                                </span>
                                <span class="below2">
                                    <span></span>
                                    <p v-if="fiveSe4">[直推]</p>
                                </span>
                                <span class="below3">
                                    <span></span>
                                    <p v-if="fiveSe5">[直推]</p>
                                </span>
                                <span class="below4">
                                    <span></span>
                                    <p v-if="fiveSe6">[直推]</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="five">
                        <div class="shade" v-if="twentyShow">
                            <div class="img_cover"></div>
                            <Button  @click="twenty" :class="fivePlus === '1' ? 'but_o' : 'but'" :disabled="twentyDise" ref="fiveBut" :loading="loadingFive">敬请期待</Button>
                        </div>
                        <div class="type" v-if="!twentyShow"></div>
                            <div class="matrixBox">
                                <div class="img_bc1">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                <div class="img_bc2">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                <div class="img_bc3">
                                    <img src="../../publi/img/h_bc.png" width="100%" height="100%">
                                </div>
                                <div class="img_dot1">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                                </div>
                                <div class="img_dot2">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                                </div>
                                <div class="img_dot3">
                                    <img src="../../publi/img/pure_dot.png" width="100%" height="100%">
                                </div>
                                <div class="tier_one">
                                    <span class="host"></span>
                                </div>
                                <div class="tier_two">
                                    <span class="deputy_one">
                                        <span></span>
                                        <p v-if="fiveSe1">[直推]</p>
                                    </span>
                                    <span class="deputy_two">
                                        <span></span>
                                        <p v-if="fiveSe2">[直推]</p>
                                    </span>
                                </div>
                                <div class="tier_three">
                                    <span class="below1">
                                        <span></span>
                                        <p v-if="fiveSe3">[直推]</p>
                                    </span>
                                    <span class="below2">
                                        <span></span>
                                        <p v-if="fiveSe4">[直推]</p>
                                    </span>
                                    <span class="below3">
                                        <span></span>
                                    <p v-if="fiveSe5">[直推]</p>
                                    </span>
                                    <span class="below4">
                                        <span></span>
                                        <p v-if="fiveSe6">[直推]</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href=""></a>
            </div>
        </div>
</template>
<script>
import Slides from '../slideshow/slides'
import BScroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex'
export default {
    inject: ['reload'],
    created() {
        this.getMess()
        this.byValue()
        this.present()
        this.userInfo()
        this.act(0)
    },
    data() {
        return {
            arr: [1, 2, 3, 4, 5],
            num: 0,
            amount: 0,
            walletinfo: [],
            arr_100: [],
            arr_200: [],
            arr_500: [],
            onePlus: '', // 100矩阵
            loadingOne: false,
            oneShow: true,
            oneDisa: true,
            oneDot: true,
            oneSe1: false,
            oneSe2: false,
            oneSe3: false,
            oneSe4: false,
            oneSe5: false,
            oneSe6: false,
            twoPlus: '', // 200矩阵
            loadingTwo: false,
            twoShow: true,
            twoDise: true, 
            twoSe1: false,
            twoSe2: false,
            twoSe3: false,
            twoSe4: false,
            twoSe5: false,
            twoSe6: false,
            fivePlus: '', // 500矩阵
            loadingThree: false,
            fiveShow: true, 
            fiveDise: true,
            fiveSe1: false,
            fiveSe2: false,
            fiveSe3: false,
            fiveSe4: false,
            fiveSe5: false,
            fiveSe6: false,
            tenPlus: '', // 1000矩阵
            loadingFour: false,
            tenShow: true, 
            tenDise: true,
            twentyPlus: '', // 2000 矩阵
            loadingFive: false,
            twentyShow: true,
            twentyDise: true,
        }
    },
    computed: {
        ...mapState(['mess', 'arrNum', 'scrnWidth', 'scrnHeight']),

    },
    mounted() {
        this.load()
        this.$nextTick(() => {
         })
    },
    methods: {
        ...mapMutations(['getMess', 'byValue', 'phint', 'act']),
        userInfo() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`get_user_info/?user=${this.mess.user}&token=${token}`, {}, r => {
                this.walletinfo = this.$des.encrypt(JSON.stringify(r.wallet))
                if (r.allow_plus_ten === '1') {
                    this.oneShow = false
                    this.onePlus = r.allow_plus_ten
                    this.twoDise = false
                }
                if (r.allow_plus_twenty === '1') {
                    this.twoShow = false
                    this.twoPlus = r.allow_plus_twenty
                    this.fiveDise = false
                }
                if (r.allow_plus_fifty === '1') {
                    this.fiveShow = false
                    this.fivePlus = r.allow_plus_fifty
                }
                this.amount = r.wallet[0].amount
            })
        },
        //矩阵信息
        present() {
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.get(`c_array/?user=${this.mess.user}&token=${token}`, {}, r => {
                //100矩阵信息
                if (r.msg.array_100.length > 0) {
                    this.oneShow = false
                    this.arr_100 = r.msg.array_100
                    for (let i = 0, max = this.arr_100.length; i < max; i++) {
                        if (this.arr_100[i].split("_")[2] === 'sa') {

                            if (i === 1) {
                                this.oneSe1 = true
                            }
                            if (i === 2) {
                                this.oneSe2 = true
                            }
                            if (i === 3) {
                                this.oneSe3 = true
                            }
                            if (i === 4) {
                                this.oneSe4 = true
                            }
                            if (i === 5) {
                                this.oneSe5 = true
                            }
                            if (i === 6) {
                                this.oneSe6 = true
                            }
                        }
                        // if (this.arr_100[i] === '0') {
                        //     this.oneDot = true
                        // } else {
                        //     this.oneDot = false
                        // }
                        this.arr_100[i] = this.arr_100[i].split("_")[0]
                    }
                }
                //200矩阵信息
                if (r.msg.array_200.length > 0) {
                    this.twoShow = false
                    this.arr_200 = r.msg.array_200
                    for (let i = 0, max = this.arr_200.length; i < max; i++) {
                        if (this.arr_200[i].split("_")[2] === 'sa') {

                            if (i === 1) {
                                this.twoSe1 = true
                            }
                            if (i === 2) {
                                this.twoSe2 = true
                            }
                            if (i === 3) {
                                this.twoSe3 = true
                            }
                            if (i === 4) {
                                this.twoSe4 = true
                            }
                            if (i === 5) {
                                this.twoSe5 = true
                            }
                            if (i === 6) {
                                this.twoSe6 = true
                            }
                        }
                        // if (this.arr_200[i] === '0') {
                        //     this.arr_200[i] = '.....'
                        // }
                        this.arr_200[i] = this.arr_200[i].split("_")[0]
                    }
                }
                //500矩阵信息
                if (r.msg.array_500.length > 0) {
                    this.fiveShow = false
                    this.arr_500 = r.msg.array_500
                    for (let i = 0, max = this.arr_500.length; i < max; i++) {
                        if (this.arr_500[i].split("_")[2] === 'sa') {

                            if (i === 1) {
                                this.fiveSe1 = true
                            }
                            if (i === 2) {
                                this.fiveSe2 = true
                            }
                            if (i === 3) {
                                this.fiveSe3 = true
                            }
                            if (i === 4) {
                                this.fiveSe4 = true
                            }
                            if (i === 5) {
                                this.fiveSe5 = true
                            }
                            if (i === 6) {
                                this.fiveSe6 = true
                            }
                        }
                        // if (this.arr_500[i] === '0') {
                        //     this.arr_500[i] = '.....'
                        // }
                        this.arr_500[i] = this.arr_500[i].split("_")[0]
                    }
                }
            })
        },
        matrix() {
            this.$router.push({ name: '矩阵历史' })
        },
        wallet() {
            this.$router.push({ path: '/fundes', query: { wallet: this.walletinfo } })
        },
        // 刷新
        load() {
            this.$nextTick(() => {
                if (!this.matScroll) {
                    this.matScroll = new BScroll(this.$refs.mat, {
                        pullUpLoad: true,
                        click: true,
                        scrollY: true,
                        probeType: 3
                    })
                    // 下拉刷新
                    this.matScroll.on('scroll', (pos) => {
                        if (pos.y > 50) {

                        }
                    })
                    this.matScroll.on('touchEnd', (pos) => {
                        //下拉刷新
                        if (pos.y > 50) {
                            this.num = this.num + 1
                            this.arr.push(this.num)
                        }
                        // 上拉加载
                        if (this.matScroll.maxScrollY > pos.y + 10) {
                            this.matScroll.refresh()
                        }
                    })

                } else {
                    this.matScroll.refresh()
                }

                // this.matscroll.finishPullUp()

            })
        },
        // 开启100矩阵
        five() {
            this.loadingOne = true
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`c_array/100/?user=${this.mess.user}&token=${token}`, {}, r => {
                if (r.state === 200) {
                    let _this = this
                    this.reload()
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.oneShow = false
                            _this.loadingOne = false
                        }
                    })
                } else if (r.state === 400) {
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ path: '/personage' })
                            _this.loadingOne = false
                        }
                    })
                }

            })
        },
        //开启200矩阵
        ten() {
            this.loadingTwo = true
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`c_array/200/?user=${this.mess.user}&token=${token}`, {}, r => {
                if (r.state === 200) {
                    this.reload()
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.twoShow = false
                            _this.loadingTwo = false
                        }
                    })
                } else if (r.state === 400) {
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ path: '/personage' })
                            _this.loadingTwo = false
                        }
                    })
                }
            })
        },
        //开启500矩阵
        twenty() {
            this.loadingThree = true
            this.getMess()
            this.byValue()
            let token = this.$des.encrypt(`${this.mess.token}${this.arrNum}`)
            this.$api.post(`c_array/500/?user=${this.mess.user}&token=${token}`, {}, r => {
                if (r.state === 200) {
                    this.reload()
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.fiveShow = false
                            _this.loadingThree = false
                        }
                    })
                } else if (r.state === 400) {
                    let _this = this
                    this.$Modal.warning({
                        title: r.msg,
                        onOk() {
                            _this.$router.push({ path: '/personage' })
                            _this.loadingThree = false
                        }
                    })
                }
            })
        },

    },
    components: {
        Slides
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
@import "../../publi/scss/mixin";

.home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    background: url('../../publi/img/bac.png') no-repeat;
    background-size: 100% 100%;
    
    .lump {
        transition: all 0.3s;

        &.lump-enter-active {
            transition: all 0.3s;
        }

        &.lump-enter {
            transform: translateX(100%);
        }

        &.lump-leave-active {
            transition: all 0.3s;
        }

        &.lump-leave-to {
            transform: translateX(100%);
        }
    }
    
    // .head {
    //     padding: 0 5%;
    //     text-align: center;
    //     width: 100%;
    //     height: 40px;
    //     opacity: 1;
    //     font-size: 16px;
    //     line-height: 40px;
    //     color: #ccc;

    //     .current {
    //         display: inline-block;
    //         font-size: 18px;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         line-height: 25px;
    //         color: rgba(86, 144, 243, 1);
    //         opacity: 0.85;

    //     }
    // }

    .txt {
        width: 100%;
        // height: 40px;
        padding: 0 5%;

    }



    .content {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 0 3%;
        padding-top: 3%;
        width: 100%;
        overflow: hidden;

        .hint {
            padding: 2%;
            letter-spacing: 2px;
            background: rgba(242, 164, 166, 0.5);
            opacity: 1;
            border-radius: 10px;

            .txt {
                font-size: 15px;
                font-family: PingFang SC;
                font-weight: 100;
                line-height: 17px;
                color: rgba(15, 26, 71, 1);
                opacity: 1;
                padding: 0;

                .txt_name {
                   display: inline-block;
                   color: #5690f3;
                   max-width: 30px;
                   overflow: hidden;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   transform: translateY(3.4px);
                }
            }
        }

        .integral {
            display: flex;
            padding: 2% 0;
            // font-size: 12px;
            // font-family: PingFang SC;
            // font-weight: bolder;
            // border-radius: 5px;
            // color: rgba(59, 63, 75, 0.7);
            opacity: 1;

            .in_txt {
                flex: 0 0 40px;
                width: 40px;
                text-align: center;
                font-size: 125%;
                line-height: 1.9;
                font-family: PingFang SC;
                color: rgba(59, 63, 75, 1);
                opacity: 1;
            }

            .in_num {
                flex: 0 0 70px;
                margin-left: 1%;
                line-height: 2.5;
                font-size: 110%;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(86, 144, 243, 1);
                opacity: 1;
            }
            .wallet {
                text-align: center;
                margin: 0 8%;
                flex: 0 0 70px;
                font-size: 125%;
                font-family: PingFang SC;
                font-weight: 400;
                border-bottom: 1px solid rgba(86, 144, 243, 1);
                line-height: 2;
                color: rgba(86, 144, 243, 1);
                opacity: 0.86;
            }
            .history {
                text-align: center;
                flex: 0 0 70px;
                font-size: 125%  ;
                font-family: PingFang SC;
                font-weight: 400;
                border-bottom: 1px solid rgba(86, 144, 243, 1);
                line-height: 2;
                color: rgba(86, 144, 243, 1);
                opacity: 0.86;
            }
        }



        .present {
            // overflow: hidden;

            p {
                position: relative;
                z-index: 10;
                font-size: 12px;
                font-family: PingFang SC;
                color: rgba(255, 0, 0, 0.5);
                line-height: 1 !important;
                transform: translateY(-137%);
            }

            .one {
                position: relative;
                padding: 4.5%;
                background: rgba(255, 255, 255, 1);
                // border: 1px solid rgba(105, 167, 252, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;

                .type {
                    position: absolute;
                    top: 13%;
                    left: 3%;
                    width: 32%;
                    height: 12%;
                    background: url('../../publi/img/100point.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }

                 .shade {
                 position: absolute;
                 top: -2%;
                 left: -3%;
                 width: 100%;
                 height: 100%;
                 z-index: 11;
                
                .img_cover {
                    width: 102.5%;
                    height: 103%;
                    @include bg-img('../../publi/img/100cover', 103% 106%)
                }

                .but {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(171,171,171,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }
                
                .but_o {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(112,178,252,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }

            }

            }

            .two {
                position: relative;
                padding: 4.5%;
                margin-top: 3.5%;
                background: rgba(206, 226, 254, 1);
                // border: 1px solid rgba(105, 167, 252, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;
             
                .type {
                    position: absolute;
                    top: 13%;
                    left: 3%;
                    width: 32%;
                    height: 12%;
                    background: url('../../publi/img/200point.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }
                 .shade {
                 position: absolute;
                 top: -2%;
                 left: -3%;
                 width: 100%;
                 height: 100%;
                 z-index: 11;
                
                .img_cover {
                    width: 102.5%;
                    height: 103%;
                    @include bg-img('../../publi/img/200cover', 103% 106%)
                }

                .but {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(171,171,171,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }
                
                .but_o {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(112,178,252,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }

            }

            }

            .three {
                position: relative;
                padding: 4.5%;
                margin-top: 3.5%;
                background: rgba(255, 255, 255, 1);
                // border: 1px solid rgba(105, 167, 252, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;


                .type {
                    position: absolute;
                    top: 13%;
                    left: 3%;
                    width: 32%;
                    height: 12%;
                    background: url('../../publi/img/500point.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }

                 .shade {
                 position: absolute;
                 top: -2%;
                 left: -3%;
                 width: 100%;
                 height: 100%;
                 z-index: 11;
                
                .img_cover {
                    width: 102.5%;
                    height: 103%;
                    @include bg-img('../../publi/img/500cover', 103% 106%)
                }

                .but {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(171,171,171,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }
                
                .but_o {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(112,178,252,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }

            }

            }

            .four {
                position: relative;
                padding: 4.5%;
                margin-top: 3.5%;
                background: rgba(206, 226, 254, 1);
                // border: 1px solid rgba(105, 167, 252, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;

                .type {
                    position: absolute;
                    top: 13%;
                    left: 3%;
                    width: 32%;
                    height: 12%;
                    background: url('../../publi/img/1000point.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }

                .shade {
                 position: absolute;
                 top: -3%;
                 left: -3%;
                 width: 100%;
                 height: 100%;
                 z-index: 11;
                
                .img_cover {
                    width: 103%;
                    height: 103%;
                    @include bg-img('../../publi/img/1000cover', 103% 106%)
                }

                .but {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(171,171,171,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }
                
                .but_o {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(112,178,252,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }

            }

            }

            .five {
                position: relative;
                padding: 4.5%;
                margin-top: 3.5%;
                background: rgba(255, 255, 255, 1);
                // border: 1px solid rgba(105, 167, 252, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                opacity: 1;
                border-radius: 10px;

                .type {
                    position: absolute;
                    top: 10%;
                    left: 3%;
                    width: 34%;
                    height: 18%;
                    background: url('../../publi/img/2000point.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }

                .shade {
                 position: absolute;
                 top: -2%;
                 left: -3%;
                 width: 100%;
                 height: 100%;
                 z-index: 11;
                
                .img_cover {
                    width: 102.5%;
                    height: 100%;
                    @include bg-img('../../publi/img/2000cover', 103% 106%)
                }

                .but {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(171,171,171,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }
                
                .but_o {
                   position: absolute;
                   top: 44%;
                   left: 32%;
                   border: none;
                   padding: 3% 10%;
                   background:rgba(112,178,252,1);
                   box-shadow:0px 3px 6px rgba(0,0,0,0.16);
                   border-radius:5px;
                   font-size:18px;
                   font-family:PingFang SC;
                   font-weight:400;
                   color:rgba(255,255,255,1);
                   opacity:1;
                }

            }

            }



            .matrixBox {
                overflow: hidden;
                position: relative;

                .img_bc1 {
                    position: absolute;
                    top: 4%;
                    left: 10%;
                    width: 80%;
                    height: 64%;

                }

                .img_bc2 {
                    position: absolute;
                    top: 60%;
                    left: -17%;
                    width: 80%;
                    height: 64%;

                }

                .img_bc3 {
                    position: absolute;
                    top: 60%;
                    left: 38%;
                    width: 80%;
                    height: 64%;
                    z-index: 2;

                }
                
                .img_dot1 {
                    position: absolute;
                    top: 27%;
                    left: 3%;
                    width: 15%;
                    height: 15%;
                }

                .img_dot2 {
                    position: absolute;
                    top: 8%;
                    left: 84%;
                    width: 15%;
                    height: 15%;
                }

                .img_dot3 {
                    position: absolute;
                    top: 60%;
                    left: 81%;
                    width: 15%;
                    height: 15%;
                    z-index: 1;
                }

                .tier_one {
                    text-align: center;

                    .host {
                        position: relative;
                        z-index: 1;
                        width: 24%;
                        height: 34px;
                        display: inline-block;
                        font-size: 16px;
                        line-height: 2.1;
                        max-height: 40px;
                        max-width: 80px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(59, 63, 75, 1);
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        opacity: 1;
                        border-radius: 5px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        // &::after {
                        // content: "..."; 
                        // position: absolute; 
                        // bottom: 0; 
                        // right: 0; 
                        // padding-left: 40px;
                        // background: -webkit-linear-gradient(left, transparent, #fff 55%);
                        // background: -o-linear-gradient(right, transparent, #fff 55%);
                        // background: -moz-linear-gradient(right, transparent, #fff 55%);
                        // background: linear-gradient(to right, transparent, #fff 55%);
                        // }
                    }
                }

                .tier_two {
                    display: flex;
                    margin: 11% 0;
                    
                    .dot {
                        width: 50%;
                        height: 36px;
                        display: inline-block;
                        opacity: 1;
                        position: relative;
                        z-index: 1;
                        line-height: 3.1;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        border-radius: 5px;
                        i {
                            display: inline-block;
                            width: 4px;
                            height: 4px;
                            border-radius: 50%;
                            opacity: 1;
                        }
                        .d1 {
                           background:rgba(176,210,248,1);
                        }
                        .d2 {
                           background:rgba(146,191,252,1);
                        }
                        .d3 {
                           background:rgba(105,167,252,1);
                        }
                    }

                    .deputy_one {
                        flex: 1;
                        text-align: center;

                        span {
                            position: relative;
                            z-index: 2;
                            display: inline-block;
                            width: 50%;
                            height: 36px;
                            max-height: 40px;
                            max-width: 82px;
                            line-height: 2.1;
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .deputy_two {
                        flex: 1;
                        text-align: center;

                        span {
                            position: relative;
                            z-index: 2;
                            display: inline-block;
                            width: 50%;
                            height: 36px;
                            max-height: 40px;
                            max-width: 80.19px;
                            line-height: 2.1;
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            opacity: 1;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }

                .tier_three {
                    display: flex;
                    text-align: center;
                    margin-bottom: 1%;

                    .dot {
                        width: 90%;
                        height: 36px;
                        display: inline-block;
                        opacity: 1;
                        position: relative;
                        z-index: 2;
                        line-height: 3.1;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        border-radius: 5px;
                        i {
                            display: inline-block;
                            width: 4px;
                            height: 4px;
                            border-radius: 50%;
                            opacity: 1;
                        }
                        .d1 {
                           background:rgba(176,210,248,1);
                        }
                        .d2 {
                           background:rgba(146,191,252,1);
                        }
                        .d3 {
                           background:rgba(105,167,252,1);
                        }
                    }

                    .below1 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-height: 36px;
                            max-width: 72.17px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                        }
                    }

                    .below2 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-height: 36px;
                            max-width: 72.17px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                        }
                    }

                    .below3 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-height: 36px;
                            max-width: 72.17px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                        }
                    }

                    .below4 {
                        flex: 1;
                        max-height: 36px;

                        span {
                            position: relative;
                            z-index: 2;
                            width: 90%;
                            height: 36px;
                            max-height: 36px;
                            max-width: 72.17px;
                            line-height: 2.1;
                            font-size: 16px;
                            display: inline-block;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: rgba(59, 63, 75, 1);
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                            opacity: 1;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                        }
                    }


                }
            }
        }





    }

}
</style>