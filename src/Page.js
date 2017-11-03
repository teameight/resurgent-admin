import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Page extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);

		this.state = {
			formValues: {},
			editorState: EditorState.createEmpty()
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
		const { editorState } = this.state;
		const key = this.props.match.params.key;
		let formValues = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		this.props.updatePage(key, formValues);
		this.props.history.goBack();
	}

	onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  componentWillMount() {
		const key = this.props.match.params.key;
		let pages = this.props.pages;
		let content = '';
		let savedContent = '';

		if ( pages ) {
			savedContent = pages[key].content;
		}

		if ( savedContent ) {
			console.log(savedContent);
			content = htmlToDraft(savedContent);
		} else {
			content = 'Enter page content HTML here';
		}

		// this.setState({editorState: content});
  }

	render() {
		const { editorState } = this.state;
		const key = this.props.match.params.key;

		return (
			<Col md={8} className="admin-screen">
				<h2 className="text-capitalize">{key}</h2>
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsContent" className="control-label">Page Content</label>
						<Editor
							name="formControlsContent"
							editorState={editorState}
						  toolbarClassName="toolbarClassName"
						  wrapperClassName="wrapperClassName"
						  editorClassName="editorClassName"
						  onEditorStateChange={this.onEditorStateChange}
						/>
						<textarea
							rows={5}
							cols={50}
		          disabled
		          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
		        />
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>

			</Col>
		)
	}
}

export default Page;
