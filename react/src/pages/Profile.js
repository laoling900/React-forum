import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link, Outlet } from "react-router-dom";
import "../css/Profile.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import Moment from "react-moment";
import { deleteUser } from "../data/repository";

function MyProfile() {
  //save show state to control the edit profile component
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user} = useContext(UserContext);
  const removeUser = () => deleteUser(user.user_id);

  return (
    <div className="min-vh-90  profilePage">
      <Container fluid="sm" className="min-vh-100">
        <h1 className="welcometext my-2"> My Profile</h1>
        <Card className="profileCard  ">
          <Card.Title className="profileText">Profile Card</Card.Title>
          <div className="d-flex avatar">
            <img src="/avatar.png" alt="profile-pic" />

            <div className="details flex-grow-1 ">
              <h3 className="profileText">{user.user_name}</h3>
              <h5 className="profileText">{user.user_email}</h5>
            </div>

            <div>
              <Link to="editProfile" className=" editLink material-icons md-36">
                edit
              </Link>
            </div>
            <div>
              <button
                onClick={handleShow}
                className="deleteButton material-icons md-36"
              >
                delete
              </button>
              <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you Confirm to delete your account?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    CANCEL
                  </Button>
                  <Button>
                    <Link
                      className="nav-link"
                      variant="primary"
                      to="/"
                      onClick={removeUser}
                    >
                      CONFIRM
                    </Link>
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <Card.Footer>
            <h3 className="profileText">
              Joined: <Moment format="ddd MMM D YYYY">{user.createdAt}</Moment>
            </h3>
          </Card.Footer>
        </Card>


        <Outlet />
      </Container>
    </div>

  );
}

export default MyProfile;
