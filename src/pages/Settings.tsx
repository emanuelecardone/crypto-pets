import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./settings.css";
import Header from "../components/Header";

const Settings = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box className="settings" sx={{ backgroundColor: "background.paper" }}>
      <Header />
      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        {t("settings.settings")}
      </Typography>
      <Box className="settings-container">
        <Box
          sx={{
            width: "40%",
            height: "40%",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              boxShadow: 3,
              p: 4,
              color: "secondary.main",
              backgroundColor: "background.secondary",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h4">
                  {t("settings.selectLanguage")}
                </Typography>
              }
            />
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  mt: 2,
                }}
              >
                <Button
                  sx={{
                    transform:
                      i18n.language == "it" ? "scale(1.1)" : "scale(1)",
                    backgroundColor:
                      i18n.language == "it" ? "secondary.main" : "auto",
                  }}
                  onClick={() => i18n.changeLanguage("it")}
                  variant="contained"
                >
                  {t("settings.language.italian")}
                </Button>
                <Button
                  sx={{
                    transform:
                      i18n.language == "en" ? "scale(1.1)" : "scale(1)",
                    backgroundColor:
                      i18n.language == "en" ? "secondary.main" : "auto",
                  }}
                  onClick={() => i18n.changeLanguage("en")}
                  variant="contained"
                >
                  {t("settings.language.english")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default Settings;
