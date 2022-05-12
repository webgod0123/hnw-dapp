import Vue from 'vue';
const CoinGecko = require('coingecko-api');
const CGClient = new CoinGecko();
const pairsAddress = require('../../contracts/pairsAddress.json');

// initial state
const state = () => ({});

// getters
const getters = {
    doesPairExist: (state) => (pair) => {
        return state[pair] !== undefined;
    },
};

// mutations
const mutations = {
    setPairAddress(state, payload) {
        state[payload.pair].address = payload.address;
        return;
    },

    setPairModel(state, payload) {
        Vue.set(state, payload.pair, payload.model);
        return;
    },

    setPairTokens(state, payload) {
        state[payload.pair].tokens = payload.tokens;
        return;
    },

    setPairType(state, payload) {
        state[payload.pair].type = payload.type;
        return;
    },

    setPairTokenBalance(state, payload) {
        state[payload.pair].balances[payload.token] = payload.value;
        return;
    },

    setPairRatio(state, payload) {
        state[payload.pair].ratio = payload.value;
        return;
    },

    setPairInverse(state, payload) {
        state[payload.pair].inverse = payload.value;
        return;
    },
};

// actions
const actions = {
    async instantiatePair({ getters, dispatch }, pair) {
        if (getters.doesPairExist(pair)) {return;}
        await dispatch('createPair', pair);
        return;
    },

    async createPair({ commit, rootState, dispatch }, pair) { //contract: String
        var model = JSON.parse(JSON.stringify(rootState.models.pair));
        for (const [key, [value, contract]] of Object.entries(Object.entries(pairsAddress[pair].tokens))) {
            var a = key;
            a = value;
            model.balances[contract] = 0;
        }
        await commit('setPairModel', {pair: pair, model: model});
        await commit('setPairType', {pair: pair, type: pairsAddress[pair].type});
        await commit('setPairAddress', {pair: pair, address: pairsAddress[pair].address});
        await commit('setPairTokens', {pair: pair, tokens: pairsAddress[pair].tokens});
        for(var contract of pairsAddress[pair].tokens) {
            await dispatch('contracts/instantiateContract', contract, {root:true});
        }
        await dispatch('getPairRatio', pair);
    },

    async getPairBalance({ commit, state, rootState, dispatch }, pair) { // pair: String else {//commit('setPairTokenBalance', {pair: pair, token: contract, value: await fetch(state[pair].url)});}
        if (state[pair].type === 'coingecko') {return;}
        for (const [key, [value, contract]] of Object.entries(Object.entries(state[pair].tokens))) {
            await dispatch('contracts/instantiateContract', contract, {root:true});
            if (state[pair].type === 'liquidityPool') {commit('setPairTokenBalance', {pair: pair, token: contract, value: await dispatch('contracts/getContractBalance', {contract: contract, account: state[pair].address}, {root:true})});}
            if (state[pair].type === 'xStake') {
                if (key == 0) {commit('setPairTokenBalance', {pair: pair, token: contract, value: await dispatch('contracts/getContractTotalSupply', {contract: state[pair].tokens[1]}, {root:true})});}
                if (key == 1) {commit('setPairTokenBalance', {pair: pair, token: contract, value: await dispatch('contracts/getContractBalance', {contract: state[pair].tokens[0], account: rootState.contracts[state[pair].tokens[1]].address}, {root:true})});}
            }
        }
    },

    async getPairRatio({ commit, state, dispatch }, pair) {
        if (state[pair].type === 'coingecko') {
            commit('setPairRatio', {pair: pair, value: await dispatch('fetchCoingecko', pair)});
        } else {
            await dispatch('getPairBalance', pair);
            commit('setPairRatio', {pair: pair, value: Number(state[pair].balances[state[pair].tokens[0]]) / Number(state[pair].balances[state[pair].tokens[1]])});
            commit('setPairInverse', {pair: pair, value: Number(state[pair].balances[state[pair].tokens[1]]) / Number(state[pair].balances[state[pair].tokens[0]])});
        }
        return;
    },

    async fetchCoingecko({state}, pair) {
        let response = await CGClient.simple.price({
            ids: ['wbnb'],
            vs_currencies: ['usd'],
        });

        return response.data.wbnb.usd;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};