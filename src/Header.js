import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

	constructor() {
    super();

    this.logout = this.logout.bind(this);

  }

	logout(e) {
  	e.preventDefault();
  	this.props.logout();
  };

	render() {
		return(
		<Navbar bg="light" expand="lg">
		  <Navbar.Brand href="/"><img src={require('./img/logo.png')} alt="Resurgent - Legal Outplacement" /></Navbar.Brand>
		  <Navbar.Text>Resurgent Admin Panel</Navbar.Text>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="ml-auto">
		      <NavDropdown alignRight title="Menu" id="basic-nav-dropdown">
		        <NavDropdown.Item href="/">Categories</NavDropdown.Item>
		        <NavDropdown.Item href="/areas">Areas</NavDropdown.Item>
		        <NavDropdown.Item href="/providers">Providers</NavDropdown.Item>
		        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
		        <NavDropdown.Item href="/pages">Pages</NavDropdown.Item>
		        <NavDropdown.Item onClick={	(e) => this.logout(e)}>Sign Out</NavDropdown.Item>
		      </NavDropdown>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
  	)
	}
}

export default Header;