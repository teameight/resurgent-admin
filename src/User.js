import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import fire from './fire';

class Area extends Component {
	constructor(props) {
		super(props);

		
		this.handleSubmit = this.handleSubmit.bind(this);
    this.editUser = this.editUser.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();

		// TODO: form validation? which are required?
		const ukey = this.props.location.state.ukey;
		const user = this.props.users[ukey];

		const formValues = {
			tokens:this.tokens.value,
			expiration:this.expiration.value,
			employer:this.employer.value,
			classyear:this.classyear.value,
			practicegroup:this.practicegroup.value,
			invite:this.invite.checked
		}

		this.editUser(ukey, formValues);
		// this.props.history.goBack();
	}

	editUser(ukey, formValues) {
    
		const user = this.props.users[ukey];

		if(formValues.invite){
    	//send invite to register to this user
    	if(user.invite){
    		alert('An invitation has been resent to '+user.name+'.');
    	}else{
    		alert('An invitation has been sent to '+user.name+'.');
    	}
    }

    // if user has already been invited, but is not being invited again, reset this value to true
    if(user.invite && !formValues.invite){
    	formValues.invite = true;
    }

    const userRef = fire.database().ref('users/'+ukey);
    userRef.update(formValues);

    alert('The user '+user.name+' has been updated.');
  	
  }


	render() {
		const ukey = this.props.location.state.ukey;
		const user = this.props.users[ukey];

		let invitemessage = "Send invite email to this user?";
		if(user.invite){
			invitemessage = "Resend invitation to this user?"
		}
		// console.log(user);

		return (
			<Col md={8} className="admin-screen">
				<h2>Update User: {user.name}</h2>
				<p>email: {user.email}</p>
				<form ref={(input) => this.userForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsExpiration" className="control-label">Days to Expiration</label>
						<p>Set the number of days from now that this user's account will expire. Leave the default value to keep the current expiration. Set to 0 to expire this user now.</p>
						<input ref={(input) => this.expiration = input} required id="formControlsExpiration" className="form-control" type="number" name="expiration" defaultValue={user.expiration} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsTokens" className="control-label">Edit User Tokens</label>
						<input ref={(input) => this.tokens = input} required id="formControlsTokens" className="form-control" type="number" name="tokens" defaultValue={user.tokens} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsEmployer" className="control-label">Employer Name</label>
						<input ref={(input) => this.employer = input} id="formControlsEmployer" className="form-control" name="employer" placeholder="Employer Name" defaultValue={user.employer} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsClassyear" className="control-label">Class Year</label>
						<input ref={(input) => this.classyear = input} id="formControlsClassyear" className="form-control" type="number" name="classyear" placeholder="2000" defaultValue={user.classyear} />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsPracticegroup" className="control-label">Practice Group</label>
						<input ref={(input) => this.practicegroup = input} id="formControlsPracticegroup" className="form-control" name="practicegroup" placeholder="Practice Group" defaultValue={user.practicegroup} />
					</div>
					<div className="checkbox">
						<label htmlFor="formControlsInvite" className="control-label">
							<input ref={(input) => this.invite = input} id="formControlsInvite" type="checkbox" name="invite" /> 
							{invitemessage}
						</label>
					</div>
					<button className="btn btn-primary" type="submit">Update User</button>
				</form>
			</Col>
		)
	}
}

export default Area;
