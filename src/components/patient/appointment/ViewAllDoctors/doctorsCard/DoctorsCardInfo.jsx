import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const DoctorsCardInfo = () => {
  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", md: 345 },
        boxShadow: 10,
        borderRadius: 10,
      }}
    >
      <Stack
        direction={{ xs: "column" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: { xs: 100, sm: 130, md: 140 },
            height: { xs: 100, sm: 130, md: 140 },
            border: "5px solid white",
            boxShadow: 10,
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
        />
        <CardContent>
          <Typography variant="h6">Jade Ballester</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Sub-specialization
            <Typography variant="subtitle2" color="text.primary">
              Gastroenterology
            </Typography>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Clinic Schedule
            <Typography variant="subtitle2" color="text.primary">
              Tuesday, Thursday, Saturday
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              9:00 AM - 5:00 PM
            </Typography>
          </Typography>
        </CardContent>{" "}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            HMO Accreditation
            <Typography variant="subtitle2" color="text.primary">
              {"MAXICARE,INTELLICARE,MEDICARD,".length > 25
                ? "MAXICARE,INTELLICARE,MEDICARD,".substring(0, 25) + "... "
                : "MAXICARE,INTELLICARE,MEDICARD,"}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            startIcon={<EditCalendarIcon />}
            sx={{ borderRadius: 10 }}
          >
            Book An Appointment
          </Button>
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        </CardActions>
      </Stack>
    </Card>
  );
};

export default DoctorsCardInfo;
