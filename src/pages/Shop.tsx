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
import { useEffect, useRef } from "react";
import Header from "../components/Header";

const Shop = () => {
  const {
    userUpgrades,
    setUserUpgrades,
    shopUpgrades,
    setShopUpgrades,
    userWallet,
    setUserWallet,
  } = useApp();

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
    } else {
      console.log("Soldi insufficienti!");
    }
  };

  return (
    <Box
      className="shop"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        Shop
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
                      {upgradeKey.replace(/([A-Z])/g, " $1")}{" "}
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
                  <Typography variant="body2">MAX LEVEL REACHED</Typography>
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
                    {upgradeKey.replace(/([A-Z])/g, " $1")}
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
                    Increment: +{upgrade.increasePercentage}%
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
                  Buy (💰 {currentPrice})
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Shop;
