import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/views/Home.vue";
import AboutView from "./components/views/About.vue";
import DiscussionView from "./components/views/Discussion.vue";
import IssuesView from "./components/views/Issues.vue";
import IssueView from "./components/views/Issue.vue";

import LoginView from "./components/views/Login.vue";
import RegisterView from "./components/views/Register.vue";

import authService from "./authService";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: "/about",
        name: "About",
        component: AboutView,
    },
    {
        path: "/issues",
        name: "Issues",
        component: IssuesView,
        meta: { requiresAuth: true },
    },
    {
        path: "/issues/:id",
        name: "Issue",
        component: IssueView,
        meta: { requiresAuth: true },
    },
    {
        path: "/discussion",
        name: "Discussion",
        component: DiscussionView,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/:catchAll(.*)",
        redirect: { name: "Home" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = await authService.isAuthenticated();
        if (!isAuthenticated) {
            next({ name: "login" });
            return;
        }
    }
    next();
});

export default router;