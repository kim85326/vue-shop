import Vue from "vue";
import VueRouter from "vue-router";
import menuList from "@/common/menuList";

Vue.use(VueRouter);

const generateRoute = menu => {
  const route = {
    ...menu,
    path: menu.name
  };

  if (menu.children === undefined) {
    return {
      ...route,
      meta: {
        title: menu.displayName
      },
      component: () => import(`@/views/${menu.folder}/${menu.name}`)
    };
  }

  return {
    ...route,
    component: () => import("@/components/common/RouterTemplate"),
    children: menu.children.map(subMenu => generateRoute(subMenu))
  };
};

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/",
    component: () => import("@/views/Home"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Dashboard")
      },
      ...menuList.map(menu => generateRoute(menu))
    ]
  },
  {
    path: "*",
    component: () => import("@/views/NotFound")
  }
];

const router = new VueRouter({
  routes
});

export default router;
