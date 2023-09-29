<template>
    <div>
        <header class="header">
            <div class="h-logo">
                <router-link to="/">
                    <h1>ShiQuizz</h1>
                </router-link>
            </div>
            <div class="h-nav">
                <router-link to="/">Home</router-link>
                <router-link to="/create-quizz">Take a Quizz</router-link>
                <router-link to="/activity">Activity</router-link>
            </div>
        </header>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "MainLayout",
};
</script>
<style></style>
