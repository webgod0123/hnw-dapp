import Web3 from 'web3';
import getWeb3 from '../../utils/getWeb3';
import WalletConnectProvider from "@walletconnect/web3-provider";
const provider = new WalletConnectProvider({
    rpc: {
        1: "https://mainnet.mycustomnode.com",
        3: "https://ropsten.mycustomnode.com",
        56: "https://bsc-dataseed.binance.org",
        100: "https://dai.poa.network",
        // ...
    },
});

// initial state
const state = () => ({
    isInjected: false,
    isInitialised: false,
    networkId: null,
    error: null,
    instance: null,
    providerName: null,
});

// getters
const getters = {};

// mutations
const mutations = {
    initialised(state) {
        state.isInitialised = true;
    },

    setInstance(state, instance) {
        state.instance = instance;
    },

    setNetworkId(state, id) {
        state.networkId = id;
    },

    providerName(state, providerName) {
        state.providerName = providerName;
    }
};

// actions
const actions = {
    async initialise({ commit, dispatch }, providerName = null) {
        commit('providerName', providerName);
        if (providerName !== 'walletConnect') {
            getWeb3().then((res) => {
                commit('setInstance', Object.freeze(res));
                commit('initialised');
                dispatch('getNetworkId');
            }).catch((err) => {
                console.log(err, 'err!!');
            });
            try {
                await window.ethereum.enable();
            } catch (error) {
                return;
            }
        } else {
            await provider.enable();
            const web3 = new Web3(provider);
            console.log(web3);
            commit('setInstance', Object.freeze(web3));
            commit('initialised');
            dispatch('getNetworkId');
        }
    },

    async getNetworkId({ commit, state }) {
        commit('setNetworkId', await state.instance.eth.net.getId());
    },

    async disconnectWallet({ commit, state }) {
        console.log('provider.disconnect');
        if (state.providerName === 'walletConnect') {await provider.disconnect();console.log('suppose to be done');}
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};