import { Box, Button } from "@mui/material";
import "./home.css";
import GameBox from "../components/GameBox";
import UserInfo from "../components/UserInfo";
import UserCharacters from "../components/UserCharacters";
import AudioBox from "../components/AudioBox";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const { setTutorialWatched } = useApp();
  return (
    <Box
      className={"home"}
      sx={{ backgroundColor: "background.secondary", color: "primary.main" }}
    >
      <GameBox />
      <Box
        sx={{
          width: "20%",
          height: "80%",
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

      <Button
        variant="contained"
        sx={{ position: "absolute", top: "40px", left: "40px" }}
        onClick={() => {
          setTutorialWatched(false);
        }}
      >
        Tutorial
      </Button>
      <Box
        sx={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ThemeToggle />
      </Box>
      <Link
        to={"/trivia"}
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          textDecoration: "none",
        }}
      >
        <Button variant="contained">Trivia (earn gems!)</Button>
      </Link>
    </Box>
  );
};

export default Home;
