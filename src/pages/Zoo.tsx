import { Box, Button, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./zoo.css";
import NewPet from "../components/NewPet";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Zoo = () => {
  const {
    userWallet,
    userPets,
    userAlienPets,
    interactiveTutorialFinished,
    setCurrentInteractiveTutorial,
    currentInteractiveTutorial,
  } = useApp();
  const [isAlien, setIsAlien] = useState<boolean>(false);
  const { t } = useTranslation();
  const [interactiveTutorialStep, setInteractiveTutorialStep] = useState(2);

  useEffect(() => {
    if (
      !interactiveTutorialFinished &&
      currentInteractiveTutorial == 5 &&
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
      className="zoo"
      sx={{
        backgroundColor: "background.paper",
        color: "primary.main",
        pb: { xs: "20px", md: "150px" },
      }}
    >
      <Header interactiveTutorialStep={interactiveTutorialStep} />

      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("zoo.zoo")}
      </Typography>

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
        className="zoo-container"
        sx={{ p: 2, backgroundColor: "background.secondary" }}
      >
        {Object.values(isAlien ? userAlienPets : userPets).map(
          (rarityGroups, index) =>
            rarityGroups.map((pet, petIndex) => (
              <NewPet
                key={"zoo_pet" + index}
                pet={pet}
                sx={{
                  width: { xs: "calc(50% - 10px)", md: "calc(20% - 10px)" },
                  height: "calc(50% - 10px)",
                  zIndex:
                    !interactiveTutorialFinished &&
                    currentInteractiveTutorial == 5 &&
                    interactiveTutorialStep == 2
                      ? 120000
                      : 1,
                }}
                isZoo
                listItemsSx={{ p: { xs: 0, md: 1 }, textAlign: "center" }}
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
            !interactiveTutorialFinished && currentInteractiveTutorial == 5
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
            !interactiveTutorialFinished && currentInteractiveTutorial == 5
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

export default Zoo;
