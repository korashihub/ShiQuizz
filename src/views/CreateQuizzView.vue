<template>
    <section class="create-quizz">
        <div class="container-s">
            <div class="card">
                <div class="card-title">Take a Quizz</div>
                <div class="card-content">
                    <form class="cq-form-wrapper">
                        <div class="cq-form-group">
                            <label for="cq-form-label-1"
                                >Number of Questions:</label
                            >
                            <input
                                v-model="form.numberOfQuestions"
                                type="number"
                                id="cq-form-label-1"
                            />
                            <div
                                class="text-rules"
                                v-if="rules.numberOfQuestions.required.isActive"
                            >
                                {{ rules.numberOfQuestions.required.message }}
                            </div>
                        </div>
                        <div class="cq-form-group">
                            <label for="cq-form-label-2"
                                >Select Category:</label
                            >
                            <select
                                v-model="form.category"
                                id="cq-form-label-2"
                                class="cq-form-select"
                            >
                                <option value="any">Any Category</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">
                                    Entertainment: Musicals &amp; Theatres
                                </option>
                                <option value="14">
                                    Entertainment: Television
                                </option>
                                <option value="15">
                                    Entertainment: Video Games
                                </option>
                                <option value="16">
                                    Entertainment: Board Games
                                </option>
                                <option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">
                                    Entertainment: Comics
                                </option>
                                <option value="30">Science: Gadgets</option>
                                <option value="31">
                                    Entertainment: Japanese Anime &amp; Manga
                                </option>
                                <option value="32">
                                    Entertainment: Cartoon &amp; Animations
                                </option>
                            </select>
                        </div>
                        <div class="cq-form-group">
                            <label for="cq-form-label-3"
                                >Select Difficulty:</label
                            >
                            <select
                                v-model="form.difficulty"
                                id="cq-form-label-3"
                                class="cq-form-select"
                            >
                                <option value="any">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div class="cq-form-group">
                            <label for="cq-form-label-4">Select Type:</label>
                            <select
                                v-model="form.type"
                                id="cq-form-label-4"
                                class="cq-form-select"
                            >
                                <option value="any">Any Type</option>
                                <option value="multiple">
                                    Multiple Choice
                                </option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="card-actions">
                    <button @click="startQuizz()" class="btn-secondary">
                        Start
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "CreateQuizzView",
    data: () => ({
        form: {
            numberOfQuestions: 10,
            category: "any",
            difficulty: "any",
            type: "any",
        },
        rules: {
            numberOfQuestions: {
                required: {
                    isActive: false,
                    message: "* Number of questions is required",
                },
            },
        },
    }),
    computed: {
        apiUrl() {
            const { numberOfQuestions, category, difficulty, type } = this.form;
            const url = new URL("https://opentdb.com/api.php");
            url.searchParams.append("amount", numberOfQuestions);
            if (category !== "any") {
                url.searchParams.append("category", category);
            }
            if (difficulty !== "any") {
                url.searchParams.append("difficulty", difficulty);
            }
            if (type !== "any") {
                url.searchParams.append("type", type);
            }
            return url.href;
        },
    },
    methods: {
        ...mapActions({
            setConfig: "setConfig",
            clearQuestions: "clearQuestions",
            clearAnswers: "clearAnswers",
        }),
        startQuizz() {
            if (
                this.form.numberOfQuestions === "" ||
                this.form.numberOfQuestions === null ||
                this.form.numberOfQuestions === undefined ||
                this.form.numberOfQuestions === 0 ||
                this.form.numberOfQuestions < 0
            ) {
                this.rules.numberOfQuestions.required.isActive = true;
                return;
            } else {
                const config = {
                    isActive: true,
                    firstStart: true,
                    currentQuestion: 0,
                    apiUrl: this.apiUrl,
                };
                this.clearQuestions();
                this.clearAnswers();
                this.setConfig(config);
                this.$router.push('/quizz');
            }
        },
    },
};
</script>

<style scoped></style>
