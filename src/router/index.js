import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/user",
        meta: { title: "用戶列表" },
        component: () => import("@/views/permission/UserList")
      },
      {
        path: "/role",
        meta: { title: "角色列表" },
        component: () => import("@/views/permission/RoleList")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
