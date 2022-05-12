import Vue from 'vue';
import Vuex from 'vuex';
import Contracts from './modules/Contracts';
import Forms from './modules/Forms';
import Models from './modules/Models';
import Pairs from './modules/Pairs';
import Pools from './modules/Pools';
import Session from './modules/Session';
import Wallet from './modules/Wallet';
import Web3 from './modules/Web3';
import Campaigns from './modules/Campaigns';

Vue.use(Vuex);
const debug = true;

export const store = new Vuex.Store({
    modules: {
        contracts: Contracts,
        models: Models,
        forms: Forms,
        pairs: Pairs,
        pools: Pools,
        session: Session,
        wallet: Wallet,
        web3: Web3,
        campaigns: Campaigns
    },
    strict: debug
});