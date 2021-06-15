import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./AdminHome";

import MemberSignup from "./Member_signup";

// NavBar
import Navbar from "./Navbar";
import NavbarAdmin from "./Navbar_admin";

import { globalconfig } from "./_globalConfig";

function Errlocation() {
  return (
    <>
      <div style={{ marginTop: 50 }}></div>
      <div style={{ textAlign: "center" }}>
        <h1>Oops! Page not found!</h1>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div className="App">
        <Router>
          {/* {adminLocation ? <NavbarAdmin /> : <Navbar />} */}
          <Navbar login="true" />
          {/* <Header /> */}
          <div className="main-body">
            <Switch>
              {/* <Route path="/administrator" exact component={Home}></Route> */}

              <Route component={Errlocation} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
