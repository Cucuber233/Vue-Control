import Vue from 'vue';
import SvgIcon from './Svgicon.vue';
//自定义全局组件
Vue.component('svg-icon', SvgIcon)

//解析文件
// require.context(‘./svg’, false, /\.svg$/) 参数说明： 读取指定目录的文件
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  //console.log(requireContext.keys())
 // console.log(requireContext.keys().map(requireContext))
  return requireContext.keys().map(requireContext)
}
requireAll(req)
