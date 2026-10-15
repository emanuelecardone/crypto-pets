import { Box, Button, Typography } from "@mui/material";
import "./tutorial.css";
import { useApp } from "../context/AppContext";
import { useState } from "react";

const Tutorial = () => {
  const { tutorial, setTutorialWatched } = useApp();
  const [currentTutorial, setCurrentTutorial] = useState<number>(0);
  return (
    <Box
      className="tutorial"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        Tutorial
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
          <Typography variant="h5">{tutorial[currentTutorial]}</Typography>
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
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setTutorialWatched(true);
            }}
          >
            Skip
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              currentTutorial == tutorial.length - 1
                ? setTutorialWatched(true)
                : setCurrentTutorial(
                    (prevCurrentTutorial) => prevCurrentTutorial + 1,
                  );
            }}
          >
            {currentTutorial == tutorial.length - 1 ? "Start Game" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tutorial;
