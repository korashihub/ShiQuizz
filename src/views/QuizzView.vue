<template>
    <section>
        <header v-if="!this.config.firstStart" class="quizz-header">
            <div class="quizz-header-info">
                <h1>
                    Question:
                    {{ config.currentQuestion + 1 + "/" + questions.length }}
                </h1>
            </div>
            <div class="quizz-header-actions">
                <button class="btn-primary cancel" @click="cancelHandler">
                    Cancel
                </button>
                <button class="btn-primary finish" @click="finishHandler">
                    Finish
                </button>
            </div>
        </header>
        <section class="quizz">
            <div v-if="this.config.firstStart" class="container">
                <div class="quizz-countdown">
                    <h1 class="quizz-countdown-title">Quizz starts in</h1>
                    <h1 class="quizz-countdown-count">{{ countDown }}</h1>
                </div>
            </div>
            <div v-else class="container">
                <div v-if="this.questions?.length > 0">
                    <div class="quizz-question">
                        <div class="quizz-info">
                            <span class="quizz-info-item"
                                >Category:
                                <span>
                                    {{
                                        questions[config.currentQuestion].category
                                    }}</span
                                >
                            </span>
                            <span class="quizz-info-item"
                                >Type:
                                <span>
                                    {{
                                        questions[
                                            config.currentQuestion
                                        ].type.toUpperCase()
                                    }}</span
                                >
                            </span>
                            <span class="quizz-info-item"
                                >Difficulty:
                                <span
                                    :style="{
                                        color:
                                            questions[config.currentQuestion]
                                                .difficulty == 'hard'
                                                ? '#C70039'
                                                : questions[config.currentQuestion]
                                                      .difficulty == 'medium'
                                                ? '#EE9322'
                                                : '#79AC78',
                                    }"
                                    >{{
                                        questions[
                                            config.currentQuestion
                                        ].difficulty.toUpperCase()
                                    }}</span
                                ></span
                            >
                        </div>
                        <p v-html="questions[config.currentQuestion].question"></p>
                        <div class="quizz-options" style="min-height: 200px">
                            <div
                                v-for="(option, index) in randomOptions"
                                :key="index"
                            >
                                <label
                                    :for="option"
                                    class="quizz-option"
                                    :style="{
                                        backgroundColor:
                                            answers[config.currentQuestion] ==
                                            option
                                                ? '#053b50'
                                                : '',
                                        color:
                                            answers[config.currentQuestion] ==
                                            option
                                                ? '#fff'
                                                : '',
                                    }"
                                >
                                    <span v-html="option"></span>
                                    <input
                                        :id="option"
                                        :value="option"
                                        @change="addAnswer($event)"
                                        :checked="
                                            answers[config.currentQuestion] ==
                                            option
                                        "
                                        type="radio"
                                        name="option"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="next-previous-buttons">
                        <button
                            :disabled="config.currentQuestion == 0"
                            @click="previousQuestion"
                            class="btn-primary"
                        >
                            Previous
                        </button>
                        <button
                            :disabled="
                                config.currentQuestion == questions.length - 1
                            "
                            @click="nextQuestion"
                            class="btn-primary"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "QuizzView",
    data() {
        return {
            countDown: 3,
        };
    },
    computed: {
        ...mapGetters({
            questions: "getQuestions",
            answers: "getAnswers",
            config: "getConfig",
            activities: "getActivities",
        }),
        randomOptions() {
            const options = [
                ...this.questions[this.config.currentQuestion]
                    .incorrect_answers,
                this.questions[this.config.currentQuestion].correct_answer,
            ];
            return options.sort(() => Math.random() - 0.5);
        },
    },
    async mounted() {
        if (this.config?.firstStart === true) {
            this.firstStartMethod();
            await this.getQuestionsMethod(this.config.apiUrl);
            this.setDefaultAnswers();
        } else if (this.config?.isActive == false) {
            await this.setConfigMethod({
                isActive: false,
                firstStart: true,
                currentQuestion: 0,
                apiUrl: "",
            });
            this.$router.push("/create-quizz");
        }

        if (this.config?.apiUrl == "") {
            this.$router.push("/create-quizz");
        }
    },
    methods: {
        ...mapActions({
            getQuestions: "fetchQuestions",
            setConfig: "setConfig",
            setAnswers: "setAnswers",
            clearAnswers: "clearAnswers",
            clearQuestions: "clearQuestions",
            setActivities: "setActivities",
            addActivity: "addActivity",
        }),
        async setConfigMethod(config) {
            await this.setConfig(config);
        },
        async getQuestionsMethod(apiUrl) {
            await this.getQuestions(apiUrl);
        },
        firstStartMethod() {
            const countSound = new Audio("sounds/count.mp3");
            const goSound = new Audio("sounds/go.mp3");
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);

            document.body.style.backgroundColor = "#" + randomColor;
            countSound.play();

            const countDownInterval = setInterval(() => {
                if (this.countDown > 1) {
                    randomColor = Math.floor(Math.random() * 16777215).toString(
                        16
                    );
                    document.body.style.backgroundColor = "#" + randomColor;
                    countSound.play();

                    this.countDown--;
                } else {
                    goSound.play();
                    document.body.style.backgroundColor = "#eee";
                    this.countDown = 3;
                    this.setConfigMethod({
                        isActive: true,
                        firstStart: false,
                        currentQuestion: 0,
                        apiUrl: this.config.apiUrl,
                    });
                    clearInterval(countDownInterval);
                }
            }, 1050);
        },
        setDefaultAnswers() {
            const questionCount = this.questions.length;
            const answers = [];
            for (let i = 0; i < questionCount; i++) {
                answers.push("");
            }
            this.setAnswers(answers);
        },
        addAnswer(event) {
            const answers = [...this.answers];
            answers[this.config.currentQuestion] = event.target.value;
            this.setAnswers(answers);
        },
        nextQuestion() {
            const config = { ...this.config };
            config.currentQuestion++;
            this.setConfigMethod(config);
        },
        previousQuestion() {
            const config = { ...this.config };
            config.currentQuestion--;
            this.setConfigMethod(config);
        },
        cancelHandler() {
            this.$swal({
                title: "Are you sure?",
                text: "You will not be able to recover this quizz!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setConfigMethod({
                        isActive: false,
                        firstStart: false,
                        currentQuestion: 0,
                        apiUrl: "",
                    });
                    this.clearAnswers();
                    this.clearQuestions();
                    this.$router.push("/");
                }
            });
        },
        async finishHandler() {
            this.$swal({
                title: "Are you sure?",
                text: "You will not be able to recover this quizz!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, finish it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    const questions = [...this.questions];
                    const answers = [...this.answers];
                    this.addActivity({
                        date: new Date(),
                        questions: questions,
                        answers: answers,
                    });
                    this.setConfigMethod({
                        isActive: false,
                        firstStart: false,
                        currentQuestion: 0,
                        apiUrl: "",
                    });
                    this.clearAnswers();
                    this.clearQuestions();
                    this.$router.push("/activity");
                }
            });
        }
    },
};
</script>

<style scoped></style>
