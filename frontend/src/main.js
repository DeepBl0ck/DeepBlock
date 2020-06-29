import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Grid from "vue-js-grid";
import VueInputAutowidth from "vue-input-autowidth";
import axios from "axios";
import VueAxios from "vue-axios";
import "hchs-vue-charts";
import "chart.js";
import VueMq from "vue-mq";

Vue.use(VueAxios, axios);
Vue.use(VueInputAutowidth);
Vue.use(Grid);
Vue.use(window.VueCharts);
Vue.config.productionTip = false;

export const eventBus = new Vue();

Vue.use(VueMq, {
  breakpoints: {
    xs: 600,
    sm: 960,
    md: 1264,
    lg: 1904,
    xl: Infinity,
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
