import React from "react";
import {
	// GoogleMap,
	// LoadScript,
	// DirectionsService,
	// DirectionsRenderer,
	Autocomplete,
} from "@react-google-maps/api";

const AddWaypoint = (props) => {
	return (
		<div className='form-group'>
			<label htmlFor='Waypoint'>Waypoint</label>
			<br />
			<Autocomplete
			// onLoad={this.onLoad}
			// onPlaceChanged={this.onPlaceChanged}
			>
                <input
                    // id='WAYPOINT'
					type='text'
					placeholder='Waypoint'
                    className='form-control'
                    ref={props.getWaypoint}
				/>
			</Autocomplete>
		</div>
	);
};

export default AddWaypoint;
