import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function NurseRightBar() {
  return (
    <Box flex={2} p={2}>
      <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item>
              <Typography variant="body2" p={2}>
                Doctors Available:
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item>
              <Typography variant="body2" p={2}>
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                  mr={2}
                />
                {"  "}
                Not Yet Assessed
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" p={2}>
                <Chip label="1" color="primary" mr={2} />
                {"  "}
                For Consultation
              </Typography>
            </Grid>
          </Grid>

          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 10,
              height: "20rem",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              padding: 2,
            }}
            dense={true}
          >
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
            <ListItemButton alignItems="flex-start" sx={{ borderRadius: 10 }}>
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label="1" color="primary" />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NurseRightBar;
