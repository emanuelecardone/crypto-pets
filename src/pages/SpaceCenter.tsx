import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./space-center.css";
import { useApp } from "../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayAsteroidsCount } from "../fetch/nasa";
import { useState } from "react";
import Header from "../components/Header";

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

      <Typography variant="h2">Space Center</Typography>

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
            NASA detected {asteroidCount && asteroidCount} asteroids today!
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
            {isLoading && <p>Receiving data from NASA...</p>}
            {isError && (
              <Typography variant="body1">
                Systems are offline. Cannot figure out your cosmic bonus.
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
              <strong>{asteroidCount}</strong> asteroids detected on an approach
              trajectory today!
            </Typography>
            <Typography variant="body1">
              Energetic power-up available:
              <span className="green">
                +{potentialBonus}% to all your income
              </span>
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Activation price: <strong>{ACTIVATION_COST} Cash</strong>
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
                ? "POWER-UP ACTIVE"
                : userWallet < ACTIVATION_COST
                  ? "INSUFFICIENT CASH"
                  : "ACTIVATE SPATIAL FLOW"}
            </Button>
          </Box>
        )}
        <Box className="telemetry-box">
          <Typography variant="body1">
            Travel to space to discover something new...
          </Typography>
          <Typography
            variant="body1"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            Travel price: <strong>{SPACE_TRAVEL_COST} Cash</strong>
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
              ? "INSUFFICIENT CASH"
              : "TRAVEL TO SPACE..."}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SpaceCenter;
