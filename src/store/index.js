import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import role from "./role";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    user,
    role
  }
});

export default store;
