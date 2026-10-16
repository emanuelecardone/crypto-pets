import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";
import Shop from "./pages/Shop";
import Hatchery from "./pages/Hatchery";
import Album from "./pages/Album";
import Zoo from "./pages/Zoo";
import Lab from "./pages/Lab";
import SpaceCenter from "./pages/SpaceCenter";
import { useApp } from "./context/AppContext";
import Trivia from "./pages/Trivia";
import Space from "./pages/Space";
import Rebirth from "./pages/Rebirth";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Settings from "./pages/Settings";
import SettingsIcon from "@mui/icons-material/Settings";
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
  interface TypeBackground {
    secondary?: string;
  }
}

export default function App() {
  const { tutorialWatched, isSpace, darkMode } = useApp();
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.only("xs"));

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: isSpace ? "#00e5ff" : "#0d47a1",
        contrastText: "#ffffff",
      },
      secondary: {
        main: isSpace ? "#ff00f5" : "#1976d2",
        contrastText: "#ffffff",
      },
      background: {
        default: isSpace
          ? darkMode
            ? "#040814"
            : "#78C9D6"
          : darkMode
            ? "#211510"
            : "#a8e6cf",

        paper: isSpace
          ? darkMode
            ? "#101428"
            : "#B68BC7"
          : darkMode
            ? "#2E1F1A"
            : "#c8f2d5",

        secondary: isSpace
          ? darkMode
            ? "#182040"
            : "#D873A2"
          : darkMode
            ? "#42322C"
            : "#aed8f2",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#1b2a22",
        secondary: isSpace ? "#00e5ff" : darkMode ? "#a9dfbf" : "#2c3e35",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

      h1: {
        fontSize: "3rem",
        "@media (max-width:1200px)": { fontSize: "2rem" },
        "@media (max-width:600px)": { fontSize: "1.5rem" },
      },
      h2: {
        fontSize: "2.5rem",
        "@media (max-width:1200px)": { fontSize: "1.75rem" },
        "@media (max-width:600px)": { fontSize: "1.3rem" },
      },
      h3: {
        fontSize: "2rem",
        "@media (max-width:1200px)": { fontSize: "1.5rem" },
        "@media (max-width:600px)": { fontSize: "1.1rem" },
      },

      h4: {
        fontWeight: "bold",
        fontSize: "1.75rem",
        "@media (max-width:1200px)": { fontSize: "1.2rem" },
        "@media (max-width:600px)": { fontSize: "1rem" },
      },
      h5: {
        fontWeight: "bold",
        fontSize: "1.4rem",
        "@media (max-width:1200px)": { fontSize: "1rem" },
        "@media (max-width:600px)": { fontSize: "0.85rem" },
      },
      h6: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        "@media (max-width:1200px)": { fontSize: "0.9rem" },
        "@media (max-width:600px)": { fontSize: "0.75rem" },
      },

      body1: {
        fontWeight: "bold",
        fontSize: "1.15rem",
        "@media (max-width:1200px)": { fontSize: "0.85rem" },
        "@media (max-width:600px)": { fontSize: "0.7rem" },
      },

      body2: {
        fontSize: "1rem",
        "@media (max-width:1200px)": { fontSize: "0.75rem" },
        "@media (max-width:600px)": { fontSize: "0.6rem" },
      },

      caption: {
        fontSize: "0.8rem",
        "@media (max-width:1200px)": { fontSize: "0.65rem" },
        "@media (max-width:600px)": { fontSize: "0.55rem" },
      },

      button: {
        fontWeight: "bold",
        fontSize: "0.875rem",
        "@media (max-width:1200px)": { fontSize: "0.75rem" },
        "@media (max-width:600px)": {
          fontSize: "0.6rem",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={tutorialWatched ? <Home /> : <Tutorial />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/hatchery" element={<Hatchery />} />

        <Route path="/album" element={<Album />} />

        <Route path="/zoo" element={<Zoo />} />

        <Route path="/lab" element={<Lab />} />

        <Route path="/space-center" element={<SpaceCenter />} />

        <Route path="/trivia" element={<Trivia />} />

        <Route path="/space" element={<Space />} />

        <Route path="/rebirth" element={<Rebirth />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<div>Pagina non trovata!</div>} />
      </Routes>
      <Link
        className="settings-button"
        to={"/settings"}
        style={{
          position: "fixed",
          right: !isMobile ? "40px" : "5px",
          bottom: !isMobile ? "40px" : "5px",
          textDecoration: "none",
        }}
      >
        <SettingsIcon
          sx={{ fontSize: { xs: "25px", md: "40px" }, color: "secondary.main" }}
        />
      </Link>
    </ThemeProvider>
  );
}
