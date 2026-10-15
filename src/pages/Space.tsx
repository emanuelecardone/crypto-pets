import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box
      className="space"
      sx={{
        backgroundColor: "background.secondary",
        color: "primary.main",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        position: "relative",
        height: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        padding: { xs: "90px 15px 15px 15px", md: "40px" },
        boxSizing: "border-box",
      }}
    >
      <SpaceGameBox />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "100%", md: "20%" },
          height: { xs: "35%", md: "80%" },
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
          px: { xs: "15px", md: "40px" },
          boxSizing: "border-box",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsSpace(false);
            }}
            sx={{
              fontSize: { xs: "11px", md: "14px" },
              padding: { xs: "6px 10px", md: "6px 16px" },
            }}
          >
            {isMobile ? "Earth" : "Back to Earth"}
          </Button>
        </Link>

        <Box sx={{ width: { xs: "130px", md: "auto" } }}>
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
            {isMobile ? "Trivia" : "Trivia (earn gems!)"}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Space;
