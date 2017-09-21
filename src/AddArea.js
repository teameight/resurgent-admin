import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';

class AddArea extends Component {
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
		const formValues = {
			name: this.name.value,
			slug: this.slug.value,
			category: this.category.value,
			image: this.state.uploadedFileCloudinaryUrl,
			order: this.order.value
		}

		this.props.addArea(formValues);
		this.props.history.push({pathname: '/areas', ckey: this.props.match.params.ckey});
	}

	render() {
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
					<label>Area Image</label>
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
