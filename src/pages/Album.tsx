import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Switch,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./album.css";
import { petSpecies } from "../data/pets";
import NewPet from "../components/NewPet";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { alienPetSpecies } from "../data/alienPets";

const Album = () => {
  const { userPets, userAlienPets, isSpace } = useApp();
  const [isAlien, setIsAlien] = useState<boolean>(false);

  let currentPetsNames: string[] = [];

  Object.values(isSpace ? userAlienPets : userPets).forEach((rarityGroup) => {
    const thisRarityNames = rarityGroup.map((pet) => pet.name);
    currentPetsNames = [...currentPetsNames, ...thisRarityNames];
  });

  return (
    <Box
      className="album"
      sx={{ backgroundColor: "background.paper", color: "primary.main" }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ color: "secondary.main" }}>
          Album
        </Typography>
      </Box>

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
        className="album-container"
        sx={{ p: 2, backgroundColor: "background.secondary" }}
      >
        {Object.values(isAlien ? alienPetSpecies : petSpecies).map(
          (rarityGroups, index) =>
            rarityGroups.map((pet, petIndex) => (
              <NewPet
                key={`${pet.name}-${petIndex}`}
                pet={pet}
                isZoo={false}
                isUnlocked={currentPetsNames.includes(pet.name)}
              />
            )),
        )}
      </Box>
    </Box>
  );
};

export default Album;
