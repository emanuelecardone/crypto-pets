import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import "./home.css";
import GameBox from "../components/GameBox";
import UserInfo from "../components/UserInfo";
import UserCharacters from "../components/UserCharacters";
import AudioBox from "../components/AudioBox";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { setTutorialWatched } = useApp();
  return (
    <Box
      className={"home"}
      sx={{
        backgroundColor: "background.secondary",
        color: "primary.main",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <GameBox />
      <Box
        sx={{
          width: { xs: "100%", md: "20%" },
          height: { xs: "40%", md: "80%" },
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
          px: "40px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setTutorialWatched(false);
          }}
        >
          Tutorial
        </Button>
        <Box sx={{}}>
          <ThemeToggle />
        </Box>
        <Link to={"/trivia"}>
          <Button variant="contained">
            {isMobile ? "Trivia" : "Trivia (earn gems!)"}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
