const allowance = async function(account, txMessage, address, root) {
    if (typeof root.instance.methods.allowance !== "function") {return}
    let response = await root.instance.methods.allowance(account, address).call();
    return response;
};

export default allowance;