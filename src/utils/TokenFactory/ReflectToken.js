const reflectTokenFactory = async function(contract, form, routerAddress, wallet) {
    let temp = Math.pow(10 , 18) * form.totalSupply;
    temp = "0x" + temp.toString(16);

    const receipt = await contract.instance.methods.create(
        form.name,
        form.token.symbol,
        temp,
        routerAddress,
        form.marketingWallet,
        form.yieldFee,
        form.liquidityFee,
        form.marketingFee
    ).send({from: wallet.account, value: '0x' + Math.pow(10, 17).toString(16)});

    return receipt;
};

export default reflectTokenFactory;