import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { blue } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { yellow } from "@mui/material/colors";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AssessmentIcon from "@mui/icons-material/Assessment";

const DoctorDashboard = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: orange[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  New Appointments
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  10
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <PersonAddIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </PersonAddIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: green[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  Approved Appointments
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  10
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <TroubleshootIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </TroubleshootIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: yellow[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  For Assessment
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  10
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <MedicalInformationIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </MedicalInformationIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: blue[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  Total Patient Finished
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  10
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <AssessmentIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </AssessmentIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;
