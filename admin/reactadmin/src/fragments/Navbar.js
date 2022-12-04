import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function MyNavbar() {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand className="navbarText">Admin Web</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link homelink" to="/">
              Home
            </Link>

            <Link className="nav-link homelink" to="/user">
              All Users
            </Link>

            <Link className="nav-link homelink" to="/post">
              All Posts
            </Link>

            <Link className="nav-link homelink" to="/followsmetrics">
              Follows Metrics
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
