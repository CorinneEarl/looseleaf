import React, {Component} from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
var config = require('../../config');
class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPass: '',
        test: false
    };
  }

  firstNameChange(e) {
    this.setState( {firstName: e.target.value} )
  };
   lastNameChange(e) {
    this.setState( {lastName: e.target.value} )
  };
   usernameChange(e) {
    this.setState( {username: e.target.value} )
  };
  passwordChange(e) {
    this.setState( {password: e.target.value} )
  };
   emailChange(e) {
    this.setState( {email: e.target.value} )
  };

  confirmPassword(e){
    this.setState ( {confirmPass: e.target.value} )
  }

  createUserEvent(){
    if (this.state.firstName === "" || this.state.lastName ===""
    || this.state.email ==="" || this.state.username==="" || this.state.password ===""
    || this.state.confirmPass==="") {
      alert("All fields required!");
    } else {
      if (this.state.password === this.state.confirmPass) {
        var self=this;
        $.ajax ({
          method: 'POST',
          url: config.serverRoute + '/createuser',
          data: JSON.stringify(this.state),
          contentType: 'application/json'
        }).done(function(success) {
          self.props.login(success.token, self.state.username)
          $.ajax ({
            method: 'POST',
            url: config.serverRoute + '/createlayout',
            data: JSON.stringify({username: self.state.username}),
            contentType: 'application/json'
          }).done(() => browserHistory.push('/Artboard'));
        });
      } else {
        this.setState ({test: true})
      }
    }
  }

  render() {
    return (
      <div>
        <div id="intro">
          <p>Looseleaf offers the <span id="freedom">freedom of a blank page </span>
          without the bulk and constraints of a paper planner.</p>
        </div>
        <div id="login-signup">
      		<div>
            <input type="text" className="textField" id="firstName"
              placeholder="First name" value={this.state.firstName}
              onChange={this.firstNameChange.bind(this)} />
      			<input type="text" className="textField" id="lastName"
              placeholder="Last name" value={this.state.lastName}
              onChange={this.lastNameChange.bind(this)} />
          </div>
          <div>
      			<input type="text" className="textField" id="username"
              placeholder="Username" value={this.state.username}
              onChange={this.usernameChange.bind(this)} />
      			<input type="password" className="textField" id="password"
              placeholder="Password" value={this.state.password}
              onChange={this.passwordChange.bind(this)} />
          </div>
          <div>
      			<input type="password" className="textField" id="confirmPassword"
              placeholder="Confirm password" value={this.state.confirmPass}
              onChange={this.confirmPassword.bind(this)} />
      			<input type="email" className="textField" id="emailInput"
              placeholder="Email address" value={this.state.email}
              onChange={this.emailChange.bind(this)} />
          </div>
          <div class="buttons">
            <input type="submit" className="button" id="createAccount"
              value="Create account" onClick={this.createUserEvent.bind(this)} />
          </div>
    		</div>
        { this.state.test ? (<div id="wrongPassword">
          Sorry, password doesn't match. Try again.</div>) : (<div />) }
      </div>
	  );
  }
}

export default Signup;
