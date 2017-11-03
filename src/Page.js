import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { EditorState, convertToRaw, convertFromRaw, convertFromHtml, ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
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

		const key = this.props.match.params.key;
		let pages = this.props.pages;
		let content = '';
		let savedContent = '';
		let state;

		if ( pages ) {
			savedContent = pages[key].content;
		}

		if ( savedContent ) {
			console.log(savedContent);
			const blocksFromHTML = htmlToDraft(savedContent);
			state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
		} else {
			const blocksFromHTML = htmlToDraft('<p>Enter page content HTML here</p>');
			state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap,
			);
		}

		this.state = {
			formValues: {},
			editorState: EditorState.createWithContent(
				state,
			),
		}

		this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
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
						  onEditorStateChange={this.onChange}
						  ref="editor"
						/>
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>

			</Col>
		)
	}
}

export default Page;
