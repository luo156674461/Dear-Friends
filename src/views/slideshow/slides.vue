<template>
	<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide"><img src="../../publi/img/slidesone.png" width="100%" height="100%"></div>
    <div class="swiper-slide"><img src="../../publi/img/slidesone.png" width="100%" height="100%"></div>
    <div class="swiper-slide"><img src="../../publi/img/slidesone.png" width="100%" height="100%"></div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper';
import './swiper/dist/css/swiper.min.css'
export default {
	mounted() {
      this.init()
	},
	data() {
		return {

		}
	},
	methods: {
		init() {
			this.$nextTick(() => {
				this.mySwiper = new Swiper('.swiper-container', {
					loop: true,
					autoplay: {
						delay: 2000,
						stopOnLastSlide: false,
						disableOnInteraction: false
					}
				})
			})
		}
	}
}
</script>
<style scoped lang="scss">
@import '~scss_vars';
.swiper-container {
	height: 225%;
	.swiper-wrapper {

		.swiper-slide {
          
		}
	}
}	
</style>