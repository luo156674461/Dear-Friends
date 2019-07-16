
// vue 全局传值
/*
  Bus.$emit('值名', 值)
  Bus.$on('值名', content => {})
*/
import Vue from 'vue'
const Bus = new Vue()

export default Bus

