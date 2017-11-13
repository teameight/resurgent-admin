import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Transaction from './Transaction';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { EditorState, convertToRaw, convertFromRaw, convertFromHtml, ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CLOUDINARY_UPLOAD_PRESET = 'dydj2q5q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dw5sevhx8/upload';

class Provider extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);

		let pkey = this.props.match.params.pkey;
		let providers = this.props.providers;
		let objectKey = Object.keys(providers).filter((current) => providers[current].id === pkey);
		let provider = providers[objectKey];
		let desc = provider.desc;
		let state;

		if ( desc ) {
			console.log(desc);
			const blocksFromHTML = htmlToDraft(desc);
			state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
		} else {
			const blocksFromHTML = htmlToDraft('<p>Provider Description</p>');
			state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
		}

		console.log(state);

		this.state = {
			uploadedFileCloudinaryUrl: '',
			editorState: EditorState.createWithContent(
				state,
			),
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
		const pkey = this.props.location.state.pkey;

		const formValues = {
			name: this.name.value,
			email: this.email.value,
			cost: this.cost.value,
			desc: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
			type: this.type.value,
			area: this.area.value,
			image: this.state.uploadedFileCloudinaryUrl,
			order: this.order.value,
			archive: this.archive.checked
		}


		this.props.updateProvider(pkey, formValues);
		this.props.history.goBack();

	}

	render() {
		const { editorState } = this.state;
		let pkey = this.props.match.params.pkey;
		let providers = this.props.providers;
		let objectKey = Object.keys(providers).filter((current) => providers[current].id === pkey);
		let provider = providers[objectKey];
		if ( provider ) {
			var area = this.props.areas[provider.area];
		}
		if ( area ) {
			var category = this.props.categories[area.category];
		}
    const transactions = this.props.transactions;
    let archivemessage = "Archive this provider";
    if(provider && provider.isArchived){
    	archivemessage = "Return this provider to active";
    }

		return (
			<div>
			{
				provider && (
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
								<label htmlFor="formControlsType" className="control-label">Provider Type</label>
								<select ref={(input) => this.type = input} id="formControlsType" defaultValue={ provider.type } className="form-control" name="type">
									<option value="default">Default</option>
									<option value="interviewstream">InterviewStream</option>
									<option value="headhunter">Headhunter</option>
									<option value="watchvideos">Watch Videos Now</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="formControlsArea" className="control-label">Parent Area</label>
								<select ref={(input) => this.area = input} id="formControlsArea" defaultValue={ provider.area } className="form-control" name="area">
									{
										this.props.categories && (
											Object
												.keys(this.props.categories)
												.map( ckey =>
													<optgroup key={ckey} label={this.props.categories[ckey].name}>
														{
															this.props.areas && (
																Object
																	.keys(this.props.areas)
																	.filter((current) => this.props.areas[current].category === ckey)
																	.map( akey =>
																		<option key={akey} value={akey}>{this.props.areas[akey].name}</option>
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
										<img src={provider.image} alt={provider.name} />
									</div>
									 :
									<div>
										<img src={this.state.uploadedFileCloudinaryUrl} alt={provider.name} />
									</div>
									}
								</Dropzone>
							<div className="form-group">
								<label htmlFor="formControlsOrder" className="control-label">Provider Order (0, 1, 2, 3...)</label>
								<input ref={(input) => this.order = input} required id="formControlsOrder" className="form-control" type="number" name="order" defaultValue={provider.order ? provider.order : 0} placeholder="0" />
							</div>
							<div className="checkbox">
								<label htmlFor="formControlsArchive" className="control-label">
									<input ref={(input) => this.archive = input} id="formControlsArchive" type="checkbox" name="archive" />
									{archivemessage}
								</label>
							</div>
							<button className="btn btn-primary" type="submit">Update</button>
						</form>

						<h3 className="instruction">{provider.name} Transaction History</h3>
						{
		          category && area &&  (
		          	Object
		            .keys(transactions)
		            .filter((current) => transactions[current].provider === pkey)
		            .map(key => <Transaction key={key} keyId={key} pname={provider.name} cname={category.name} aname={area.name} details={transactions[key]} users={this.props.users} transactions={transactions} providers={this.props.providers} pkey={objectKey} />)
		            .reverse()
		            )
		        }
					</Col>
				)
			}
			</div>

		)
	}
}

export default Provider;
