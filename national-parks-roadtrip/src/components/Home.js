import React, { useState, useEffect } from "react";
import trekked_navbar from "./images/trekked_navbar_best.png";
import first_park from "./images/first_park.png";
import second_park from "./images/second_park.png";
import third_park from "./images/third_park.png";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // BrowserRouter,
  Redirect,
} from "react-router-dom";
import ParkCard from "./ParkCard";

const Home = (props) => {
  const [user, setUser] = useState({});
  const [userEditForm, setUserEditForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [trip, setTrip] = useState({});
  const [park, setPark] = useState({})
  const [badge, setBadge] = useState([])
  
  useEffect( () => {
    fetch('http://localhost:3001/api/v1/mostparks',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'Authorization': `Bearer ${localStorage.token}`,
      }
    })
    .then(res => res.json())
    .then(num => {
      if(num >= 3){
        setBadge([third_park, second_park, first_park])
      }else if(num === 2){
        setBadge([second_park, first_park])
      }else if(num === 1){
        setBadge([first_park])
      }
    })
  }, user)

  useEffect( () => {
    fetch("http://localhost:3001/api/v1/randompark")
    .then(res => res.json())
    .then(park => setPark(park))
  }, user)

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/upcomingtrip", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'Authorization': `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((upcomingTrip) => setTrip(upcomingTrip));
  }, user);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'Authorization': `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((currentUser) => {
        setUser(currentUser);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setProfilePicture(currentUser.profilePicture);
        setPassword(currentUser.password);
        setConfirmPassword(currentUser.password);
      });
  }, user);

  

  const editFormHandler = () => {
    if (userEditForm === false) {
      return setUserEditForm(true);
    } else if (
      username !== "" &&
      email !== "" &&
      profilePicture !== "" &&
      password === confirmPassword
    ) {
      fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json",
          'Authorization': `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          profilePicture: profilePicture,
          password: password,
        })
      })
      // .then(res => res.json())
      // .then(newUser => setUser(newUser))
      setUserEditForm(false);
    }
  };


  return (
    <div>
      <div className="login-dark">
        <div className="row">
          <div className="col-4">
            <h5 style={{"color": "#e6f5e6"}}>Highest Badge</h5>
            {(badge !== []) ?
               badge.map(b => <img src={b} />)
              :
              null
          }
          </div>
          <div className="col-4">
            {trip !== null ? (
              <div>
                <h4 style={{"color": "#e6f5e6"}}>Upcoming Trip</h4>
                <div className="card" style={{ width: "18rem" }}>
                  <h5>{trip.name}</h5>
                  <h6>
                    {trip.start_location} to {trip.destination}
                  </h6>
                  <div>
                    {trip.waypoints === false ||
                    trip.waypoints === undefined ||
                    trip.waypoints.length === 0 ? null : (
                      <div>
                        <h5>Waypoints:</h5>
                        {trip.waypoints.map((waypoint) => (
                          <h6>{waypoint.split('"')[3]}</h6>
                        ))}
                      </div>
                    )}
                  </div>
                  <p>Start and Arrival Dates:</p>
                  <h6>
                    {trip.start_date} through {trip.arrival_date}
                  </h6>
                </div>
              </div>
            ) : (
              <div>
                <h5>No Upcoming Trips</h5>
              </div>
            )}
            <div>
              <h4 style={{"color": "#e6f5e6"}}>Try this park out!</h4>
              <ParkCard park={park} />
            </div>
          </div>
          <div className="col-4">
            {userEditForm === false ? (
              <div className="card" style={{ width: "14rem" }}>
                <img src={profilePicture} className="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{username}</h5>
                  <p class="card-text">{email}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => editFormHandler()}
                  >
                    Edit Account
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <h3>Edit Account</h3>
                <label forhtml="edit-username">Username</label>
                <input
                  id="edit-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label forhtml="edit-email">Email</label>
                <input
                  id="edit-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label forhtml="edit-profilePicture">Profile Picture</label>
                <input
                  id="edit-profilePicture"
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
                <label forhtml="edit-password">Password</label>
                <input
                  id="edit-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label forhtml="edit-confirm-password">Confirm Password</label>
                <input
                  id="edit-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={() => editFormHandler()}>
                  Confirm Changes
                </button>
              </div>
            )}
            <iframe
              src="https://calendar.google.com/calendar/embed?src=s855dk1ehogtsdvm3n71ptg894%40group.calendar.google.com&ctz=America%2FChicago"
              style={{ border: "0" }}
              width="225"
              height="300"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
      {props.redirect ? <Redirect to="/" /> : null}
    </div>
  );
};

export default Home;
