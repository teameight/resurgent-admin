import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class Category extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(e) {
		e.preventDefault();
		const ckey = this.props.match.params.ckey;
		let formValues = {
			name: this.name.value,
			slug: this.slug.value,
			order: this.order.value
		}

		this.props.updateCategory(ckey, formValues);
		this.props.history.goBack();
	}

	render() {
		const ckey = this.props.match.params.ckey;
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>{category[ckey].name}</h2>
				<form ref={(input) => this.catFomr = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Category Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" defaultValue={category[ckey].name} placeholder="Category Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsSlug" className="control-label">Category Slug (URL)</label>
						<input ref={(input) => this.slug = input} required id="formControlsSlug" className="form-control" type="text" name="slug" defaultValue={category[ckey].slug} placeholder="Category Slug" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Category Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" defaultValue={category[ckey].order ? category[ckey].order : 0} placeholder="0" />
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