import { Box, Button, Typography } from "@mui/material";
import { useApp } from "../context/AppContext";

const AudioBox = () => {
  const { isMusicPlaying, currentTrackIndex, toggleMusic, nextTrack } =
    useApp();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          textAlign: "center",
          width: "100%",
        }}
      >
        Song #{currentTrackIndex + 1}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          p: 1.5,
          borderRadius: "10px",
          border: "2px solid blue",
          backgroundColor: "background.paper",
          zIndex: 1000,
          boxSizing: "border-box",
          animation: isMusicPlaying
            ? "effettoCassaBeat 0.5s ease-in-out infinite alternate"
            : "none",

          "@keyframes effettoCassaBeat": {
            "0%": {
              transform: "scale(1)",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
            },
            "100%": {
              transform: "scale(1.05)",
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.6)",
            },
          },
        }}
      >
        <Button
          variant="contained"
          onClick={toggleMusic}
          color={isMusicPlaying ? "success" : "primary"}
          sx={{ fontWeight: "bold", flex: 1, p: 0 }}
        >
          {isMusicPlaying ? "Pause" : "Play"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={nextTrack}
          sx={{ fontWeight: "bold", flex: 1, p: 0 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AudioBox;
