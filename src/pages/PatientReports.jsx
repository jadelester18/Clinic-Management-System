import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import Report from "../components/report/Report";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as util from "../redux/util";
import ReportSummary from "../components/report/ReportSummary";

const PatientReports = ({ reports, onSave, onViewMc, onViewReferral }) => {
  //For Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackToTop = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      p={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {reports.map((report, index) => (
              <Step key={report.id}>
                <StepLabel>{`${util.date(report.queue.date)} - ${
                  report.consultationType
                }`}</StepLabel>
                <StepContent>
                  <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    sx={{ width: "100%" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <ReportSummary report={report} />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Report
                        report={report}
                        onSave={onSave}
                        onViewMc={onViewMc}
                        onViewReferral={onViewReferral}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Stack direction="row" my={1}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      size="small"
                      sx={{
                        display:
                          activeStep === reports.length - 1 ? "none" : "block",
                      }}
                    >
                      {activeStep === reports.length - 1
                        ? "Back To Top"
                        : "View Previous"}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleBackToTop}
                      size="small"
                      sx={{
                        display:
                          activeStep === reports.length - 1 ? "block" : "none",
                      }}
                    >
                      {activeStep === 0 ? "View Previous" : "Back To Top"}
                    </Button>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      size="small"
                    >
                      Back
                    </Button>
                  </Stack>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientReports;
