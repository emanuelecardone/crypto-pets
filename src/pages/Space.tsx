import { Box, Button } from "@mui/material";
import "./space.css";
import AudioBox from "../components/AudioBox";
import UserInfo from "../components/UserInfo";
import UserCharacters from "../components/UserCharacters";
import { Link } from "react-router-dom";
import SpaceGameBox from "../components/SpaceGameBox";
import { useApp } from "../context/AppContext";
import ThemeToggle from "../components/ThemeToggle";

const Space = () => {
  const { setIsSpace } = useApp();
  return (
    <Box
      className="space"
      sx={{ backgroundColor: "background.secondary", color: "primary.main" }}
    >
      <SpaceGameBox />
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

      <Link
        to={"/"}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          textDecoration: "none",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsSpace(false);
          }}
        >
          Back to Earth
        </Button>
      </Link>
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

export default Space;
