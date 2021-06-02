import React from "react";
import TripCard from "./TripCard";
import trekked_navbar from "./images/trekked_navbar_best.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

const removeDash = (date) => {
  // console.log(date)
  let newDate = date.split("-").join("");
  return newDate;
};

let today = new Date();

let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = yyyy + mm + dd;

class Trips extends React.Component {
  
  state = {
    trips: [],
  };

  componentDidMount() {
    // console.log(localStorage.token)
    fetch(`http://localhost:3001/api/v1/trips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((tripData) => this.setState({ trips: tripData }));
  }
  render() {
    return (
      <div>
        <div className="login-dark">>
          <div className="row">
            <div className="col-6">
              <h4 style={{"color": "#e6f5e6"}}>Past Trips</h4>
              {this.state.trips.map((trip) =>
                removeDash(trip.start_date) < today ? (
                  <TripCard trip={trip} key={trip.id} />
                ) : null
              )}
            </div>
            <div className="col-6">
              <h4 style={{"color": "#e6f5e6"}}>Upcoming Trips</h4>
              {this.state.trips.map((trip) =>
                removeDash(trip.start_date) > today ? (
                  <TripCard trip={trip} key={trip.id}/>
                ) : null
              )}
            </div>
          </div>
        </div>
        {this.props.redirect ? <Redirect to='/'/> : null}
      </div>
    );
  }
}

export default Trips;
