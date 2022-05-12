import Web3 from 'web3';
/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

const getWeb3 = () => new Promise(function (resolve, reject) {
    try {
        let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        resolve(web3);
    } catch (error) {
        reject(error);
    }
    // if(location.protocol !== 'https:') {return;}
    // window.addEventListener("load", async() => {
    //     if (window.ethereum) {
    //         //Modern Web3
    //         const web3 = new Web3(window.ethereum);
    //         try {
    //             resolve(web3);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     } else if (window.web3) {
    //         //Legacy Web3
    //         const web3 = window.web3;
    //         console.log("Injected web3 detected.");
    //         resolve(web3);
    //     } else {
    //         //FALLBACK
    //         // const provider = new Web3.providers.HttpProvider
    //     }
    // });
});
export default getWeb3;