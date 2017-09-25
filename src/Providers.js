import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Providers extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Providers</h2>
				<Link className="btn btn-primary" to={{pathname: '/add-provider'}}>Add New Provider</Link>
				<p>&nbsp;</p>
				<p>Or select a provider to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.providers)
						.map( pkey =>
							<li key={pkey}><Link key={pkey} to={{pathname: '/providers/' + pkey, state: { ckey: this.props.providers[pkey].ckey, akey: this.props.providers[pkey].area, pkey: pkey } }}>{this.props.providers[pkey].name}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Providers;