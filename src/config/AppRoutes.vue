<script>
import DashboardHub from "../pages/DashboardHub";
import Mge from "../pages/Mge";
import NftMint from "../pages/NftMint";
import NftClaim from "../pages/NftClaim";
import Stake from "../pages/Stake";
import CreatePresale from "../pages/Launchpad/CreatePresale";
import CreateFairLaunch from "../pages/Launchpad/CreateFairLaunch";
import CreateToken from "../pages/Launchpad/CreateToken";
import LaunchpadList from "../pages/Launchpad/LaunchpadList";
import LaunchpadPresale from "../pages/Launchpad/LaunchpadPresale";
import Presale from "../pages/Presale";
import RefineryFaucet from "../pages/Refinery/Faucet";
import HNWAntiBot from "../pages/Launchpad/AntiBot";
import HfuelMigrate from "../pages/Hfuel/Migrate";

const routes = [
  { path: "*", redirect: "/dashboard" },
  { path: "/dashboard", component: DashboardHub },
  { path: "/:token/mge", component: Mge },
  { path: "/:token/nft/mint", component: NftMint },
  { path: "/:token/nft/claim", component: NftClaim },
  { path: "/:token/stake", component: Stake },
  { path: "/launchpad/anti_bot", component: HNWAntiBot },
  { path: "/launchpad/create/presale", component: CreatePresale },
  { path: "/launchpad/create/fairlaunch", component: CreateFairLaunch },
  { path: "/launchpad/create/token", component: CreateToken },
  { path: "/launchpad/list", component: LaunchpadList },
  { path: "/launchpad/list/:address", component: LaunchpadPresale },
  { path: "/ruyi/presale", component: Presale },
  { path: "/refinery/pipeline", component: RefineryFaucet },
  { path: "/hfuel/migrate", component: HfuelMigrate },
];

export default routes;
</script>
