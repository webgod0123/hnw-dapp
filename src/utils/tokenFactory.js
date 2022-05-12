import ClassicToken from './TokenFactory/ClassicToken';
import ReflectToken from './TokenFactory/ReflectToken';
import RewardsToken from './TokenFactory/RewardsToken';
import RewardsBuybackToken from './TokenFactory/RewardsBuybackToken';

const tokenFactory = function() {

    return {

		TokenFactoryClassic: ClassicToken,
		TokenFactoryReflect: ReflectToken,
		TokenFactoryRewards: RewardsToken,
		TokenFactoryRewardsBuyback: RewardsBuybackToken,

    }

}();

export default tokenFactory;