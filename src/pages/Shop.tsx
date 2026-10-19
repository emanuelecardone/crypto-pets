import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./shop.css";
import { useApp } from "../context/AppContext";
import { Shop as ShopType } from "../types/shop";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const {
    userUpgrades,
    setUserUpgrades,
    shopUpgrades,
    setShopUpgrades,
    userWallet,
    setUserWallet,
    interactiveTutorialFinished,
    currentInteractiveTutorial,
    setCurrentInteractiveTutorial,
  } = useApp();

  const { t } = useTranslation();
  const [interactiveTutorialStep, setInteractiveTutorialStep] = useState(2);

  const purchase = (upgradeKey: string, currentPrice: number) => {
    if (userWallet >= currentPrice) {
      setUserWallet(userWallet - currentPrice);

      setShopUpgrades({
        ...shopUpgrades,
        [upgradeKey]: {
          ...(shopUpgrades as any)[upgradeKey],
          products: (shopUpgrades as any)[upgradeKey].products.slice(1),
        },
      });

      setUserUpgrades({
        ...userUpgrades,
        [upgradeKey]: {
          ...(userUpgrades as any)[upgradeKey],
          currentBonus:
            (userUpgrades as any)[upgradeKey].currentBonus +
            (userUpgrades as any)[upgradeKey].increasePercentage,
        },
      });

      if (
        !interactiveTutorialFinished &&
        currentInteractiveTutorial == 2 &&
        interactiveTutorialStep == 2
      ) {
        setInteractiveTutorialStep((prev) => prev + 1);
      }
    } else {
      console.log("Soldi insufficienti!");
    }
  };

  return (
    <Box
      className="shop"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header interactiveTutorialStep={interactiveTutorialStep} />
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("shop.shop")}
      </Typography>

      <Box
        className="shop-container"
        sx={{ backgroundColor: "background.secondary" }}
      >
        {Object.entries(shopUpgrades).map(([upgradeKey, upgrade]) => {
          const currentPrice = upgrade.products[0];

          if (currentPrice === undefined) {
            return (
              <Card
                key={upgradeKey}
                sx={{
                  boxShadow: 3,
                  p: 4,
                  color: "secondary.main",
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h4"
                      sx={{ textTransform: "capitalize", mb: 4 }}
                    >
                      {t(`shop.${upgradeKey}`)}
                    </Typography>
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {t("shop.maxLevelReached")}
                  </Typography>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card
              key={upgradeKey}
              sx={{
                boxShadow: 3,
                p: 4,
                color: "primary.main",
                zIndex:
                  !interactiveTutorialFinished &&
                  currentInteractiveTutorial == 2 &&
                  interactiveTutorialStep == 2
                    ? 120000
                    : 1,
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h4"
                    sx={{
                      textTransform: "capitalize",
                      mb: 4,
                      color: "secondary.main",
                    }}
                  >
                    {t(`shop.${upgradeKey}`)}
                  </Typography>
                }
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {t("shop.increment")}: +{upgrade.increasePercentage}%
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", mt: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={userWallet < currentPrice}
                  onClick={() => purchase(upgradeKey, currentPrice)}
                >
                  {t("shop.buy")} (💰 {currentPrice})
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {/* INTERACTIVE TUTORIAL */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100000,
          backgroundColor: "black",
          opacity: 0.9,
          display:
            !interactiveTutorialFinished && currentInteractiveTutorial == 2
              ? "block"
              : "none",
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "10px", md: "50%" },
          left: { xs: "15px", md: "calc(75% - 40px)" },
          transform: { xs: "auto", md: "translateY(50%)" },
          width: { xs: "calc(100% - 30px)", md: "25%" },
          zIndex: 120000,
          backgroundColor: "white",
          color: "black",
          display:
            !interactiveTutorialFinished && currentInteractiveTutorial == 2
              ? "block"
              : "none",
          p: { xs: 2, md: 4 },
          borderRadius: "5px",
        }}
      >
        <Typography variant="h4">
          {t(
            "interactiveTutorial." +
              (currentInteractiveTutorial + 1) +
              ".step" +
              interactiveTutorialStep,
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Shop;
