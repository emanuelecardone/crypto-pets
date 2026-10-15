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
  } = useApp();

  const {
    buildings: { hatchery, rebirth },
    teleports: { exitCave, enterCave },
  } = spaceCells;

  const [alienDialogDisplay, setAlienDialogDisplay] = useState<string>("none");
  const [guardianDialogDisplay, setGuardianDialogDisplay] =
    useState<string>("none");

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
        height: { xs: "40%", md: "80%" },
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
    </Box>
  );
};

export default SpaceGameBox;
