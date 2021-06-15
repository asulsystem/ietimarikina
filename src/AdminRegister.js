import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import clsx from "clsx";
import Footer2 from "./footer2";
import axios from "axios";
//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

import Cookies from "js-cookie";

//Material-ui-ICONS
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";

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
  iconMargin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "35ch",
  },
}));

export default function Member_signup() {
  let history = useHistory();
  const md5 = require("md5");
  const classes = useStyles();

  const [values, setValues] = useState({
    fullName: "",
    errfullName: true,
    myLocation: "",
    isLoading: true,
    username: "",
    mypassword: "",
    confirmPassword: "",
    showPassword: false,
    confShowPassword: false,
    openModal: false,
    serverMsg: "",
    regSuccess: false,
    regButtonVal: "Register",
    regDisabled: false,
    serverMsgTitle: "",
    errUserName: true,
    errMyPassword: true,
    errConfirmPass: true,
    isLoginButtonDisabled: true,
  });
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

  const handleChangeValidateValues = (prop, errprop) => (event) => {
    let errStat = event.target.value.length > 0 ? false : true;
    console.log(errStat);
    setValues({
      ...values,
      [prop]: event.target.value,
      [errprop]: errStat,
    });
  };

  const handleChangePasswordVerifier = (prop, errprop) => (event) => {
    let errStat = event.target.value === values.middleName ? true : false;
    console.log(errStat);
    setValues({
      ...values,
      [prop]: event.target.value,
      [errprop]: errStat,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickConfShowPassword = () => {
    setValues({ ...values, confShowPassword: !values.confShowPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfPassword = (event) => {
    event.preventDefault();
  };
  // Verify existing record

  const registerNewAdmin = (event) => {
    event.preventDefault();
    if (
      values.errfullName === false &&
      values.errUserName === false &&
      values.errMyPassword === false &&
      values.errConfirmPass === false
    ) {
      setValues({
        ...values,
        regButtonVal: "Please wait...",
        regDisabled: true,
      });
      verifyRecord();
    } else {
      handleNotSuccessRegister();
    }
  };

  const returnHome = () => {
    history.push("/administrator");
  };

  const verifyRecord = () => {
    axios({
      url: `${global.ServerHost}/adminid`,
      method: "GET",
      params: {
        fullName: values.fullName.trim(),
        username: values.username.trim(),
      },
    })
      .then((res) => {
        console.log(res);
        res.data.success
          ? insertRecord()
          : setValues({
              ...values,
              regButtonVal: "Register",
              regDisabled: false,
              isLoginButtonDisabled: true,
              serverMsgTitle: "Registration Failed",
              serverMsg: res.data.message,
              openModal: true,
            });
      })

      .catch((error) => {
        console.log("Verify plang ", error);
        handleRegisterError();
      });
  };

  // new code
  const insertRecord = () => {
    axios({
      url: `${global.ServerHost}/adminadd`,
      method: "POST",
      params: {
        fullname: `${values.fullName.toUpperCase().trim()}`,
        mylocation: `${values.myLocation.toUpperCase().trim()}`,
        username: values.username.trim(),
        password: md5(values.mypassword),
      },
    })
      .then((data) => {
        handleSuccessRegister();
      })
      .catch((error) => {
        handleRegisterError();
      });
  };

  const handleSuccessRegister = () => {
    setValues({
      ...values,
      regButtonVal: "Register",
      regDisabled: false,
      isLoginButtonDisabled: false,
      serverMsgTitle: "Registered Successful",
      serverMsg: "New Administrator Successfully Save.",
      openModal: true,
    });
    history.push("/administrator");
  };

  const handleNotSuccessRegister = () => {
    setValues({
      ...values,
      isLoginButtonDisabled: true,
      serverMsgTitle: "Registration Failed",
      serverMsg: "Please Complete all required fields!",
      openModal: true,
    });
  };

  const handleRegisterError = () => {
    setValues({
      ...values,
      regButtonVal: "Register",
      regDisabled: false,
      isLoginButtonDisabled: true,
      serverMsgTitle: "Registration Failed",
      serverMsg: "Can't Contact the server or Network Error. Please Try again.",
      openModal: true,
    });
  };

  const handleModalClose = () => {
    setValues({ ...values, openModal: false });
  };

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
      <Container fixed>
        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <PersonAddIcon
              className={classes.iconMargin}
              fontSize="large"
            ></PersonAddIcon>
            <Grid>
              <h3>Administrator Sign-up</h3>
              <label>Enter Administrator details to create account</label>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <InputLabel error shrink>
              * required field
            </InputLabel>

            <Grid item xs={12}>
              <TextField
                required
                inputProps={{ maxLength: 45 }}
                label="Full Name"
                placeholder="Full Name"
                variant="outlined"
                onChange={handleChangeValidateValues("fullName", "errfullName")}
                value={values.fullName}
                error={values.errfullName}
                helperText={values.errfullName ? "Please Enter Full Name" : ""}
              />
              <TextField
                disabled
                required
                inputProps={{ maxLength: 45 }}
                label="Location"
                placeholder="Location"
                variant="outlined"
                value={values.myLocation}
              />
            </Grid>
          </form>
        </Paper>
        <Paper className={classes.paper}>
          <InputLabel className={classes.margin}>
            Create Login Information
          </InputLabel>

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
                  <PersonIcon></PersonIcon>
                </InputAdornment>
              }
              labelWidth={85} //width back ground of text
              error={values.errUserName}
            />
            <FormHelperText error={values.errUserName}>
              {values.errUserName ? "Please Enter Username." : ""}
            </FormHelperText>
          </FormControl>

          {/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
          {/* PASSWORD */}
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-conf-password"
              error={values.errMyPassword}
            >
              Password
            </InputLabel>
            <OutlinedInput
              error={values.errMyPassword}
              placeholder="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.mypassword}
              onChange={handleChangeValidateValues(
                "mypassword",
                "errMyPassword"
              )}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={75} //width back ground of text
            />
            <FormHelperText error={values.errMyPassword}>
              {values.errMyPassword ? "Please Enter Password." : ""}
            </FormHelperText>
          </FormControl>
          {/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}

          {/* CONFIRM PASSWORD */}
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-conf-password"
              error={values.errConfirmPass}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              error={values.errConfirmPass}
              placeholder="Confirm Password"
              type={values.confShowPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChangePasswordVerifier(
                "confirmPassword",
                "errConfirmPass"
              )}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfShowPassword}
                    onMouseDown={handleMouseDownConfPassword}
                    edge="end"
                  >
                    {values.confShowPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={135} //width back ground of text
              maxLength={3}
            />
            <FormHelperText error={values.errConfirmPass}>
              {values.errConfirmPass ? "confirm password is not the same." : ""}
            </FormHelperText>
          </FormControl>
        </Paper>
        <Paper className={classes.paperRight}>
          <p>{values.serverMsg}</p>

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

          {/* FOR REGISTER BUTTON */}
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            onClick={registerNewAdmin}
            disabled={values.regDisabled}
          >
            {values.regButtonVal}
          </Button>
        </Paper>

        <Dialog
          open={values.openModal}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {values.serverMsgTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>{values.serverMsg}</p>
            </DialogContentText>
          </DialogContent>

          {/* FOR BUTTON DIALOG */}
          <DialogActions>
            <Button
              // onClick={handleModalClose}
              disabled={values.isLoginButtonDisabled}
              color="primary"
              autoFocus
              component={Link}
              to="member-login"
            />
            <Button onClick={handleModalClose} color="secondary" autoFocus>
              <p style={{ textDecoration: "none" }}>Close</p>
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer2 />
    </>
  );
}
