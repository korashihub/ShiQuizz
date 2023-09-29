<template>
    <section class="create-quizz">
        <div class="container">
            <div class="card">
                <div
                    v-if="
                        activities?.length <= 0 ||
                        activities === undefined ||
                        activities === null ||
                        activities === ''
                    "
                >
                    <h1>No activities found</h1>
                </div>
                <div v-else>
                    <div class="card-title">History</div>
                    <table class="activity-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Total Question</th>
                                <th>Correct</th>
                                <th>Wrong</th>
                                <th>Empty</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(activity, index) in activities.sort(
                                    (a, b) =>
                                        new Date(b.date) - new Date(a.date)
                                )"
                                :key="index"
                            >
                                <td>{{ index + 1 }}</td>
                                <td>{{ activity.questions?.length }}</td>
                                <td>{{ getCorrectCount(activity) }}</td>
                                <td>{{ getWrongCount(activity) }}</td>
                                <td>{{ getEmptyCount(activity) }}</td>
                                <td>
                                    {{ new Date(activity.date).toLocaleString() }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "ActivityView",
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            activities: "getActivities",
        }),
    },
    methods: {
        getCorrectCount(activity) {
            return activity.questions.filter((question, index) => {
                return question.correct_answer == activity.answers[index];
            })?.length;
        },
        getWrongCount(activity) {
            return activity.questions.filter((question, index) => {
                if (activity.answers[index] == "") return false;
                return question.correct_answer != activity.answers[index];
            })?.length;
        },
        getEmptyCount(activity) {
            return activity.answers.filter((answer) => answer == "")?.length;
        },
    },
};
</script>
