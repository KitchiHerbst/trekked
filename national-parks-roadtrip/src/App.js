// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import Home from "./components/Home";
import Trips from "./components/Trips.js";
import Parks from "./components/Parks";
import Achievements from "./components/Achievements";
import Atlas from "./components/Atlas";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import CreateTrip from "./components/CreateTrip";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = {
    trips: [],
    redirect: false,
    homeRedirect: false,
    errors: []
  };

  loginHandler = (user) => {
    fetch(`http://localhost:3001/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((loggedUser) => {
        if (loggedUser.token !== undefined) {
          localStorage.token = loggedUser.token;
          this.setState({
            homeRedirect: true,
          });
        }else{
          this.setState({
            errors: ['Incorrect Username or Password']
          })
        }
      });
  };

  logoutHandler = () => {
    localStorage.clear();
    this.setState({
      redirect: true,
    });
  };

  
  //fetch to get all the trips associated to a specific user
  signUpHandler = (newUser) => {
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((loggedUser) => {
        if(loggedUser.token !== undefined){
          localStorage.token = loggedUser.token;
          this.createNewUserAtlas();
          this.setState({
            homeRedirect: true,
          });
        }
        // else{
        //   console.log(loggedUser)
        // }
      });
  };

  createNewUserAtlas = () => {
    fetch("http://localhost:3001/api/v1/atlas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${localStorage.token}`,
      },
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar logoutHandler={this.logoutHandler} />
          <Switch>
            <Route path="/Achievements">
              <Achievements redirect={this.state.redirect} />
            </Route>
            <Route path="/Signup">
              <SignUp
                signUpHandler={this.signUpHandler}
                redirect={this.state.homeRedirect}
                errors={this.state.errors}
              />
            </Route>
            <Route exact path="/">
              <Login
                loginHandler={this.loginHandler}
                redirect={this.state.homeRedirect}
                errors={this.state.errors}
              />
            </Route>
            <Route exact path="/Home">
              <Home
                getUsersTrips={this.getUsersTrips}
                redirect={this.state.redirect}
              />
            </Route>
            <Route path="/Trips">
              <Trips trips={this.state.trips} redirect={this.state.redirect} />
            </Route>
            <Route path="/CreateTrip">
              <CreateTrip redirect={this.state.redirect} />
            </Route>
            <Route path="/Parks">
              <Parks redirect={this.state.redirect} />
            </Route>
            <Route path="/Atlas">
              <Atlas redirect={this.state.redirect} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
