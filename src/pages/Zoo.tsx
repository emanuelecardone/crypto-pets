import { Box, Button, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./zoo.css";
import NewPet from "../components/NewPet";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const Zoo = () => {
  const { userWallet, userPets, userAlienPets } = useApp();
  const [isAlien, setIsAlien] = useState<boolean>(false);

  return (
    <Box
      className="zoo"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />

      <Typography variant="h2" sx={{ color: "secondary.main" }}>
        Your Zoo
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          p: "5px 15px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* TESTO SINISTRO: EARTH */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: !isAlien ? "#4caf50" : "gray",
            transition: "color 0.3s ease",
          }}
        >
          Earth 🌍
        </Typography>

        {/* LO SWITCH CENTRALE */}
        <Switch
          checked={isAlien}
          onChange={(e) => setIsAlien(e.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#00e5ff" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#00e5ff",
            },
          }}
        />

        {/* TESTO DESTRO: ALIEN */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: isAlien ? "#00e5ff" : "gray",
            transition: "color 0.3s ease",
          }}
        >
          Alien 👽
        </Typography>
      </Box>

      <Box
        className="zoo-container"
        sx={{ p: 2, backgroundColor: "background.secondary" }}
      >
        {Object.values(isAlien ? userAlienPets : userPets).map(
          (rarityGroups, index) =>
            rarityGroups.map((pet, petIndex) => (
              <NewPet pet={pet} sx={{ height: "50%" }} isZoo />
            )),
        )}
      </Box>
    </Box>
  );
};

export default Zoo;
