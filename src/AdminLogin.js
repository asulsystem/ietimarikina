import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import Footer from "./footer";
import axios from "axios";

//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
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

//Material-ui-ICONS
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
// Cookies
import Cookies from "js-cookie";

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
  iconMargin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "35ch",
  },
}));

function AdminLogin() {
  let history = useHistory();

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
    loginLabel: "LOGIN",
    loginBtnDisabled: false,
    errUserName: true,
    errUserPass: true,
    isCompleteEntry: false,
    openModal: false,
    serverMsgTitle: "",
    serverMsg: "",
    isLogin: false,
  });

  const myLocation = Cookies.get("adminLocation");

  const getQRFromCookies = () => {
    // console.log("getQRFromCookies");
    if (myLocation) {
      history.push("/administrator");
    }
    // else {
    //   console.log("no location / Admin not login");
    // }
  };

  useEffect(() => {
    getQRFromCookies();
  }, []);
  const classes = useStyles();
  const md5 = require("md5");

  const handleModalClose = () => {
    setValues({ ...values, openModal: false });
  };

  const handleChange = (prop, errprop) => (event) => {
    let errStat = event.target.value.length > 0 ? false : true;
    setValues({ ...values, [prop]: event.target.value, [errprop]: errStat });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleErrorRes = () => {
    setValues({
      ...values,
      loginLabel: "Login",
      loginBtnDisabled: false,
      serverMsgTitle: "Login Failed",
      serverMsg: "Can't Contact the server or Network Error. Please Try again.",
      openModal: true,
    });
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
  };

  const handleCompleteEntry = () => {
    setValues({
      ...values,
      loginLabel: "LOGIN",
      loginBtnDisabled: false,
      serverMsgTitle: "Login Failed",
      serverMsg: "Please Enter Username and password!",
      openModal: true,
    });
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setValues({
        ...values,
        loginLabel: "Please wait...",
        loginBtnDisabled: true,
      });

      if (values.errUserName === false && values.errUserPass === false) {
        authLogin();
      } else {
        handleCompleteEntry();
      }
    }
  };

  const handleClickLogin = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      loginLabel: "Please wait...",
      loginBtnDisabled: true,
    });

    if (values.errUserName === false && values.errUserPass === false) {
      authLogin();
    } else {
      handleCompleteEntry();
    }

    // values.isCompleteEntry ? authLogin() : handleCompleteEntry();
  };

  const authLogin = () => {
    axios({
      url: `${global.ServerHost}/adminlogin`,
      method: "GET",
      params: {
        username: values.username.trim(),
        password: md5(values.password),
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          Cookies.set("adminLocation", res.data.rows[0].REGLOCATION, {
            expires: 2,
            path: "/",
          });

          history.push("/administrator");
        } else {
          setValues({
            ...values,
            loginLabel: "LOGIN",
            loginBtnDisabled: false,
            serverMsgTitle: "Login Failed",
            serverMsg: "Invalid Username or Password!",
            openModal: true,
          });
        }
      })

      .catch((error) => {
        handleErrorRes();
      });
  };

  return (
    <>
      {/* Spacing for Top fixed Menu var */}
      <div style={{ marginTop: 50 }}></div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <AssignmentIndIcon
              className={classes.iconMargin}
              fontSize="large"
            ></AssignmentIndIcon>
            <Grid>
              <h3>Administrator Login</h3>
              <label>Enter administrator user account details</label>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-username">
              User Name
            </InputLabel>
            <OutlinedInput
              placeholder="User Name"
              value={values.username}
              onChange={handleChange("username", "errUserName")}
              endAdornment={
                <InputAdornment position="end">
                  <PersonIcon></PersonIcon>
                </InputAdornment>
              }
              labelWidth={85} //white back ground of text
            />
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              placeholder="Password"
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password", "errUserPass")}
              onKeyDown={handleKeyEnter}
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
              labelWidth={75} //white back ground of text
            />
          </FormControl>
        </Paper>
        <Paper className={classes.paperRight}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              className={classes.margin}
              variant="contained"
              color="secondary"
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
          </Link>

          <Button
            disabled={values.loginBtnDisabled}
            className={classes.margin}
            variant="contained"
            color="primary"
            onClick={handleClickLogin}
          >
            {values.loginLabel}
          </Button>
        </Paper>
      </Container>
      {/* <Footer2 /> */}

      <div className="footer-fixPosition">
        <Footer />
      </div>

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
            {values.serverMsg}
          </DialogContentText>
        </DialogContent>

        {/* FOR BUTTON DIALOG */}
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary" autoFocus>
            {"Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminLogin;
