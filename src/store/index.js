import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { quizzStore } from "./quizz/quizzStore";

const store = createStore({
    modules: {
        quizzStore: quizzStore,
    },
    plugins: [createPersistedState()],
});

export default store;