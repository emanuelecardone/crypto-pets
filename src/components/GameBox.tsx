import { Box } from "@mui/material";
import "./gamebox.css";
import { useApp } from "../context/AppContext";
import BoxCell from "./BoxCell";
import { useEffect } from "react";
import { cells } from "../data/cells";
import { useNavigate } from "react-router-dom";

const GameBox = () => {
  const navigate = useNavigate();
  const {
    totalCells,
    userPosition,
    setUserPosition,
    currentGoldSpawns,
    setCurrentGoldSpawns,
    userWallet,
    setUserWallet,
    goldValue,
  } = useApp();
  const {
    buildings: { shop, hatchery, album, zoo, lab, spaceCenter },
    paths: { route },
    gold: { possibleSpawns },
  } = cells;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const currentColumn = userPosition % 20;
      const currentRow = Math.floor(userPosition / 20);

      let nextPosition: number | null = null;

      switch (key) {
        case "w":
          if (currentRow > 0) nextPosition = userPosition - 20;
          break;
        case "s":
          if (currentRow < 19) nextPosition = userPosition + 20;
          break;
        case "a":
          if (currentColumn > 0) nextPosition = userPosition - 1;
          break;
        case "d":
          if (currentColumn < 19) nextPosition = userPosition + 1;
          break;
        default:
          return;
      }

      if (nextPosition !== null) {
        const isRoute = cells.paths.route.includes(nextPosition);
        const isShop = nextPosition === cells.buildings.shop;
        const isHatchery = nextPosition === cells.buildings.hatchery;
        const isAlbum = nextPosition === cells.buildings.album;
        const isZoo = nextPosition === cells.buildings.zoo;
        const isLab = nextPosition === cells.buildings.lab;
        const isSpaceCenter = nextPosition === cells.buildings.spaceCenter;

        if (
          isRoute ||
          isShop ||
          isHatchery ||
          isAlbum ||
          isZoo ||
          isLab ||
          isSpaceCenter
        ) {
          setUserPosition(nextPosition);

          // Router
          if (nextPosition == shop) {
            navigate("/shop");
          }
          if (nextPosition == hatchery) {
            navigate("/hatchery");
          }
          if (nextPosition == album) {
            navigate("/album");
          }
          if (nextPosition == zoo) {
            navigate("/zoo");
          }
          if (nextPosition == lab) {
            navigate("/lab");
          }
          if (nextPosition == spaceCenter) {
            navigate("/space-center");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userPosition, setUserPosition]);

  useEffect(() => {
    if (currentGoldSpawns.includes(userPosition)) {
      console.log(`Raccolto oro nella cella attuale: ${userPosition}`);

      setCurrentGoldSpawns((prevSpawns) =>
        prevSpawns.filter((spawnIndex) => spawnIndex !== userPosition),
      );

      setUserWallet((prevWallet) => prevWallet + goldValue);
    }
  }, [userPosition, goldValue]);

  useEffect(() => {
    if (currentGoldSpawns.includes(userPosition)) {
      console.log(`Hai raccolto un pezzo d'oro nella cella: ${userPosition}!`);

      const updatedSpawns = currentGoldSpawns.filter(
        (spawnIndex) => spawnIndex !== userPosition,
      );

      setCurrentGoldSpawns(updatedSpawns);
    }
  }, [userPosition, currentGoldSpawns]);

  return (
    <Box className="gamebox" sx={{ backgroundColor: "background.paper" }}>
      {Array.from({ length: totalCells }).map((_, index) => (
        <BoxCell key={"cell-" + index} cellIndex={index} />
      ))}
    </Box>
  );
};

export default GameBox;
