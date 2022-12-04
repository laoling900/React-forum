import React from "react";
import "../css/Home.css";
import { Button , Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

function Home() {
  const { user} = useContext(UserContext);

  return (
    <div className="min-vh-90  home">
      <Row>
        <Col>
          <Card className="left"></Card>
        </Col>
        <Col>
          <Card className="right">
            <div className="homeText">
              {user === null ? (
                <>
                  {" "}
                  <div className="my-4">
                    <h1 className="h1text">Enjoy your form with us: </h1>
                  </div>
                  <div>
                    <Link to="/login">
                      <Button className="HomeButtom" type="login">
                        Login
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="h1text">
                    <strong>Welcome {user.user_name}!</strong>
                  </h1>
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
