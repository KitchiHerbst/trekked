import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    BrowserRouter,
    Redirect,
  } from "react-router-dom";
  import trekked_navbar from "./images/trekked_navbar_best.png";

  const Navbar = props => {

    return (
        <div>
            <nav
					className='navbar sticky-top navbar-expand-lg navbar-light'
					style={{ "background-color": "#e6f5e6" }}
				>
					<div className='container-fluid'>
						<a className='navbar-brand' href='...'>
							<img
								src={trekked_navbar}
								alt=''
								width='200'
								height='40'
								class='d-inline-block align-text-top'
							></img>
						</a>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNavDropdown'
							aria-controls='navbarNavDropdown'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div
							className='collapse navbar-collapse'
							id='navbarNavDropdown'
						>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<a className='nav-link' href='/Home'>
										Home
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='/Atlas'>
										Atlas
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='/Parks'>
										Parks
									</a>
								</li>
								<li className='nav-item'>
									<a
										className='nav-link'
										href='/Achievements'
									>
										Achievements
									</a>
								</li>
								<li className='nav-item dropdown'>
									<a
										className='nav-link dropdown-toggle'
										href='#'
										id='navbarDropdownMenuLink'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										Trips
									</a>
									<ul
										className='dropdown-menu'
										aria-labelledby='navbarDropdownMenuLink'
									>
										<li>
											<a
												className='dropdown-item'
												href='/Trips'
											>
												View all Trips
											</a>
										</li>
										<li>
											<a
												className='dropdown-item'
												href='/CreateTrip'
											>
												Create a Trip
											</a>
										</li>
									</ul>
								</li>
								
							</ul>
						</div>
						<form class="d-flex">
        					<button onClick={() => props.logoutHandler()} class="btn btn-outline-success" type="submit">🏕 Logout</button>
      					</form>
					</div>
				</nav>
        </div>
    )
  }

  export default Navbar