import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AddArea extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formValues = {
			name: this.name.value,
			slug: this.slug.value,
			category: this.category.value,
			image: this.image.value,
			order: this.order.value
		}

		this.props.addArea(formValues);
		this.props.history.push({pathname: '/areas', ckey: this.props.match.params.ckey});
	}

	render() {
		const ckey = this.props.match.params.ckey;
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>Add New Area</h2>
				<form ref={(input) => this.areaForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Area Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" placeholder="Area Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Area Slug (URL)</label>
						<input ref={(input) => this.slug = input} required id="formControlsSlug" className="form-control" type="text" name="slug" placeholder="/area-name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsCategory" className="control-label">Parent Category</label>
						<select ref={(input) => this.category = input} id="formControlsCategory" className="form-control" name="category" onChange={this.handleChange}>
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
						<input ref={(input) => this.image = input} id="formControlsImg" className="form-control" type="text" name="image" placeholder="img/areas/file.png" onChange={this.handleChange} />
					</div>

					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Area Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" placeholder="0" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Add Area</button>
				</form>
			</Col>
		)
	}
}

export default AddArea;
