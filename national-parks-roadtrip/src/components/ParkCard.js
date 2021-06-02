import React from "react";

export default class ParkCard extends React.Component {
	
	
	constructor(props) {
		super();
	}

	deleteButton = () => {
		if (this.props.deleteFromAtlas) {
			return	<button
					onClick={() => this.props.deleteFromAtlas(this.props.park.id)}
					type='button'
					className='btn btn-outline-danger'
					>
					Remove
					</button>
		} else {
			return null;
		}
	}

	render() {
		return (
			<div className='card' style={{ width: "18rem" }}>
				<div className='card-body'>
					<img
						src={this.props.park.imageUrl}
						className='card-img-top'
						alt='...'
					></img>
					<br></br>
					<br></br>
					<h5 className='card-title'>{this.props.park.fullName}</h5>
					<h6 className='card-title'>
						{this.props.park.city}, {this.props.park.state}
					</h6>
					<p className='card-text'>{this.props.park.description}</p>
					{this.props.addToAtlas && this.props.addToVisited ? (
						<div
							className='btn-group'
							role='group'
							aria-label='Basic checkbox toggle button group'
						>
							<input
								onChange={() =>
									this.props.addToAtlas(this.props.park.id)
								}
								type='checkbox'
								className='btn-check'
								id={`${this.props.park.fullName}1`}
								name='atlasAdd'
								autocomplete='off'
								checked={null}
							></input>
							<label
								className='btn btn-outline-primary'
								for={`${this.props.park.fullName}1`}
							>
								Add to Atlas
							</label>

							<input
								onChange={() =>
									this.props.addToVisited(this.props.park.id)
								}
								type='checkbox'
								className='btn-check'
								id={`${this.props.park.fullName}2`}
								name='visitedAdd'
								autocomplete='off'
								checked={null}
							></input>
							<label
								className='btn btn-outline-primary'
								for={`${this.props.park.fullName}2`}
							>
								Add to Visited Parks
							</label>
						</div>
					) : null}
					{this.deleteButton()}
				</div>
			</div>
		);
	}
}
