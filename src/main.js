import Vue from "vue";
import ElementUI from "element-ui";
import VeeValidate from "vee-validate";
import axios from "axios";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.use(VeeValidate, { inject: false });
Vue.use(VueMoment, { moment });
moment.tz.setDefault("Asia/Taipei");

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000/api/v1/";

router.beforeEach(async (to, from, next) => {
  // 設定標題
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Vue Shop";
  }

  const hasToken = localStorage.getItem("token") !== null;

  if (hasToken === true && store.getters["auth/isLoggedIn"] === false) {
    await store.dispatch("auth/getCurrentUser");
  }

  // 有登入，不可以去登入頁面
  if (hasToken === true && to.path === "/login") {
    next("/");
  } else if (hasToken === false && to.path !== "/login") {
    // 未登入，需導到登入頁
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
