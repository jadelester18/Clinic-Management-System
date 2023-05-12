import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PatientComments from "./PatientComments";

const VideoProfileContent = () => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    // pause the currently playing card, if any
    if (playingIndex !== null) {
      document.getElementById(`video-${playingIndex}`).pause();
    }
    // start playing the clicked card
    document.getElementById(`video-${index}`).play();
    setPlayingIndex(index);
  };

  const handlePause = (index) => {
    document.getElementById(`video-${index}`).pause();
    setPlayingIndex(null);
  };
  return (
    <Box p={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Box flex={2}>
          <Card
            sx={{
              borderRadius: 10,
              transform: playingIndex === 0 ? "scale(1)" : "scale(.9)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <CardMedia
              sx={{ height: "40%" }}
              component="video"
              image="https://firebasestorage.googleapis.com/v0/b/socmed-db.appspot.com/o/1677724836180videoplayback%20(1).mp4?alt=media&token=e83fd908-c35b-4511-97a1-34533279fb8c"
              alt="sample video"
              controls
              id="video-0"
              onPlay={() => handlePlay(0)}
              onPause={() => handlePause(0)}
              title="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box flex={2}>
          <Card
            sx={{
              borderRadius: 10,
              transform: playingIndex === 1 ? "scale(1)" : "scale(.9)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <CardMedia
              sx={{ height: "40%" }}
              component="video"
              image="https://firebasestorage.googleapis.com/v0/b/socmed-db.appspot.com/o/1678065963427REVAstaff%20-%20Google%20Chrome%202022-07-01%2015-15-12.mp4?alt=media&token=d33db1fd-bc37-4f1c-a6b3-eda680a8c4ca"
              alt="sample video"
              controls
              id="video-1"
              onPlay={() => handlePlay(1)}
              onPause={() => handlePause(1)}
              title="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Box flex={2}>
          <PatientComments />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoProfileContent;
