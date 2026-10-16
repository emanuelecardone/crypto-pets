import {
  Box,
  Button,
  Grow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Pet } from "../types/pets";
import NewPet from "./NewPet";
import { useApp } from "../context/AppContext";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  pet: Pet;
  alreadyOwned: boolean;
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
};

const PetHatched = ({ pet, alreadyOwned, display, setDisplay }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const {
    userWallet,
    setUserWallet,
    userPets,
    setUserPets,
    userAlienPets,
    setUserAlienPets,
    userEarnings,
    setUserEarnings,
    setUserGems,
    userGemsEarnings,
    setUserGemsEarnings,
    isSpace,
  } = useApp();

  const { t } = useTranslation();

  const handleSellPet = () => {
    if (isSpace) {
      setUserGems((prevGems) => prevGems + pet.baseValue);
    } else {
      setUserWallet((prevWallet) => prevWallet + pet.baseValue);
    }
    setDisplay("none");
  };

  const handleKeepPet = () => {
    if (isSpace) {
      setUserAlienPets({
        ...userAlienPets,
        [pet.rarity]: [
          ...userAlienPets[pet.rarity as keyof typeof userPets],
          pet,
        ],
      });
      setUserGemsEarnings(userGemsEarnings + pet.earnings);
    } else {
      setUserPets({
        ...userPets,
        [pet.rarity]: [...userPets[pet.rarity as keyof typeof userPets], pet],
      });
      setUserEarnings(userEarnings + pet.earnings);
    }

    setDisplay("none");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: display,
        justifyContent: "center",
        alignItems: "flex-start",
        position: "fixed",
        zIndex: 5000,
        backgroundColor: "background.paper",
      }}
    >
      <Grow in={display === "flex"} timeout={500}>
        <Box
          sx={{
            width: "50%",
            height: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h3" sx={{ color: isSpace ? "white" : "black" }}>
            {alreadyOwned ? t("pets.alreadyOwned") : t("pets.newPet")}
          </Typography>
          <NewPet
            pet={pet}
            isZoo={false}
            sx={{
              width: "80%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
              mb: 6,
            }}
            listItemsSx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              textTransform: "capitalize",
            }}
          />
          {alreadyOwned ? (
            <Typography variant="h4" sx={{ color: "red", fontWeight: "bold" }}>
              {t("pets.petSoldFor")} {pet.baseValue}{" "}
              {isSpace ? t("home.userInfo.gems") : "$"}!
            </Typography>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", p: 2 }}
                onClick={handleSellPet}
              >
                {t("pets.sell")}
                {isMobile
                  ? ""
                  : " " +
                    t("pets.for") +
                    " " +
                    pet.baseValue +
                    (isSpace ? " " + t("home.userInfo.gems") : " $")}
              </Button>
              <Button variant="contained" sx={{ p: 2 }} onClick={handleKeepPet}>
                {isMobile ? "" : t("pets.placeInZoo") + " "}Zoo
              </Button>
            </Box>
          )}
        </Box>
      </Grow>
    </Box>
  );
};

export default PetHatched;
