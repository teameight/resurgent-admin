import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

	render() {
		return(
			<Navbar>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <Link to="/" ><img src={require('./img/logo.png')} alt="Resurgent - Legal Outplacement" /></Link>
			        <p>Resurgent Admin Panel</p>
			      </Navbar.Brand>
			      {
            this.props.showMenu && (
            	<Navbar.Toggle />
            	)
          }
			    </Navbar.Header>
			    {
            this.props.showMenu && (
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <NavItem href="/">Categories</NavItem>
				        <NavItem href="/areas">Areas</NavItem>
				        <NavItem href="/providers">Providers</NavItem>
				        <NavItem href="/users">Users</NavItem>
				        <NavItem href="/pages">Pages</NavItem>
				        <NavItem href="/logout">Sign Out</NavItem>
				      </Nav>
				    </Navbar.Collapse>
			    )
        }
			</Navbar>
  	)
	}
}

export default Header;