import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Transaction from './Transaction';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';

class Provider extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);

		this.state = {
			uploadedFileCloudinaryUrl: ''
		}
	}

	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});

		this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
													.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
													.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url
				});
			}
		});
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
			email: this.email.value,
			cost: this.cost.value,
			desc: this.desc.value,
			area: newArea,
			image: this.state.uploadedFileCloudinaryUrl,
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
    const transactions = this.props.transactions;

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
						<label htmlFor="formControlsEmail" className="control-label">Provider Email</label>
						<input ref={(input) => this.email = input} required id="formControlsEmail" className="form-control" type="email" name="email" defaultValue={provider.email} placeholder="provider@email.com" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsTokens" className="control-label">Provider Token Cost</label>
						<input ref={(input) => this.cost = input} id="formControlsTokens" className="form-control" type="text" name="cost" defaultValue={provider.cost} placeholder="Provider Token Cost" />
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
						<label>Area Image</label>
						<Dropzone
							className="dropzone-box"
							multiple={false}
							accept="image/*"
							onDrop={this.onImageDrop}>
							<p>Drop an image or click to select a file to upload.</p>
							{this.state.uploadedFileCloudinaryUrl === '' ?
							<div>
								<img src={provider.image} />
							</div>
							 :
							<div>
								<img src={this.state.uploadedFileCloudinaryUrl} />
							</div>
							}
						</Dropzone>
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
            .filter((current) => transactions[current].provider === pkey)
            .map(key => <Transaction keyId={key} pname={provider.name} cname={category.name} aname={area.name} details={transactions[key]} users={this.props.users} />)
        }
			</Col>
		)
	}
}

export default Provider;
