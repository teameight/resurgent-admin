import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AddCategory extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formValues = {
			name: this.name.value,
			slug: this.slug.value,
			order: this.order.value
		}

		this.props.addCategory(formValues);
		this.props.history.goBack();
	}

	render() {
		const ckey = this.props.match.params.ckey;
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>Add New Category</h2>
				<form ref={(input) => this.categoryForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Category Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" placeholder="Category Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Category Slug (URL)</label>
						<input ref={(input) => this.slug = input} required id="formControlsSlug" className="form-control" type="text" name="slug" placeholder="/category-name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Category Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" placeholder="0" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Add Category</button>
				</form>
			</Col>
		)
	}
}

export default AddCategory;