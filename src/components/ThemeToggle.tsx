import { Box, Switch, Typography } from "@mui/material";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useApp();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        p: { xs: 0, md: "8px 16px" },
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
        {t("home.header.light")} ☀️
      </Typography>

      <Switch
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
        color="primary"
      />

      <Typography
        variant="body1"
        color={darkMode ? "text.primary" : "text.secondary"}
        sx={{ fontWeight: "bold", transition: "color 0.3s ease" }}
      >
        {t("home.header.dark")} 🌙
      </Typography>
    </Box>
  );
};

export default ThemeToggle;
