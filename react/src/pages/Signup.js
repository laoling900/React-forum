import React, { useState } from "react";
import { Button, Form, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  findEmail,
  setLocalUser,
} from "../data/repository";
import {
  checkPassword,
  PasswordStrengthMeter,
} from "../components/PasswordStrengthMeter";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import "../css/Signup.css";

function Signup(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const validateResult = checkPassword(password);
  const {  setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //all not allow blank
    if (name === "") {
      setError("Pls enter name !");
      return;
    } else if (email === "") {
      setError("Pls enter email !");
      return;
      // not allow user register a different account use  same email
    } else if ((await findEmail(email)) === true) {
      setError("Email already been used, pls change it ! ");
      return;
    } else if (password === "") {
      setError("password not allow blank!");
      return;
    } else if (repeatPassword === "") {
      setError("Pls repeat password !");
      return;
    }
    if (validateResult !== 4) {
      setError("Password not strong enough, pls change it !");
      return;
    } else if (password !== repeatPassword) {
      setError("Two time password different, pls enter same password ! ");
      return;
    } else {
      //user sign up information
      const user = {
        user_name: name,
        user_email: email,
        user_password: password,
      };

      const user2 = await createUser(user);

      setUser(user2);
      setLocalUser(user2);
      setError("Successful Signup !");
      navigate("/");
    }
  };

  return (
    <div className="min-vh-90 signuppage">
      <Container fluid="md" className="min-vh-100 ">
        <Card style={{ width: "30rem" }} className="m-auto my-5 welcomeCard">
          <h1 className="welcometext"> Welcome to Loop Agile Now</h1>
        </Card>
        <Card border="white" style={{ width: "25rem" }} className="m-auto my-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-1 shadow-none">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <PasswordStrengthMeter password={password} />

            <Form.Group className="mb-1 shadow-none">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter RepeatPassword"
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </Form.Group>
            <PasswordStrengthMeter password={repeatPassword} />

            {error !== "" && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="signupButton">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
