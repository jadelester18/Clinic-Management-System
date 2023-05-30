import {
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

const PatientReport = () => {
  //For Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //For Blood Pressure
  const [bloodPressure, setBloodPressure] = useState("");

  const formatBloodPressure = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9/]+/g, "");

    // Format bloodPressure with desired units
    if (numericValue !== "") {
      const formattedBloodPressure = `${numericValue} mmHg`; // Celsius
      return formattedBloodPressure;
    }

    return input; // Return empty string or non-numeric input
  };

  const handleBloodPressureChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatBloodPressure(value);
    setBloodPressure(formattedValue);
  };

  //For Temperature Celsius
  const [temperature, setTemperature] = useState("");

  const formatTemperature = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9.-]+/g, "");

    // Format temperature with desired units
    if (numericValue !== "") {
      const formattedTemperature = `${numericValue}°C`; // Celsius
      // const formattedTemperature = `${numericValue}°F`; // Fahrenheit
      // const formattedTemperature = `${numericValue}K`; // Kelvin
      return formattedTemperature;
    }

    return input; // Return empty string or non-numeric input
  };

  const handleTemperatureChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatTemperature(value);
    setTemperature(formattedValue);
  };

  //For Respiratory Rate
  const [respiratory, setRespiratory] = useState("");

  const formatRespiratory = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9.-]+/g, "");

    // Format Respiratory with desired units
    if (numericValue !== "") {
      const formattedRespiratory = `${numericValue} breaths/min`;
      return formattedRespiratory;
    }

    return input; // Return empty string or non-numeric input
  };

  const handleRespiratoryChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatRespiratory(value);
    setRespiratory(formattedValue);
  };

  //For Heart Rate
  const [heart, setHeart] = useState("");

  const formatHeart = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9.-]+/g, "");

    // Format Heart with desired units
    if (numericValue !== "") {
      const formattedHeart = `${numericValue} beats/min`;
      return formattedHeart;
    }

    return input; // Return empty string or non-numeric input
  };

  const handleHeartChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatHeart(value);
    setHeart(formattedValue);
  };

  //For Oxygen Saturation
  const [oxygenSaturation, setOxygenSaturation] = useState("");

  const formatOxygenSaturation = (input) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9.-]+/g, "");

    // Format OxygenSaturation with desired units
    if (numericValue !== "") {
      const formattedOxygenSaturation = `${numericValue} %`;
      return formattedOxygenSaturation;
    }

    return input; // Return empty string or non-numeric input
  };

  const handleOxygenSaturationChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatOxygenSaturation(value);
    setOxygenSaturation(formattedValue);
  };

  //For Prescription Medicine
  const [medicines, setMedicines] = useState([]);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", description: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const [openMedication, setOpenMedication] = useState(false);

  const handleOpenModalMedication = () => {
    setOpenMedication(true);
  };

  const handleCloseModalMedication = () => {
    setOpenMedication(false);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  //For Storing and computing the total medicine
  const [totalMedicineToBeTake, setTotalMedicineToBeInTake] = useState("");
  const [medicinePiece, setMedicinePiece] = useState("");
  const [medicinePerDay, setMedicinePerDay] = useState("");
  const [medicineTotalDays, setMedicineTotalDays] = useState("");

  useEffect(() => {
    calculateTotalMedicineToBeTaken();
  }, [medicinePiece, medicinePerDay, medicineTotalDays]);

  const calculateTotalMedicineToBeTaken = () => {
    const piece = parseInt(medicinePiece);
    const perDay = parseInt(medicinePerDay);
    const totalDays = parseInt(medicineTotalDays);

    if (!isNaN(piece) && !isNaN(perDay) && !isNaN(totalDays)) {
      const total = piece * perDay * totalDays;
      setTotalMedicineToBeInTake(total.toString());
    } else {
      setTotalMedicineToBeInTake("");
    }
  };

  const handleTotalMedicineToBeInTake = (event) => {
    setTotalMedicineToBeInTake(event.target.value);
  };

  const handleMedicinePiece = (event) => {
    setMedicinePiece(event.target.value);
  };

  const handleMedicinePerDay = (event) => {
    setMedicinePerDay(event.target.value);
  };

  const handleMedicineTotalDays = (event) => {
    setMedicineTotalDays(event.target.value);
  };

  //For Radio Button Type Of Prescription Form
  const [prescriptionType, setPrescriptionType] = useState("Standard");

  const handleChangePrescription = (event) => {
    setPrescriptionType(event.target.value);
  };
  const steps = [
    {
      label: "Title of Report",
      descriptionReport: `Descreption of the report.`,
      userInfo: (
        <Typography variant="subtitle2">
          User Information.
          <Tooltip title="This for User Information cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      user_info: (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              margin="normal"
              name="lname"
              fullWidth
              label="Last Name"
              autoComplete="Last Name"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              margin="normal"
              name="fname"
              fullWidth
              label="First Name"
              autoComplete="First Name"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              margin="normal"
              name="mname"
              fullWidth
              label="Middle Name"
              autoComplete="Middle Name"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              margin="normal"
              name="suffix"
              fullWidth
              label="Suffix"
              autoComplete="Suffix"
              disabled
            />
          </Grid>
        </Grid>
      ),
      vitalSignsInfo: (
        <Typography variant="subtitle2">
          Vital Signs.
          <Tooltip title="This for Vital Signs cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      vital_signs: (
        <Grid container spacing={2}>
          <Grid item xs={12} md={2.4}>
            <TextField
              size="small"
              margin="normal"
              name="Blood Pressure"
              fullWidth
              label="Blood Pressure"
              autoComplete="Blood Pressure"
              value={bloodPressure}
              onChange={handleBloodPressureChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={2.4}>
            <TextField
              size="small"
              margin="normal"
              name="Temperature"
              fullWidth
              label="Temperature"
              autoComplete="Temperature"
              value={temperature}
              onChange={handleTemperatureChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={2.4}>
            <TextField
              size="small"
              margin="normal"
              name="Respiratory Rate"
              fullWidth
              label="Respiratory Rate"
              autoComplete="Respiratory Rate"
              value={respiratory}
              onChange={handleRespiratoryChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={2.4}>
            <TextField
              size="small"
              margin="normal"
              name="Heart Rate"
              fullWidth
              label="Heart Rate"
              autoComplete="Heart Rate"
              value={heart}
              onChange={handleHeartChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={2.4}>
            <TextField
              size="small"
              margin="normal"
              name="Oxygen Saturation"
              fullWidth
              label="Oxygen Saturation"
              autoComplete="Oxygen Saturation"
              value={oxygenSaturation}
              onChange={handleOxygenSaturationChange}
              required
            />
          </Grid>
        </Grid>
      ),

      labProcedureInfo: (
        <Typography variant="subtitle2">
          Laboratory Procedures.
          <Tooltip title="These are for laboratory cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      lab_procedures: (
        <FormGroup>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="X-ray"
                required
              />
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="CBC" />
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Urinalysis" />
            </Grid>
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Eye Test" />
            </Grid>
          </Grid>
        </FormGroup>
      ),
      diagnosisInfo: (
        <Typography variant="subtitle2">
          Diagnosis.
          <Tooltip title="This for Diagnosis cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      diagnosis: (
        <TextField
          size="small"
          margin="normal"
          name="Diagnosis"
          fullWidth
          label="Diagnosis"
          autoComplete="Diagnosis"
          multiline
          required
        />
      ),
      prognosisInfo: (
        <Typography variant="subtitle2">
          Prognosis.
          <Tooltip title="This for Prognosis cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      prognosis: (
        <TextField
          size="small"
          margin="normal"
          name="Prognosis"
          fullWidth
          label="Prognosis"
          autoComplete="Prognosis"
          multiline
          required
        />
      ),
      managementInfo: (
        <Typography variant="subtitle2">
          Management.
          <Tooltip title="This for Management cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      management: (
        <TextField
          size="small"
          margin="normal"
          name="Management"
          fullWidth
          label="Management"
          autoComplete="Management"
          multiline
          required
        />
      ),
      nurseInfo: (
        <Typography variant="subtitle2">
          Nurse Assisted.
          <Tooltip title="This for Nurse Assisted cotent.">
            <HelpIcon />
          </Tooltip>
        </Typography>
      ),
      nurse_assisted: (
        <TextField
          size="small"
          margin="normal"
          name="Nurse Assisted"
          fullWidth
          label="Nurse Assisted"
          autoComplete="Nurse Assisted"
          disabled
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      p={2}
    >
      <Grid container spacing={12}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ position: "relative" }}>
                  <StaticDatePicker
                    orientation="portrait"
                    showDaysOutsideCurrentMonth
                    //   fixedWeekNumber={6}
                    //   defaultValue={initialValue}
                    //   loading={isLoading}
                    //   onMonthChange={handleMonthChange}
                    //   renderLoading={() => <DayCalendarSkeleton />}\

                    slotProps={{
                      actionBar: { actions: [] },
                    }}
                    sx={{ boxShadow: 10, borderRadius: 10 }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <List
                sx={{
                  width: "100%",
                  //   maxWidth: 360,
                  bgcolor: "background.paper",
                  boxShadow: 5,
                  borderRadius: 10,
                }}
              >
                <ListItemButton alignItems="flex-start" disablePadding dense>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                </ListItemButton>
                <Divider variant="inset" component="li" />
                <ListItemButton alignItems="flex-start" disablePadding dense>
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
                <Divider variant="inset" component="li" />
                <ListItemButton alignItems="flex-start" disablePadding dense>
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
                <ListItemButton alignItems="flex-start" disablePadding dense>
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
                <ListItemButton alignItems="flex-start" disablePadding dense>
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={11}>
              <Card item sx={{ flex: 1 }} xs={1}>
                <CardContent>
                  <Typography variant="h6">
                    {steps[activeStep].label}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography>{steps[activeStep].descriptionReport}</Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {steps[activeStep].userInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].user_info}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].vitalSignsInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].vital_signs}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].labProcedureInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].lab_procedures}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].diagnosisInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].diagnosis}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].prognosisInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].prognosis}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].managementInfo}
                      <Grid item xs={12}>
                        {steps[activeStep].management}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {steps[activeStep].nurseInfo}
                      <Grid item xs={5} md={3}>
                        {steps[activeStep].nurse_assisted}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Medicines.
                        <Tooltip title="This for Medicines cotent.">
                          <HelpIcon />
                        </Tooltip>
                      </Typography>
                      {medicines.map((medicine, index) => (
                        <Grid container spacing={2} key={index}>
                          <Grid item xs={12} md={10}>
                            <TextField
                              size="small"
                              margin="normal"
                              name={`medicine-${index}`}
                              fullWidth
                              label="Medicine"
                              autoComplete="Medicine"
                              value={medicine.name}
                              onChange={(event) =>
                                handleMedicineChange(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                              onClick={() => handleOpenModalMedication(index)}
                              required
                            />
                          </Grid>
                          <Grid item xs={6} md={2} mt={2}>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRemoveMedicine(index)}
                            >
                              Close
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Button variant="contained" onClick={handleAddMedicine}>
                        Add Medicine
                      </Button>
                    </Grid>
                    <Grid item xs={11}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          display:
                            activeStep === steps.length - 1 ? "none" : "block",
                        }}
                      >
                        {activeStep === steps.length - 1
                          ? "Finish"
                          : "Continue"}
                      </Button>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          display:
                            activeStep === steps.length - 1 ? "none" : "block",
                        }}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained">Submit</Button>
                    </Grid>
                  </Grid>

                  {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                      </Button>
                    </Paper>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openMedication}
        onClose={handleCloseModalMedication}
        maxWidth={"lg"}
      >
        <DialogTitle>Prescription</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type Of Prescription
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={prescriptionType}
              onChange={handleChangePrescription}
            >
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <FormControlLabel
                    value="Standard"
                    control={<Radio />}
                    label="Standard"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="Custom"
                    control={<Radio />}
                    label="Custom"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
            <p>Selected: {prescriptionType}</p>
          </FormControl>
          {prescriptionType === "Standard" && (
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item md={9}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Medicine" />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Total Medicine To Be In Take"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Signatura"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
          {prescriptionType === "Custom" && (
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item md={9}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Medicine" />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Total Medicine To Be In Take"
                  fullWidth
                  variant="outlined"
                  value={totalMedicineToBeTake}
                  onChange={handleTotalMedicineToBeInTake}
                  disabled
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Piece"
                  fullWidth
                  variant="outlined"
                  value={medicinePiece}
                  onChange={handleMedicinePiece}
                />
              </Grid>
              <Grid item md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    fullWidth
                  >
                    <MenuItem value="Capsule">Capsule</MenuItem>
                    <MenuItem value="Tablet">Tablet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography>X</Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Per Day"
                  fullWidth
                  variant="outlined"
                  value={medicinePerDay}
                  onChange={handleMedicinePerDay}
                />
              </Grid>
              <Grid item>
                <Typography>/day for</Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Day"
                  fullWidth
                  variant="outlined"
                  value={medicineTotalDays}
                  onChange={handleMedicineTotalDays}
                />
              </Grid>
              <Grid item>
                <Typography>/days</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalMedication}>Cancel</Button>
          <Button onClick={handleCloseModalMedication} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientReport;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];
