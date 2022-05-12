import Vue from 'vue';

// initial state
const state = () => ({});

// getters
const getters = {};

// mutations
const mutations = {
    setFormModel(state, payload) {
        Vue.set(state, payload.form, payload.model);
        return;
    },

    updateFormField(state, payload) {
        if (payload.parent === null) {
            state[payload.form][payload.field] = payload.value;
            return;
        }
        state[payload.form][payload.parent][payload.field] = payload.value;
        return;
    },

    updateFormFlagValue(state, payload) {
        state[payload.form].flags[payload.flag] = payload.value;
        return;
    },
};

// actions
const actions = {
    async instantiateForm({ commit, rootState }, form) { //form: String
        await commit('setFormModel', {form: form, model: JSON.parse(JSON.stringify(rootState.models[form]))});
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};