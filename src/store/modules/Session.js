// initial state
const state = () => ({
    isInitialised: false,
    connectButtonClicked: false,
    isConnected: null,
    loadedContracts: []
});

// getters
const getters = {};

// mutations
const mutations = {
    setConnection(state, connection) {
        state.isConnected = connection;
        return;
    },

    setInitialisation(state) {
        state.isInitialised = true;
        return;
    },
    
    pushLoadedContracts(state, contract) {
        if (state.loadedContracts.includes(contract)) {return;}
        state.loadedContracts.push(contract);
        return;
    }
};

// actions
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};