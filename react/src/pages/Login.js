import React from "react";
import { Button, Form, Card, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser, setLocalUser } from "../data/repository";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const loginUser = await verifyUser(email,password);
    if(loginUser === null){
      setError("Wrong email or password, pls try again!  ");
    }else if(loginUser.user_block === true){
      setError("Your account has been block, pls contact admin !  ");
    }else{
      setError("Successful Login ! ");
      setLocalUser(loginUser);
      setUser(loginUser);
      navigate("/profile");
    }

  };


  return (
    <div className="min-vh-90 loginpage">
      <Container fluid="md" className="d-flex flex-column min-vh-100">
        <Card style={{ width: "30rem" }} className="m-auto my-5 welcomeCard">
          <h1 className="welcometext"> Welcome to Loop Agile Now</h1>
        </Card>
        <Card style={{ width: "25rem" }} className="m-auto my-5 loginCard">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            {error !== "" && <Alert variant="danger">{error}</Alert>}
            <Button type="submit" className={"sumbitButton"}>
              Submit
            </Button>
          </Form>

          <br></br>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
