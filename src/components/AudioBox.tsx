import { Box, Button, Typography } from "@mui/material";
import { useApp } from "../context/AppContext";

const AudioBox = () => {
  const { isMusicPlaying, currentTrackIndex, toggleMusic, nextTrack } =
    useApp();

  return (
    <Box
      sx={{
        width: "100%",
        height: "10%",
        display: "flex",
        gap: "10px",
        justifyContent: "space-evenly",
        alignItems: "center",
        p: 2,
        borderRadius: "10px",
        border: "2px solid blue",
        backgroundColor: "background.paper",
        zIndex: 1000,
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
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Song #{currentTrackIndex + 1}
      </Typography>

      {/* Tasto Play/Pause */}
      <Button
        variant="contained"
        onClick={toggleMusic}
        color={isMusicPlaying ? "success" : "primary"}
        sx={{ fontWeight: "bold" }}
      >
        {isMusicPlaying ? "Pause" : "Play"}
      </Button>

      {/* Tasto Skip (Traccia Successiva) */}
      <Button
        variant="contained"
        color="secondary"
        onClick={nextTrack}
        sx={{ fontWeight: "bold" }}
      >
        Next ⏭️
      </Button>
    </Box>
  );
};

export default AudioBox;
