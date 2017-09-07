import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pages extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Pages</h2>
				<p>Select a page to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.pages)
						.map( key =>
							<li className="text-capitalize"><Link key={key} to={{pathname: '/pages/' + key, state: { key: key } }}>{key}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Pages;