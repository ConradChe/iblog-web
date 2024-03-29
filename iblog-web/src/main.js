import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './assets/css/style.css'

Vue.use(ElementUI);

Vue.config.productionTip = false
// Vue.prototype.HOST = "/"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
