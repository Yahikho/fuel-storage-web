import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { getCookie } from "../utils/cookies"

const dynamicRoute: RouteRecordRaw[] = [
    {
        path: "/signin",
        name: "signin",
        component: () => import("../views/SignIn.vue")
    },
    {
        path: "/singup",
        name: "singup",
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
        path: '/',
        redirect: 'signin'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: dynamicRoute
})

router.beforeEach((to, _from, next) => {
    if (to.name !== 'signin' && !getCookie('access_token')) {
        next({ path: '/signin' });
    } else if ((to.name === 'signin' || to.name === 'singup') && getCookie('access_token')) {
        next({ path: '/home' });
    } else {
        next();
    }
});

export default router