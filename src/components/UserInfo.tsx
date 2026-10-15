import { Box, Typography } from "@mui/material";
import "./userinfo.css";
import { useApp } from "../context/AppContext";

const UserInfo = () => {
  const {
    userWallet,
    userGems,
    userUpgrades: {
      extraGold,
      extraGems,
      rebirths: { currentRebirth },
    },

    userEarnings,
    userGemsEarnings,
  } = useApp();
  return (
    <Box
      className="userinfo"
      sx={{ backgroundColor: "background.paper", p: 0, overflowY: "auto" }}
    >
      <Typography
        variant="h3"
        sx={{ color: "secondary.main", display: { xs: "none", md: "block" } }}
      >
        User Info
      </Typography>
      <Box
        className="userinfocontent"
        sx={{ textAlign: "center", color: "primary.main" }}
      >
        <Typography variant="h4">Cash: {userWallet.toFixed(2)} $</Typography>
        <Typography variant="h4">Gems: {userGems.toFixed(2)}</Typography>
        <Typography variant="h4">
          Cash earnings: {userEarnings.toFixed(2)} $/s
        </Typography>
        <Typography variant="h4">
          Gems earnings: {userGemsEarnings.toFixed(2)} $/s
        </Typography>
        <Typography variant="h4">
          Cash bonus: +{extraGold.currentBonus}%
        </Typography>
        <Typography variant="h4">
          Gems bonus: +{extraGems.currentBonus}%
        </Typography>
        <Typography variant="h4">Rebirths: {currentRebirth}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
