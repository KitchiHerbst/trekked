import React from "react";
import ParkCard from "./ParkCard";
import trekked_navbar from "./images/trekked_navbar_best.png";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Link,
	BrowserRouter,
	Redirect,
} from "react-router-dom";

export default class Atlas extends React.Component {
	constructor(props) {
		super();

		this.state = {
			parks: [],
			redirect: false,
			atlasName: "",
		};
	}

	componentDidMount() {
		fetch("http://localhost:3001/api/v1/wishlists", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
		})
			.then((response) => response.json())
			.then((parks) => {
				this.setState({
					parks: parks,
				});
			});

		fetch("http://localhost:3001/api/v1/atlas", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage.token}`,
			},
		})
			.then((response) => response.json())
			.then((atlas) => {
				this.setState({
					atlasName: atlas.name,
				});
			});
	}

	logoutHandler = () => {
		this.props.logout();
		this.setState({
			redirect: true,
		});
	};

	deleteFromAtlas = (parkId) => {
		fetch(`http://localhost:3001/api/v1/wishlists/${parkId}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
				authorization: `Bearer ${localStorage.token}`,
			},
		});
		this.setState({
			parks: this.state.parks.filter(park => park.id !== parkId)
		})
	}

	render() {
		return (
			<div>
				<div className='park-container'>
					{this.state.parks.map((park) => {
						return (
							<ParkCard
								park={park}
// 								addToVisited={this.addToVisited}
// 								addToAtlas={this.addToAtlas}
								deleteFromAtlas={this.deleteFromAtlas}
							/>
						);
					})}
				</div>
				{this.props.redirect ? <Redirect to='/' /> : null}
			</div>
		);
	}
}
