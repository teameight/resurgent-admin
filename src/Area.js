import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class Area extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			formValues: {}
		}
	}

	handleChange(e) {
		e.preventDefault();
		let formValues = this.state.formValues;
		let name = e.target.name;
		let value = e.target.value;

		formValues[name] = value;

		this.setState({formValues})
	}

	handleSubmit(e) {
		e.preventDefault();
		const ckey = this.props.location.state.ckey;
		const akey = this.props.location.state.akey;
		let formValues = this.state.formValues;

		this.props.updateArea(ckey, akey, formValues);
	}

	render() {
		const ckey = this.props.location.state.ckey;
		const akey = this.props.location.state.akey;
		let category = this.props.categories[ckey];
		let area = category["areas"][akey];

		return (
			<Col md={8} className="admin-screen">
				<h2>{area.name}</h2>
				<p>Edit some or all of this area's details</p>
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Area Name</label>
						<input id="formControlsName" className="form-control" type="text" name="name" defaultValue={area.name} placeholder="Area Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Area Slug (URL)</label>
						<input id="formControlsSlug" className="form-control" type="text" name="slug" defaultValue={area.slug} placeholder="Area Slug" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsDesc" className="control-label">Area Description</label>
						<textarea id="formControlsDesc" className="form-control" name="desc" defaultValue={area.desc} placeholder="Area Description" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsImg" className="control-label">Area Image Source</label>
						<input id="formControlsImg" className="form-control" type="text" name="image" defaultValue={area.image} placeholder="Area Image Source" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>
				<h3>Providers in this Area</h3>
				<p>Select a provider to edit.</p>
				<ul>
				{
					Object
						.keys(area["providers"])
						.map( pkey =>
							<li><Link key={pkey} to={{ pathname: '/providers/' + pkey, state: { ckey: ckey, akey: akey, pkey: pkey } }}>{area["providers"][pkey].name}</Link></li>
						)
				}
				</ul>
			</Col>
		)
	}
}

export default Area;
