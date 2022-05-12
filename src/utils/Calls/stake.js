const stake = async function(amount, account, txMessage, contract) {
    if (typeof contract.instance.methods.stake !== "function") {return}
    let response = await contract.instance.methods
                        .stake(amount)
                        .send({ from: account })
                        .once('transactionHash', (payload) => {
                            console.log(payload);
                            // let txUrl = formatTxHash(payload);
                            // let msg = {
                            //     trigger: null,
                            //     message: 'Processing Transaction...',
                            //     style: 'toastr-primary',
                            //     url: txUrl
                            // };
                            // txMessage(msg);
                        })
                        .once('receipt', (payload) => {
                            console.log(payload);
                            // let txUrl = formatTxHash(payload.transactionHash);
                    
                            // let msg = {
                            //     trigger: 'stakingReload',
                            //     message: 'Transaction Complete! Staked HNW!',
                            //     style: 'toastr-success',
                            //     url: txUrl
                            // };
                            // txMessage(msg);
                        });
    return response;
};

export default stake;