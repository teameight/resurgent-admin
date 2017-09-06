import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categories extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Categories</h2>
				<ul>
				{
					Object
						.keys(this.props.categories)
						.map( ckey =>
							<li><Link key={ckey} to={{pathname: '/categories/' + ckey, state: { ckey: ckey } }}>{this.props.categories[ckey].name}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Categories;