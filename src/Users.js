import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Users extends Component {

	render() {

		let locState = this.props.location.state;
		if ( locState ) {
			var status = locState.status;
		}

		return (
			<div className="admin-screen">
				{
					status === 'added' && (
						<p style={{color: 'green'}}>User was added</p>
					)
				}
				<h2>Users</h2>
				<Link className="btn btn-primary" to={{pathname: '/add-user'}}>Add New User</Link>
				<p>&nbsp;</p>
				<p>Or select a user to edit.</p>
				<ul>
				{
					Object
						.keys(this.props.users)
						.map( ukey =>
							<li key={ukey}><Link key={ukey} to={{pathname: '/users/' + ukey, state: { ukey: ukey } }}>{this.props.users[ukey].name ? this.props.users[ukey].name : ukey}</Link></li>
						)
				}
				</ul>
			</div>
		)
	}
}

export default Users;