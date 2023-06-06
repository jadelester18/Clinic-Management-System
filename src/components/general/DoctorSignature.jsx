import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as util from "../../redux/util";
import dayjs from "dayjs";

export const DoctorSignature = ({ doctor }) => {
  return (
    <>
      <Box sx={{ justifyContent: "center" }}>
        <img
          src={`${doctor.esignUrl}`}
          alt="esign"
          style={{ height: "auto", width: "50%", objectFit: "contain" }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 1000 }}
        // textAlign={"center"}
      >
        {util.name(doctor)}
      </Typography>
      <Divider />
      <Typography variant="subtitle2">Attending Physician</Typography>
      <Typography variant="body2">{`License No. ${doctor.licenseNo}`}</Typography>
      <Typography variant="body2">{doctor.email}</Typography>
      <Typography variant="body2">{doctor.contactNo}</Typography>
    </>
  );
};
