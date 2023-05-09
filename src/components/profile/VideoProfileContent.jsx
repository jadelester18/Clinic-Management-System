import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const VideoProfileContent = () => {
  return (
    <Box p={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Box flex={3}>
          <Card>
            <Typography gutterBottom variant="body1" component="div">
              Lizard
            </Typography>
            <CardMedia
              sx={{ height: "40%" }}
              component="video"
              image="https://www.youtube.com/watch?v=--vmK34uLaM"
              alt="sample video"
              controls
              autoPlay
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
          <Card>
            <Typography gutterBottom variant="body1" component="div">
              Lizard
            </Typography>
            <CardMedia
              sx={{ height: "40%" }}
              component="video"
              image="https://www.youtube.com/watch?v=--vmK34uLaM"
              alt="sample video"
              controls
              autoPlay
              title="green iguana"
            />
            <CardContent>
              {/* <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoProfileContent;
