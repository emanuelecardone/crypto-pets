import { Box, Typography } from "@mui/material";
import "./boxcell.css";
import { useApp } from "../context/AppContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { spaceCells } from "../data/spaceCells";

type Props = {
  cellIndex: number;
  alienDialogDisplay: string;
  guardianDialogDisplay: string;
};

const SpaceBoxCell = ({
  cellIndex,
  alienDialogDisplay,
  guardianDialogDisplay,
}: Props) => {
  const {
    userSpacePosition,
    currentGoldSpawns,
    userCharacter,
    alienPosition,
    guardianPosition,
    alienRelicFound,
  } = useApp();
  const [userIcon, setUserIcon] = useState<string>("none");
  const [alienIcon, setAlienIcon] = useState<string>("none");
  const [guardianIcon, setGuardianIcon] = useState<string>("none");
  const [relicIcon, setRelicIcon] = useState<string>("none");
  const [goldIcon, setGoldIcon] = useState<string>("none");

  useEffect(() => {
    if (userSpacePosition == cellIndex) {
      setUserIcon("block");
    } else {
      setUserIcon("none");
    }
  }, [userSpacePosition]);
  useEffect(() => {
    if (alienPosition == cellIndex) {
      setAlienIcon("block");
    } else {
      setAlienIcon("none");
    }
  }, [alienPosition]);
  useEffect(() => {
    if (guardianPosition == cellIndex) {
      setGuardianIcon("block");
    } else {
      setGuardianIcon("none");
    }
  }, [guardianPosition]);
  useEffect(() => {
    if (cellIndex == spaceCells.buildings.relic.position) {
      if (alienRelicFound) {
        setRelicIcon("none");
      } else {
        setRelicIcon("block");
      }
    } else {
      setRelicIcon("none");
    }
  }, [alienRelicFound]);

  const {
    buildings: { hatchery, rebirth },
    paths: { route, cave },
    legend: {
      colors: { cellsIndex },
      texts: { textsContent, textsIndex },
    },
    teleports: { exitCave, enterCave },
  } = spaceCells;
  const backgroundColor =
    cellIndex == hatchery ||
    (cellsIndex.includes(cellIndex) && cellsIndex.indexOf(cellIndex) == 0)
      ? "gold"
      : route.includes(cellIndex)
        ? "gray"
        : cave.includes(cellIndex) ||
            (cellsIndex.includes(cellIndex) &&
              cellsIndex.indexOf(cellIndex) == 1)
          ? "darkslategray"
          : exitCave.includes(cellIndex) ||
              enterCave.includes(cellIndex) ||
              (cellsIndex.includes(cellIndex) &&
                cellsIndex.indexOf(cellIndex) == 2)
            ? "lime"
            : cellIndex == rebirth ||
                (cellsIndex.includes(cellIndex) &&
                  cellsIndex.indexOf(cellIndex) == 3)
              ? "fuchsia"
              : "transparent";

  const legendContent =
    textsIndex.includes(cellIndex) && textsIndex.indexOf(cellIndex) == 0
      ? textsContent[0]
      : textsIndex.includes(cellIndex) && textsIndex.indexOf(cellIndex) == 1
        ? textsContent[1]
        : textsIndex.includes(cellIndex) && textsIndex.indexOf(cellIndex) == 2
          ? textsContent[2]
          : textsIndex.includes(cellIndex) && textsIndex.indexOf(cellIndex) == 3
            ? textsContent[3]
            : "";
  return (
    <Box className="boxcell" sx={{ backgroundColor: backgroundColor }}>
      {/*<Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 2500 }}>
        {cellIndex}
      </Box>*/}
      {/**/}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: userIcon, fontSize: "25px", zIndex: 2000 }}
        >
          {userCharacter}
        </Typography>
        {cellIndex == spaceCells.triggers.alienTalking + 1 && (
          <Box
            sx={{
              display: alienDialogDisplay,
              position: "absolute",
              top: "-250%",
              width: "350%",
              height: "250%",
              backgroundColor: "white",
              border: "2px solid black",
              p: 1,
              zIndex: 50000,
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              I lost my relic somewhere in the cave. Find it and i'll let you go
              ahead...
            </Typography>
          </Box>
        )}
        {cellIndex == spaceCells.triggers.guardianTalking + 1 && (
          <Box
            sx={{
              display: guardianDialogDisplay,
              position: "absolute",
              top: "-250%",
              width: "350%",
              height: "250%",
              backgroundColor: "white",
              border: "2px solid black",
              p: 1,
              zIndex: 50000,
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Stand where you are and be one of us, then you may proceed...
            </Typography>
          </Box>
        )}
        <Typography
          variant="caption"
          sx={{
            display: alienIcon,
            fontSize: "25px",
            zIndex: 2000,
            position: "relative",
          }}
        >
          {spaceCells.buildings.alien.icon}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: guardianIcon,
            fontSize: "25px",
            zIndex: 2000,
            position: "relative",
          }}
        >
          {spaceCells.buildings.guardian.icon}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: relicIcon, fontSize: "25px", zIndex: 2000 }}
        >
          {spaceCells.buildings.relic.icon}
        </Typography>
      </Box>
      <Typography
        sx={{
          display: goldIcon,
          fontSize: "25px",
          margin: 0,
        }}
      >
        💰
      </Typography>
      <Typography
        variant="body2"
        sx={{
          display: legendContent !== "" ? "block" : "none",
          textAlign: "left",
          fontWeight: "bold",

          position: "absolute",
          left: "22px",
          top: "50%",
          transform: "translateY(-50%)",

          whiteSpace: "nowrap",
          zIndex: 2500,
          width: "max-content",
        }}
      >
        {legendContent}
      </Typography>
    </Box>
  );
};

export default SpaceBoxCell;
