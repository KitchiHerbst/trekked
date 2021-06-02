import React from "react";

const TripSearchBar = (props) => {

    const submitHandler = e => {
        e.preventDefault()
        props.getDirections(e.target[0].value, e.target[1].value)
    }

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">
            Origin
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">
            Destination
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <button className='btn btn-primary'>Get Directions</button>
      </form>
    </div>
  );
};

export default TripSearchBar;
