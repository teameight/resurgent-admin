import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Areas extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Areas</h2>
				<Link className="btn btn-primary" to={{pathname: '/add-area'}}>Add New Area</Link>
				<p>&nbsp;</p>
				<p>Or select an area to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.areas)
						.map( akey =>
							<li><Link key={akey} to={{pathname: '/areas/' + akey, state: { ckey: this.props.areas[akey].category, akey: akey } }}>{this.props.areas[akey].name}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Areas;