// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/resets.css'
import './assets/js/rem'
import store from './store'
Vue.config.productionTip = false
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant);
import 'swiper/css/swiper.min.css';
import "swiper/js/swiper.min.js";
// 引入懒加载插件
import VueLazyload from 'vue-lazyload' 
Vue.use(VueLazyload, {
  error: require('./assets/img/1.jpg'),  //查询不到图片时显示默认图片
  loading: require('./assets/img/1.jpg'),  //加载图片
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
