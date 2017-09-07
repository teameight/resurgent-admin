import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Areas extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Areas</h2>
				<p>Select a category or an area to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.categories)
						.map( ckey =>
							<div>
							<li><Link key={ckey} to={{pathname: '/categories/' + ckey, state: { ckey: ckey } }}>{this.props.categories[ckey].name}</Link></li>
							<ul>
							{
								Object
									.keys(this.props.categories[ckey]["areas"])
									.map( akey =>
										<li><Link key={akey} to={{pathname: '/areas/' + akey, state: { ckey: ckey, akey: akey } }}>{this.props.categories[ckey]["areas"][akey].name}</Link></li>
									)
							}
							</ul>
							</div>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Areas;