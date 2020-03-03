import Vue from "vue"; // 等于 import Vue from "vue/dist/vue.runtime.common.js";
import App from "./App.vue";
import router from "./router";
import './router/premit.js';
import store from "./store";
import ElementUI, { Form } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';

//自定义全局组件引入
import './icons/index.js';

//自定义全局方法
import global from '@/utils/global.js'
//引用全局方法后注入全局
Vue.use(global);

Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.config.productionTip = false;

//runtime模式（运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
