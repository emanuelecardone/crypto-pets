import { Box, Switch, Typography } from "@mui/material";
import { useApp } from "../context/AppContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        p: "8px 16px",
        backgroundColor: "background.secondary",
        borderRadius: "20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="body1"
        color={!darkMode ? "text.primary" : "text.secondary"}
        sx={{ fontWeight: "bold", transition: "color 0.3s ease" }}
      >
        Light ☀️
      </Typography>

      <Switch
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
        color="primary"
      />

      {/* POLO DESTRO: DARK MODE */}
      <Typography
        variant="body1"
        color={darkMode ? "text.primary" : "text.secondary"}
        sx={{ fontWeight: "bold", transition: "color 0.3s ease" }}
      >
        Dark 🌙
      </Typography>
    </Box>
  );
};

export default ThemeToggle;
