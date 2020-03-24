import Vue from "vue";
import ElementUI from "element-ui";
import VeeValidate from "vee-validate";

import App from "./App.vue";
import router from "./router";

import "reset-css";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/base.css";

Vue.use(ElementUI);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
