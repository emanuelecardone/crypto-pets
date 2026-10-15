import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Pet } from "../types/pets";
import { relative } from "path";
import { useEffect } from "react";

type Props = {
  pet: Pet | null;
  isZoo: boolean;
  sx?: SxProps<Theme>;
  listItemsSx?: SxProps<Theme>;
  isUnlocked?: boolean;
};

const NewPet = ({
  pet,
  isZoo,
  sx,
  listItemsSx = { textTransform: "capitalize" },
  isUnlocked = true,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  return pet ? (
    <Card
      className="album-card"
      sx={{
        backgroundColor:
          pet.rarity == "common"
            ? "white"
            : pet.rarity == "uncommon"
              ? "green"
              : pet.rarity == "rare"
                ? "blue"
                : pet.rarity == "epic"
                  ? "purple"
                  : pet.rarity == "legendary"
                    ? "gold"
                    : pet.rarity == "mythic"
                      ? "red"
                      : "darkblue",
        border: "2px solid cyan",
        color: pet.rarity == "common" ? "black" : "white",
        cursor: "pointer",
        position: "relative",
        ...sx,
      }}
    >
      <CardHeader
        title={pet.name}
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          height: "20%",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "80%",
          p: { xs: 1, md: 2 },
        }}
      >
        <List sx={{ padding: { xs: 0, md: 1 } }}>
          <ListItem
            sx={{
              justifyContent: "center",
              mb: 2,
              ...listItemsSx,
            }}
          >
            <Typography variant="h3">{pet.emoji}</Typography>
          </ListItem>
          <ListItem sx={{ ...listItemsSx }}>
            <Typography variant="h5">
              {isMobile ? "" : "Rarity:"} {pet.rarity}
            </Typography>
          </ListItem>
          {isMobile ? null : (
            <ListItem sx={{ ...listItemsSx }}>
              <Typography variant="h5">Value: {pet.baseValue}</Typography>
            </ListItem>
          )}
          <ListItem sx={{ ...listItemsSx }}>
            <Typography variant="h5">
              {isZoo
                ? (isMobile ? "" : "Current earnings: ") +
                  (pet.mutation
                    ? pet.earnings + pet.earnings * pet.mutation.bonusMultiplier
                    : pet.earnings) +
                  "/s"
                : (isMobile ? "" : "Base earnings: ") +
                  pet.earnings +
                  "/s"}
            </Typography>
          </ListItem>
        </List>

        {pet.mutation && (
          <Box
            sx={{
              width: "100%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(25deg, #48f373 0%, #f4c3e3 25%, #4b4ef8 50%, #f8515f 75%, #e6f32f 100%);",
              border: "2px solid black",
              borderRadius: "5px",
            }}
          >
            {isZoo && (
              <Typography
                variant="h5"
                sx={{
                  color:
                    pet.mutation.type == "obsidian"
                      ? "black"
                      : pet.mutation.type == "toxic"
                        ? "lime"
                        : pet.mutation.type == "cosmic"
                          ? "lavender"
                          : pet.mutation.type == "holographic"
                            ? "cyan"
                            : "crimson",
                  textShadow: "0 0 5px #020303, 0 0 15px #171818",
                  fontWeight: "bold",
                }}
              >
                {pet.mutation?.name ?? "None"}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>

      {/*Overlay*/}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: isUnlocked ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          opacity: "0.85",
          zIndex: 20000,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Not obtained</Typography>
      </Box>
    </Card>
  ) : (
    <Typography variant="h4">Loading...</Typography>
  );
};

export default NewPet;
