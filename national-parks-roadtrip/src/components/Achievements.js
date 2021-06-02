import React from "react";
import first_park from "./images/first_park.png";
import second_park from "./images/second_park.png";
import third_park from "./images/third_park.png";
import ParkCard from './ParkCard.js'
import {
  
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

class Achievements extends React.Component {
    //badges will be an array of images
    state={
        parks: [],
        badges: []
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/api/v1/visited_parks',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(visitedParks => this.setState({parks: visitedParks}))
    }


  render() {
    return (
      <section >
        <div className="park-container">
          <div className="col">
            <h4 style={{ "color": "#e6f5e6" }}>Badges</h4>
                <div className="table">
                  <ul id="horizontal-list">
                {(this.state.parks.length >= 3) ?
                  <li><img src={third_park}></img></li>
                :
                null
                }
                {(this.state.parks.length >= 2) ?
                  <li><img src={second_park}></img></li>
                :
                null
                }
                {(this.state.parks.length >= 1) ?
                  <li><img src={first_park}></img></li> 
                :
                null
                }
                </ul>
              </div>
          </div>
        </div>
            <div className="park-container">
              {/* <h4 style={{"color": "#e6f5e6"}}>Visited Parks</h4> */}
              {this.state.parks.map(park => <ParkCard park={park}/>)}
            </div>
        {this.props.redirect ? <Redirect to='/'/> : null}
      </section>
    );
  }
}

export default Achievements;
