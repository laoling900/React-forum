import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function MyNavbar(props) {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand className="navbarText">Loop Agile Now</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link homelink" to="/">
              Home
            </Link>

            {props.user !== null && (
              <>
                <Link className="nav-link" to="/profile">
                  My Profile
                </Link>
                <Link className="nav-link" to="/forum/AllPost">
                  Forum
                </Link>
                <Link className="nav-link" to="/follow">
                  Follow
                </Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {props.user === null ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Navbar.Text>Welcome, {props.user.user_name} </Navbar.Text>
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={props.logoutUser}
                >
                  Logout
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
