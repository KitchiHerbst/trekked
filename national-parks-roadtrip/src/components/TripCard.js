import React from 'react'

const TripCard = props => {

    return(
        <div className='card' >
            <h3>{props.trip.name}</h3>
            <h4>{props.trip.start_location} - {props.trip.destination}</h4>
            <h5>Waypoints:</h5>
            {props.trip.waypoints.map(waypoint => <p>{waypoint.split('"')[3]}</p>)}
            <h5>Start and Arrival Dates:</h5>
            <h5>{props.trip.start_date} - {props.trip.arrival_date}</h5>
        </div>
    )
}

export default TripCard