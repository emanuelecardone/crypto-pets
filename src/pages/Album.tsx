import { Box, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./album.css";
import { petSpecies } from "../data/pets";
import NewPet from "../components/NewPet";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { alienPetSpecies } from "../data/alienPets";
import { useTranslation } from "react-i18next";

const Album = () => {
  const {
    userPets,
    userAlienPets,
    isSpace,
    interactiveTutorialFinished,
    setInteractiveTutorialFinished,
    currentInteractiveTutorial,
  } = useApp();
  const [isAlien, setIsAlien] = useState<boolean>(false);
  const [currentPetsNames, setCurrentPetsNames] = useState<string[]>([]);
  const { t } = useTranslation();
  const [interactiveTutorialStep, setInteractiveTutorialStep] = useState(2);

  useEffect(() => {
    const currentPetsObj = isAlien ? userAlienPets : userPets;

    const allNames = Object.values(currentPetsObj).flatMap((rarityGroup) =>
      rarityGroup.map((pet) => pet.name),
    );

    setCurrentPetsNames(allNames);
  }, [isAlien, userPets, userAlienPets]);

  useEffect(() => {
    if (
      !interactiveTutorialFinished &&
      currentInteractiveTutorial == 6 &&
      interactiveTutorialStep == 2
    ) {
      setTimeout(() => {
        setInteractiveTutorialStep(3);
      }, 5000);
    }
  }, [
    interactiveTutorialStep,
    currentInteractiveTutorial,
    interactiveTutorialFinished,
    setInteractiveTutorialStep,
  ]);

  return (
    <Box
      className="album"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header interactiveTutorialStep={interactiveTutorialStep} />
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ color: "secondary.main" }}>
          {t("album.album")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          p: "5px 15px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: !isAlien ? "#4caf50" : "gray",
            transition: "color 0.3s ease",
          }}
        >
          {t("pets.earth")} 🌍
        </Typography>

        <Switch
          checked={isAlien}
          onChange={(e) => setIsAlien(e.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#00e5ff" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#00e5ff",
            },
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: isAlien ? "#00e5ff" : "gray",
            transition: "color 0.3s ease",
          }}
        >
          {t("pets.alien")} 👽
        </Typography>
      </Box>

      <Box
        className="album-container"
        sx={{ p: 2, backgroundColor: "background.secondary" }}
      >
        {Object.values(isAlien ? alienPetSpecies : petSpecies).map(
          (rarityGroups, index) =>
            rarityGroups.map((pet, petIndex) => (
              <NewPet
                key={`${pet.name}-${petIndex}`}
                pet={pet}
                isZoo={false}
                isUnlocked={currentPetsNames.includes(pet.name)}
                sx={{
                  width: { xs: "calc(50% - 10px)", md: "calc(20% - 10px)" },
                  height: "calc(50% - 10px)",
                  zIndex:
                    !interactiveTutorialFinished &&
                    currentInteractiveTutorial == 6 &&
                    interactiveTutorialStep == 2 &&
                    petIndex <= 1
                      ? 120000
                      : 1,
                }}
                listItemsSx={{ textAlign: "center", p: { xs: 0, md: 1 } }}
              />
            )),
        )}
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
            !interactiveTutorialFinished && currentInteractiveTutorial == 6
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
            !interactiveTutorialFinished && currentInteractiveTutorial == 6
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

export default Album;
