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
    {
      path: "/doacoes",
      name: "donations",
      component: () =>
        import("../features/donations/views/DonationsListView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/doacoes/nova",
      name: "create-donation",
      component: () =>
        import("../features/donations/views/CreateDonationView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/doacoes/:id",
      name: "donation-details",
      component: () =>
        import("../features/donations/views/DonationDetailsView.vue"),
      meta: { requiresAuth: true },
    },
    { path: "/minhas-doacoes", redirect: "/doacoes" },
    {
      path: "/solicitacoes",
      name: "requests",
      component: () => import("../features/requests/views/RequestsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/solicitacoes/:id",
      name: "request-details",
      component: () =>
        import("../features/requests/views/RequestDetailsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/entregas",
      name: "deliveries",
      component: () =>
        import("../features/deliveries/views/DeliveriesView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/entregas/:id",
      name: "delivery-details",
      component: () =>
        import("../features/deliveries/views/DeliveryDetailsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/perfil",
      name: "profile",
      component: () => import("../features/profile/views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/instituicao/perfil",
      name: "institution-profile",
      component: () =>
        import("../features/profile/views/InstitutionProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/notificacoes",
      name: "notifications",
      component: () =>
        import("../features/notifications/views/NotificationsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/historico",
      name: "history",
      component: () => import("../features/history/views/HistoryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/administracao",
      name: "administration",
      component: () => import("../features/admin/views/AdministrationView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/conexoes",
      name: "connections",
      component: () =>
        import("../features/connections/views/ConnectionsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/impacto",
      name: "impact",
      component: () => import("../features/impact/views/ImpactView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/destino-sustentavel",
      name: "sustainable-destination",
      component: () =>
        import("../features/sustainability/views/SustainableDestinationView.vue"),
      meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", redirect: "/login" },
  ],
});
router.beforeEach((to) => {
  const session = useSessionStore();
  if (to.meta.requiresAuth && !session.isAuthenticated)
    return { name: "login" };
  if (to.name === "create-donation" && session.user?.role !== "donor")
    return { name: "donations" };
  if (to.name === "institution-profile" && session.user?.role !== "institution")
    return { name: "dashboard" };
  if (to.name === "administration" && session.user?.role !== "admin")
    return { name: "dashboard" };
  if (to.meta.guestOnly && session.isAuthenticated)
    return { name: "dashboard" };
});
