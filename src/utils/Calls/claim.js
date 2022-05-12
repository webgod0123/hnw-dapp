const claim = async function(account, txMessage, contract) {
    let response = await contract.instance.methods.claim().send({from: account})
    return response;
};

export default claim;