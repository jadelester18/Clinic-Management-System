import React, { useState } from "react";
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
  Modal,
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

const ListOfNurses = () => {
  const [openMedCert, setOpenMedCert] = useState(false);

  const handleOpenMedCert = () => setOpenMedCert(true);
  const handleCloseMedCert = () => setOpenMedCert(false);

  const rows = [
    createData(
      "Gon Freecss",
      "Pio Del Pilar, Makati City, Philippines",
      "Jan 13, 1998",
      "+639123456789",
      "sample@gmail.com",
      <Box flexDirection={"row"}>
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

  function createData(name, address, birthdate, contact, email, action) {
    return {
      name,
      address,
      birthdate,
      contact,
      email,
      action,
      history: [
        {
          idType: "11091700",
          idNumber: "11091700",
          date: "2023/04/01",
          actionViewReport: (
            <Button variant="contained" onClick={handleOpenMedCert}>
              View Report
            </Button>
          ),
        },
        {
          idType: "11091700",
          idNumber: "11091700",
          date: "2023/04/01",
          actionViewReport: (
            <Button variant="contained" onClick={handleOpenMedCert}>
              View Report
            </Button>
          ),
        },
      ],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

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
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nurse ID</TableCell>
                      <TableCell>Patient Assessed (IC No.)</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.idType}>
                        <TableCell component="th" scope="row">
                          {historyRow.idType}
                        </TableCell>
                        <TableCell>{historyRow.idNumber}</TableCell>
                        <TableCell>{historyRow.date}</TableCell>
                        <TableCell align="right">
                          {historyRow.actionViewReport}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <Modal
          open={openMedCert}
          onClose={handleCloseMedCert}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleMedCert}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  const styleMedCert = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
              />{" "}
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Birthdate</TableCell>
                      <TableCell align="right">Contact</TableCell>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListOfNurses;
