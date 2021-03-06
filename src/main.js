import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(
  VueAxios,
  axios.create({
    //baseURL: "http://192.168.99.10:3333/",    //Rede Wifi Volt
    //baseURL: "http://127.0.0.1:3333/",        //Note Alexandre
    baseURL: "http://192.168.9.4:3333/",        //Labserver 2
    //baseURL: "http://138.94.52.123:3333/",    //KingHost
  })
);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
