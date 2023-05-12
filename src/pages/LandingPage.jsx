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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: "100%" }}>
          <Typography>Landing Page</Typography>
          <CardMedia
            component="video"
            image={"https://www.youtube.com/watch?v=4_-G4EhWJfw"}
            alt={"https://www.youtube.com/watch?v=4_-G4EhWJfw"}
            // controls
            autoPlay
          />
        </Card>
      </Stack>
    </Box>
  );
};

export default LandingPage;
