import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const PatientCompilation = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card sx={{ borderRadius: 10, boxShadow: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <BackupTableIcon />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        // title="Shrimp and Chorizo Paella"
        subheader={<Typography variant="h6">Appointment History</Typography>}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "27rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
          }}
        >
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 1
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                June 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                APPOINTMENTS 2
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                April 25, 2023
              </Typography>
            </AccordionSummary>
            <Button>
              <AccordionDetails>
                <Typography
                  align="left"
                  fontFamily="sans-serif"
                  textTransform="none"
                  color="text.primary"
                >
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Button>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientCompilation;
