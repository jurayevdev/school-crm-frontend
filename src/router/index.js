import { createRouter, createWebHistory } from "vue-router";
import {
  HomeView,
  Dashboard,
  Students,
  Teachers,
  Login,
  Error,
  Tests,
  Settings,
  Groups,
  Results,
  SlugStudent,
  SlugTeachers,
  SlugTests,
  SlugResults,
  SlugGroups,
  SlugSubjects,
  Subjects,
  Payment,
  Attendance,
  Customer,
  Sms,
} from "../views";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { roles: ["superadmin", "owner", "administrator"] },
    children: [
      {
        path: "/",
        name: "dashboard",
        component: Dashboard,
        meta: { roles: ["superadmin", "owner", "administrator"] },
      },
      {
        path: "/employees",
        name: "employees",
        component: Teachers,
        meta: { roles: ["superadmin", "owner", "administrator"] },
      },
      {
        path: "/employee/:id/:id",
        name: "slug_teachers",
        component: SlugTeachers,
        meta: { roles: ["superadmin", "owner", "administrator"] },
      },
      {
        path: "/students",
        name: "students",
        component: Students,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/students/:id/:name",
        name: "slug_students",
        component: SlugStudent,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/customer",
        name: "customers",
        component: Customer,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/tests",
        name: "tests",
        component: Tests,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/subjects/:id/:name",
        name: "slug_subjects",
        component: SlugSubjects,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/subjects",
        name: "subjects",
        component: Subjects,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/payment",
        name: "payment",
        component: Payment,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/attendance",
        name: "attendance",
        component: Attendance,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/sms",
        name: "sms",
        component: Sms,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/results",
        name: "results",
        component: Results,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/results/:id",
        name: "slug_results",
        component: SlugResults,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/groups",
        name: "groups",
        component: Groups,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/groups/:id/:name",
        name: "slug_groups",
        component: SlugGroups,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/tests/question/:name",
        name: "slug_questions",
        component: SlugTests,
        meta: { roles: ["superadmin", "administrator"] },
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings,
        meta: { roles: ["superadmin", "owner", "administrator"] },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else if (to.meta.roles && !to.meta.roles.includes(role)) {
    next({ name: "error" });
  } else {
    next();
  }
});

export default router;
