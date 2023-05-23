import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useLocation } from "react-router-dom";
import axios from "axios";

const LeftBarProfile = () => {
  //Show Profile Data of Specific User
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  //Fetching the Profile info
  const [profile, setProfile] = React.useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/doctors/${id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Box flex={2} p={2}>
      <Stack
        direction="column"
        // justifyContent="center"
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={2}
      >
        <Typography variant="caption">
          <LocationOnIcon />{" "}
          {profile?.address?.city + " " + profile?.address?.country + " "}
        </Typography>
        <Typography variant="caption">
          <TtyIcon />
          {profile?.contactNo}
        </Typography>
        <Typography variant="caption">
          <AlternateEmailIcon />
          {profile?.email}
        </Typography>
        <Button
          variant="contained"
          startIcon={<QuestionAnswerIcon />}
          sx={{ borderRadius: 5, width: 225 }}
          size="large"
        >
          Chat
        </Button>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0, md: 1 }}
        >
          <Typography variant="h3">5.3</Typography>
          <Stack
            direction="column"
            // justifyContent="center"
            alignItems="flex-start"
          >
            <Rating
              name="text-feedback"
              value={3}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography variant="body2">1235 reviews</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LeftBarProfile;
