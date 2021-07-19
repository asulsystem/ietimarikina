import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "./footer2";
import axios from "axios";

//Material-ui-CORES.
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Cookies from "js-cookie";

//Material-ui-ICONS
import DataUsageIcon from "@material-ui/icons/DataUsage";
import SearchIcon from "@material-ui/icons/Search";

// Designer
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      variant: "outlined",
    },
  },
  rootnew: {
    width: "100%",
  },

  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    width: "100%",
  },
  paperRight: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: "Right",
  },
  margin: {
    margin: theme.spacing(1),
  },
  mainButton: {
    margin: theme.spacing(7),
  },

  iconMargin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "35ch",
  },
  container: {
    maxHeight: 440,
  },
}));

// ID, FULLNAME, USERNAME, PASSWORD, REGLOCATION, CREATEDDATE
const columns = [
  { id: "ID", label: "ID", minWidth: 60 },
  { id: "FULLNAME", label: "FULLNAME", minWidth: 100 },
  { id: "USERNAME", label: "USERNAME", minWidth: 100 },
  { id: "REGLOCATION", label: "REG. LOCATION", minWidth: 100 },
  { id: "CREATEDDATE", label: "REGISTER DATE", minWidth: 100 },
  //   {
  //     id: "LOCATION",
  //     label: "LOCATION",
  //     minWidth: 170,
  //     align: "right",
  //   },
];

const separator = "-";
const newDate = new Date();
const date = newDate.getDate();
const month = newDate.getMonth() + 1;
const year = newDate.getFullYear();
const curDate = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date < 10 ? `0${date}` : `${date}`}`;

function AdminList() {
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    isLoading: true,
    showLoginButton: true,
    myLocation: "",
    dateTrace: curDate,
    errDateTrace: false,
    regDisabled: false,
    regButtonVal: "Show All Records",
    msg: "",
    traceData: [],
  });

  const searchTrace = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      regButtonVal: "Please wait...",
      regDisabled: true,
    });

    getData();
  };

  const returnHome = () => {
    history.push("/administrator");
  };

  const adminLocation = Cookies.get("adminLocation");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = () => {
    axios({
      url: `${global.ServerHost}/adminlist`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setValues({
          ...values,
          traceData: res.data.rows,
          isLoading: false,
          regButtonVal: "Show All Records",
          regDisabled: false,
          msg: "",
        });
      })

      .catch((error) => {
        setValues({ ...values, msg: "Error Load data. Please try again" });
        // console.log(error);
      });
  };

  const getQRFromCookies = () => {
    setValues({
      ...values,
      myLocation: adminLocation,
      isLoading: false,
      showLoginButton: adminLocation ? false : true,
    });
  };

  // START UP
  useEffect(() => {
    getQRFromCookies();
  }, []);

  return values.isLoading ? (
    <>
      {/* Spacing for Top fixed Menu var */}
      <div style={{ marginTop: 50 }}></div>
      <div style={{ textAlign: "center" }}>
        <h1>Please wait...</h1>
      </div>
    </>
  ) : values.showLoginButton ? (
    <>
      {/* Spacing for Top fixed Menu var */}
      <div style={{ marginTop: 50 }}></div>
      <div style={{ textAlign: "center" }}>
        <h1>
          Please
          <Link to="/admin-login">Login </Link> as Admin First!
        </h1>
      </div>
    </>
  ) : (
    <>
      {/* Spacing for Top fixed Menu var */}
      <div style={{ marginTop: 50 }}></div>

      <CssBaseline />
      <Container maxWidth="lg">
        {/* <Link to="/administrator">HOME</Link> */}

        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <DataUsageIcon
              color="inherit"
              className={classes.iconMargin}
              fontSize="large"
            />
            <Grid>
              <h3>Administrator List</h3>
              <label>Show Admin information</label>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <Grid>
              <Button
                className={classes.margin}
                variant="contained"
                color="primary"
                onClick={searchTrace}
                disabled={values.regDisabled}
                startIcon={<SearchIcon />}
              >
                {values.regButtonVal}
              </Button>

              <Button
                className={classes.margin}
                variant="contained"
                color="default"
                onClick={returnHome}
                disabled={values.regDisabled}
                startIcon={<HomeIcon />}
              >
                Back to Main Menu
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          {/* SCANNED RESULT  */}
          <h3>Result</h3>
          <TableContainer className={classes.container}>
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
                {values.traceData
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
            count={values.traceData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <h3 style={{ color: "red" }}>{values.msg}</h3>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default AdminList;
