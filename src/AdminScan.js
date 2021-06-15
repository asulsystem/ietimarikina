import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "./footer2";
import axios from "axios";

//Material-ui-CORES
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Cookies from "js-cookie";
import QrScan from "react-qr-reader";

//Material-ui-ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

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

function AdminScan() {
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    isLoading: true,
    showLoginButton: true,
    myLocation: "",
    qrScanned: "",
    result: "",
    isScanLoading: false,
  });

  const previewStyle = {
    height: 340,
    width: 340,
    display: "flex",
    "justify-content": "center",
  };

  const handleScan = (data) => {
    if (data) {
      setValues({ ...values, result: "Please Wait", isScanLoading: true });
      getData(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
    alert("QR Reader Error!");
  };

  const returnHome = () => {
    history.push("/administrator");
  };

  const adminLocation = Cookies.get("adminLocation");

  const getData = (data) => {
    axios({
      url: `${global.ServerHost}/addtracelog`,
      method: "GET",
      params: {
        qrcode: data,
        mylocation: values.myLocation,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setValues({
            ...values,
            result: res.data.rows[0].FNAME + " " + res.data.rows[0].LNAME,
            isScanLoading: false,
          });
        } else {
          setValues({
            ...values,
            result: "invalid Qr Code!",
            isScanLoading: false,
          });
        }
      })

      .catch((err) => {
        console.log(err);
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

  const theQRScanner = () => {
    if (!values.isScanLoading) {
      return (
        <QrScan
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      );
    } else {
      return <h3>[QR Scanner] Please wait..</h3>;
    }
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
      <Container maxWidth="lg">
        {/* <Link to="/administrator">
          <HomeIcon fontSize="large" /> HOME
        </Link> */}

        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            <AccountCircleIcon
              color="inherit"
              className={classes.iconMargin}
              fontSize="large"
            ></AccountCircleIcon>
            <Grid>
              <h3>QR Scanner</h3>
              <label>Place qr image opposite to the camera.</label>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Grid container className={classes.gridRoot} item xs={12}>
            {/* QR SCANNER CAMERA HERE*/}

            <center>
              <div
                width="100%"
                style={{
                  marginTop: 0,
                  // border: "black 1px solid",
                }}
              >
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<HomeIcon />}
                  style={{ marginBottom: 30 }}
                  onClick={returnHome}
                >
                  Back to Main Menu
                </Button>
                {theQRScanner()}
              </div>
            </center>
          </Grid>
        </Paper>

        <h4>Result : </h4>

        <Paper className={classes.paper}>
          {/* SCANNED RESULT  */}
          {`${values.result}`}
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default AdminScan;
