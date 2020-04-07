import Vue from "vue";
import ElementUI from "element-ui";
import VeeValidate from "vee-validate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.use(VeeValidate, { inject: false });

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000/api/v1/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
