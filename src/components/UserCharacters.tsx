import { Box, Typography } from "@mui/material";
import { userCharacters } from "../data/userCharacters";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const UserCharacters = () => {
  const { userCharacter, setUserCharacter } = useApp();
  const [selected, setSelected] = useState<number>(
    userCharacters.indexOf(userCharacter),
  );
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        height: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.paper",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "secondary.main", display: { xs: "none", md: "block" } }}
      >
        {t("home.userCharacters.characters")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "70%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        {userCharacters.map((character, index) => (
          <Box
            key={"character" + index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "calc(100% / 3)",
              height: "50%",
              backgroundColor:
                selected === index ? "primary.main" : "background.paper",
              border: "2px solid black",
              borderRadius: "5px",
              animation:
                selected === index
                  ? "pulsation 0.5s ease-in-out infinite alternate"
                  : "none",

              "@keyframes pulsation": {
                "0%": {
                  transform: "scale(1)",
                },
                "100%": {
                  transform: "scale(1.05)",
                },
              },
              cursor: "pointer",
              "&:hover": {
                scale: selected === index ? 1 : 1.05,
              },
            }}
            onClick={() => {
              setSelected(index);
              setUserCharacter(character);
            }}
          >
            <Typography variant="h3">{character}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserCharacters;
