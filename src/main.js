import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Grid from "vue-js-grid"
import VueInputAutowidth from 'vue-input-autowidth'

Vue.use(VueInputAutowidth)
Vue.use(Grid);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
