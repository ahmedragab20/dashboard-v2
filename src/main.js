import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import "apexcharts/dist/apexcharts.css";
import "@/assets/style/main.scss";

Vue.config.productionTip = false;

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
