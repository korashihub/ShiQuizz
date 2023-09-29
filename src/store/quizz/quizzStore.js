export const quizzStore = {
    state() {
        return {
            questions: [],
            answers: [],
            activities: [],
            config: {
                isActive: false,
                firstStart: true,
                currentQuestion: 0,
                apiUrl: "",
            },
        };
    },
    getters: {
        getQuestions(state) {
            return state.questions;
        },
        getAnswers(state) {
            return state.answers;
        },
        getConfig(state) {
            return state.config;
        },
        getActivities(state) {
            return state.activities;
        },
    },
    mutations: {
        setQuestions(state, questions) {
            state.questions = questions;
        },
        setAnswers(state, answers) {
            state.answers = answers;
        },
        setConfig(state, config) {
            state.config = config;
        },
        setActivities(state, activities) {
            state.activities = activities;
        },
        addActivity(state, activity) {
            state.activities.push(activity);
        }
    },
    actions: {
        async fetchQuestions({ commit }, apiUrl) {
            try {
                const response = await fetch(apiUrl);
                const questions = await response.json();
                commit("setQuestions", questions.results);
            } catch (error) {
                console.log(error);
            }
        },
        async setAnswers({ commit }, answers) {
            commit("setAnswers", answers);
        },
        async clearAnswers({ commit }) {
            commit("setAnswers", []);
        },
        async setConfig({ commit }, config) {
            commit("setConfig", config);
        },
        async clearQuestions({ commit }) {
            commit("setQuestions", []);
        },
        async setActivities({ commit }, activities) {
            commit("setActivities", activities);
        },
        async addActivity({ commit }, activity) {
            commit("addActivity", activity);
        },
    },
};
