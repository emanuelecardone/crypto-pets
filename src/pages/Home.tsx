import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import "./home.css";
import GameBox from "../components/GameBox";
import UserInfo from "../components/UserInfo";
import UserCharacters from "../components/UserCharacters";
import AudioBox from "../components/AudioBox";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { setTutorialWatched } = useApp();
  const { t } = useTranslation();

  return (
    <Box
      className={"home"}
      sx={{
        backgroundColor: "background.secondary",
        color: "primary.main",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        position: "relative",
        height: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <GameBox />

      <Box
        sx={{
          width: { xs: "100%", md: "20%" },
          height: { xs: "35%", md: "80%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AudioBox />
        <UserInfo />
        <UserCharacters />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          px: { xs: "5px", md: "40px" },
          boxSizing: "border-box",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setTutorialWatched(false);
          }}
          sx={{
            fontSize: { xs: "11px", md: "14px" },
            padding: { xs: "6px 10px", md: "6px 16px" },
          }}
        >
          {t("home.header.tutorial")}
        </Button>

        <Box sx={{ width: { xs: "40%", md: "auto" } }}>
          <ThemeToggle />
        </Box>

        <Link to={"/trivia"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "11px", md: "14px" },
              padding: { xs: "6px 10px", md: "6px 16px" },
            }}
          >
            {isMobile ? "Trivia" : "Trivia (" + t("home.header.earnGems") + ")"}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
