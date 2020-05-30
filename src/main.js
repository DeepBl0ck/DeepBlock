import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Grid from "vue-js-grid"
import VueInputAutowidth from 'vue-input-autowidth'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueInputAutowidth)
Vue.use(Grid);
Vue.config.productionTip = false

Vue.prototype.$axios = axios.create({
  baseURL: "http://15.165.165.54:8000/api",
  timeout: 1000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})
// Vue.prototype.$axios.defaults.headers.common['Access-Token'] = localStorage.getItme('token')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
