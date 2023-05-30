import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import PatientReport from "../../../../pages/PatientReportForm";

function DoctorRightBar() {
  return (
    <Box>
      <PatientReport />
    </Box>
  );
}

export default DoctorRightBar;
