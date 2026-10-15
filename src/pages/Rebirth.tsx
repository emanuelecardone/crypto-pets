import { Box, Button, Typography } from "@mui/material";
import "./rebirth.css";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import { shop } from "../data/shop";
import { userPets } from "../data/userPets";

const Rebirth = () => {
  const {
    userGems,
    rebirths: { increasePercentage, products },
    setRebirths,
    userUpgrades: {
      rebirths: { currentRebirth },
    },
    setIsSpace,
    setUserWallet,
    setUserGems,
    setUserPosition,
    setUserSpacePosition,
    setCurrentGoldSpawns,
    userAsteroidsBonus,
    setUserUpgrades,
    setUserPets,
    setUserAlienPets,
    shopUpgrades,
    setShopUpgrades,
    setUserEarnings,
    setUserGemsEarnings,
    rebirths,
  } = useApp();

  const handleRebirth = () => {
    if (userGems < products[currentRebirth]) {
      console.warn("Tentativo di Rebirth fallito: Gemme insufficienti!");
      return;
    }
    setIsSpace(false);
    setUserWallet(0);
    setUserGems(0);
    setUserPosition(0);
    setUserSpacePosition(101);
    setCurrentGoldSpawns([]);
    setUserEarnings(0);
    setUserGemsEarnings(0);
    setUserUpgrades((prev) => {
      const nextRebirthLevel = prev.rebirths.currentRebirth + 1;

      return {
        extraGold: {
          ...prev.extraGold,
          currentBonus:
            nextRebirthLevel * prev.extraGold.increasePercentage +
            userAsteroidsBonus,
        },
        extraGems: {
          ...prev.extraGems,
          currentBonus: nextRebirthLevel * prev.extraGems.increasePercentage,
        },
        rebirths: {
          ...prev.rebirths,
          currentBonus: nextRebirthLevel * prev.rebirths.increasePercentage,
          currentRebirth: nextRebirthLevel,
        },
      };
    });
    setUserPets(userPets);
    setUserAlienPets(userPets);
    setShopUpgrades({ ...shop });
  };

  return (
    <Box
      className="rebirth"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />

      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        Rebirth
      </Typography>

      <Box
        className="rebirth-container"
        sx={{ backgroundColor: "background.secondary" }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          You can rebirth using your gems, you will lose all your pets, cash,
          gems and shop upgrades, but you will get a permanent +20% increase
          over your income in cash and gems, and you will keep the Space Center
          asteroids bonus (if you purachased it before rebirthing)
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {currentRebirth < products.length ? (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Price: {products[currentRebirth]} gems{" "}
            </Typography>
          ) : (
            <Typography variant="h5">Max rebirth reached</Typography>
          )}

          {currentRebirth < products.length && (
            <Button
              variant="contained"
              disabled={userGems < products[currentRebirth]}
              onClick={handleRebirth}
            >
              Rebirth
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Rebirth;
