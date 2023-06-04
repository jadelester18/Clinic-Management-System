import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as util from "../../redux/util";
import dayjs from "dayjs";

export default function MedicalCertificateForm({ certificate }) {
  const { patient, date, report, purpose, type, totalRestDays, remarks } =
    certificate;
  const patientAge = `${dayjs(date).diff(
    patient.birthDate,
    "year"
  )} year/s old`;
  console.log("report in MC ", report);
  console.log("avatarUrl", report.doctor.esignUrl);
  return (
    <>
      <Box mt={5} ml={15} mr={10}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Patient:</Typography>
            <Typography variant="subtitle1">{util.name(patient)}</Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Address:</Typography>
            <Typography variant="subtitle1">
              {util.fullAddress(patient.address)}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Date:</Typography>
            <Typography variant="subtitle1">
              {util.date(dayjs(date))}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Age:</Typography>
            <Typography variant="subtitle1">{patientAge}</Typography>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Gender:</Typography>
            <Typography variant="subtitle1">{patient.gender}</Typography>
            <Divider />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={5}>
          {/* <Grid item xs={2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="none"
              viewBox="0 0 48 48"
              id="rx"
            >
              <path
                fill="#333"
                fill-rule="evenodd"
                d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24ZM16 30V14C16 13.4477 16.4477 13 17 13H23C25.7614 13 28 15.2386 28 18C28 20.6273 25.9736 22.7813 23.3984 22.9844L28 27.5859L32.2929 23.293L33.7072 24.7072L29.4142 29.0001L33.7071 33.293L32.2928 34.7072L28 30.4143L23.7072 34.7072L22.2929 33.293L26.5858 29.0001L20.5857 23H18V30H16ZM18 21H23C24.6569 21 26 19.6569 26 18C26 16.3431 24.6569 15 23 15H18V21Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="body1"> To Whom It May Concern:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {`This is to certify that ${util.name(patient)}, ${patientAge} ${
                patient.gender
              }, has been under my medical care/attention for ${
                report.details.diagnosis
              }.`}
            </Typography>
          </Grid>
          {type === "FIT" && (
            <Grid item xs={12}>
              <Typography variant="body1">
                {`I have conducted a medical evaluation of the patient and can confirm that they are now fit for ${util.medCertPurpose(
                  purpose
                )} without restrictions, effective ${util.date(dayjs(date))}.`}
              </Typography>
            </Grid>
          )}
          {type === "UNFIT" && (
            <Grid item xs={12}>
              <Typography variant="body1">
                {`Based on the patient's medical condition, I consider that a period of absence from ${util.medCertPurpose(
                  purpose
                )} for ${totalRestDays} day/s starting on ${util.date(
                  dayjs(date)
                )} is absolutely necessary for the restoration of the patient's health.`}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body1">{remarks}</Typography>
          </Grid>
        </Grid>
        <Grid container mt={10} justifyContent={`end`}>
          <Grid item xs={4}>
            <Box sx={{ justifyContent: "center" }}>
              <img
                src={`${report.doctor.esignUrl}`}
                alt="esign"
                style={{ height: "auto", width: "50%", objectFit: "contain" }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 1000 }}
              // textAlign={"center"}
            >
              {util.name(report.doctor)}
            </Typography>
            <Divider />
            <Typography variant="subtitle2">Attending Physician</Typography>
            <Typography variant="body2">{`License No. ${report.doctor.licenseNo}`}</Typography>
            <Typography variant="body2">{report.doctor.email}</Typography>
            <Typography variant="body2">{report.doctor.contactNo}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
