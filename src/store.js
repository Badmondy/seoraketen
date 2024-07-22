import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state: {
        data: []
    },
    mutations: {
        updateData(state, payload) {
            state.data.push(payload);
        }
    },
    plugins: [createPersistedState()]
});

export default store;
