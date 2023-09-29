import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import CreateQuizz from "../views/CreateQuizzView.vue";
import QuizzView from "../views/QuizzView.vue";
import ActivityView from "../views/ActivityView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            layout: "main",
        },
    },
    {
        path: "/home",
        name: "home2",
        component: Home,
        meta: {
            layout: "main",
        },
    },
    {
        path: "/create-quizz",
        name: "create-quizz",
        component: CreateQuizz,
        meta: {
            layout: "main",
        },
    },
    {
        path: "/quizz",
        name: "quizz",
        component: QuizzView,
        meta: {
            layout: "quizz",
        },
    },
    {
        path: "/activity",
        name: "activity",
        component: ActivityView,
        meta: {
            layout: "main",
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
