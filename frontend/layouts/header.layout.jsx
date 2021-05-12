import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../providers/context/storeContext';

function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#">Clonereads</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <StoreContext.Consumer>
            {({ context }) => (
              <Link to="/login" className="nav-link">
                { context.isLogged ? 'Logout' : 'Login'}
              </Link>
            )}
          </StoreContext.Consumer>
        </Nav>
        <Link to="/search" className="nav-link">Search</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
