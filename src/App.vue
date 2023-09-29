<template>
    <component :is="layout">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </component>
</template>

<script>
import MainLayout from "./views/layouts/MainLayout.vue";
import QuizzLayout from "./views/layouts/QuizzLayout.vue";

export default {
    name: "App",
    data: () => ({}),
    computed: {
        layout() {
            switch (this.$route.meta.layout) {
                case "main":
                    return MainLayout;
                case "quizz":
                    return QuizzLayout;
                default:
                    return MainLayout;
            }
        },
    },
};
</script>

<style scoped>
.fade-enter-active {
    transition: all ease .75s;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}
</style>
