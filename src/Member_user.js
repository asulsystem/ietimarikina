import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import Footer from "./footer2";
import axios from "axios";
import QRcode from "qrcode.react";

//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";

import { GetApp } from "@material-ui/icons";
import Cookies from "js-cookie";

//Material-ui-ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { format } from "date-fns";

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

function Member_user() {
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    id: "",
    qrvalue: "",
    suffix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    civil: "",
    birthDate: "",
    address: "",
    email: "",
    contactNo: "",
    username: "",
    mypassword: "",
    showPassword: false,
    isLoading: true,
    showLoginButton: true,
  });

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `IETI_${values.lastName}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleClickLogoff = () => {
    // console.log("logout click");
    Cookies.remove("userqr", {
      expires: 2,
      path: "/",
    });
    history.push("/member-login");
  };

  const userQR = Cookies.get("userqr");

  const getQRFromCookies = () => {
    setValues({ ...values, qrvalue: userQR });
  };

  // START UP
  useEffect(() => {
    getQRFromCookies();
    getData();
  }, []);

  const getData = () => {
    axios({
      url: `${global.ServerHost}/memberinfo`,
      method: "GET",
      params: {
        qrcode: userQR,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setValues({
            ...values,
            suffix: res.data.rows.SUFFIX,
            firstName: res.data.rows[0].FNAME,
            middleName: res.data.rows[0].MNAME,
            lastName: res.data.rows[0].LNAME,
            gender: res.data.rows[0].GENDER,
            civil: res.data.rows[0].CIVIL,
            birthDate: res.data.rows[0].BDATE,
            address: res.data.rows[0].ADDRESS,
            email: res.data.rows[0].EMAIL,
            contactNo: res.data.rows[0].CONTACT,
            isLoading: false,
            showLoginButton: false,
            qrvalue: userQR,
          });
        } else {
          setValues({
            ...values,
            showLoginButton: true,
            isLoading: false,
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
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
          Please <Link to="/member-login">Login</Link> First!
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
              <h3>Member Information</h3>
              <label>You can now download your QR Code ID Below</label>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <Container maxWidth="xs">
              <div style={{ border: "solid black 0px" }}>
                {values.qrvalue ? (
                  <div>
                    <div
                      style={{
                        // border: "blue 1px solid",
                        textAlign: "center",
                        display: "-ms-inline-grid",
                        margin: 10,
                        padding: 10,
                      }}
                    >
                      <QRcode
                        id="myqr"
                        value={values.qrvalue}
                        size={250}
                        includeMargin={true}
                        style={{
                          border: "gray 1px solid",
                          marginBottom: 10,
                        }}
                      />
                      <br />
                      <Fab
                        onClick={downloadQR}
                        style={{ marginLeft: 10 }}
                        color="primary"
                      >
                        <GetApp />
                      </Fab>
                      <div
                        style={{
                          // border: "blue 1px solid",
                          display: "-webkit-inline-flex",
                          margin: 10,
                        }}
                      >
                        <label
                          style={{
                            fontSize: 20,
                          }}
                        >
                          IETI QR Pass
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1
                      style={{
                        color: "red",
                        fontSize: 30,
                      }}
                    >
                      No QR code preview
                    </h1>
                    <br />
                  </div>
                )}
              </div>
              {/* https://www.npmjs.com/package/date-fns */}
              <Grid>
                <h3>{`${values.firstName} ${values.middleName} ${values.lastName}`}</h3>
                <label>{`${values.gender} / ${values.civil}`}</label>
                <br />
                <label>{`${values.email} / ${values.contactNo}`}</label>
                <br />
                <label>{`Birthdate : ${format(
                  new Date(values.birthDate),
                  "MMMM dd, yyyy"
                )}`}</label>
                <br />
                <label>{`Address : ${values.address}`}</label>
                <br />
              </Grid>
            </Container>
          </Grid>
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

export default withRouter(Member_user);
