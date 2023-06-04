import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
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
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
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

const rows = [
  createData(
    "India",
    "IN",
    1324171354,
    3287263,
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
  createData(
    "China",
    "CN",
    1403500365,
    9596961,
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
  createData(
    "Italy",
    "IT",
    60483973,
    301340,
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
  createData(
    "United States",
    "US",
    327167434,
    9833520,
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
  createData(
    "Canada",
    "CA",
    37602103,
    9984670,
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
  createData(
    "Australia",
    "AU",
    25475400,
    7692024,
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
  createData(
    "Germany",
    "DE",
    83019200,
    357578,
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
  createData(
    "Ireland",
    "IE",
    4857000,
    70273,
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
  createData(
    "Mexico",
    "MX",
    126577691,
    1972550,
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
  createData(
    "Japan",
    "JP",
    126317000,
    377973,
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
  createData(
    "France",
    "FR",
    67022000,
    640679,
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
  createData(
    "United Kingdom",
    "GB",
    67545757,
    242495,
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
  createData(
    "Russia",
    "RU",
    146793744,
    17098246,
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
  createData(
    "Nigeria",
    "NG",
    200962417,
    923768,
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
  createData(
    "Brazil",
    "BR",
    210147125,
    8515767,
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

export default function ListOfNurses() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
