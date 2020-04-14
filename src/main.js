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

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("token") && store.getters["auth/isLoggedIn"] === false) {
    await store.dispatch("auth/getCurrentUser");
  }

  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Vue Shop";
  }

  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
