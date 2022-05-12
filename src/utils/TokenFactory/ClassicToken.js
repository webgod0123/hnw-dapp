const classicTokenFactory = async function(contract, form, routerAddress, wallet) {
    console.log('reach');
    let temp = Math.pow(10 , 18) * form.totalSupply;
    temp = "0x" + temp.toString(16);

    console.log(
        form.name,
        form.symbol,
        form.decimals,
        temp
    );

    console.log(wallet);

    let response = await contract.instance.methods.create(
        form.name,
        form.symbol,
        form.decimals,
        temp
    ).send({from: wallet.account, value: 10000000});

    return response;
};

export default classicTokenFactory;