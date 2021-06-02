import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import AddWaypoint from "./AddWaypoint";
import PostTrip from "./PostTrip";
import trekked_navbar from "./images/trekked_navbar_best.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

class CreateTrip extends React.Component {
  waypointsArray = [];

  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "DRIVING",
      origin: "",
      destination: "",
      waypoints: [],
      inputs: [],
      completed: false,
      name: "",
      start_date: null,
      arrival_date: null,
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.checkDriving = this.checkDriving.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.getWaypoint = this.getWaypoint.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);

    this.getName = this.getName.bind(this);
    this.getStart_date = this.getStart_date.bind(this);
    this.getArrival_date = this.getArrival_date.bind(this);

    this.autocomplete = null;

    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  directionsCallback(response) {
    console.log(response);

    if (response !== null && this.state.completed === false) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
          completed: true,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }

  checkDriving({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING",
      }));
  }

  getName(ref) {
    this.name = ref;
  }

  getStart_date(ref) {
    this.start_date = ref;
  }

  getArrival_date(ref) {
    this.arrival_date = ref;
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  getWaypoint(ref) {
    this.waypoints = ref;
    this.waypointsArray.push({ ref });
  }

  onClick() {

    if (this.origin.value !== "" && this.destination.value !== "") {

      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
        waypoints: this.waypointsArray.map((obj) => {
          return {
            location: obj.ref.value,
            stopover: true,
          };
        }),
      }));

      let tripObject = {
        name: this.name.value,
        start_location: this.origin.value,
        destination: this.destination.value,
        start_date: this.start_date.value,
        arrival_date: this.arrival_date.value,
        waypoints: this.waypointsArray.map((obj) => {
          return {
            location: obj.ref.value,
            stopover: true,
          };
        }),
      };
      PostTrip(tripObject);
    }
  }

  onMapClick(...args) {
    console.log("onClick args: ", args);
  }

  appendInput = () => {
    let newInput = `input-${this.state.inputs.length}`;
    this.setState({
      inputs: [...this.state.inputs, newInput],
    });
  };

  render() {
    return (
      <div>
        
      <div className="login-dark map">
        <div className="row">
          <div className="container col-4">
            <div className="create-trip">
              {/* <hr className='mt-0 mb-3' /> */}
              <div className="form-group">
                <lable htmlFor="STARTDATE" style={{"color": "#e6f5e6"}}>Start Date</lable>
                <br />
                <input
                  id="STARTDATE"
                    type="date"
                    className="form-control"
                  // className='form-control'
                  ref={this.getStart_date}
                  />
              </div>
              <div className="form-group">
                <lable htmlFor="ENDDATE" style={{"color": "#e6f5e6"}}>End Date</lable>
                <br />
                <input
                    id="ENDDATE"
                    className="form-control"
                  type="date"
                  // className='form-control'
                  ref={this.getArrival_date}
                  />
                </div>
                <br></br>
              <div className="form-group">
                <lable htmlFor="NAME" style={{"color": "#e6f5e6"}}>Trip Name</lable>
                <input
                  id="NAME"
                    type="text"
                    placeholder="Enter Trip Name..."
                  className="form-control"
                  ref={this.getName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="ORIGIN" style={{"color": "#e6f5e6"}}>Origin</label>
                <br />
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                  >
                  <input
                    id="ORIGIN"
                    type="text"
                    placeholder="Enter starting point..."
                    className="form-control"
                    ref={this.getOrigin}
                    />
                </Autocomplete>
              </div>

              <div className="form-group">
                <label htmlFor="DESTINATION" style={{"color": "#e6f5e6"}}>Destination</label>
                  <br />
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                  >
                  <input
                    id="DESTINATION"
                    type="text"
                    placeholder="Enter final destination..."
                    className="form-control"
                    ref={this.getDestination}
                    />
                </Autocomplete>
              </div>
              <br></br>
              <div id="waypoint-inputs">
                {this.state.inputs.map((input) => (
                  <AddWaypoint
                  getWaypoint={this.getWaypoint}
                  key={input}
                  id={input}
                  />
                  ))}
              </div>
              <div className="btn-group w-100" role="group" aria-label="Basic example">
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={() => this.appendInput()}
                >
                📍 Add Stop
              </button>
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={this.onClick}
                >
                🌲 Build Trip
              </button>
              </div>
            </div>
          </div>

          <div className="col-8">
              <div className="map-container">
              <GoogleMap
                // required
                id="direction-example"
                // required
                mapContainerStyle={{
                  height: "1000px",
                  width: "100%",
                }}
                // required
                zoom={4}
                // required
                center={{
                  lat: 37.6872,
                  lng: -97.3301,
                }}
                // optional
                onClick={this.onMapClick}
                // optional
                onLoad={(map) => {
                  console.log("DirectionsRenderer onLoad map: ", map);
                }}
                // optional
                onUnmount={(map) => {
                  console.log("DirectionsRenderer onUnmount map: ", map);
                }}
                >
                {this.state.destination !== "" && this.state.origin !== "" && (
                  <DirectionsService
                  options={{
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: this.state.travelMode,
                    waypoints: this.state.waypoints,
                    optimizeWaypoints: true,
                  }}
                  callback={this.directionsCallback}
                  />
                  )}

                {this.state.response !== null && (
                  <DirectionsRenderer
                  // required
                  options={{
                    directions: this.state.response,
                  }}
                  onLoad={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onLoad directionsRenderer: ",
                      directionsRenderer
                      );
                    }}
                    onUnmount={(directionsRenderer) => {
                      console.log(
                        "DirectionsRenderer onUnmount directionsRenderer: ",
                        directionsRenderer
                        );
                      }}
                      />
                      )}

              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
      {this.props.redirect ? <Redirect to='/'/> : null}
    </div>
    );
  }
}

export default React.memo(CreateTrip);
