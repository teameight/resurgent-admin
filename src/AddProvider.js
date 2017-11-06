import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { EditorState, convertToRaw, convertFromRaw, convertFromHtml, ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';

class AddProvider extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);

		this.state = {
			uploadedFileCloudinaryUrl: '',
			editorState: EditorState.createEmpty()
		}

		this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
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
			email: this.email.value,
			cost: this.cost.value,
			desc: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
			area: this.area.value,
			image: this.state.uploadedFileCloudinaryUrl,
			order: this.order.value
		}

		this.props.addProvider(formValues);
		this.props.history.goBack();
	}

	render() {
		const { editorState } = this.state;

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
						<input ref={(input) => this.cost = input} required id="formControlsCost" className="form-control" type="text" name="cost" placeholder="5" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsDesc" className="control-label">Provider Description</label>
								<Editor
									name="formControlsDesc"
									editorState={editorState}
								  toolbarClassName="toolbarClassName"
								  wrapperClassName="wrapperClassName"
								  editorClassName="editorClassName"
								  onEditorStateChange={this.onChange}
								  ref={(input) => this.desc = input}
								/>
					</div>
					<div className="form-group">
						<label htmlFor="formControlsArea" className="control-label">Parent Area</label>
						<select ref={(input) => this.area = input} id="formControlsArea" className="form-control" name="keys">
							{
								this.props.categories && (
									Object
										.keys(this.props.categories)
										.map( ckey =>
											<optgroup label={this.props.categories[ckey].name}>
												{
													this.props.areas && (
														Object
															.keys(this.props.areas)
															.filter((current) => this.props.areas[current].category === ckey)
															.map( akey =>
																<option value={akey}>{this.props.areas[akey].name}</option>
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
