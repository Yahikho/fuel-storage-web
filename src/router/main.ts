import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { getCookie } from "../utils/cookies"

const dynamicRoute: RouteRecordRaw[] = [
    {
        path: "/signin",
        name: "signin",
        component: () => import("../views/SignIn.vue")
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("../views/SignUp.vue")
    },
    {
        path: "/code",
        name: "code",
        component: () => import("../views/CodeValidation.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import('../views/NotFound.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: 'signin'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: dynamicRoute
})

router.beforeEach((to, _from, next) => {
    const isAuthenticated = !!getCookie('access_token');
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router