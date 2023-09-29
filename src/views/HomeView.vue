<template>
    <section class="home">
        <div class="container">
            <div class="card">
                <div class="card-title">Welcome to ShiQuizz Platform!</div>
                <div class="card-content">
                    Looking to challenge your knowledge and have some fun?
                    You're in the right place! Explore a wide range of quiz
                    categories and put your skills to the test. Whether you're a
                    history buff, a science enthusiast, a movie fanatic, or
                    anything in between, we have quizzes tailored just for you.
                    Ready to dive in and test your knowledge? Click the "Take a
                    Quiz" button below and let the quizzing adventure begin!
                </div>
                <div class="card-actions">
                    <router-link to="/create-quizz" class="btn-primary">Take a Quizz</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeView",
};
</script>

<style scoped></style>
