import {
  Box,
  Button,
  Grow,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./lab.css";
import { useApp } from "../context/AppContext";
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Lab = () => {
  const {
    userWallet,
    setUserWallet,
    userPets,
    setUserPets,
    userAlienPets,
    setUserAlienPets,
    mutations,
    mutationOdds,
  } = useApp();

  const { t } = useTranslation();

  const [selectedPetName, setSelectedPetName] = useState<string>(
    Object.values(userPets).flatMap((rarityGroup) => rarityGroup).length > 0
      ? Object.values(userPets).flatMap((rarityGroup) => rarityGroup)[0].name
      : Object.values(userAlienPets).flatMap((rarityGroup) => rarityGroup)
            .length > 0
        ? Object.values(userAlienPets).flatMap((rarityGroup) => rarityGroup)[0]
            .name
        : "",
  );

  const [resultText, setResultText] = useState<string>(t("lab.tryMutate"));
  const [animateText, setAnimateText] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const MUTATION_PRICE = 20000;

  const textTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textScaleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (textTimerRef.current) clearTimeout(textTimerRef.current);
      if (textScaleTimerRef.current) clearTimeout(textScaleTimerRef.current);
    };
  }, []);

  const handleRollMutation = () => {
    if (userWallet < MUTATION_PRICE) {
      console.log("Cash insufficiente per tentare la mutazione!");
      return;
    }
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 520);
    if (textTimerRef.current) {
      clearTimeout(textTimerRef.current);
    }
    if (textScaleTimerRef.current) {
      clearTimeout(textScaleTimerRef.current);
    }

    const random = Math.random() * 100;

    setUserWallet((prev) => prev - MUTATION_PRICE);

    if (random < 50) {
      setAnimateText(false);
      setTimeout(() => {
        setAnimateText(true);
        setResultText(t("lab.failAttempt"));
      }, 300);

      textTimerRef.current = setTimeout(() => {
        setResultText("Try to mutate a pet!");
        textTimerRef.current = null;
        textScaleTimerRef.current = null;
      }, 5000);

      return;
    }

    let selectedMutation: any = null;

    if (random >= 50 && random < 70) {
      // 20% chance
      selectedMutation = mutations[0];
    } else if (random >= 70 && random < 85) {
      // 15% chance
      selectedMutation = mutations[1];
    } else if (random >= 85 && random < 95) {
      // 10% chance
      selectedMutation = mutations[2];
    } else if (random >= 95 && random < 99.5) {
      // 4.5% chance
      selectedMutation = mutations[3];
    } else if (random >= 99.5) {
      // 0.5% chance super rara!
      selectedMutation = mutations[4];
    }

    setAnimateText(false);
    setTimeout(() => {
      setAnimateText(true);
      setResultText(
        t("lab.successAttempt") +
          " " +
          t("lab." + selectedMutation.name.toLowerCase()),
      );
    }, 300);

    textTimerRef.current = setTimeout(() => {
      setAnimateText(false);
      setTimeout(() => {
        setAnimateText(true);
        setResultText("Try to mutate a pet!");
        textTimerRef.current = null;
      }, 300);
    }, 5000);

    const targetPet = [
      ...Object.values(userPets),
      ...Object.values(userAlienPets),
    ]
      .flatMap((rarityGroup) => rarityGroup)
      .find((pet: any) => pet.name === selectedPetName);

    if (targetPet) {
      console.log(targetPet);
      const currentSelectedPetRarity =
        targetPet.rarity as keyof typeof userPets;

      const currentUserPets = { ...userPets };
      const currentUserAlienPets = { ...userAlienPets };

      if (currentUserPets[currentSelectedPetRarity]) {
        currentUserPets[currentSelectedPetRarity] = currentUserPets[
          currentSelectedPetRarity
        ].map((pet: any) => {
          if (pet.name === selectedPetName) {
            return {
              ...pet,
              mutation: {
                type: selectedMutation.type,
                name: selectedMutation.name,
                bonusMultiplier: selectedMutation.bonusMultiplier,
              },
            };
          }
          return pet;
        });

        setUserPets(currentUserPets);

        console.log(
          `Pet ${selectedPetName} potenziato con successo con il tratto ${selectedMutation.name}!`,
        );
      }
      if (currentUserAlienPets[currentSelectedPetRarity]) {
        currentUserAlienPets[currentSelectedPetRarity] = currentUserAlienPets[
          currentSelectedPetRarity
        ].map((pet: any) => {
          if (pet.name === selectedPetName) {
            return {
              ...pet,
              mutation: {
                type: selectedMutation.type,
                name: selectedMutation.name,
                bonusMultiplier: selectedMutation.bonusMultiplier,
              },
            };
          }
          return pet;
        });

        setUserAlienPets(currentUserAlienPets);

        console.log(
          `Pet ${selectedPetName} potenziato con successo con il tratto ${selectedMutation.name}!`,
        );
      }
    }
  };

  return (
    <Box
      className="lab"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />

      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("lab.lab")}
      </Typography>

      <Box className="lab-container">
        <Box
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            p: { xs: 1, md: 4 },
            borderRadius: "5px",
            backgroundColor: "background.secondary",
          }}
        >
          <Grow in={animateText} timeout={500}>
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 0.5, md: 3 },
                fontWeight: "bold",
                color: "secondary.main",
              }}
            >
              {resultText}
            </Typography>
          </Grow>
          {Object.values(userPets).flatMap((rarityGroup) => rarityGroup)
            .length > 0 ||
          Object.values(userAlienPets).flatMap((rarityGroup) => rarityGroup)
            .length > 0 ? (
            <Select
              value={selectedPetName}
              onChange={(e) => setSelectedPetName(e.target.value)}
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
              }}
            >
              {[...Object.values(userPets), ...Object.values(userAlienPets)]
                .flatMap((rarityGroup) => rarityGroup)
                .map((pet: any, index: number) => (
                  <MenuItem key={"select-pet-" + index} value={pet.name}>
                    {pet.name}{" "}
                    {pet.mutation
                      ? `[${t("lab." + pet.mutation.name.toLowerCase())}]`
                      : ""}
                  </MenuItem>
                ))}
            </Select>
          ) : (
            <Typography variant="h5" sx={{ color: "black" }}>
              {t("lab.noPets")}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            disabled={
              userWallet < MUTATION_PRICE ||
              disabled ||
              (Object.values(userPets).flatMap((petCategory) => petCategory)
                .length == 0 &&
                Object.values(userAlienPets).flatMap(
                  (petCategory) => petCategory,
                ).length == 0)
            }
            onClick={handleRollMutation}
            sx={{ textWrap: "nowrap" }}
          >
            {t("lab.tryMutation")} (💰 {MUTATION_PRICE})
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "55%",
            textTransform: "capitalize",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            mt: { xs: 0, md: 6 },
            p: { xs: 1, md: 4 },
            borderRadius: "5px",
            backgroundColor: "background.secondary",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "secondary.main",
              display: { xs: "none", md: "block" },
            }}
          >
            {t("lab.odds")}
          </Typography>
          <List>
            {Object.entries(mutationOdds).map((values, index) => (
              <ListItem key={"odd-" + index} sx={{ p: 0.5 }}>
                <Typography variant="h4">
                  {t("lab." + values[0])}: {values[1]}%
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Lab;
