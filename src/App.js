import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";

import MemberSignup from "./Member_signup";
import MemberLogin from "./Member_login";
import MemberUser from "./Member_user";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import AdminScan from "./AdminScan";
import adminarecord from "./AdminRecords";
import adminregister from "./AdminRegister";
import adminList from "./AdminList";
import adminModify from "./AdminModify";
import Cookies from "js-cookie";
import ScanTest from "./ScanQRTest";

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
  const adminLocation = Cookies.get("adminLocation");

  return (
    <>
      <div className="App">
        <Router>
          {/* {adminLocation ? <NavbarAdmin /> : <Navbar />} */}
          <Navbar login="true" />
          {/* <Header /> */}
          <div className="main-body">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/ietimarikina" exact component={Home}></Route>
              <Route path="/member-signup" component={MemberSignup}></Route>
              <Route path="/member-login" component={MemberLogin}></Route>
              <Route path="/member-user" component={MemberUser}></Route>
              <Route path="/admin-login" component={AdminLogin}></Route>

              <Route path="/administrator" component={AdminHome}></Route>
              <Route path="/adminscanner" component={AdminScan}></Route>
              <Route path="/admin-records" component={adminarecord}></Route>
              <Route path="/admin-register" component={adminregister}></Route>
              <Route path="/admin-list" component={adminList}></Route>
              <Route path="/admin-modify" component={adminModify}></Route>
              <Route path="/testqrscanner" component={ScanTest}></Route>
              <Route component={Errlocation} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
