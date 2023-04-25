import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
      },
      {
        path: "/credits",
        name: "credits",
        component: () => import("@/views/Credits/index.vue"),
      },
      {
        path: "/credits/standards",
        name: "standards",
        component: () => import("@/views/Standards/index.vue"),
      },
      {
        path: "/credits/questions",
        name: "questions",
        component: () => import("@/views/Questions/index.vue"),
      },
      {
        path: "/revision",
        name: "revision",
        component: () => import("@/views/Revision/index.vue"),
      },
      {
        path: "/revision-one",
        name: "revision-one",
        component: () => import("@/views/Revision/-Components/checkOne.vue"),
      },
    ],
  },
  {
    path: "/blank",
    component: () => import("@/layouts/Dummy/Blank.vue"),
    children: [
      {
        path: "/dummy/blank",
        name: "blank-dummy",
        component: () => import("@/views/Dummy/index.vue"),
      },
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/auth/login"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
