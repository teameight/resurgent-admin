import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class Category extends Component {
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
		let formValues = this.state.formValues;

		this.props.addCategory(formValues);
		this.props.history.goBack();
	}

	render() {
		const ckey = this.props.match.params.ckey;
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>Add New Category</h2>
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Category Name</label>
						<input id="formControlsName" className="form-control" type="text" name="name" placeholder="Category Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Category Slug (URL)</label>
						<input id="formControlsSlug" className="form-control" type="text" name="slug" placeholder="/category-name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Category Order</label>
						<input id="formControlsOrder" className="form-control" type="number" name="order" placeholder="0" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Add Category</button>
				</form>
			</Col>
		)
	}
}

export default Category;