import React from "react";
import Footer from "./footer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: 20,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 50,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <>
      <div className="main-bg">
        <div className="main-text">
          <h4 style={{ fontSize: 55 }}>Contact Tracing</h4>
          <h6 style={{ fontSize: 25 }}>QR Code Solution</h6>

          <Link to="/member-login" style={{ textDecoration: "none" }}>
            <Button
              className={classes.margin}
              size="large"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Link>

          <div style={{ marginTop: 130 }}>
            <h6 style={{ fontSize: 18 }}>
              Not yet Registered? <Link to="/member-signup">Click Here</Link>
            </h6>
          </div>
        </div>
        {/* <div>
          <h5>IETI Marikina Contact Tracing QR Code Solution</h5>
        </div> */}

        <div className="footer-fixPosition">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
