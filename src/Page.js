import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class Page extends Component {
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
		const key = this.props.match.params.key;
		let formValues = this.state.formValues;

		this.props.updatePage(key, formValues);
	}

	render() {
		const key = this.props.match.params.key;
		let pages = this.props.pages;
		let content = '';
		let savedContent = '';

		if ( pages ) {
			savedContent = pages[key].content;
		}

		console.log(key);

		if ( savedContent ) {
			content = savedContent;
		} else {
			content = 'Enter page content HTML here';
		}

		return (
			<Col md={8} className="admin-screen">
				<h2 className="text-capitalize">{key}</h2>
				<form className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsContent" className="control-label">Page Content</label>
						<textarea id="formControlsContent" rows="30" className="form-control" name="content" defaultValue={content} placeholder="Page Content" onChange={this.handleChange} />
					</div>
					<button className="btn btn-primary" type="submit">Update</button>
				</form>
			</Col>
		)
	}
}

export default Page;
