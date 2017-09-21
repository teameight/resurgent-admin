import React, { Component } from 'react';
import fire from './fire';

class Login extends Component {

  constructor() {
    super();

    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.setNotice = this.setNotice.bind(this);

  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

	login() {
		this.props.auth.login();
	}

  toggleSignIn() {
      if (fire.auth().currentUser) {
        // [START signout]
        fire.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          this.setNotice({
            type: 'warning',
            message: 'Please enter an email address.'
          });
          return;
        }
        if (password.length < 4) {
          this.setNotice({
            type: 'warning',
            message: 'Please enter a password.'
          });
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        let that = this;
        fire.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            that.setNotice({
              type: 'warning',
              message: 'The email or password is invalid.'
            });
          } else {
            that.setNotice({
              type: 'warning',
              message: ' ' + errorMessage
            });
          }
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        this.setNotice({
          type: 'warning',
          message: 'Please enter an email address.'
        });
        return;
      }
      if (password.length < 4) {
        this.setNotice({
          type: 'warning',
          message: 'Please enter a password.'
        });
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      fire.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

    setNotice(notice) {
      this.props.setNotice(notice);
    }

  render() {
  	let pTitle = 'Sign In';
  	let pMessage = 'Enter your details below';


  	if(this.props.loggedOut){
  		pTitle = 'Success!';
  		pMessage = 'You have been signed out';
  	}

    return (
      <section className="main sign-in text-center">
          <header>
              <h3 className="page-title">{pTitle}</h3>
              <p className="subtitle">{pMessage}</p>
          </header>
          <form>
            <div className="form-group">
              <input type="text" id="email" name="email" placeholder="Email"/>
            </div>
            <div className="form-group">
              <input type="password" id="password" name="password" placeholder="Password"/>
            </div>
            <button className="btn" id="quickstart-sign-in" onClick={  (e) => this.toggleSignIn() } type="button" name="signup">Sign in</button>
          </form>
      </section>
    )
  }
}
export default Login;