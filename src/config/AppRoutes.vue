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

import CampaignBasics from "../pages/Campaign/Basics.vue";
import CampaignContent from "../pages/Campaign/Content.vue";
import CampaignPerks from "../pages/Campaign/Perks.vue";
import CampaignTeam from "../pages/Campaign/Team.vue";
import CampaignFunding from "../pages/Campaign/Funding.vue";
// import CampaignExtras from "../pages/Campaign/Extras.vue";
import CampaignSettings from "../pages/Campaign/Settings.vue";

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
  { path: "/campaign_edit/basics", component: CampaignBasics },
  { path: "/campaign_edit/content", component: CampaignContent },
  { path: "/campaign_edit/perks", component: CampaignPerks },
  { path: "/campaign_edit/team", component: CampaignTeam },
  { path: "/campaign_edit/funding", component: CampaignFunding },
  // { path: "/campaign_edit/extras", component: CampaignExtras },
  { path: "/campaign_edit/settings", component: CampaignSettings },
];

export default routes;
</script>
