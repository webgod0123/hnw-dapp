import { MaxUint256 } from '@ethersproject/constants';

const approve = async function(account, txMessage, address, root) {
    let response = await root.instance.methods
                        .approve(address, MaxUint256)
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
                            //     message: `Transaction Complete! Approved NFT Contract for minting.`,
                            //     style: 'toastr-success',
                            //     url: txUrl
                            // };
                            // txMessage(msg);
                        });
    return response;
};

export default approve;