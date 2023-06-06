import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import * as patientService from "../../../redux/GetApiCalls/patient";
import * as adminService from "../../../redux/GetApiCalls/admin";
import BlockIcon from "@mui/icons-material/Block";
import * as util from "../../../redux/util";
import VerifiedIcon from "@mui/icons-material/Verified";
import { SnackBarContext } from "../../../context/SnackBarContext";
import LoadingScreen from "../../LoadingScreen";

const ListOfToBeApprovedPatient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patients, setPatients] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    searchPatients();
  }, [firstName, lastName, page, rowsPerPage]);

  const searchPatients = async () => {
    try {
      const { data: patientPage } = await patientService.searchPatients({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        pageNo: page,
        pageSize: rowsPerPage,
      });
      setPatients(patientPage.content);
      console.log(patientPage);
      setCount(patientPage.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  async function handleUpdate(icNo, updateUserStatusDto) {
    setIsLoading(true);
    try {
      const { data } = await adminService.changePatientStatus(
        icNo,
        updateUserStatusDto
      );
      // fetchAppointments(date.format(DEFAULT_DATE_FORMAT));
      onShowSuccess("Appointment updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Filter By:</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                size="small"
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                size="small"
                value={lastName}
                onChange={handleChangeLastName}
              />
            </Grid>
            <Grid item md={5} />
            <Grid item color="gray">
              <VerifiedIcon />{" "}
            </Grid>
            <Grid item>
              <Typography>New</Typography>
            </Grid>
            <Grid item color="gold">
              <VerifiedIcon />{" "}
            </Grid>
            <Grid item>
              <Typography>Approved</Typography>
            </Grid>
            <Grid item color="red">
              <VerifiedIcon />{" "}
            </Grid>
            <Grid item>
              <Typography>Restricted</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">BirthDate</TableCell>
                    <TableCell align="right">Contact No.</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <Row key={patient.id} patient={patient} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
      {isLoading && <LoadingScreen open={isLoading} />}
    </Box>
  );
};

export default ListOfToBeApprovedPatient;

function Row({ patient }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/* {patient.firstName} */}
          {util.name(patient)}
        </TableCell>
        <TableCell align="right">
          {patient.account.status === "NEW" ? (
            <Grid item color="gray">
              <VerifiedIcon />{" "}
            </Grid>
          ) : (
            ""
          )}{" "}
          {patient.account.status === "VERIFIED" ? (
            <Grid item color="gold">
              <VerifiedIcon />{" "}
            </Grid>
          ) : (
            ""
          )}{" "}
          {patient.account.status === "RESTRICTED" ? (
            <Grid item color="red">
              <VerifiedIcon />{" "}
            </Grid>
          ) : (
            ""
          )}
        </TableCell>
        {/* <TableCell align="right">{util.fullAddress(patient.address)}</TableCell> */}
        <TableCell align="right">{util.fullAddress(patient.address)}</TableCell>
        <TableCell align="right">{util.date(patient.birthDate)}</TableCell>
        <TableCell align="right">{patient.contactNo}</TableCell>
        <TableCell align="right">{patient.email}</TableCell>
        <TableCell align="right">
          {/* <Tooltip title="Reject/Block">
            <IconButton sx={{ color: "green" }}>
              <EditIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Reject/Block">
            <IconButton sx={{ color: "red" }}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Approve">
            <Switch
              checked={patient.account.status === "VERIFIED" ? true : false}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID Type</TableCell>
                    <TableCell>ID No.</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={patient.id}>
                    <TableCell component="th" scope="row">
                      {patient.idInformation.idType.type}
                    </TableCell>
                    <TableCell>{patient.idInformation.idNumber}</TableCell>
                    <TableCell align="right">
                      <Button
                        href={patient.idInformation.idFileUrl}
                        target="_blank"
                      >
                        View ID
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                      <TableCell colSpan={3}>
                        No ID information available
                      </TableCell>
                    </TableRow> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
