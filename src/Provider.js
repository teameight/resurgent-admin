import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Transaction from './Transaction';

class Provider extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const ckey = this.props.location.state.ckey;
		const akey = this.props.location.state.akey;
		const pkey = this.props.location.state.pkey;
		let keys = this.keys.value;
		keys = keys.split('_');
		let newCat = keys[0];
		let newArea = keys[1];

		const formValues = {
			name: this.name.value,
			cost: this.cost.value,
			desc: this.desc.value,
			area: newArea,
			image: this.image.value,
			order: this.order.value,
			category: newCat
		}

		this.props.updateProvider(ckey, akey, pkey, formValues);
		this.props.history.goBack();

	}

	render() {
		const ckey = this.props.location.state.ckey;
		const akey = this.props.location.state.akey;
		let pkey = this.props.location.state.pkey;
		let category = this.props.categories[ckey];
		let area = category["areas"][akey];
		let provider = area["providers"][pkey];

		const userId = "user-1";
		//  TODO: filter these by this provider key, not just display all of user 1. Also need to be able to disable, and/or refund
    const transactions = this.props.transactions[userId];

		const filterTransactions = (pkey) => {
			return Object.keys(transactions).filter((key) => transactions[key].provider === pkey )
		}

		const filteredTransactions = filterTransactions(pkey);


		return (
			<Col md={8} className="admin-screen">
				<h2>{provider.name}</h2>
				<p>Edit some or all of this provider's details</p>
				<form ref={(input) => this.providerForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Provider Name</label>
						<input ref={(input) => this.name = input} id="formControlsName" className="form-control" type="text" name="name" defaultValue={provider.name} placeholder="Provider Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsTokens" className="control-label">Provider Token Cost</label>
						<input ref={(input) => this.cost = input} id="formControlsTokens" className="form-control" type="text" name="tokens" defaultValue={provider.tokens} placeholder="Provider Token Cost" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsDesc" className="control-label">Provider Description</label>
						<textarea ref={(input) => this.desc = input} id="formControlsDesc" className="form-control" name="desc" defaultValue={provider.desc} placeholder="Provider Description" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsArea" className="control-label">Parent Area</label>
						<select ref={(input) => this.keys = input} id="formControlsArea" defaultValue={ckey + '_' + akey} className="form-control" name="area">
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
						<input ref={(input) => this.image = input} id="formControlsImg" className="form-control" type="text" name="image" defaultValue={provider.image} placeholder="Provider Image Source" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Provider Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" defaultValue={provider.order ? provider.order : 0} placeholder="0" />
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>

				<h3 className="instruction">{provider.name} Transaction History</h3>
				{
					// TODO: Filter these to only show current provider transactions
          Object
            .keys(transactions)
            .map(key => <Transaction keyId={key} pname={provider.name} cname={category.name} aname={area.name} details={transactions[key]} users={this.props.users} />)
        }
			</Col>
		)
	}
}

export default Provider;
