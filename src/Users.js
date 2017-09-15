import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Users extends Component {
	render() {
		return (
			<div className="admin-screen">
				<h2>Users</h2>
				<Link className="btn btn-primary" to={{pathname: '/add-user'}}>Add New User</Link>
				<p>&nbsp;</p>
				<p>Or select a user to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.users)
						.map( ukey =>
							<li><Link key={ukey} to={{pathname: '/users/' + ukey}}>{this.props.users[ukey].uid}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Users;