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

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { userWallet, userGems, isSpace, setIsSpace } = useApp();
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
        <Typography variant="h5">
          {isMobile ? "" : "Cash: "} {userWallet.toFixed(2)}$
        </Typography>
        <Typography variant="h5">
          {isMobile ? "" : "Gems: "} {userGems.toFixed(2)}
          {isMobile ? "Gems" : ""}
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
        <Link to={isSpace ? "/space" : "/"}>
          <Button variant="contained">Home</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
