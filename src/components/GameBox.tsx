import { Box } from "@mui/material";
import "./gamebox.css";
import { useApp } from "../context/AppContext";
import BoxCell from "./BoxCell";
import { useEffect, useCallback, useState } from "react";
import { cells } from "../data/cells";
import { useNavigate } from "react-router-dom";
import GamePad from "./GamePad";
import { interactiveTutorial } from "../data/interactiveTutorial";

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
    interactiveTutorialFinished,
    setInteractiveTutorialFinished,
    currentInteractiveTutorial,
    setCurrentInteractiveTutorial,
  } = useApp();

  const {
    buildings: { shop, hatchery, album, zoo, lab, spaceCenter },
    paths: { route },
  } = cells;

  const [floatingTexts, setFloatingTexts] = useState<
    Array<{ id: number; text: string; top: string; left: string }>
  >([]);

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
        const isInteractiveTutorial =
          !interactiveTutorialFinished &&
          interactiveTutorial[currentInteractiveTutorial].cells.includes(
            nextPosition,
          );
        const isRoute =
          route.includes(nextPosition) && interactiveTutorialFinished;
        const isShop = nextPosition === shop && interactiveTutorialFinished;
        const isHatchery =
          nextPosition === hatchery && interactiveTutorialFinished;
        const isAlbum = nextPosition === album && interactiveTutorialFinished;
        const isZoo = nextPosition === zoo && interactiveTutorialFinished;
        const isLab = nextPosition === lab && interactiveTutorialFinished;
        const isSpaceCenter =
          nextPosition === spaceCenter && interactiveTutorialFinished;

        if (
          isInteractiveTutorial ||
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
      currentInteractiveTutorial,
      interactiveTutorialFinished,
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

      const currentCellElement = document.getElementById(
        `cell-${userPosition}`,
      );

      if (currentCellElement) {
        const centroX =
          currentCellElement.offsetLeft + currentCellElement.offsetWidth / 2;
        const centroY =
          currentCellElement.offsetTop + currentCellElement.offsetHeight / 2;

        const clickTop = centroY - 20 + "px";
        const clickLeft = centroX + "px";
        const textId = Date.now() + Math.random();

        setFloatingTexts((prev) => [
          ...prev,
          {
            id: textId,
            text: `+${goldValue.toFixed(0)} $`,
            top: clickTop,
            left: clickLeft,
          },
        ]);

        setTimeout(() => {
          setFloatingTexts((prev) => prev.filter((t) => t.id !== textId));
        }, 1500);
      }
    }
  }, [
    userPosition,
    goldValue,
    currentGoldSpawns,
    setCurrentGoldSpawns,
    setUserWallet,
  ]);

  // INTERACTIVE TUTORIAL
  useEffect(() => {
    if (
      userWallet >= 500 &&
      currentInteractiveTutorial == 0 &&
      !interactiveTutorialFinished
    ) {
      setCurrentInteractiveTutorial(1);
    }
  }, [
    userWallet,
    interactiveTutorialFinished,
    currentInteractiveTutorial,
    setCurrentInteractiveTutorial,
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
        <BoxCell
          key={"cell-" + index}
          id={`cell-${index}`}
          cellIndex={index}
          currentInteractiveTutorial={currentInteractiveTutorial}
        />
      ))}

      <GamePad onMove={moveUser} />

      {floatingTexts.map((textObj) => (
        <Box
          key={textObj.id}
          sx={{
            position: "absolute",
            top: textObj.top,
            left: textObj.left,
            zIndex: 120000,
            pointerEvents: "none",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#2cbf04",
            textShadow: "0px 0px 8px rgba(0,229,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            animation: "floatUpCentrato 1.5s ease-out forwards",
            "@keyframes floatUpCentrato": {
              "0%": {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
              },
              "100%": {
                transform: "translate(-50%, -150%) scale(1.2)",
                opacity: 0,
              },
            },
          }}
        >
          {textObj.text}
        </Box>
      ))}
    </Box>
  );
};

export default GameBox;
