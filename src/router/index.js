import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/user",
        component: () => import("@/views/permission/UserList")
      },
      {
        path: "/role",
        component: () => import("@/views/permission/RoleList")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
