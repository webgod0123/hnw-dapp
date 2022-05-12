import Vue from 'vue';
const abis = require('../../contracts/abis.js');
const contractsAddresses = require('../../contracts/contractsAddresses.json');

// initial state
const state = () => ({});

// getters
const getters = {
    doesContractExist: (state) => (contract) => {
        return state[contract] !== undefined;
    },

    doesInstanceExist: (state) => (contract) => {
        return state[contract].instance !== null;
    },
};

// mutations
const mutations = {
    setContractAddress(state, payload) {
        state[payload.contract].address = payload.address;
        return;
    },

    setContractDecimals(state, payload) {
        state[payload.contract].decimals = payload.decimals;
        return;
    },

    setContractInstance(state, payload) {
        state[payload.contract].instance = payload.instance;
        return;
    },

    setContractModel(state, payload) {
        Vue.set(state, payload.contract, payload.model);
        return;
    },

    setContractRoot(state, payload) {
        state[payload.contract].root = payload.root;
        return;
    },

    setAllowance(state, payload) {
        state[payload.contract].allowance = payload.allowance;
        return
    }
};

// actions
const actions = {
    async instantiateContract({ commit, getters, dispatch }, contract) {
        if (getters.doesContractExist(contract)) {return;}
        await dispatch('createContract', contract);
        commit('session/pushLoadedContracts', contract, {root:true});
        return;
    },

    async createContract({ commit, state, rootState }, contract) { //contract: String
        if (typeof contractsAddresses[contract].chainID[rootState.web3.networkId] === undefined) {return;}
        await commit('setContractModel', {contract: contract, model: JSON.parse(JSON.stringify(rootState.models.contract))});
        await commit('setContractAddress', {contract: contract, address: contractsAddresses[contract].chainID[rootState.web3.networkId]});
        await commit('setContractRoot', {contract: contract, root: contractsAddresses[contract].root});
        await commit('setContractInstance', {contract: contract, instance: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi(contractsAddresses[contract].abi), contractsAddresses[contract].chainID[rootState.web3.networkId]))});
        if (typeof state[contract].instance.methods.decimals === "function") {commit('setContractDecimals', {contract: contract, decimals: await state[contract].instance.methods.decimals().call()});}
    },
    
    async getContractWeiBalance({ state }, payload) { // payload: {contract: String, account: String}
        let tokens = 0;
        if (state[payload.contract] === undefined) {return tokens;}
        if (typeof state[payload.contract].instance.methods.balanceOf === "function" && tokens === 0) {tokens = await state[payload.contract].instance.methods.balanceOf(payload.account).call();}
        if (typeof state[payload.contract].instance.methods.checkAvailableClaim === "function" && tokens === 0) {tokens = await state[payload.contract].instance.methods.checkAvailableClaim(payload.account).call();}
        return tokens;
    },
    
    async getContractBalance({ state, rootState }, payload) { // payload: {contract: String, account: String}
        let tokens = 0;
        if (state[payload.contract] === undefined) {return tokens;}
        if (typeof state[payload.contract].instance.methods.balanceOf === "function" && tokens === 0) {tokens = await state[payload.contract].instance.methods.balanceOf(payload.account).call();}
        if (typeof state[payload.contract].instance.methods.checkAvailableClaim === "function" && tokens === 0) {tokens = await state[payload.contract].instance.methods.checkAvailableClaim(payload.account).call();}
        if (payload.contract == "HNWNFT") {return rootState.web3.instance.utils.fromWei(tokens);}
        if (state[payload.contract].decimals !== null) {return (tokens/10**state[payload.contract].decimals);}
        return tokens;
    },

    async getContractTotalSupply({ state }, payload) { // payload: {contract: String}
        var tokens = await state[payload.contract].instance.methods.totalSupply().call();
        if (state[payload.contract].decimals !== null) {return (tokens/10**state[payload.contract].decimals);}
        return tokens;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};