import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import Footer from "./footer2";
import clsx from "clsx";

//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";

import Cookies from "js-cookie";

//Material-ui-ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

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
    fullName: "",
    errfullName: true,
    myLocation: "",
    isLoading: true,
    showLoginButton: true,
    username: "",
    errUserName: true,
  });

  const handleClickScanCode = () => {
    history.push("/adminscanner");
  };

  const handleChangeValidateValues = (prop, errprop) => (event) => {
    let errStat = event.target.value.length > 0 ? false : true;
    // console.log(errStat);
    setValues({
      ...values,
      [prop]: event.target.value,
      [errprop]: errStat,
    });
  };

  const handleClickLogoff = () => {
    Cookies.remove("adminLocation", {
      expires: 2,
      path: "/",
    });
    history.push("/admin-login");
  };

  const handleClickAdminList = () => {
    history.push("/admin-list");
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
              <h3>Modify Admin Account</h3>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          {/* {values.qrvalue} */}

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-username"
              error={values.errUserName}
            >
              User Name
            </InputLabel>
            <OutlinedInput
              placeholder="User Name"
              value={values.username}
              onChange={handleChangeValidateValues("username", "errUserName")}
              endAdornment={
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              }
              labelWidth={85} //width back ground of text
              error={values.errUserName}
            />
            <FormHelperText error={values.errUserName}>
              {values.errUserName ? "Please Enter Username." : ""}
            </FormHelperText>
          </FormControl>

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickAdminList}
            style={{ padding: 16, margin: 10, width: 250 }}
            startIcon={<PeopleIcon />}
          >
            Modify Admin Account
          </Button>
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
