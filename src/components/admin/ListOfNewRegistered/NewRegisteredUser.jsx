import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import * as patientService from "../../../redux/GetApiCalls/patient";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const NewRegisteredUser = () => {
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
            <Grid item md={6} />
            <Grid item color="red" ali>
              <CircleIcon />{" "}
            </Grid>
            <Grid item>
              <Typography>Disabled</Typography>
            </Grid>
            <Grid item color="green">
              <CircleIcon />{" "}
            </Grid>
            <Grid item>
              <Typography>Verified</Typography>
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
    </Box>
  );
};

export default NewRegisteredUser;

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
          {patient.firstName}
        </TableCell>
        <TableCell align="right">{patient.status}</TableCell>
        <TableCell align="right">{patient.address.street}</TableCell>
        <TableCell align="right">{patient.birthDate}</TableCell>
        <TableCell align="right">{patient.contactNo}</TableCell>
        <TableCell align="right">{patient.email}</TableCell>
        <TableCell align="right">
          <Button>Approve</Button>
          <Button>Reject</Button>
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
                  {Array.isArray(patient.idInformation) ? (
                    patient.idInformation.map((idInfo) => (
                      <TableRow key={idInfo.id}>
                        <TableCell component="th" scope="row">
                          {idInfo.idType.type}
                        </TableCell>
                        <TableCell>{idInfo.idNumber}</TableCell>
                        <TableCell align="right">
                          <Button href={idInfo.idFileUrl} target="_blank">
                            View ID
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        No ID information available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

//For Contents with sub Content
// function createData(
//   firstName,
//   status,
//   address,
//   birthDate,
//   contactNo,
//   email,
//   action,
//   idInformation
// ) {
//   return {
//     firstName,
//     status,
//     address,
//     birthDate,
//     contactNo,
//     email,
//     action,
//     idInformation,
//   };
// }

// NewRegisteredUser.propTypes = {
//   patients: PropTypes.array.isRequired,
//   count: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   setPatients: PropTypes.func.isRequired,
//   setCount: PropTypes.func.isRequired,
//   setPage: PropTypes.func.isRequired,
//   setRowsPerPage: PropTypes.func.isRequired,
// };

// Row.propTypes = {
//   patient: PropTypes.object.isRequired,
// };
