import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./hatchery.css";
import { eggs } from "../data/eggs";
import { alienEggs } from "../data/alienEggs";
import { useApp } from "../context/AppContext";
import { Pet } from "../types/pets";
import { useState } from "react";
import NewPet from "../components/NewPet";
import Header from "../components/Header";
import PetHatched from "../components/PetHatched";
import { useTranslation } from "react-i18next";
import { petSpecies } from "../data/pets";
const BASE_RARITY_ODDS: Record<string, number> = {
  common: 40,
  uncommon: 25,
  rare: 15,
  epic: 10,
  legendary: 5,
  mythic: 4.5,
  astral: 0.5,
};

const RARITY_ORDER = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
  "astral",
];

const Hatchery = () => {
  const {
    userWallet,
    setUserWallet,
    userGems,
    setUserGems,
    userPets,
    userAlienPets,
    isSpace,
    interactiveTutorialFinished,
    currentInteractiveTutorial,
  } = useApp();

  const { t } = useTranslation();

  const [newPet, setNewPet] = useState<string>("none");
  const [newPetContent, setNewPetContent] = useState<Pet | null>(null);
  const [isOwned, setIsOwned] = useState<boolean>(false);

  const [interactiveTutorialStep, setInteractiveTutorialStep] = useState(2);

  const purchase = (
    eggRarity: keyof typeof userPets,
    currentPrice: number,
    eggPets: Pet[],
  ) => {
    if ((isSpace ? userGems : userWallet) >= currentPrice) {
      const maxRarityIndex = RARITY_ORDER.indexOf(eggRarity);

      if (maxRarityIndex === -1) {
        console.error(
          `Errore critico: la rarità '${eggRarity}' non è presente in RARITY_ORDER`,
        );
        return;
      }

      const allowedRarities = RARITY_ORDER.slice(0, maxRarityIndex + 1);

      const partialSum = allowedRarities.reduce(
        (sum, rarity) => sum + BASE_RARITY_ODDS[rarity],
        0,
      );

      const effectiveOdds = allowedRarities.map((rarity) => ({
        rarity,
        chance: (BASE_RARITY_ODDS[rarity] / partialSum) * 100,
      }));

      let random = Math.random() * 100;
      let selectedRarity = "common";

      for (const option of effectiveOdds) {
        if (random < option.chance) {
          selectedRarity = option.rarity;
          break;
        }
        random -= option.chance;
      }

      const targetEggData = isSpace
        ? (alienEggs as any)[selectedRarity]
        : (eggs as any)[selectedRarity];
      const poolRaritàEstratta = targetEggData ? targetEggData.pets : eggPets;

      // TUTORIAL HATCH ALWAYS PET N°2 TO SHOW BOTH IN TUTORIAL
      const nextPet = interactiveTutorialFinished
        ? poolRaritàEstratta[
            Math.floor(Math.random() * poolRaritàEstratta.length)
          ]
        : petSpecies.common[1];

      const targetRarityKey = nextPet.rarity as keyof typeof userPets;

      isSpace
        ? setUserGems(userGems - currentPrice)
        : setUserWallet(userWallet - currentPrice);

      const alreadyOwned = (isSpace ? userAlienPets : userPets)[
        targetRarityKey
      ].some((pet) => pet.name === nextPet.name);

      setIsOwned(alreadyOwned);

      setNewPet("flex");
      setNewPetContent(nextPet);

      if (alreadyOwned) {
        isSpace
          ? setUserGems((prevGems) => prevGems + nextPet.baseValue)
          : setUserWallet((prevWallet) => prevWallet + nextPet.baseValue);

        setTimeout(() => {
          setNewPet("none");
        }, 3000);
      }
      if (
        !interactiveTutorialFinished &&
        currentInteractiveTutorial == 1 &&
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
      className="hatchery"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header interactiveTutorialStep={interactiveTutorialStep} />
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("hatchery.hatchery")}
      </Typography>
      <Box
        className="hatchery-container"
        sx={{ backgroundColor: "background.secondary", overflowY: "auto" }}
      >
        {Object.entries(isSpace ? alienEggs : eggs).map((eggInfo) => {
          return (
            <Card
              key={eggInfo[0]}
              sx={{
                width: { xs: "calc(100% - 20px)", md: "calc(25% - 20px)" },
                height: "45%",
                textTransform: "capitalize",
                border: "2px solid cyan",
                color: eggInfo[0] === "common" ? "black" : "white",
                p: 0,
                backgroundColor:
                  eggInfo[0] === "common"
                    ? "white"
                    : eggInfo[0] === "uncommon"
                      ? "green"
                      : eggInfo[0] === "rare"
                        ? "blue"
                        : eggInfo[0] === "epic"
                          ? "purple"
                          : eggInfo[0] === "legendary"
                            ? "gold"
                            : eggInfo[0] === "mythic"
                              ? "red"
                              : "darkblue",
                zIndex:
                  !interactiveTutorialFinished &&
                  currentInteractiveTutorial == 1 &&
                  interactiveTutorialStep == 2 &&
                  eggInfo[0] == "common"
                    ? 120000
                    : 1,
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h3">
                    {t("hatchery.egg") +
                      ": " +
                      t("pets.rarities." + eggInfo[0].toLowerCase())}
                  </Typography>
                }
                sx={{ height: "20%", textAlign: "center" }}
              />
              <CardContent
                sx={{
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "60%",
                    overflowY: "auto",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    {t("hatchery.bestPets")}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      overflow: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {eggInfo[1].pets.map((pet, petIndex) => (
                      <Box
                        key={petIndex}
                        sx={{
                          width: "calc(20% - 20px)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "background.paper",
                          py: 1,
                          borderRadius: "5px",
                        }}
                      >
                        {pet.emoji}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "100%", md: "30%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    borderRadius: "5px",
                    color: "black",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "primary.main" }}>
                    {t("hatchery.price")}: {eggInfo[1].price}{" "}
                    {isSpace ? t("home.userInfo.gems") : "$"}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      width: "40%",
                    }}
                    disabled={
                      (isSpace ? userGems : userWallet) < eggInfo[1].price
                    }
                    onClick={() =>
                      purchase(
                        eggInfo[0] as keyof typeof userPets,
                        eggInfo[1].price,
                        eggInfo[1].pets,
                      )
                    }
                  >
                    {t("hatchery.buy")}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Overlay New Pet */}
      {newPetContent && (
        <PetHatched
          pet={newPetContent}
          alreadyOwned={isOwned}
          display={newPet}
          setDisplay={setNewPet}
          interactiveTutorialStep={interactiveTutorialStep}
          setInteractiveTutorialStep={setInteractiveTutorialStep}
        />
      )}

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
            !interactiveTutorialFinished && currentInteractiveTutorial == 1
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
            !interactiveTutorialFinished && currentInteractiveTutorial == 1
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

export default Hatchery;
