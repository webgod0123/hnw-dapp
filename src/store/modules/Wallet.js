import Vue from 'vue';

// initial state
const state = () => ({
    account: undefined,
    native: {
        balance: null,
        wei: null,
    },
    balances: {},
    weiBalances: {},
});

// getters
const getters = {};

// mutations
const mutations = {
    setAccount(state, account) {
        [state.account] = account;
    },

    setNative(state, native) {
        state.native = native;
    },

    setContractWeiBalance(state, payload) {
        Vue.set(state.weiBalances, payload.contract, payload.balance);
    },

    setContractBalance(state, payload) {
        Vue.set(state.balances, payload.contract, Number(payload.balance));
    }
    
};

// actions
const actions = {
    async getAccount({ commit, rootState, dispatch }) {
        commit('setAccount', await rootState.web3.instance.eth.getAccounts());
        // dispatch('updateNativeBalance');
    },

    async getWalletBalance({ dispatch, commit, state, rootState }, contract) {
        if (!rootState.contracts[contract].instance.methods) {return;}
        if (typeof rootState.contracts[contract].instance.methods.balanceOf !== "function" && typeof rootState.contracts[contract].instance.methods.checkAvailableClaim !== "function") {return;}
        let weiBalance = await dispatch('contracts/getContractWeiBalance', {contract: contract, account: state.account}, {root:true});
        commit('setContractWeiBalance', {contract: contract, balance: weiBalance});
        let tokens = 0;
        if (tokens === 0 && contract == "HNWNFT") {tokens = rootState.web3.instance.utils.fromWei(weiBalance);}
        if (tokens === 0 && rootState.contracts[contract].decimals !== null) {tokens = (weiBalance/10**rootState.contracts[contract].decimals);}
        if (tokens === 0 && weiBalance !== 0) {tokens = weiBalance;}
        commit('setContractBalance', {contract: contract, balance: tokens});
        // dispatch('events/walletBalanceUpdate', contract, {root:true});
    },

    // async updateNativeBalance({ dispatch, commit, state, rootState }) {
    //     let native = {
    //         wei: await rootState.web3.instance.eth.getBalance(state.account),
    //         balance: null,
    //     };
    //     native.balance = (native.wei / 10**18);
    //     commit('setNative', native);
    // },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};