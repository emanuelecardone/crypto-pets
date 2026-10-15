import { Routes, Route } from "react-router-dom";
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
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
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

        <Route path="*" element={<div>Pagina non trovata!</div>} />
      </Routes>
    </ThemeProvider>
  );
}
