import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Transaction from './Transaction';

class Provider extends Component {
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
		const pkey = this.props.location.state.pkey;
		let formValues = this.state.formValues;

		this.props.updateProvider(ckey, akey, pkey, formValues);
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
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Provider Name</label>
						<input id="formControlsName" className="form-control" type="text" name="name" defaultValue={provider.name} placeholder="Provider Name" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsTokens" className="control-label">Provider Token Cost</label>
						<input id="formControlsTokens" className="form-control" type="text" name="tokens" defaultValue={provider.tokens} placeholder="Provider Token Cost" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsDesc" className="control-label">Provider Description</label>
						<textarea id="formControlsDesc" className="form-control" name="desc" defaultValue={provider.desc} placeholder="Provider Description" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsImg" className="control-label">Provider Image Source</label>
						<input id="formControlsImg" className="form-control" type="text" name="image" defaultValue={provider.image} placeholder="Provider Image Source" onChange={this.handleChange} />
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
