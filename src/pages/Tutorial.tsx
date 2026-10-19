import { Box, Button, Typography } from "@mui/material";
import "./tutorial.css";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Tutorial = () => {
  const { tutorial, setTutorialWatched } = useApp();
  const [currentTutorial, setCurrentTutorial] = useState<number>(0);
  const { t } = useTranslation();
  return (
    <Box
      className="tutorial"
      sx={{
        backgroundColor: "background.paper",
        color: "primary.main",
        pb: { xs: "20px", md: "150px" },
      }}
    >
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("tutorial.tutorial")}
      </Typography>
      <Box className="tutorial-container">
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.secondary",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography variant="h5">
            {t(`tutorial.content.${Object.keys(tutorial)[currentTutorial]}`)}
          </Typography>
        </Box>
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
            disabled={currentTutorial == 0}
            onClick={() => {
              setCurrentTutorial(
                (prevCurrentTutorial) => prevCurrentTutorial - 1,
              );
            }}
          >
            {t("tutorial.previous")}
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setTutorialWatched(true);
            }}
          >
            {t("tutorial.skip")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              currentTutorial == Object.values(tutorial).length - 1
                ? setTutorialWatched(true)
                : setCurrentTutorial(
                    (prevCurrentTutorial) => prevCurrentTutorial + 1,
                  );
            }}
          >
            {currentTutorial == Object.values(tutorial).length - 1
              ? t("tutorial.startGame")
              : t("tutorial.next")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tutorial;
