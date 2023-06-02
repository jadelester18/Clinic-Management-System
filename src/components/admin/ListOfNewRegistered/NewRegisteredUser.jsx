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
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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

const NewRegisteredUser = () => {
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
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item md={6}></Grid>
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
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              // rowsPerPage={rowsPerPage}
              // page={page}
              // onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewRegisteredUser;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.birthdate}</TableCell>
        <TableCell align="right">{row.contact}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.action}</TableCell>
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
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.idType}>
                      <TableCell component="th" scope="row">
                        {historyRow.idType}
                      </TableCell>
                      <TableCell>{historyRow.idNumber}</TableCell>
                      <TableCell align="right">{historyRow.viewId}</TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//For Contents with sub Content
function createData(name, status, address, birthdate, contact, email, action) {
  return {
    name,
    status,
    address,
    birthdate,
    contact,
    email,
    action,
    history: [
      {
        idType: "Passport",
        idNumber: "11091700",
        viewId: <Button variant="contained">View</Button>,
      },
      {
        idType: "Drivers License",
        idNumber: "11091700",
        viewId: <Button variant="contained">View</Button>,
      },
    ],
  };
}

//For the Main Content
const rows = [
  createData(
    "Gon Freecss",
    "Disabled",
    "Pio Del Pilar, Makati City, Philippines",
    "Jan 13, 1998",
    "+639123456789",
    "sample@gmail.com",
    <Box flexDirection={"row"}>
      {/* <Stack direction="row" spacing={1} alignItems="center"> */}
      <IconButton sx={{ color: "green" }}>
        <SaveAsIcon />
      </IconButton>
      <IconButton sx={{ color: "red" }}>
        <RemoveCircleIcon />
      </IconButton>
      <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
    </Box>
  ),
];
