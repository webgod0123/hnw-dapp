import Vue from 'vue';
import moment from 'moment';
const abis = require('../../contracts/abis.js');
const contractsAddresses = require('../../contracts/contractsAddresses.json');
const poolType = {
    "0x1b7d906F79Ce346683552262774400080826f1E2": 0, //Presale with native token
    "0x1699D0C06efC09b3A4B682F90b5bCd7DD6De3C10": 1, //Presale with custom token
    "0x823C1221807aAAe89cA17b65117734C58F46608f": 2 //MGE with native token
};
const routers = {
    "0x10ED43C718714eb63d5aA57B78B54704E256024E": "Pancakeswap",
    "0xD99D1c33F9fC3444f8101754aBC46c52416550D1": "Pancakeswap",
    "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3": "PCSTestnet",
};

// initial state
const state = () => ({});

// getters
const getters = {
    doesPoolExist: (state) => (pair) => {
        return state[pair] !== undefined;
    },
};

// mutations
const mutations = {
    setPoolModel(state, payload) {
        Vue.set(state, payload.pool, payload.model);
        return;
    },

    setPoolInstance(state, payload) {
        state[payload.pool].instance = payload.instance;
        return;
    },

    setPoolValue(state, payload) {
        state[payload.pool][payload.field] = payload.value;
        return;
    },
};

// actions
const actions = {
    async instantiatePool({ getters, dispatch }, pool) {
        if (getters.doesPoolExist(pool)) {return;}
        await dispatch('createPool', pool);
        return;
    },

    async getPresalePoolState({ state }, pool) { //contract: String
        if (state[pool].data1[9] === "1") {return 1;}
        if (state[pool].data1[9] === "2") {return 2;}
        if (state[pool].startTime > Date.now()) {return 3};
        if (state[pool].totalRaised < state[pool].hardCap && Date.now() <= state[pool].endTime) {return 0};
        if (state[pool].totalRaised >= state[pool].hardCap && Date.now() <= state[pool].endTime) {return 4};
        if (Date.now() > state[pool].endTime) {return 5};
        return 6;
    },

    async getMgePoolState({ state }, pool) { //contract: String
        const contractState = await state[pool].instance.methods.poolState().call();
        if (contractState == 1) {return 1;}
        if (contractState == 2) {return 2;}
        if (Date.now() < state[pool].startTime) {return 3};
        if (Date.now() <= state[pool].endTime) {return 0};
        if (Date.now() > state[pool].endTime) {return 5};
        return 6;
    },

    async getPoolType({ commit, state, rootState }, pool) { //contract: String
        commit('setPoolValue', {pool: pool, field: 'instance', value: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi('Pool'), pool))});
        commit('setPoolValue', {pool: pool, field: 'poolType', value: poolType[await state[pool].instance.methods.factory().call()]});
    },

    // states: ['Sale Live', 'Sale Ended', 'Cancelled', 'UpComing', 'Sale Filled', 'Sale Ended'],
    async createPool({ commit, state, rootState, dispatch }, pool) { //contract: String

        //Set the model and get the poolType
        commit('setPoolModel', {pool: pool, model: JSON.parse(JSON.stringify(rootState.models.pool))});
        await dispatch('getPoolType', pool);

        //Get the right contract instance depending on the poolType poolType 0 is loaded by default
        if (state[pool].poolType === 1) {commit('setPoolValue', {pool: pool, field: 'instance', value: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi('PoolWithToken'), pool))});}
        if (state[pool].poolType === 2) {commit('setPoolValue', {pool: pool, field: 'instance', value: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi('FairLaunch'), pool))});}
        
        //Determine if the paired token is Native or Custom
        commit('setPoolValue', {pool: pool, field: 'isPoolWithToken', value: [1].includes(state[pool].poolType)});
        if (state[pool].isPoolWithToken) {commit('setPoolValue', {pool: pool, field: 'pairedTokenAddress', value: await state[pool].instance.methods.cointoken().call()});}
        if (!state[pool].isPoolWithToken) {commit('setPoolValue', {pool: pool, field: 'pairedTokenAddress', value: contractsAddresses.Native.chainID[rootState.web3.networkId]});}

        //Get the info of the token
        commit('setPoolValue', {pool: pool, field: 'tokenAddress', value: await state[pool].instance.methods.token().call()});//temp[4]
        commit('setPoolValue', {pool: pool, field: 'tokenInstance', value: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi('ERC20'), state[pool].tokenAddress))});
        commit('setPoolValue', {pool: pool, field: 'tokenName', value: await state[pool].tokenInstance.methods.name().call()});//temp[1]
        commit('setPoolValue', {pool: pool, field: 'tokenSymbol', value: await state[pool].tokenInstance.methods.symbol().call()});//temp[2]
        commit('setPoolValue', {pool: pool, field: 'tokenDecimals', value: await state[pool].tokenInstance.methods.decimals().call()});//temp[3]

        //Instanciate the paired token with the pool
        commit('setPoolValue', {pool: pool, field: 'pairedTokenInstance', value: Object.freeze(await new rootState.web3.instance.eth.Contract(abis.getAbi('ERC20'), state[pool].pairedTokenAddress))});
        commit('setPoolValue', {pool: pool, field: 'pairedTokenName', value: await state[pool].pairedTokenInstance.methods.name().call()});
        commit('setPoolValue', {pool: pool, field: 'pairedTokenSymbol', value: await state[pool].pairedTokenInstance.methods.symbol().call()});
        commit('setPoolValue', {pool: pool, field: 'pairedTokenDecimals', value: await state[pool].pairedTokenInstance.methods.decimals().call()});

        await dispatch('updatePool', pool);
    },

    async updatePool({ commit, state, rootState, dispatch }, pool) { //contract: String
        //Share start datas
        commit('setPoolValue', {pool: pool, field: 'liquidityPercent', value: await state[pool].instance.methods.liquidityPercent().call()});//temp[16]
        commit('setPoolValue', {pool: pool, field: 'liquidityLockDays', value: await state[pool].instance.methods.liquidityLockDays().call()});
        commit('setPoolValue', {pool: pool, field: 'urls', value: await state[pool].instance.methods.urls().call()});

        //Finish start load with specific datas
        if ([0,1].includes(state[pool].poolType)) {await dispatch('getPresaleDatasStartLoad', pool);}
        if ([2].includes(state[pool].poolType)) {await dispatch('getMgeDatasStartLoad', pool);}
        commit('setPoolValue', {pool: pool, field: 'isLoaded', value: true});

        //Share Dates
        const offSet = (new Date().getTimezoneOffset() / 60);
        let startTime = new Date(state[pool].startTime);
        commit('setPoolValue', {pool: pool, field: 'startTimeUTC', value: [startTime.getFullYear(), (startTime.getMonth() + 1).padLeft(), startTime.getDate().padLeft()].join('-') + ' ' + [startTime.getHours().padLeft(), startTime.getMinutes().padLeft()].join(':')});//temp[13]UTC
        startTime.setHours(startTime.getHours() + offSet);
        commit('setPoolValue', {pool: pool, field: 'startTimeLocal', value: [startTime.getFullYear(), (startTime.getMonth() + 1).padLeft(), startTime.getDate().padLeft()].join('-') + ' ' + [startTime.getHours().padLeft(), startTime.getMinutes().padLeft()].join(':')});
        let endTime = new Date(state[pool].endTime);
        commit('setPoolValue', {pool: pool, field: 'endTimeUTC', value: [endTime.getFullYear(), (endTime.getMonth() + 1).padLeft(), endTime.getDate().padLeft()].join('-') + ' ' + [endTime.getHours().padLeft(), endTime.getMinutes().padLeft()].join(':')});//temp[14]UTC
        endTime.setHours(endTime.getHours() + offSet);
        commit('setPoolValue', {pool: pool, field: 'endTimeLocal', value: [endTime.getFullYear(), (endTime.getMonth() + 1).padLeft(), endTime.getDate().padLeft()].join('-') + ' ' + [endTime.getHours().padLeft(), endTime.getMinutes().padLeft()].join(':')});

        //Finish the share load
        commit('setPoolValue', {pool: pool, field: 'tokenTotalSupply', value: Math.ceil(await state[pool].tokenInstance.methods.totalSupply().call() / Math.pow(10, state[pool].tokenDecimals))});//temp[5]
        commit('setPoolValue', {pool: pool, field: 'listingOn', value: routers[await state[pool].instance.methods.router().call()]});//temp[15]
        commit('setPoolValue', {pool: pool, field: 'owner', value: await state[pool].instance.methods.owner().call()});
        commit('setPoolValue', {pool: pool, field: 'contributionOf', value: rootState.wallet.account !== undefined ? await state[pool].instance.methods.contributionOf(rootState.wallet.account).call() / Math.pow(10, 18) : 0});
        // commit('setPoolValue', {pool: pool, field: 'ethFeePercent', value: await state[pool].instance.methods.ethFeePercent().call()});

        if (typeof state[pool].instance.methods.whiteLists === "function") {commit('setPoolValue', {pool: pool, field: 'whiteLists', value: await state[pool].instance.methods.whiteLists(rootState.wallet.account).call()});}

        //Finish end load with specific datas
        if ([0,1].includes(state[pool].poolType)) {await dispatch('getPresaleDatasEndLoad', pool);}
        if ([2].includes(state[pool].poolType)) {await dispatch('getMgeDatasEndLoad', pool);}
        commit('setPoolValue', {pool: pool, field: 'isFullyLoaded', value: true});
    },

    async getPresaleDatasStartLoad({ commit, state, rootState, dispatch }, pool) {
        commit('setPoolValue', {pool: pool, field: 'data1', value: await state[pool].instance.methods.getData1().call()});
        commit('setPoolValue', {pool: pool, field: 'data2', value: await state[pool].instance.methods.getData2().call()});
        commit('setPoolValue', {pool: pool, field: 'softCap', value: state[pool].data1[1] / Math.pow(10, 18)});//temp[10]
        commit('setPoolValue', {pool: pool, field: 'hardCap', value: state[pool].data1[2] / Math.pow(10, 18)});//temp[11]
        commit('setPoolValue', {pool: pool, field: 'rate', value: state[pool].data1[0] / Math.pow(10, state[pool].tokenDecimals)});//temp[8]
        commit('setPoolValue', {pool: pool, field: 'totalRaised', value: state[pool].data1[5] / Math.pow(10, 18)});//temp[23]
        commit('setPoolValue', {pool: pool, field: 'startTime', value: state[pool].data1[6] * 1000});//temp[13]
        commit('setPoolValue', {pool: pool, field: 'endTime', value: state[pool].data1[7] * 1000});//temp[14]
        commit('setPoolValue', {pool: pool, field: 'poolState', value: await dispatch('getPresalePoolState', pool)});//temp[18]
    },

    async getPresaleDatasEndLoad({ commit, state, rootState, dispatch }, pool) {
        commit('setPoolValue', {pool: pool, field: 'presaleType', value: await state[pool].instance.methods.presaleType().call()});
        commit('setPoolValue', {pool: pool, field: 'saleType', value: state[pool].presaleType / 1 - 1});
        commit('setPoolValue', {pool: pool, field: 'isWhitelist', value: state[pool].presaleType == 2 ? true : false});
        commit('setPoolValue', {pool: pool, field: 'data3', value: rootState.wallet.account !== undefined ? await state[pool].instance.methods.getData3(rootState.wallet.account).call() : []});
        commit('setPoolValue', {pool: pool, field: 'liquidityListingRate', value: state[pool].data1[10] / Math.pow(10, 18)});//temp[9]
        commit('setPoolValue', {pool: pool, field: 'tokensForPresale', value: state[pool].rate * state[pool].hardCap});//temp[6]
        commit('setPoolValue', {pool: pool, field: 'tokensForLiquidity', value: state[pool].liquidityListingRate * state[pool].hardCap * state[pool].data1[3] / 100});//temp[7]
        commit('setPoolValue', {pool: pool, field: 'unsoldToken', value: (state[pool].data1[11] / 1) ? 'Refund' : 'Burn'});//temp[12]
        commit('setPoolValue', {pool: pool, field: 'liquidityLockupTime', value: state[pool].data1[4] / 60 + ' minutes after pool ends'});//temp[17]
        commit('setPoolValue', {pool: pool, field: 'minContribution', value: state[pool].data1[12] / Math.pow(10, 18)});//temp[19]
        commit('setPoolValue', {pool: pool, field: 'maxContribution', value: state[pool].data1[13] / Math.pow(10, 18)});//temp[20]

        //Contributor Vesting
        commit('setPoolValue', {pool: pool, field: 'isVested', value: await state[pool].instance.methods.vestings(0).call() > 0});
        if (state[pool].isVested) {
            commit('setPoolValue', {pool: pool, field: 'totalVestedTokens', value: state[pool].data2[5] + ' ' + state[pool].tokenSymbol});//temp[35]
            commit('setPoolValue', {pool: pool, field: 'firstReleaseForPresale', value: state[pool].data2[8][0] + '%'});//temp[31]
            commit('setPoolValue', {pool: pool, field: 'vestingForPresale', value: state[pool].data2[8][2] + '% each ' + state[pool].data2[8][1] / 60 + ' minutes'});//temp[32]
        }

        //Team Vesting
        commit('setPoolValue', {pool: pool, field: 'isTeamVested', value: await state[pool].instance.methods.teamVestings(0).call() > 0});
        if (state[pool].isTeamVested) {
            commit('setPoolValue', {pool: pool, field: 'totalTeamVestingTokens', value: state[pool].data2[9][0] / Math.pow(10, state[pool].tokenDecimals) + ' ' + state[pool].tokenSymbol});//temp[33]
            commit('setPoolValue', {pool: pool, field: 'teamVestingReleaseTime', value: new Date(state[pool].data2[6] * 1000).toUTCString()});//temp[34]
            commit('setPoolValue', {pool: pool, field: 'firstReleaseAfterListingMinutes', value: state[pool].data2[9][1] / 60 + ' minutes'});//temp[36]
            commit('setPoolValue', {pool: pool, field: 'firstReleaseForTeam', value: state[pool].data2[9][2] + '%'});//temp[37]
            commit('setPoolValue', {pool: pool, field: 'tokensReleaseEachCycle', value: state[pool].data2[9][4] + '% each ' + state[pool].data2[9][3] / 60 + ' minutes'});//temp[38]
        }
    },

    async getMgeDatasStartLoad({ commit, state, rootState, dispatch }, pool) {
        commit('setPoolValue', {pool: pool, field: 'softCap', value: await state[pool].instance.methods.softCap().call() / Math.pow(10, 18)});
        commit('setPoolValue', {pool: pool, field: 'totalRaised', value: await state[pool].instance.methods.totalRaised().call() / Math.pow(10, 18)});
        commit('setPoolValue', {pool: pool, field: 'startTime', value: await state[pool].instance.methods.startTime().call() * 1000});
        commit('setPoolValue', {pool: pool, field: 'endTime', value: await state[pool].instance.methods.endTime().call() * 1000});
        commit('setPoolValue', {pool: pool, field: 'poolState', value: await dispatch('getMgePoolState', pool)});
    },

    async getMgeDatasEndLoad({ commit, state, rootState, dispatch }, pool) {
        commit('setPoolValue', {pool: pool, field: 'presaleType', value: 1});
        commit('setPoolValue', {pool: pool, field: 'saleType', value: 0});
        commit('setPoolValue', {pool: pool, field: 'isWhitelist', value: false});
        commit('setPoolValue', {pool: pool, field: 'tokensForPresale', value: await state[pool].instance.methods.totalSellAmount().call() / Math.pow(10, state[pool].tokenDecimals)});
        console.log(await state[pool].instance.methods.liquidityLockDays().call());
        commit('setPoolValue', {pool: pool, field: 'liquidityLockupTime', value: await state[pool].instance.methods.liquidityLockDays().call() / 60 + ' minutes after pool ends'});//temp[17]

        //calculate bnbFee
        let bnbFee = 0;
        if (state[pool].totalRaised > 0) {

        }
        commit('setPoolValue', {pool: pool, field: 'bnbFee', value: bnbFee});

        // commit('setPoolValue', {pool: pool, field: 'tokensForLiquidity', value: state[pool].tokensForPresale * state[pool].liquidityPercent / 100});
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};