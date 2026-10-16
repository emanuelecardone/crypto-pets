import { Box, Typography } from "@mui/material";
import "./userinfo.css";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <Box
      className="userinfo"
      sx={{ backgroundColor: "background.paper", p: 0, overflowY: "auto" }}
    >
      <Typography
        variant="h3"
        sx={{ color: "secondary.main", display: { xs: "none", md: "block" } }}
      >
        {t("home.userInfo.userInfo")}
      </Typography>
      <Box
        className="userinfocontent"
        sx={{ textAlign: "center", color: "primary.main" }}
      >
        <Typography variant="h4">
          {t("home.userInfo.cash")}: {userWallet.toFixed(2)} $
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.gems")}: {userGems.toFixed(2)}
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.cashEarnings")}: {userEarnings.toFixed(2)} $/s
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.gemsEarnings")}: {userGemsEarnings.toFixed(2)} $/s
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.cashBonus")}: +{extraGold.currentBonus}%
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.gemsBonus")}: +{extraGems.currentBonus}%
        </Typography>
        <Typography variant="h4">
          {t("home.userInfo.rebirths")}: {currentRebirth}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
