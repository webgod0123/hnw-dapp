const mintNFT = async function(account, txMessage, contract) {
    if (typeof contract.instance.methods.mint !== "function") {return}
    let response = await contract.instance.methods
                        .mint(account)
                        .send({ from: account })
                        .once('transactionHash', (payload) => {
                            console.log(payload);
                            // let txUrl = formatTxHash(payload);
                            // let msg = {
                            //     message: `Processing Transaction...`,
                            //     style: 'toastr-primary',
                            //     url: txUrl
                            // };
                            // txMessage(msg);
                        })
                        .once('receipt', (payload) => {
                            console.log(payload);
                            // let txUrl = formatTxHash(payload.transactionHash);
                            // let msg = {
                            //     message: `Transaction Complete! Minted a HNW NFT!`,
                            //     style: 'toastr-success',
                            //     url: txUrl
                            // };
                            // txMessage(msg);
                        });
    return response;
};

export default mintNFT;