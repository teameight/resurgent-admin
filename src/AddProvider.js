import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AddProvider extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let keys = this.keys.value;
		keys = keys.split('_');
		let ckey = keys[0];
		let akey = keys[1];

		const formValues = {
			name: this.name.value,
			cost: this.cost.value,
			desc: this.desc.value,
			area: akey,
			image: this.image.value,
			order: this.order.value,
			ckey: ckey
		}

		this.props.addProvider(formValues);
		this.props.history.goBack();
	}

	render() {
		let ckey = 'c-1';
		let category = this.props.categories;

		return (
			<Col md={8} className="admin-screen">
				<h2>Add New Provider</h2>
				<form ref={(input) => this.providerForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Provider Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" placeholder="Provider Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsCost" className="control-label">Provider Token Cost</label>
						<input ref={(input) => this.cost = input} required id="formControlsCost" className="form-control" type="number" name="cost" placeholder="5" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsDesc" className="control-label">Provider Description</label>
						<textarea ref={(input) => this.desc = input} id="formControlsDesc" className="form-control" name="desc" placeholder="Provider Description" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsArea" className="control-label">Parent Area</label>
						<select ref={(input) => this.keys = input} id="formControlsArea" className="form-control" name="keys">
							{
								this.props.categories && (
									Object
										.keys(this.props.categories)
										.map( ckey =>
											<optgroup label={this.props.categories[ckey].name}>
												{
													this.props.categories[ckey]["areas"] && (
														Object
															.keys(this.props.categories[ckey]["areas"])
															.map( akey =>
																<option value={ckey + '_' + akey}>{this.props.categories[ckey]["areas"][akey].name}</option>
															)
													)
												}
											</optgroup>
										)
								)
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="formControlsImg" className="control-label">Provider Image Source</label>
						<input ref={(input) => this.image = input} id="formControlsImg" className="form-control" type="text" name="image" placeholder="img/providers/file.png" />
					</div>

					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Provider Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" placeholder="0" />
					</div>
					<button className="btn btn-primary" type="submit">Add Area</button>
				</form>
			</Col>
		)
	}
}

export default AddProvider;
