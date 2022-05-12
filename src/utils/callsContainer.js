import allowance from './Calls/allowance';
import approve from './Calls/approve';
import claim from './Calls/claim';
import claimNFTFee from './Calls/claimNFTFee';
import contribute from './Calls/contribute';
import mintNFT from './Calls/mintNFT';
import stake from './Calls/stake';
import unstake from './Calls/unstake';

const callsContainer = function() {

    return {

		allowance: allowance,
		approve: approve,
		claim: claim,
		claimNFTFee: claimNFTFee,
		contribute: contribute,
		mintNFT: mintNFT,
		stake: stake,
		unstake: unstake,

    }

}();

export default callsContainer;