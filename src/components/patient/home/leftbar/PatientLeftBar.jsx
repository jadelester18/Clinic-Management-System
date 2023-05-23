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
import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";

const PatientLeftBar = () => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;
  let accesstoken = userObject?.token;

  //Get the user post
  const [userPatientDetails, setUserPatientDetails] = useState();
  console.log(userPatientDetails);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/patients/me`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`, // Use the 'Authorization' header
            },
          }
        );
        setUserPatientDetails(res.data);
        console.log(res.data); // Log the response data
      } catch (error) {
        console.log("Post details have an issue.");
      }
    };
    getUserDetails();
  }, []);

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
            {userPatientDetails?.firstName +
              " " +
              userPatientDetails?.middleName +
              " " +
              userPatientDetails?.lastName}
            {userPatientDetails?.suffixName !== "" || null
              ? userPatientDetails?.suffixName
              : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(userPatientDetails?.birthDate).format("DD MMMM, YYYY")}
          </Typography>
          <Stack
            direction={{ xs: "column" }}
            justifyContent={{ xs: "center" }}
            alignItems={{ xs: "center" }}
            spacing={2}
            mt={2}
          >
            <Typography variant="body2" color="text.secondary">
              Registered At
              <Typography variant="subtitle2" color="text.primary">
                {dayjs(userPatientDetails?.registeredAt).format(
                  "DD MMMM, YYYY"
                )}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact
              <Typography variant="subtitle2" color="text.primary">
                {userPatientDetails?.contactNo}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email
              <Typography variant="subtitle2" color="text.primary">
                {userPatientDetails?.email}
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

          {/* <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="text.primary"
          >
            Dependent
          </Typography>
          <List sx={{ width: "100%", maxWidth: 360 }} dense>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Senku Ishigami" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Senku Ishigami" />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List> */}
        </CardContent>
      </Stack>
    </Card>
  );
};

export default PatientLeftBar;
