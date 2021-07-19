import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import Footer from "./footer2";

//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Cookies from "js-cookie";

//Material-ui-ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CropFreeIcon from "@material-ui/icons/CropFree";
import PeopleIcon from "@material-ui/icons/People";

// Designer
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      variant: "outlined",
    },
  },
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    textAlign: "Left",
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
}));

function AdminHome() {
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    isLoading: true,
    showLoginButton: true,
    myLocation: "",
  });

  const handleClickScanCode = () => {
    history.push("/adminscanner");
  };

  const handleClickLogoff = () => {
    Cookies.remove("adminLocation", {
      expires: 2,
      path: "/",
    });
    history.push("/admin-login");
  };

  const handleClickRecords = () => {
    history.push("/admin-records");
  };

  const handleClickRegister = () => {
    history.push("/admin-register");
  };

  const handleClickAdminList = () => {
    history.push("/admin-list");
  };
  const handleClickAdminModify = () => {
    history.push("/admin-modify");
  };

  const adminLocation = Cookies.get("adminLocation");

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
        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <AccountCircleIcon
              color="inherit"
              className={classes.iconMargin}
              fontSize="large"
            ></AccountCircleIcon>
            <Grid>
              <h3>Administrator</h3>
              <label>Good day Admin!</label>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          {/* {values.qrvalue} */}

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickScanCode}
            style={{ padding: 29, margin: 10, width: 250 }}
            startIcon={<CropFreeIcon />}
          >
            SCAN QR CODE
          </Button>

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickRecords}
            style={{ padding: 29, margin: 10, width: 250 }}
            startIcon={<CloudUploadIcon />}
          >
            Records
          </Button>

          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled
            // onClick={}
            style={{ padding: 29, margin: 10, width: 250 }}
            startIcon={<PeopleIcon />}
          >
            Members
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickRegister}
            style={{ padding: 29, margin: 10, width: 250 }}
            startIcon={<PeopleIcon />}
          >
            Register Admin
          </Button>

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickAdminList}
            style={{ padding: 29, margin: 10, width: 250 }}
            startIcon={<PeopleIcon />}
          >
            Admin List
          </Button>

          {/* <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickAdminModify}
            style={{ padding: 16, margin: 10, width: 250 }}
            startIcon={<PeopleIcon />}
          >
            Modify Admin Account
          </Button> */}
        </Paper>

        <Paper className={classes.paperRight}>
          {/* {values.qrvalue} */}

          <Button
            className={classes.margin}
            variant="contained"
            color="secondary"
            onClick={handleClickLogoff}
          >
            Logout
          </Button>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default withRouter(AdminHome);
