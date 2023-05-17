import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const PatientLeftBar = () => {
  return (
    <Card
      sx={{
        // maxWidth: { xs: 900, md: 360 },
        width: { xs: 360, sm: 600, md: 400 },
        justifyContent: "center",
        alignItems: "center",
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
          alt="Doreamon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: { xs: 100, sm: 130, md: 140 },
            height: { xs: 100, sm: 130, md: 140 },
            border: "5px solid white",
            boxShadow: 10,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            10 April, 1999
          </Typography>
          <Stack
            direction={{ xs: "row", md: "row" }}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={2}
            mt={2}
          >
            <Typography variant="body2" color="text.secondary">
              Weight
              <Typography variant="body1" color="text.primary">
                60 kg
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Height
              <Typography variant="body1" color="text.primary">
                1.72 m
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Blood
              <Typography variant="body1" color="text.primary">
                A+
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="medium"
            startIcon={<QuestionAnswerIcon />}
            sx={{ borderRadius: 10, width: 200 }}
          >
            Chat
          </Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Stack>
      <Stack direction={{ xs: "column" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="text.primary"
          >
            Health Care Professional
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
          <List sx={{ width: "100%", maxWidth: 360 }} dense>
            <ListItem disablePadding>
              {/* <ListItemButton> */}
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Dr. Strange" />
              {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>

          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="text.primary"
          >
            Health Plan
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
          <List sx={{ width: "100%", maxWidth: 360 }} dense>
            <ListItem disablePadding>
              {/* <ListItemButton> */}
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Intellicare" />
              {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>

          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="text.primary"
          >
            Dependent
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
          <List sx={{ width: "100%", maxWidth: 360 }} dense>
            <ListItem disablePadding>
              {/* <ListItemButton> */}
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Senku Ishigami" />
              {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem disablePadding>
              {/* <ListItemButton> */}
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Senku Ishigami" />
              {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default PatientLeftBar;
