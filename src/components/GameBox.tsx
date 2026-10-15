import { Box } from "@mui/material";
import "./gamebox.css";
import { useApp } from "../context/AppContext";
import BoxCell from "./BoxCell";
import { useEffect, useCallback } from "react";
import { cells } from "../data/cells";
import { useNavigate } from "react-router-dom";
import GamePad from "./GamePad";

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
  } = cells;

  const moveUser = useCallback(
    (key: string) => {
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
        const isRoute = route.includes(nextPosition);
        const isShop = nextPosition === shop;
        const isHatchery = nextPosition === hatchery;
        const isAlbum = nextPosition === album;
        const isZoo = nextPosition === zoo;
        const isLab = nextPosition === lab;
        const isSpaceCenter = nextPosition === spaceCenter;

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

          if (nextPosition === shop) navigate("/shop");
          if (nextPosition === hatchery) navigate("/hatchery");
          if (nextPosition === album) navigate("/album");
          if (nextPosition === zoo) navigate("/zoo");
          if (nextPosition === lab) navigate("/lab");
          if (nextPosition === spaceCenter) navigate("/space-center");
        }
      }
    },
    [
      userPosition,
      setUserPosition,
      navigate,
      shop,
      hatchery,
      album,
      zoo,
      lab,
      spaceCenter,
      route,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        moveUser(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveUser]);

  useEffect(() => {
    if (currentGoldSpawns.includes(userPosition)) {
      console.log(`Raccolto oro nella cella attuale: ${userPosition}`);
      setCurrentGoldSpawns((prevSpawns) =>
        prevSpawns.filter((spawnIndex) => spawnIndex !== userPosition),
      );
      setUserWallet((prevWallet) => prevWallet + goldValue);
    }
  }, [
    userPosition,
    goldValue,
    currentGoldSpawns,
    setCurrentGoldSpawns,
    setUserWallet,
  ]);

  return (
    <Box
      className="gamebox"
      sx={{
        backgroundColor: "background.paper",
        width: { xs: "100%", md: "70%" },
        height: { xs: "30%", md: "80%" },
        mt: { xs: "100px", md: 0 },
        position: "relative",
      }}
    >
      {Array.from({ length: totalCells }).map((_, index) => (
        <BoxCell key={"cell-" + index} cellIndex={index} />
      ))}

      <GamePad onMove={moveUser} />
    </Box>
  );
};

export default GameBox;
