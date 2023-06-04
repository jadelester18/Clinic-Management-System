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
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import * as nurseService from "../../../redux/GetApiCalls/nurse";
import * as util from "../../../redux/util";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  //   display: "flex",
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

export default function ListOfNurses() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //For Page and Rows
  const [nurses, setNurses] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log("nurse object", nurses);

  const searchNurse = async () => {
    try {
      const { data: nursePage } = await nurseService.searchNurse({
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        pageNo: page,
        pageSize: rowsPerPage,
      });
      console.log("Search Nurse Result", nursePage);
      setNurses(nursePage.content);
      setCount(nursePage.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the Nurse list
  useEffect(() => {
    // Make the API call to fetch the list of Nurse
    searchNurse();
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

  // const rows = [
  //   createData(nurses.firstName, "IN", 1324171354, 3287263)
  // ];

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="div"></Typography>
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
                {nurses
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
                          <Avatar>
                            {nurse.avatarUrl === null || ""
                              ? nurse.firstName.charAt(0)
                              : nurse.avatarUrl}
                          </Avatar>
                        </TableCell>
                        <TableCell>{util.name(nurse)}</TableCell>
                        <TableCell>{util.fullAddress(nurse.address)}</TableCell>
                        <TableCell>{nurse.email}</TableCell>
                        <TableCell>{nurse.contactNo}</TableCell>
                        <TableCell>{nurse.registeredAt}</TableCell>
                        <TableCell>
                          <Button>Edit</Button>
                          <Button>Disable</Button>
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
