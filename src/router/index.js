import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    beforeEnter: (to, from, next) => {
      // 有登入，不可以去登入頁面
      if (localStorage.getItem("token")) {
        next({ path: "/" });
      } else {
        next();
      }
    }
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
