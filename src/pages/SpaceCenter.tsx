import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./space-center.css";
import { useApp } from "../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayAsteroidsCount } from "../fetch/nasa";
import { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const SpaceCenter = () => {
  const {
    userWallet,
    setUserWallet,
    isSpace,
    setIsSpace,
    setUserUpgrades,
    asteroidsBonus,
    setAsteroidsBonus,
    setUserAsteroidsBonus,
  } = useApp();

  const { t } = useTranslation();

  const ACTIVATION_COST = 1000000;
  const SPACE_TRAVEL_COST = 1000000;

  const {
    data: asteroidCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nasaAsteroids"],
    queryFn: fetchTodayAsteroidsCount,
    staleTime: 1000 * 60 * 60,
    enabled: !asteroidsBonus,
  });

  const potentialBonus = asteroidCount ? asteroidCount * 2 : 0;

  const handleActivateBuff = () => {
    if (
      userWallet >= ACTIVATION_COST &&
      !asteroidsBonus &&
      asteroidCount !== undefined
    ) {
      setUserWallet((prev: number) => prev - ACTIVATION_COST);

      setUserUpgrades((prevUpgrades: any) => {
        return {
          ...prevUpgrades,
          extraGold: {
            ...prevUpgrades.extraGold,
            currentBonus: prevUpgrades.extraGold.currentBonus + potentialBonus,
          },
        };
      });

      setAsteroidsBonus(true);

      setUserAsteroidsBonus(potentialBonus);
    }
  };

  const handleSpaceTravel = () => {
    if (userWallet >= SPACE_TRAVEL_COST) {
      setUserWallet((prev: number) => prev - SPACE_TRAVEL_COST);
      setIsSpace(true);
    }
  };

  return (
    <Box
      className="space-center"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />

      <Typography variant="h2">{t("spaceCenter.spaceCenter")}</Typography>

      <Box className="space-center-container">
        <Box
          sx={{
            width: "100%",
            height: "40%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            {t("spaceCenter.nasaDetected")} {asteroidCount && asteroidCount}{" "}
            {t("spaceCenter.asteroids")}!
          </Typography>
          <Box
            sx={{
              width: "75%",
              height: "70%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "space-evenly",
              backgroundColor: "background.secondary",
            }}
          >
            {isLoading && <p>{t("spaceCenter.receivingData")}</p>}
            {isError && (
              <Typography variant="body1">
                {t("spaceCenter.systemsOffline")}
              </Typography>
            )}

            {asteroidCount !== undefined &&
              Array.from({ length: asteroidCount }).map((_, index) => (
                <Box
                  sx={{
                    width: "5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">☄️</Typography>
                </Box>
              ))}
          </Box>
        </Box>

        {asteroidCount !== undefined && (
          <Box className="telemetry-box">
            <Typography variant="body1">
              <strong>{asteroidCount}</strong>{" "}
              {t("spaceCenter.asteroidsDetected")}
            </Typography>
            <Typography variant="body1">
              {t("spaceCenter.powerUp")}:
              <span className="green">
                +{potentialBonus}% {t("spaceCenter.toYourIncome")}
              </span>
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              {t("spaceCenter.activationPrice")}:{" "}
              <strong>
                {ACTIVATION_COST} {t("home.userInfo.cash")}
              </strong>
            </Typography>

            <Button
              variant="contained"
              color={
                asteroidsBonus
                  ? "inherit"
                  : userWallet < ACTIVATION_COST
                    ? "error"
                    : "success"
              }
              disabled={userWallet < ACTIVATION_COST || asteroidsBonus}
              onClick={handleActivateBuff}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                padding: "10px 20px",
              }}
            >
              {asteroidsBonus
                ? t("spaceCenter.powerUpActive")
                : userWallet < ACTIVATION_COST
                  ? t("spaceCenter.noCash")
                  : t("spaceCenter.activate")}
            </Button>
          </Box>
        )}
        <Box className="telemetry-box">
          <Typography variant="body1">{t("spaceCenter.travel")}</Typography>
          <Typography
            variant="body1"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            {t("spaceCenter.travelPrice")}:{" "}
            <strong>
              {SPACE_TRAVEL_COST} {t("home.userInfo.cash")}
            </strong>
          </Typography>

          <Button
            variant="contained"
            color={userWallet < SPACE_TRAVEL_COST ? "error" : "success"}
            disabled={userWallet < SPACE_TRAVEL_COST}
            onClick={handleSpaceTravel}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            {userWallet < SPACE_TRAVEL_COST
              ? t("spaceCenter.noCash")
              : t("spaceCenter.travelButton")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SpaceCenter;
