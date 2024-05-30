import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

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
        path: '/:pathMatch(.*)*',
        redirect: 'signin'
    },
    /*{
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: import("../views/NotFound.vue"),
    },*/
    {
        path: '/',
        redirect: 'signin'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: dynamicRoute
})

export default router