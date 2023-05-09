import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const LeftBarProfile = () => {
  return (
    <Box flex={2} p={2}>
      <Stack
        direction="column"
        // justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Typography variant="caption">
          <LocationOnIcon /> Camarines Sur, Iriga City
        </Typography>
        <Typography variant="caption">
          <TtyIcon />
          +63 9051438786
        </Typography>
        <Typography variant="caption">
          <AlternateEmailIcon />
          jadelesterballester@gmail.com
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
          // justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography variant="h4">5.3</Typography>
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
