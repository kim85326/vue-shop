import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import user from "./user";
import role from "./role";
import category from "./category";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    auth,
    user,
    role,
    category
  }
});

export default store;
