import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import { useSessionStore } from "../features/auth/stores/session.store";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/",
      component: AuthLayout,
      meta: { guestOnly: true },
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../features/auth/views/LoginView.vue"),
        },
        {
          path: "cadastro",
          name: "register",
          component: () => import("../features/auth/views/RegisterView.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../features/dashboard/views/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", redirect: "/login" },
  ],
});
router.beforeEach((to) => {
  const session = useSessionStore();
  if (to.meta.requiresAuth && !session.isAuthenticated)
    return { name: "login" };
  if (to.meta.guestOnly && session.isAuthenticated)
    return { name: "dashboard" };
});
