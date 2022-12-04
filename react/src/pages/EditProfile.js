import React ,{ useState }from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Form, Button, Alert } from "react-bootstrap";
import { findEmail, removeUser } from "../data/repository";
import { useNavigate } from "react-router-dom";
import { updateProfile, getUser,setLocalUser } from "../data/repository";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

function EditProfile() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //check validation
    if (newName === "") {
      setError("Pls enter name !");
      return;
    } else if (newEmail === "") {
      setError("Pls enter email !");
      return;
    } else if (newEmail !== user.user_email && (await findEmail(newEmail))) {
      setError("Email already been used, pls change it !");
      return;
    }
   
    user.user_name = newName;
    user.user_email = newEmail;


    await updateProfile(user);
    setError("Successful update !");
    removeUser();
    setLocalUser(user);
    setUser(getUser());
    navigate("/profile");
  };

  return (
    <Container fluid="md">
      <Card
        style={{ width: "35rem", padding: "2rem", backgroundColor: "#dff9fb" }}
        className="m-auto my-5 mb-5"
      >
        <Card.Title>Modify Profile:</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4 my-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter name"
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={newEmail}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
          </Form.Group>

          {error !== "" && <Alert  data-testid="custom-element" variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit">

            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
export default EditProfile;
