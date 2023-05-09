import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: "100%" }}>
          <CardMedia
            component="video"
            image={"https://www.youtube.com/watch?v=4_-G4EhWJfw"}
            alt={"https://www.youtube.com/watch?v=4_-G4EhWJfw"}
            // controls
            autoPlay
          />
          {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Stack>
    </Box>
  );
};

export default LandingPage;
