import React from "react";
import ParkCard from "./ParkCard";
import trekked_navbar from "./images/trekked_navbar_best.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

export default class Parks extends React.Component {
	constructor(props) {
		super();

		this.state = {
			parks: [],
			filteredParks: [],
		};
	}

	componentDidMount() {
		fetch("http://localhost:3001/api/v1/parks")
			.then((response) => response.json())
			.then((parks) => {
				this.setState({
					parks: parks,
					filteredParks: parks,
				});
			});
	}

	addToVisited = (parkId) => {
		fetch("http://localhost:3001/api/v1/visited_parks", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"accept": "application/json",
				"authorization": `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify(parkId),
		});
	};

	addToAtlas = (parkId) => {
		fetch("http://localhost:3001/api/v1/wishlists", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
				authorization: `Bearer ${localStorage.token}`,
			},
			body: JSON.stringify(parkId),
		});
	};

	filterParks = (searchInput) => {
		let filteredParks = this.state.parks.filter((park) =>
			park.fullName.toLowerCase().includes(searchInput.target.value.toLowerCase())
		);
		this.setState({
			filteredParks: filteredParks,
		});
  };
  
  sortByState = (searchInput) => {
    let filteredByState = this.state.parks.filter((park) =>
      park.state.toLowerCase().includes(searchInput.target.value.toLowerCase())
    )
    this.setState({
      filteredParks: filteredByState
    })
  }

  sortByCity = (searchInput) => {
    let filteredByCity = this.state.parks.filter((park) => 
      park.city.toLowerCase().includes(searchInput.target.value.toLowerCase())
    )
    this.setState({
      filteredParks: filteredByCity
    })
  }

	render() {
		return (
			<div className="login-dark">
				<div className='form-control-lg'>

					<div className='row g-3'>
						<div className='col-sm-6'>
							<input
								type='text'
								className='form-control'
								placeholder='Search Parks by Name'
                aria-label='City'
                onChange={(e) => {
                  this.filterParks(e);
                }}
							></input>
						</div>
						<div className='col-sm'>
							<input
								type='text'
								className='form-control'
								placeholder='Search Parks by State (ex. TX)'
                aria-label='State'
                onChange={(e) => this.sortByState(e)}
							></input>
						</div>
						<div className='col-sm'>
							<input
								type='text'
								className='form-control'
								placeholder='Search Parks by City'
                aria-label='Zip'
                onChange={(e) => this.sortByCity(e)}
							></input>
						</div>
					</div>
				</div>

				<div className='park-container'>
					{this.state.filteredParks.map((park) => {
						return (
							<ParkCard
								park={park}
								addToVisited={this.addToVisited}
								addToAtlas={this.addToAtlas}
								deleteFromAtlas={this.deleteFromAtlas}
							/>
						);
					})}
				</div>
        {this.props.redirect ? <Redirect to='/'/> : null}
			</div>
		);
	}
}
