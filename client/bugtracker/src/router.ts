import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/views/Home.vue";
import AboutView from "./components/views/About.vue";
import DiscussionView from "./components/views/Discussion.vue";
import IssuesView from "./components/views/Issues.vue";
import IssueView from "./components/views/Issue.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
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
    },
    {
        path: "/issues/:id",
        name: "Issue",
        component: IssueView,
    },
    {
        path: "/discussion",
        name: "Discussion",
        component: DiscussionView,
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

export default router;