import ERC20 from "./abis/erc20.json";
import IERC20 from "./abis/IERC20.json";
import ERC721 from "./abis/ERC721.json";
import StakingToken from "./abis/StakingToken.json";
import HobbNFT from "./abis/HobbNFT.json";
import NFTFeeClaim from "./abis/NFTFeeClaim.json";
import ROOTToken from "./abis/RootedToken.json";
import HfuelRoot from "./abis/Hfuel/HfuelRoot.json";
import MGEGEN from "./abis/MarketGeneration.json";
import HfuelMarketDistribution from "./abis/Hfuel/HfuelMarketDistribution.json";
import HfuelGate from "./abis/Hfuel/HfuelGate.json";
import RuyiMarketGenerator from "./abis/Ruyi/RuyiMarketGenerator.json";
import FairLaunchFactory from "./abis/Launchpad/FairLaunchFactory.json";
import FairLaunch from "./abis/Launchpad/FairLaunch.json";
import PoolFactory from "./abis/Launchpad/PoolFactory.json";
import Pool from "./abis/Launchpad/Pool.json";
import PoolFactoryWithToken from "./abis/Launchpad/PoolFactoryWithToken.json";
import PoolWithToken from "./abis/Launchpad/PoolWithToken.json";
import StandardTokenFactory from "./abis/Launchpad/StandardTokenFactory.json";
import AntiBotStandardTokenFactory from "./abis/Launchpad/AntiBotStandardTokenFactory.json";
import LiquidityGeneratorTokenFactory from "./abis/Launchpad/LiquidityGeneratorTokenFactory.json";
import AntiBotLiquidityGeneratorTokenFactory from "./abis/Launchpad/AntiBotLiquidityGeneratorTokenFactory.json";
import BabyTokenFactory from "./abis/Launchpad/BabyTokenFactory.json";
import AntiBotBabyTokenFactory from "./abis/Launchpad/AntiBotBabyTokenFactory.json";
import BuyBackBabyTokenFactory from "./abis/Launchpad/BuyBackBabyTokenFactory.json";
import AntiBotBuyBackBabyTokenFactory from "./abis/Launchpad/AntiBotBuyBackBabyTokenFactory.json";
import Refinery from "./abis/Refinery.json";
import BuddySystem from "./abis/BuddySystem.json"
import SKToken from "./abis/SKToken.json"
import TokenMint from "./abis/TokenMint.json"
import xSK from "./abis/xSK.json"
import AntiBotStandardToken from "./abis/Launchpad/AntiBotStandardToken.json";
import AntiBotBabyToken from "./abis/Launchpad/AntiBotBabyToken.json";
import AntiBotBuybackBabyToken from "./abis/Launchpad/AntiBotBuybackBabyToken.json";
import AntiBotLiquidityGeneratorToken from "./abis/Launchpad/AntiBotLiquidityGeneratorToken.json";
import AntiBotConfig from "./abis/AntiBotConfig.json";

const getAbi = (abi) => {
  var abis = {
    ERC20,
    IERC20,
    ERC721,
    StakingToken,
    HobbNFT,
    NFTFeeClaim,
    ROOTToken,
    HfuelRoot,
    MGEGEN,
    HfuelMarketDistribution,
    HfuelGate,
    RuyiMarketGenerator,
    FairLaunchFactory,
    FairLaunch,
    PoolFactory,
    Pool,
    PoolFactoryWithToken,
    PoolWithToken,
    StandardTokenFactory,
    AntiBotStandardTokenFactory,
    LiquidityGeneratorTokenFactory,
    AntiBotLiquidityGeneratorTokenFactory,
    BabyTokenFactory,
    AntiBotBabyTokenFactory,
    BuyBackBabyTokenFactory,
    AntiBotBuyBackBabyTokenFactory,
    Refinery,
    BuddySystem,
    SKToken,
    xSK,
    AntiBotConfig,
    AntiBotStandardToken,
    AntiBotBabyToken,
    AntiBotBuybackBabyToken,
    AntiBotLiquidityGeneratorToken,
    TokenMint,
  };

  return abis[abi];
};

export { getAbi };
