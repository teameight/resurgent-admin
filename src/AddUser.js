import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import fire from './fire';
import axios from 'axios';


class AddUser extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.createUser = this.createUser.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();

		// TODO: form validation? which are required?
    if (this.email.value.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (this.name.value.length < 4) {
      alert('Please enter a name.');
      return;
    }

	  const daysToExpire = parseInt(this.expiration.value, 10);
		const today = new Date();
	  let dat = new Date(today);
	  dat.setDate(dat.getDate() + daysToExpire);

		let expiration = dat.getTime();

		const formValues = {
			name:this.name.value,
			email:this.email.value,
			tokens:this.tokens.value,
			unregistered:true,
			expiration:expiration,
			employer:this.employer.value,
			classyear:this.classyear.value,
			practicegroup:this.practicegroup.value,
			invite:this.invite.checked
		}

		this.addUser(formValues);
		// this.props.history.goBack();
	}

	createUser(data) {
	  // get user info
	}

	addUser(formValues) {

		let that = this;

		var data = {
			email: formValues.email,
			name: formValues.name
		};

		let button = document.getElementById('add-user-btn');
		button.setAttribute('disabled', true);
		button.innerHTML = 'Waiting...';

		axios.post('https://pure-hollows-29577.herokuapp.com/create-user', data)
		  .then(function (response) {
		    const uid = response.data; //get the uid back from heroku
		    console.log('uid: ', uid);
		    var auth = fire.auth();
				var emailAddress = formValues.email; //confirm from heroku before setting this

		    const usersRef = fire.database().ref('users');
		    const updates = {};
		    updates[uid] = formValues;
		    usersRef.update(updates);

		    console.log('The user '+formValues.name+' has been added.');


		    auth.sendPasswordResetEmail(emailAddress).then(function() {
				  console.log('An invitation has been sent to '+formValues.name+'.');
		  		button.className += " btn-success";
		  		button.innerHTML = 'User Added';
				}).catch(function(error) {
				  console.log('The invitation to '+formValues.name+' failed.');
		  		button.className += " btn-danger";
		  		button.innerHTML = 'Error';
				});
		  })
		  .then(function(status) {
				that.props.history.push('/users', {status: 'added'});
		  })
		  .catch(function (error) {
		    console.log(error);
	  		button.className += " btn-danger";
	  		button.innerHTML = 'Error';
		  });
  }

	render() {

		return (
			<Col md={8} className="admin-screen">
				<h2>Add New User</h2>
				<form ref={(input) => this.userForm = input} className="admin-edit" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="formControlsName" className="control-label">User Name</label>
						<input ref={(input) => this.name = input} required id="formControlsName" className="form-control" type="text" name="name" placeholder="User Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsEmail" className="control-label">User Email</label>
						<input ref={(input) => this.email = input} required id="formControlsEmail" className="form-control" type="email" name="email" placeholder="provider@email.com" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsExpiration" className="control-label">Days to Expiration</label>
						<p>Set the number of days from now that this user's account will expire (defaults to 90).</p>
						<input ref={(input) => this.expiration = input} required id="formControlsExpiration" className="form-control" type="number" name="expiration" defaultValue="90" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsTokens" className="control-label">User Token Amount</label>
						<input ref={(input) => this.tokens = input} required id="formControlsTokens" className="form-control" type="number" name="tokens" defaultValue="50" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsEmployer" className="control-label">Employer Name</label>
						<input ref={(input) => this.employer = input} id="formControlsEmployer" className="form-control" name="employer" placeholder="Employer Name" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsClassyear" className="control-label">Class Year</label>
						<input ref={(input) => this.classyear = input} id="formControlsClassyear" className="form-control" type="number" name="classyear" placeholder="2000" />
					</div>
					<div className="form-group">
						<label htmlFor="formControlsPracticegroup" className="control-label">Practice Group</label>
						<input ref={(input) => this.practicegroup = input} id="formControlsPracticegroup" className="form-control" name="practicegroup" placeholder="Practice Group" />
					</div>
					<div className="checkbox">
						<label htmlFor="formControlsInvite" className="control-label">
							<input ref={(input) => this.invite = input} id="formControlsInvite" type="checkbox" name="invite" /> 
							Send invite email to this user now?
						</label>
					</div>
					<button id="add-user-btn" className="btn btn-primary" type="submit">Add User</button>
				</form>
			</Col>
		)
	}
}

export default AddUser;
