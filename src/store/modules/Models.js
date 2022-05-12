const contract = require('./Models/Contract.json');
const fairlaunch = require('./Models/Fairlaunch.json');
const pair = require('./Models/Pair.json');
const pool = require('./Models/Pool.json');
const presale = require('./Models/Presale.json');
const token = require('./Models/Token.json');

// initial state
const state = () => ({
    contract,
    fairlaunch,
    pair,
    pool,
    presale,
    token,
});

// getters
const getters = {};

// mutations
const mutations = {};

// actions
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};