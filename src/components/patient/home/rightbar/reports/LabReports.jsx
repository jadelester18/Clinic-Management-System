import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { orange } from "@mui/material/colors";

//For Dropdown Bottom of Card
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//For List Items
function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
    (value, index) => {
      // if (index < 11) {
      return React.cloneElement(element, {
        key: value,
      });
      // }
    }
  );
}

const LabReports = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: { md: 400 }, borderRadius: 10, boxShadow: 10 }}
      // anchorOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
      // keepMounted
      // transformOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[500] }}>
            <SummarizeIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        subheader={<Typography variant="h6">My Reports</Typography>}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        {/* <Grid item xs={12} md={12}> */}
        {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography> */}
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "35rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
          }}
        >
          {generate(
            <ListItemButton>
              <ListItemIcon>
                <FlagCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  "Hello World 12345678901234567890".length > 25
                    ? "Hello World 12345678901234567890".substring(0, 25) +
                      "... "
                    : "Hello World 12345678901234567890"
                }
              />
              <ListItemText edge="end" primary="27 Apr" />
            </ListItemButton>
          )}
        </List>
        {/* </Grid> */}
      </CardContent>
    </Card>
  );
};

export default LabReports;
