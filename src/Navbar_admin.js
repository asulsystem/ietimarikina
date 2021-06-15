import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import HomeIcon from "@material-ui/icons/Home";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { CenterFocusStrong } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import Cookies from "js-cookie";

import logo from "./img/ieti_logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  buttonMargin: {
    paddingLeft: 5,
  },
  list: {
    width: 230,
  },
}));

const activeNavStyle = {
  color: "#fff",
  backgroundColor: "#8c8b8b",
};

export default function Navbar_Admin() {
  // console.log("navbar redered");
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [values, setValues] = useState({
    myLocation: "",
  });

  const adminLocation = Cookies.get("adminLocation");

  console.log("the app : ", adminLocation);
  const getLoginInfo = () => {
    setValues({
      ...values,
      myLocation: adminLocation,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      myLocation: adminLocation,
    });
  }, [values.myLocation]);

  const toggleDrawer = (open) => (event) => {
    setValues({
      ...values,
      myLocation: adminLocation,
    });
    setState(open);
  };

  const navMenu = () => {
    return (
      <div className={classes.list}>
        <List>
          <ListItem button component={NavLink} to="/administrator">
            <div className="App-Container">
              <img src={logo} className="App-logo" alt="IETI-logo"></img>
            </div>
          </ListItem>
          <ListItem
            button
            component={NavLink}
            exact
            activeStyle={activeNavStyle}
            to="/administrator"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          {/* Admin Login */}

          <ListItem
            button
            component={NavLink}
            exact
            activeStyle={activeNavStyle}
            to="/adminscanner"
          >
            <ListItemIcon>
              <CenterFocusStrong />
            </ListItemIcon>
            <ListItemText primary="Scan QR Code" />
          </ListItem>

          {/* Member Login */}
          <ListItem
            button
            component={NavLink}
            exact
            activeStyle={activeNavStyle}
            to="/admin-records"
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Records" />
            {/* <Button className={classes.list}>Home</Button> */}
          </ListItem>
          {/* Member Sign up */}
          <ListItem
            button
            component={NavLink}
            exact
            activeStyle={activeNavStyle}
            to="/admin-register"
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Registered Admin" />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <>
      <div>
        <div>
          <AppBar
            position="fixed"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.title}
                >
                  IETI Marikina
                </Typography>
              </NavLink>
            </Toolbar>
          </AppBar>
        </div>

        {/* DRAWER START HERE */}
        <SwipeableDrawer
          anchor="left"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {/* <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}> */}
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {navMenu()}
          </div>
        </SwipeableDrawer>
      </div>
    </>
  );
}
// ALL MENU

// Administrator Login

// Home (admin Home)
// Scan QR Code
// Records
// Members
// Log out

// Member Login
// Home (member-user)
// Log out

// Guest
// Home (home page)
// Admin Login
// Members Login
// Member Sign Up
