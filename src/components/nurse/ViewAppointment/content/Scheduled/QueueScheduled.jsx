import {
  Avatar,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import DrawIcon from "@mui/icons-material/Draw";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const QueueScheduled = ({
  handleClickOpenViewPatientProfile,
  handleClickOpenCreateAppointment,
}) => {
  return (
    <CardContent>
      <Typography variant="body2" p={2}>
        Scheduled Patient:
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 10,
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
          <Grid container spacing={2} justifyContent={"right"}>
            <Grid item>
              <Typography variant="h6">1: 45 pm</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">-</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">32 min</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={"right"}>
            <Grid item>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="label"
                onClick={handleClickOpenViewPatientProfile}
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <ViewInArIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="success"
                aria-label="upload picture"
                component="label"
                onClick={handleClickOpenCreateAppointment}
              >
                <DrawIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Schedule</MenuItem>
                  <MenuItem value={20}>For Assessment</MenuItem>
                  <MenuItem value={30}>On Going Assessment</MenuItem>
                  <MenuItem value={20}>For Consultation</MenuItem>
                  <MenuItem value={30}>On Going Consultation</MenuItem>
                  <MenuItem value={30}>Finish</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </CardContent>
  );
};

export default QueueScheduled;
