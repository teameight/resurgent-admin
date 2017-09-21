import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';

class AddProvider extends Component {
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
		let keys = this.keys.value;
		keys = keys.split('_');
		let ckey = keys[0];
		let akey = keys[1];

		const formValues = {
			name: this.name.value,
			email: this.email.value,
			cost: this.cost.value,
			desc: this.desc.value,
			area: akey,
			image: this.state.uploadedFileCloudinaryUrl,
			order: this.order.value,
			ckey: ckey
		}

		this.props.addProvider(formValues);
		this.props.history.goBack();
	}

	render() {
		return (
			<Col md={8} className="admin-screen">
				<h2>Add New Provider</h2>
				<form ref={(input) => this.providerForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">Provider Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" placeholder="Provider Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsEmail" className="control-label">Provider Email</label>
						<input ref={(input) => this.email = input} required id="formControlsEmail" className="form-control" type="email" name="email" placeholder="provider@email.com" />
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
					<label>Provider Image</label>
					<Dropzone
						className="dropzone-box"
						multiple={false}
						accept="image/*"
						onDrop={this.onImageDrop}>
						<p>Drop an image or click to select a file to upload.</p>
						{this.state.uploadedFileCloudinaryUrl === '' ? null :
						<div>
							<img src={this.state.uploadedFileCloudinaryUrl} alt="Uploaded img" />
						</div>
						}
					</Dropzone>
					<div className="form-group">
						<label htmlFor="formControlsOrder" className="control-label">Provider Order (0, 1, 2, 3...)</label>
						<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" placeholder="0" />
					</div>
					<button className="btn btn-primary" type="submit">Add Provider</button>
				</form>
			</Col>
		)
	}
}

export default AddProvider;
