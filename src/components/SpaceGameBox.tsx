import { Box } from "@mui/material";
import "./gamebox.css";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { spaceCells } from "../data/spaceCells";
import { useEffect, useState, useCallback } from "react";
import SpaceBoxCell from "./SpaceBoxCell";
import GamePad from "./GamePad";

const SpaceGameBox = () => {
  const navigate = useNavigate();
  const {
    userCharacter,
    totalCells,
    userSpacePosition,
    setUserSpacePosition,
    alienPosition,
    setAlienPosition,
    guardianPosition,
    setGuardianPosition,
    alienRelicFound,
    setAlienRelicFound,
    guardianEnigmaSolved,
    setGuardianEnigmaSolved,
    gemsValue,
    setUserGems,
  } = useApp();

  const {
    buildings: { hatchery, rebirth },
    teleports: { exitCave, enterCave },
  } = spaceCells;

  const [alienDialogDisplay, setAlienDialogDisplay] = useState<string>("none");
  const [guardianDialogDisplay, setGuardianDialogDisplay] =
    useState<string>("none");
  const [asteroidPos, setAsteroidPos] = useState({ top: "30%", left: "50%" });
  const [isAsteroidSpawned, setIsAsteroidSpawned] = useState(true);

  const [flightPath, setFlightPath] = useState(1);

  const [floatingText, setFloatingText] = useState<{
    text: string;
    top: string;
    left: string;
    visible: boolean;
  }>({
    text: "",
    top: "0%",
    left: "0%",
    visible: false,
  });

  const handleAsteroidClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const earnedGem = gemsValue || 1;
    setUserGems((prev: number) => prev + earnedGem);

    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    const clickTop = rect
      ? ((e.clientY - rect.top) / rect.height) * 100 + "%"
      : "50%";
    const clickLeft = rect
      ? ((e.clientX - rect.left) / rect.width) * 100 + "%"
      : "50%";

    setFloatingText({
      text: `+${earnedGem.toFixed(0)} 💎`,
      top: clickTop,
      left: clickLeft,
      visible: true,
    });

    setIsAsteroidSpawned(false);

    setTimeout(() => {
      setFloatingText((prev) => ({ ...prev, visible: false }));
    }, 600);

    setTimeout(() => {
      setFlightPath(Math.floor(Math.random() * 3) + 1);
      setIsAsteroidSpawned(true);
    }, 5000);
  };

  const moveSpaceUser = useCallback(
    (key: string) => {
      const currentColumn = userSpacePosition % 20;
      const currentRow = Math.floor(userSpacePosition / 20);

      let nextPosition: number | null = null;

      switch (key) {
        case "w":
          if (currentRow > 0) nextPosition = userSpacePosition - 20;
          break;
        case "s":
          if (currentRow < 19) nextPosition = userSpacePosition + 20;
          break;
        case "a":
          if (currentColumn > 0) nextPosition = userSpacePosition - 1;
          break;
        case "d":
          if (currentColumn < 19) nextPosition = userSpacePosition + 1;
          break;
        default:
          return;
      }

      if (nextPosition !== null) {
        const isRoute = spaceCells.paths.route.includes(nextPosition);
        const isCave = spaceCells.paths.cave.includes(nextPosition);
        const isHatchery = nextPosition === spaceCells.buildings.hatchery;
        const isRebirth = nextPosition === spaceCells.buildings.rebirth;
        const isAlien = nextPosition === alienPosition;
        const isAlienTalkingTrigger =
          nextPosition === spaceCells.triggers.alienTalking;
        const isGuardian = nextPosition === guardianPosition;
        const isGuardianTalkingTrigger =
          nextPosition === spaceCells.triggers.guardianTalking;
        const isRelic = nextPosition === spaceCells.buildings.relic.position;
        const isTeleport =
          exitCave.includes(nextPosition) || enterCave.includes(nextPosition);

        if (
          (isRoute || isCave || isHatchery || isRebirth || isTeleport) &&
          !isAlien &&
          !isGuardian
        ) {
          setUserSpacePosition(nextPosition);

          if (nextPosition == hatchery) navigate("/hatchery");
          if (nextPosition == rebirth) navigate("/rebirth");
        }

        if (isAlienTalkingTrigger && !alienRelicFound) {
          if (alienDialogDisplay === "block") return;
          setAlienDialogDisplay("block");
          setTimeout(() => {
            setAlienDialogDisplay("none");
          }, 10000);
        }

        if (isGuardianTalkingTrigger && !guardianEnigmaSolved) {
          if (guardianDialogDisplay === "block") return;
          setGuardianDialogDisplay("block");
          setTimeout(() => {
            setGuardianDialogDisplay("none");
          }, 10000);
        }

        if (isRelic) {
          setAlienRelicFound(true);
        }

        if (isTeleport) {
          const isFirstTeleportsCouple = exitCave.includes(nextPosition);

          if (isFirstTeleportsCouple) {
            const currentIndex = exitCave.indexOf(nextPosition);
            currentIndex == 0
              ? setUserSpacePosition(exitCave[1])
              : setUserSpacePosition(exitCave[0]);
          } else {
            const currentIndex = enterCave.indexOf(nextPosition);
            currentIndex == 0
              ? setUserSpacePosition(enterCave[1])
              : setUserSpacePosition(enterCave[0]);
          }
        }
      }
    },
    [
      userSpacePosition,
      setUserSpacePosition,
      alienPosition,
      alienDialogDisplay,
      guardianDialogDisplay,
      alienRelicFound,
      guardianPosition,
      guardianEnigmaSolved,
      navigate,
      hatchery,
      rebirth,
      exitCave,
      enterCave,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        moveSpaceUser(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveSpaceUser]);

  useEffect(() => {
    if (alienRelicFound) {
      setAlienPosition(spaceCells.buildings.alien.position - 20);
    } else {
      setAlienPosition(spaceCells.buildings.alien.position);
    }
  }, [alienRelicFound, setAlienPosition]);

  useEffect(() => {
    if (guardianEnigmaSolved) {
      setGuardianPosition(spaceCells.buildings.guardian.position + 20);
    } else {
      setGuardianPosition(spaceCells.buildings.guardian.position);
    }
  }, [guardianEnigmaSolved, setGuardianPosition]);

  useEffect(() => {
    const isGuardianTalkingTrigger =
      userSpacePosition == spaceCells.triggers.guardianTalking;
    if (isGuardianTalkingTrigger && userCharacter == "\u{1F47D}") {
      setGuardianEnigmaSolved(true);
    }
  }, [userCharacter, userSpacePosition, setGuardianEnigmaSolved]);

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
        <SpaceBoxCell
          key={"cell-" + index}
          cellIndex={index}
          alienDialogDisplay={alienDialogDisplay}
          guardianDialogDisplay={guardianDialogDisplay}
        />
      ))}

      <GamePad onMove={moveSpaceUser} />

      {isAsteroidSpawned && (
        <Box
          onClick={handleAsteroidClick}
          sx={{
            position: "absolute",
            fontSize: { xs: "28px", md: "38px" },
            cursor: "pointer",
            zIndex: 4000,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.1s ease",
            "&:active": { transform: "scale(1.4)" },

            animation:
              flightPath === 1
                ? "cosmicPath1 45s linear infinite"
                : flightPath === 2
                  ? "cosmicPath2 45s linear infinite"
                  : "cosmicPath3 45s linear infinite",

            "@keyframes cosmicPath1": {
              "0%": { top: "35%", left: "35%", transform: "rotate(0deg)" },
              "25%": { top: "65%", left: "45%", transform: "rotate(90deg)" },
              "50%": { top: "40%", left: "65%", transform: "rotate(180deg)" },
              "75%": { top: "60%", left: "35%", transform: "rotate(270deg)" },
              "100%": { top: "35%", left: "35%", transform: "rotate(360deg)" },
            },

            "@keyframes cosmicPath2": {
              "0%": { top: "50%", left: "25%", transform: "rotate(0deg)" },
              "25%": { top: "35%", left: "50%", transform: "rotate(90deg)" },
              "50%": { top: "65%", left: "65%", transform: "rotate(180deg)" },
              "75%": { top: "35%", left: "60%", transform: "rotate(270deg)" },
              "100%": { top: "50%", left: "25%", transform: "rotate(360deg)" },
            },

            "@keyframes cosmicPath3": {
              "0%": { top: "60%", left: "60%", transform: "rotate(0deg)" },
              "25%": { top: "30%", left: "55%", transform: "rotate(90deg)" },
              "50%": { top: "35%", left: "30%", transform: "rotate(180deg)" },
              "75%": { top: "65%", left: "40%", transform: "rotate(270deg)" },
              "100%": { top: "60%", left: "60%", transform: "rotate(360deg)" },
            },
          }}
        >
          ☄️
        </Box>
      )}

      {floatingText.visible && (
        <Box
          sx={{
            position: "absolute",
            top: floatingText.top,
            left: floatingText.left,
            zIndex: 4100,
            pointerEvents: "none",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#00e5ff",
            textShadow: "0px 0px 8px rgba(0,229,255,0.8)",
            animation: "floatUp 0.6s ease-out forwards",
            "@keyframes floatUp": {
              "0%": { transform: "translateY(0) scale(1)", opacity: 1 },
              "100%": { transform: "translateY(-40px) scale(1.2)", opacity: 0 },
            },
          }}
        >
          {floatingText.text}
        </Box>
      )}
    </Box>
  );
};

export default SpaceGameBox;
