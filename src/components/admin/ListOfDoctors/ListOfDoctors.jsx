import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import * as doctorService from "../../../redux/GetApiCalls/doctor";
import * as util from "../../../redux/util";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CircleIcon from "@mui/icons-material/Circle";
import { Circle } from "@mui/icons-material";

const columns = [
  { id: "Avatar", label: "Avatar", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 100 },
  {
    id: "Address",
    label: "Address",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Contact",
    label: "Contact",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "Register At",
    label: "Register At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size, action) {
  const density = population / size;
  return { name, code, population, size, density, action };
}

export default function ListOfDoctors() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //For Page and Rows
  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log("Doctor object", doctors);

  const searchDoctor = async () => {
    try {
      const { data: doctorPage } = await doctorService.searchDoctor({
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        pageNo: page,
        pageSize: rowsPerPage,
      });
      console.log("Search Doctor Result", doctorPage);
      setDoctors(doctorPage.content);
      setCount(doctorPage.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the Nurse list
  useEffect(() => {
    // Make the API call to fetch the list of Nurse
    searchDoctor();
  }, [firstName, lastName, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFirstName = (event) => {
    setfirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2}>
                <Grid item color="gray">
                  <Circle fontSize="3" />
                </Grid>
                <Typography variant="body1" component="div">
                  Disabled
                </Typography>
                <Grid item color="green">
                  <Circle fontSize="3" />
                </Grid>
                <Typography variant="body1" component="div">
                  Active
                </Typography>
                <Grid item color="red">
                  <Circle fontSize="3" />
                </Grid>
                <Typography variant="body1" component="div">
                  Restricted
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2} textAlign={"right"}>
              <Typography>Filter By:</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleChangeFirstName}
              />{" "}
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleChangeLastName}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((nurse) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={nurse.id}
                      >
                        <TableCell>
                          <Box sx={{ position: "relative" }}>
                            <Avatar>
                              {nurse.avatarUrl === null || ""
                                ? nurse.firstName.charAt(0)
                                : nurse.avatarUrl}
                            </Avatar>
                            {nurse.account.status === "NEW" ? (
                              <Typography
                                variant="contained"
                                sx={stylesStatus.button}
                                color="gray"
                              >
                                <CircleIcon />
                              </Typography>
                            ) : (
                              ""
                            )}
                            {nurse.account.status === "VERIFIED" ? (
                              <Typography
                                variant="contained"
                                sx={stylesStatus.button}
                                color="green"
                              >
                                <CircleIcon />
                              </Typography>
                            ) : (
                              ""
                            )}
                            {nurse.account.status === "RESTRICTED" ? (
                              <Typography
                                variant="contained"
                                sx={stylesStatus.button}
                                color="red"
                              >
                                <CircleIcon />
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{util.name(nurse)}</TableCell>
                        <TableCell>{util.fullAddress(nurse.address)}</TableCell>
                        <TableCell>{nurse.email}</TableCell>
                        <TableCell>{nurse.contactNo}</TableCell>
                        <TableCell>{nurse.registeredAt}</TableCell>
                        <TableCell>
                          <Tooltip title="Reject/Block">
                            <IconButton sx={{ color: "green" }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject/Block">
                            <IconButton sx={{ color: "red" }}>
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Approve">
                            <Switch
                              checked={
                                nurse.account.status === "VERIFIED"
                                  ? true
                                  : false
                              }
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        </CardContent>
      </Card>
    </Box>
  );
}

const stylesStatus = {
  button: {
    position: "absolute",
    top: -25,
    right: { xs: 80, xl: 90 },
    zIndex: 1,
    margin: "1rem",
    borderRadius: "100%",
    height: 60,
  },
};