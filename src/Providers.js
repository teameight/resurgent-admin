import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Providers extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Providers</h2>
				<Link className="btn btn-primary" to={{pathname: '/add-provider'}}>Add New Provider</Link>
				<p>&nbsp;</p>
				<p>Or select a category, an area, or a provider to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.categories)
						.map( ckey =>
							<div>
							<li><Link key={ckey} to={{pathname: '/categories/' + ckey, state: { ckey: ckey } }}>{this.props.categories[ckey].name}</Link></li>
							<ul>
							{
								this.props.categories[ckey]["areas"] && (
									Object
										.keys(this.props.categories[ckey]["areas"])
										.map( akey =>
											<div>
											<li><Link key={akey} to={{pathname: '/areas/' + akey, state: { ckey: ckey, akey: akey } }}>{this.props.categories[ckey]["areas"][akey].name}</Link></li>
											<ul>
											{
												this.props.categories[ckey]["areas"][akey]["providers"] && (
													Object
														.keys(this.props.categories[ckey]["areas"][akey]["providers"])
														.map( pkey =>
															<li><Link key={pkey} to={{pathname: '/providers/' + pkey, state: { ckey: ckey, akey: akey, pkey: pkey } }}>{this.props.categories[ckey]["areas"][akey]["providers"][pkey].name}</Link></li>
														)
												)
											}
											</ul>
											</div>
										)
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

export default Providers;