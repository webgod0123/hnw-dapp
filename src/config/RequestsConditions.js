
const requestsConditions = {
    config: {
        timer: 100,
        tries: 500
    },
    requests: {
        callAllowanceAmount: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null},
                {type: 'getters', module: 'contracts', state: 'doesContractExist', value: true},
                {type: 'getters', module: 'contracts', state: 'doesInstanceExist', value: true},
                {type: 'gettersRoot', module: 'contracts', state: 'doesContractExist', value: true},
                {type: 'gettersRoot', module: 'contracts', state: 'doesInstanceExist', value: true}
            ],
        },

        getWalletAccount: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null}
            ],
        },

        getRequiredContracts: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null},
                {type: 'notEqual', module: 'wallet', state: 'account', value: undefined}
            ],
        },

        getRequiredForms: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null}
            ],
        },

        getRequiredPairs: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null}
            ],
        },

        getRequiredPools: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null}
            ],
        },

        getWalletBalance: {
            conditions: [
                {type: 'equal', module: 'session', state: 'isInitialised', value: true},
                {type: 'notEqual', module: 'web3', state: 'networkId', value: null},
                {type: 'getters', module: 'contracts', state: 'doesContractExist', value: true},
                {type: 'getters', module: 'contracts', state: 'doesInstanceExist', value: true},
                {type: 'gettersRoot', module: 'contracts', state: 'doesContractExist', value: true},
                {type: 'gettersRoot', module: 'contracts', state: 'doesInstanceExist', value: true}
            ],
        },
    }
}

export default requestsConditions;