import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Outlet, useNavigate } from "react-router-dom";
import "../css/Follow.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  follow,
  getFollowAndUnFollow,
  unfollow,
} from "../data/repository";

function Follow() {
  const [isLoading, setIsLoading] = useState([]);
  const location = useLocation();
  const { user  } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [unfollowingUsers, setUnFollowingUsers] = useState([]);
  const [buttonText, setButtonText] = useState("Follow");
  const navigate = useNavigate();
  
  useEffect(() => {
    async function loadFollow() {
      const data = await getFollowAndUnFollow(user.user_id);

      //console.log(followingUsers);
      setFollowingUsers(data[0]);
      setUnFollowingUsers(data[1]);

      setIsLoading(false);

      //load select follow
      if (location.state !== null) {
        setProfileUser(location.state.f);
        //check following or unfollowing
        for (const following of data[0]) {
          if (location.state.f.user_id === following.user_id) {
            setButtonText("Unfollow");
          }
        }
      }
    }
    loadFollow();
  }, []);

  const handleFollowButton = async () => {
    //If buttonText is follow , create a new follow  ,change button to unfollow
    if (buttonText === "Follow") {
      const followrelationship = {
        follower_id: user.user_id,
        following_id: profileUser.user_id,
      };
      await follow(followrelationship);
      navigate(0);
    } else {
      await unfollow(user.user_id, profileUser.user_id);
      navigate(0);
    }
  };

  const handleSelectUser = (selectUser, state) => {
    setProfileUser(selectUser);
    setButtonText(state);
  };

  return (
    <Container fluid="sm" className="min-vh-100 ">
      <Row>
        <Col>
        <h1 className="welcometext my-2"> My Follow</h1>
          <Card className="leftCard">
            <Card className="userProfileCard my-5 mb-5 ">
              {profileUser === null ? (
                <Card.Body className="nobodyText">
                  Select an user to follow...
                </Card.Body>
              ) : (
                <>
                  <Card.Title className="cardtitle">User profile:</Card.Title>
                  <Card.Body>
                    <Row>
                      <Col> <img src="/ava.png" alt="post-pic" className="ava" /></Col>
                      <Col> <div className="profileContext">
                      User name: {profileUser.user_name}
                    </div>
                    <div className="profileContext">
                      User email: {profileUser.user_email}
                    </div></Col>
                    </Row>
          
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="primary"
                      onClick={handleFollowButton}
                      className="followButton"
                    >
                      {buttonText}
                    </Button>
                  </Card.Footer>
                </>
              )}
            </Card>

            <Outlet />
            <Card className="followingUserCard my-5 mb-5">
              <Card.Title className="cardtitle">
                People you are following:
              </Card.Title>
              <Card.Body>
                <Table responsive striped bordered hover className="userTable">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Following state</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                      <td>Loading following </td></tr>
                    ) : followingUsers.length === 0 ? (

                      <tr className="nobodyText">
                         You are not following any user!
                      
                      </tr>

                    ) : (
                      followingUsers.map((user) => (
                        <tr key={user.user_email}>
                          <td>{user.user_name}</td>
                          <td>{user.user_email}</td>
                          <td>
                            <Button
                              className="selectButton"
                              onClick={() => handleSelectUser(user, "UnFollow")}
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Card>
        </Col>

        <Col>
          <Card className="followUserCard my-5 mb-5">
            <Card.Title className="cardtitle">
              Users you can follow :
            </Card.Title>
            <Card.Body>

              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Following state</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>Loading following </tr>
                  ) : unfollowingUsers.length === 0 ? (
                    <tr className="nobodyText">
                      You are not following any user!
                    </tr>
                  ) : (
                    unfollowingUsers.map((user) => (
                      <tr key={user.user_email}>
                        <td>{user.user_name}</td>
                        <td>{user.user_email}</td>
                        <td>
                          <Button
                            className="selectButton"
                            onClick={() => handleSelectUser(user, "Follow")}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card className="picCard my-5">

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Follow;
