<template>
    <div class="box" @click="out">
            <Alert type="warning" show-icon>
                登录超时
                <template slot="desc">
                    您已登录超时，请点击
                </template>
            </Alert>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	computed: {
     // ...mapState(['appear'])
	},
    methods:{
    	...mapActions(['inchange']),
    	out() {
    		this.inchange()
        localStorage.removeItem('active');
    		this.$router.push({ path: '/login'})
    	}
    }
}
</script>
<style scoped>
   .box{
   	position: fixed;
   	left: 0;
   	top: 0;
   	bottom: 0;
   	width: 100%;
   	background: rgba(7,17,27,0.5);
   	z-index: 10000;
   }
   .ivu-alert{
   	 margin: 35% auto;
   	 width: 50%;
   }
</style>