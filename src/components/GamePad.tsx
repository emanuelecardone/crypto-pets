import { Box, Typography } from "@mui/material";

type GamePadProps = {
  onMove: (key: string) => void;
};

const GamePad = ({ onMove }: GamePadProps) => {
  const arrowStyle = {
    fontSize: { xs: "6vw", md: "26px" },
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px 10px",
    height: "50%",
    boxSizing: "border-box",
    transition: "transform 0.1s ease",
    "&:active": {
      transform: "scale(0.85)",
    },
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "-100px",
        left: 0,
        width: "100%",
        height: { xs: "60px", md: "80px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "35px", md: "50px" },
        zIndex: 120000,
      }}
    >
      <Box
        onClick={() => onMove("a")}
        sx={{
          height: "100%",
          width: { xs: "15vw", md: "60px" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            ...arrowStyle,
            backgroundColor: "background.paper",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          {"\u25C0"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          alignItems: "center",
          height: "100%",
          width: { xs: "15vw", md: "60px" },
        }}
      >
        <Typography
          onClick={() => onMove("w")}
          sx={{
            ...arrowStyle,
            backgroundColor: "background.paper",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          {"\u25B2"}
        </Typography>
        <Typography
          onClick={() => onMove("s")}
          sx={{
            ...arrowStyle,
            backgroundColor: "background.paper",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          {"\u25BC"}
        </Typography>
      </Box>

      <Box
        onClick={() => onMove("d")}
        sx={{
          height: "100%",
          width: { xs: "15vw", md: "60px" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            ...arrowStyle,
            backgroundColor: "background.paper",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          {"\u25B6"}
        </Typography>
      </Box>
    </Box>
  );
};

export default GamePad;
