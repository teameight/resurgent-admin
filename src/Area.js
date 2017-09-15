import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class Area extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();
		let ckey = this.props.location.state.ckey;
		const akey = this.props.location.state.akey;
		const formValues = {
			name: this.name.value,
			slug: this.slug.value,
			category: this.category.value,
			image: this.image.value,
			order: this.order.value
		}

		this.props.updateArea(ckey, akey, formValues);
		this.props.history.goBack();

	}

	render() {
		let ckey = this.props.location.state.ckey;
		let akey = this.props.location.state.akey;
		let category = this.props.categories[ckey];
		let area = this.props.categories[ckey]["areas"][akey];

		return (
			<div>
			{
				area && (
					<Col md={8} className="admin-screen">
						<h2>{area.name}</h2>
						<p>Edit some or all of this area's details</p>
						<form ref={(input) => this.areaForm = input } className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="form-group">
								<label htmlFor="formControlsName" className="control-label">Area Name</label>
								<input ref={(input) => this.name = input } id="formControlsName" className="form-control" type="text" name="name" defaultValue={area.name} placeholder="Area Name" />
							</div>
							<div className="form-group">
								<label htmlFor="formControlsSlug" className="control-label">Area Slug (URL)</label>
								<input ref={(input) => this.slug = input } id="formControlsSlug" className="form-control" type="text" name="slug" defaultValue={area.slug} placeholder="Area Slug" />
							</div>
							<div className="form-group">
								<label htmlFor="formControlsCategory" className="control-label">Parent Category</label>
								<select ref={(input) => this.category = input} id="formControlsCategory" className="form-control" name="category" defaultValue={area.category ? area.category : ckey} >
									{
										this.props.categories && (
											Object
												.keys(this.props.categories)
												.map( ckey =>
													<option value={ckey}>{this.props.categories[ckey].name}</option>
												)
										)
									}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="formControlsImg" className="control-label">Area Image Source</label>
								<input ref={(input) => this.image = input } id="formControlsImg" className="form-control" type="text" name="image" defaultValue={area.image} placeholder="Area Image Source" />
							</div>
							<div className="form-group">
								<label htmlFor="formControlsOrder" className="control-label">Area Order (0, 1, 2, 3...)</label>
								<input ref={(input) => this.order = input } required id="formControlsOrder" className="form-control" type="number" name="order" defaultValue={area.order ? area.order : 0} placeholder="0" />
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
			</div>
		)
	}
}

export default Area;
