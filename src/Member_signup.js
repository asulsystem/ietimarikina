import React, { useState } from "react";
import { Link } from "react-router-dom";

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

//Material-ui-ICONS
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

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
  // Prepare Current Date Default Birthdate
  // console.log("render all");

  const separator = "-";
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const curDate = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;

  // console.log(curDate);
  const md5 = require("md5");
  const classes = useStyles();

  const [values, setValues] = useState({
    qrcode: "",
    qrvalue: "",
    suffix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    civil: "",
    birthDate: curDate,
    address: "",
    email: "",
    contactNo: "",
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
    errFirstName: true,
    errLastName: true,
    errGender: true,
    errCivil: true,
    errBirthdate: false,
    errAddress: true,
    errContact: true,
    errUserName: true,
    errMyPassword: true,
    errConfirmPass: true,
    isLoginButtonDisabled: true,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

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
    let errStat = event.target.value === values.confirmPassword ? false : true;
    // console.log(errStat);
    setValues({
      ...values,
      [prop]: event.target.value,
      [errprop]: errStat,
      errConfirmPass: errStat,
    });
  };

  const handleChangePasswordVerifierConfirm = (prop, errprop) => (event) => {
    let errStat = event.target.value === values.mypassword ? false : true;
    // console.log(errStat);
    setValues({
      ...values,
      [prop]: event.target.value,
      [errprop]: errStat,
      errMyPassword: errStat,
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

  const registerNewMember = (event) => {
    event.preventDefault();
    if (
      values.errFirstName === false &&
      values.errLastName === false &&
      values.errGender === false &&
      values.errCivil === false &&
      values.errBirthdate === false &&
      values.errAddress === false &&
      values.errContact === false &&
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

  const verifyRecord = () => {
    axios({
      url: `${global.ServerHost}/memberid`,
      method: "GET",
      params: {
        qrcode: md5(
          `${values.firstName.toUpperCase().trim()}${values.middleName
            .toUpperCase()
            .trim()}${values.lastName.toUpperCase().trim()}${values.birthDate}`
        ),
        username: values.username.trim(),
      },
    })
      .then((res) => {
        // console.log(res);
        res.data.success
          ? insertNewMember()
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
        handleRegisterError();
      });
  };

  // new code
  const insertNewMember = () => {
    axios({
      url: `${global.ServerHost}/memberadd`,
      method: "POST",
      params: {
        suffix: values.suffix.toUpperCase().trim(),
        firstName: values.firstName.toUpperCase().trim(),
        middleName: values.middleName.toUpperCase().trim(),
        lastName: values.lastName.toUpperCase().trim(),
        gender: values.gender,
        civil: values.civil,
        birthDate: values.birthDate,
        address: values.address.toUpperCase().trim(),
        email: values.email.trim(),
        contactNo: values.contactNo.trim(),
        username: values.username.trim(),
        password: md5(values.mypassword),
        qrcode: md5(
          `${values.firstName.toUpperCase().trim()}${values.middleName
            .toUpperCase()
            .trim()}${values.lastName.toUpperCase().trim()}${values.birthDate}`
        ),
        qrvalue: `${values.firstName.toUpperCase().trim()}${values.middleName
          .toUpperCase()
          .trim()}${values.lastName.toUpperCase().trim()}${values.birthDate}`,
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
      serverMsg:
        "You can now proceed to login to get your QR Code. Please Click Login",
      openModal: true,
    });
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

  return (
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
              <h3>Member Sign-up</h3>
              <label>Enter your details to create your account</label>
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
                label="Suffix"
                placeholder="Suffix(e.g. Jr, Sr., III)"
                variant="outlined"
                onChange={handleChange("suffix")}
                value={values.suffix}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                inputProps={{ maxLength: 45 }}
                label="First Name"
                placeholder="First Name"
                variant="outlined"
                onChange={handleChangeValidateValues(
                  "firstName",
                  "errFirstName"
                )}
                value={values.firstName}
                error={values.errFirstName}
                helperText={
                  values.errFirstName ? "Please Enter your First Name" : ""
                }
              />
              <TextField
                inputProps={{ maxLength: 45 }}
                label="Middle Name"
                placeholder="Middle Name"
                variant="outlined"
                onChange={handleChange("middleName")}
                value={values.middleName}
              />
              <TextField
                required
                inputProps={{ maxLength: 45 }}
                label="Last Name"
                placeholder="Last Name"
                variant="outlined"
                onChange={handleChangeValidateValues("lastName", "errLastName")}
                value={values.lastName}
                helperText={
                  values.errLastName ? "Please Enter your Last Name" : ""
                }
                error={values.errLastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="outlined-select-gender"
                select
                label="Gender"
                value={values.gender}
                onChange={handleChangeValidateValues("gender", "errGender")}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                helperText={values.errGender ? "Please Select Gender" : ""}
                error={values.errGender}
              >
                <option key="_gBlnk" value="" />
                <option key="MALE" value="MALE">
                  MALE
                </option>
                <option key="FEMALE" value="FEMALE">
                  FEMALE
                </option>
                {/* 
                {genderList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}  */}
              </TextField>

              <TextField
                required
                id="outlined-select-civil"
                select
                label="Civil Status"
                value={values.civil}
                onChange={handleChangeValidateValues("civil", "errCivil")}
                SelectProps={{
                  native: true,
                }}
                // helperText="Please select your gender"
                variant="outlined"
                helperText={values.errCivil ? "Please Select Civil Status" : ""}
                error={values.errCivil}
              >
                {/* {civilList.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.label}
                  </option>
                ))} */}
                <option key={0} values={""}></option>

                <option key={1} values={"SINGLE"}>
                  SINGLE
                </option>
                <option key={2} values={"MARRIED"}>
                  MARRIED
                </option>
                <option key={3} values={"SEPARATED"}>
                  SEPARATED
                </option>
                <option key={4} values={"WIDOWED"}>
                  WIDOWED
                </option>
              </TextField>

              {/* Birth Date */}
              <TextField
                required
                label="Birth Date"
                type="date"
                variant="outlined"
                onChange={handleChangeValidateValues(
                  "birthDate",
                  "errBirthdate"
                )}
                value={values.birthDate}
                helperText={
                  values.errBirthdate ? "Please Enter your Birth date." : ""
                }
                error={values.errBirthdate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Address"
                placeholder="Address"
                multiline
                variant="outlined"
                rows={3}
                value={values.address}
                onChange={handleChangeValidateValues("address", "errAddress")}
                helperText={
                  values.errAddress ? "Please Enter your Address." : ""
                }
                error={values.errAddress}
              />
              <TextField
                label="Email"
                placeholder="Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
              />
              <TextField
                required
                label="Contact number"
                placeholder="Contact number"
                variant="outlined"
                value={values.contactNo}
                onChange={handleChangeValidateValues("contactNo", "errContact")}
                helperText={
                  values.errContact
                    ? "Please Enter your Correct Contact number."
                    : ""
                }
                error={values.errContact}
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
              onChange={handleChangePasswordVerifier(
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
              onChange={handleChangePasswordVerifierConfirm(
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

          {/* FOR CANCEL BUTTON */}
          {/* <Button
            className={classes.margin}
            variant="contained"
            color="secondary"
            // onClick={}
          >
            Test
          </Button> */}

          {/* FOR REGISTER BUTTON */}
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            onClick={registerNewMember}
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
            >
              {/* <Link to="member-login"> */}
              <p style={{ textDecoration: "none" }}>Login Page</p>
              {/* </Link> */}
            </Button>
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
