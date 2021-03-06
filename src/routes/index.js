import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/signup",
      component: () => import("@/views/SignupPage.vue"),
    },
    {
      path: "/pwfind",
      component: () => import("@/views/PwFindPage.vue"),
    },
    {
      path: "/main",
      component: () => import("@/views/MainPage.vue"),
    },
    {
      path: "/profileupdate",
      component: () => import("@/views/ProfileUpdatePage.vue"),
    },
    {
      path: "/createteam",
      component: () => import("@/views/CreateTeamPage.vue"),
    },
    {
      path: "/team/:teamId",
      component: () => import("@/views/TeamEditPage.vue"),
    },
    {
      path: "/team/:teamId/main",
      component: () => import("@/views/TeamMainPage.vue"),
    },

    {
      path: "*",
      component: () => import("@/views/NotFoundPage.vue"),
    },
  ],
});
