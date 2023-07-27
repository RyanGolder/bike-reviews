import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Auth from "../../utils/auth";

const Header = () => {
  const Logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid={true}>
        <Navbar.Brand as={Link} to="/">
          <h1>BIKE REVIEWS</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/me">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
