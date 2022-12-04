import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "../css/Forum.css";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

function Forum() {

// this is the forum page with left navbar

 return (
    <Container fluid="sm" justify-content="center" className="min-vh-100 ">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="sticky-top  forumRow">
          <Col sm={3} className="my-4 ">
            <Nav variant="pills" className="flex-column forumNav" >
              <Nav.Item className="my-1 forumItem">
                <Link className="link1" to="newPost">
                  New Post
                </Link>
              </Nav.Item>
              <Nav.Item className="my-1 forumItem">
                <Link className="link1" to="myPost">
                  My Post
                </Link>
              </Nav.Item>
              <Nav.Item className="my-1 forumItem">
                <Link className="link1" to="allPost">
                  All Post
                </Link>
              </Nav.Item>

              <Nav.Item className="my-1 forumItem">
                <Link className="link1" to="myFollowingPost">
                  My Following Post
                </Link>
              </Nav.Item>

            </Nav>
          </Col>
          <Col sm={6}>
            <Tab.Content>
              <Tab.Pane eventKey="first"></Tab.Pane>
              <Tab.Pane eventKey="second"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Outlet />
    </Container>
  );
}

export default Forum;