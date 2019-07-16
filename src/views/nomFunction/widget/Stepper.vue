<template>
<div class="stepper">
	<span class="minus" @click="min"><img src="../../../publi/img/minus.png" width="100%" height="100%"></span>
	<span class="num">{{num}}</span>
	<span class="add" @click="add"><img src="../../../publi/img/add.png" width="100%" height="100%"></span>
	<span class="empty" @click="emp">清空</span>
</div>
</template>
<script>
export default {
    mounted() {

    },
    data() {
        return {
        	num: 0
        }
    },
    computed: {

    },
    methods: {
      min() {
         if( this.num >=0.01) {
         	this.num = this.num - 0.01
         } 
      },
      add() {
      	if(this.num < 30 || this.num < 999) {
         this.num = this.num + 0.01
      	}
      },
      emp() {
      	 this.num = 0
      }
    }
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
.stepper {
	padding-top: 5px;
	width: 100%;
	line-height: 25px;
	span {
		display: inline-block;
	}
	.minus {
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}
	.num {
        width: 40%;
        text-align: center;
		font-size: 16px;
		font-weight: 700;
		transform: translateY(-6px);
	}
	.add {
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}
	.empty {
		transform: translateY(-7px);
		padding-left: 10px;
		font-size: 14px;
		color: #77DDFF;
	}
}
</style>