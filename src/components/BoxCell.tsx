import { Box, Typography } from "@mui/material";
import "./boxcell.css";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import { cells } from "../data/cells";

type Props = {
  cellIndex: number;
};

const BoxCell = ({ cellIndex }: Props) => {
  const { userPosition, currentGoldSpawns, userCharacter } = useApp();
  const [userIcon, setUserIcon] = useState<string>("none");
  const [goldIcon, setGoldIcon] = useState<string>("none");

  useEffect(() => {
    if (userPosition == cellIndex) {
      setUserIcon("block");
    } else {
      setUserIcon("none");
    }
  }, [userPosition]);

  useEffect(() => {
    if (currentGoldSpawns.includes(cellIndex)) {
      setGoldIcon("block");
    } else {
      setGoldIcon("none");
    }
  }, [currentGoldSpawns]);

  const {
    buildings: { shop, hatchery, album, zoo, lab, spaceCenter },
    paths: { route },
    legend: {
      colors: { cellsColor, cellsIndex },
      texts: { textsContent, textsIndex },
    },
  } = cells;
  const backgroundColor =
    cellIndex == shop ||
    (cellsIndex.includes(cellIndex) && cellsIndex.indexOf(cellIndex) == 0)
      ? "blue"
      : cellIndex == hatchery ||
          (cellsIndex.includes(cellIndex) && cellsIndex.indexOf(cellIndex) == 5)
        ? "gold"
        : cellIndex === album ||
            (cellsIndex.includes(cellIndex) &&
              cellsIndex.indexOf(cellIndex) == 2)
          ? "brown"
          : cellIndex === zoo ||
              (cellsIndex.includes(cellIndex) &&
                cellsIndex.indexOf(cellIndex) == 3)
            ? "green"
            : cellIndex === lab ||
                (cellsIndex.includes(cellIndex) &&
                  cellsIndex.indexOf(cellIndex) == 1)
              ? "white"
              : cellIndex === spaceCenter ||
                  (cellsIndex.includes(cellIndex) &&
                    cellsIndex.indexOf(cellIndex) == 4)
                ? "aqua"
                : route.includes(cellIndex)
                  ? "gray"
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
            : textsIndex.includes(cellIndex) &&
                textsIndex.indexOf(cellIndex) == 4
              ? textsContent[4]
              : textsIndex.includes(cellIndex) &&
                  textsIndex.indexOf(cellIndex) == 5
                ? textsContent[5]
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

export default BoxCell;
