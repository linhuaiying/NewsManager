import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import request from '@/utils/request.js'   // 记得改为你的路径

Vue.prototype.request = request  // 此处命名为rq,你可以改
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueAxios,axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
