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
		const ckey = this.props.match.params.ckey;
		let formValues = this.state.formValues;

		this.props.updateCategory(ckey, formValues);
	}

	render() {
		const ckey = this.props.match.params.ckey;
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>{category[ckey].name}</h2>
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Category Name</label>
						<input id="formControlsName" className="form-control" type="text" name="name" defaultValue={category[ckey].name} placeholder="Category Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Category Slug (URL)</label>
						<input id="formControlsSlug" className="form-control" type="text" name="slug" defaultValue={category[ckey].slug} placeholder="Category Slug" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>
				<h3>Areas in this Category</h3>
				<ul>
				{
					category[ckey]["areas"] && (
					Object
						.keys(category[ckey]["areas"])
						.map( akey =>
							<li><Link key={akey} to={{ pathname: '/areas/' + akey, state: { ckey: ckey, akey: akey } }}>{category[ckey]["areas"][akey].name}</Link></li>
						)
					)
				}
				</ul>
			</Col>
		)
	}
}

export default Category;