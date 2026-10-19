import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { interactiveTutorial } from "../data/interactiveTutorial";

type Props = {
  interactiveTutorialStep?: number;
};

const Header = ({ interactiveTutorialStep = 0 }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const {
    userWallet,
    userGems,
    isSpace,
    setIsSpace,
    interactiveTutorialFinished,
    currentInteractiveTutorial,
    setCurrentInteractiveTutorial,
    setInteractiveTutorialFinished,
  } = useApp();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        px: { xs: "5px", md: "40px" },
        backgroundColor: "background.secondary",
        zIndex:
          !interactiveTutorialFinished &&
          ((currentInteractiveTutorial == 1 && interactiveTutorialStep == 4) ||
            (currentInteractiveTutorial == 2 &&
              (interactiveTutorialStep == 2 || interactiveTutorialStep == 3)) ||
            (currentInteractiveTutorial == 3 && interactiveTutorialStep == 3) ||
            (currentInteractiveTutorial == 4 && interactiveTutorialStep == 3) ||
            (currentInteractiveTutorial == 5 && interactiveTutorialStep == 3) ||
            (currentInteractiveTutorial == 6 && interactiveTutorialStep == 3))
            ? 120000
            : 1,
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            zIndex:
              !interactiveTutorialFinished &&
              currentInteractiveTutorial == 2 &&
              interactiveTutorialStep == 2
                ? 120001
                : 1,
            backgroundColor:
              !interactiveTutorialFinished &&
              currentInteractiveTutorial == 2 &&
              interactiveTutorialStep == 2
                ? "white"
                : "transparent",
          }}
        >
          {isMobile ? "" : t("home.userInfo.cash") + ": "}{" "}
          {userWallet.toFixed(2)}$
        </Typography>
        <Typography variant="h5">
          {isMobile ? "" : t("home.userInfo.gems") + ": "} {userGems.toFixed(2)}
          {isMobile ? t("home.userInfo.gems") : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemeToggle />
      </Box>
      <Box
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Link to={isSpace ? "/space" : "/"} style={{}}>
          <Button
            variant="contained"
            onClick={
              !interactiveTutorialFinished &&
              ((currentInteractiveTutorial == 1 &&
                interactiveTutorialStep == 4) ||
                (currentInteractiveTutorial == 2 &&
                  interactiveTutorialStep == 3) ||
                (currentInteractiveTutorial == 3 &&
                  interactiveTutorialStep == 3) ||
                (currentInteractiveTutorial == 4 &&
                  interactiveTutorialStep == 3) ||
                (currentInteractiveTutorial == 5 &&
                  interactiveTutorialStep == 3))
                ? () => {
                    setCurrentInteractiveTutorial((prev) => prev + 1);
                  }
                : currentInteractiveTutorial == interactiveTutorial.length - 1
                  ? () => setInteractiveTutorialFinished(true)
                  : () => {}
            }
          >
            Home
          </Button>
        </Link>
      </Box>
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
            !interactiveTutorialFinished &&
            currentInteractiveTutorial == 2 &&
            interactiveTutorialStep == 2
              ? "block"
              : "none",
        }}
      ></Box>
    </Box>
  );
};

export default Header;
