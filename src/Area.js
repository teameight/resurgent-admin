import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';


class Area extends Component {
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
		const akey = this.props.location.state.akey;
		const formValues = {
			name: this.name.value,
			slug: this.slug.value,
			category: this.category.value,
			image: this.state.uploadedFileCloudinaryUrl,
			order: this.order.value
		}

		this.props.updateArea(akey, formValues);
		this.props.history.goBack();

	}

	render() {
		let akey = this.props.location.state.akey;
		let area = this.props.areas[akey];

		return (
			<div>
			{
				area && (
					<Col md={8} className="admin-screen">
						<h2>{area.name}</h2>
						<p>Edit some or all of this area's details</p>
						<form ref={(input) => this.areaForm = input } className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="form-group">
								<label htmlFor="formControlsName" className="control-label">Area Name</label>
								<input ref={(input) => this.name = input } id="formControlsName" className="form-control" type="text" name="name" defaultValue={area.name} placeholder="Area Name" />
							</div>
							<div className="form-group">
								<label htmlFor="formControlsSlug" className="control-label">Area Slug (URL)</label>
								<input ref={(input) => this.slug = input } id="formControlsSlug" className="form-control" type="text" name="slug" defaultValue={area.slug} placeholder="Area Slug" />
							</div>
							<div className="form-group">
								<label htmlFor="formControlsCategory" className="control-label">Parent Category</label>
								<select ref={(input) => this.category = input} id="formControlsCategory" className="form-control" name="category" defaultValue={area.category} >
									{
										this.props.categories && (
											Object
												.keys(this.props.categories)
												.map( ckey =>
													<option key={ckey} value={ckey}>{this.props.categories[ckey].name}</option>
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
									<img src={area.image} alt={area.name} />
								</div>
								 :
								<div>
									<img src={this.state.uploadedFileCloudinaryUrl} alt={area.name} />
								</div>
								}
							</Dropzone>
							<div className="form-group">
								<label htmlFor="formControlsOrder" className="control-label">Area Order (0, 1, 2, 3...)</label>
								<input ref={(input) => this.order = input } required id="formControlsOrder" className="form-control" type="number" name="order" defaultValue={area.order ? area.order : 0} placeholder="0" />
							</div>
							<button className="btn btn-primary" type="submit">Update</button>
						</form>
					</Col>
				)
			}
			</div>
		)
	}
}

export default Area;
