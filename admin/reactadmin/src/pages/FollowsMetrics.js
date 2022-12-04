import React, { useEffect, useState, useReducer } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { countFollowers } from "../data/repository";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../css/Follow.css";

function FollowsMetrics() {
  const { users } = useContext(UserContext);
  const [maxFollowUsers, setMaxFollowUsers] = useState([]);
  //const [showUsers, setShowUsers] = useState([]);
  const [checked, setChecked] = useState(false);

  //initial the follows metrics
  const initialState = {
    desc: true,
    showThreeUsers: true,
    showFiveUsers: false,
    showTenUsers: false,
    showUsers: [],
  };

  const types = {
    descTrue: "descTrue",
    descFalse: "descFalse",
    showThreeUsers: "showThreeUsers",
    showFiveUsers: "showFiveUsers",
    showTenUsers: "showTenUsers",
    showUsers: "showUsers",
  };

  const Reducer = (state, action) => {
    switch (action.type) {
      case types.descTrue:
        let descUser;
        descUser = [...state.showUsers];
        descUser.sort((user1, user2) => user2.followers - user1.followers);

        return {
          ...state,
          desc: true,
          showUsers: descUser,
        };

      case types.descFalse:
        let asceUser;
        asceUser = [...state.showUsers];
        asceUser.sort((user1, user2) => user1.followers - user2.followers);

        return {
          ...state,
          desc: false,
          showUsers: asceUser,
        };

      case types.showThreeUsers:
        const showThree = [];
        showThree.push(maxFollowUsers[0], maxFollowUsers[1], maxFollowUsers[2]);

        return {
          ...state,
          showThreeUsers: true,
          showFiveUsers: false,
          showTenUsers: false,
          showUsers: showThree,
        };
      case types.showFiveUsers:
        const showFive = [];
        showFive.push(
          maxFollowUsers[0],
          maxFollowUsers[1],
          maxFollowUsers[2],
          maxFollowUsers[3],
          maxFollowUsers[4]
        );

        // setShowUsers(showFive);
        return {
          ...state,
          showFiveUsers: true,
          showThreeUsers: false,
          showTenUsers: false,
          showUsers: showFive,
        };
      case types.showTenUsers:
        // setShowUsers(maxFollowUsers);

        return {
          ...state,
          showTenUsers: true,
          showThreeUsers: false,
          showFiveUsers: false,
          showUsers: maxFollowUsers,
        };
      case types.showUsers:
        return {
          ...state,
          showUsers: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    async function loadCountFollowers() {
      const max = await countFollowers(users);
      setMaxFollowUsers(max);
      const showThree = [];
      showThree.push(max[0], max[1], max[2]);
      // setShowUsers(showThree);
      dispatch({ type: types.showUsers, payload: showThree });
    }

    loadCountFollowers();
  }, [users]);

  if (users[0] === undefined) {
    return <div>No any user on the system</div>;
  }

  return (
    <Container fluid="md" className="d-flex flex-column min-vh-100">
      <h1 className="followtext "> Follows Metrics</h1>
      <Card className="followCard">
        <BarChart
          className="followbar"
          width={800}
          height={500}
          data={state.showUsers}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user.user_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="followers" fill="#8884d8" />
        </BarChart>
      </Card>

      <Card className="followCard">
        <Row>
          <Col>
            <Card.Body>
              <ButtonGroup >
                <ToggleButton
                   variant="outline-secondary"
                  id="toggle-check"
                  type="checkbox"
                  checked={state.showThreeUsers}
                  // onChange={(e) => setChecked(e.currentTarget.checked)}
                  onClick={() => dispatch({ type: types.showThreeUsers })}
                >
                  Three Users
                </ToggleButton>

                <ToggleButton
                   variant="outline-secondary"
                  id="toggle-check"
                  type="checkbox"
                  checked={state.showFiveUsers}
                  onClick={() => dispatch({ type: types.showFiveUsers })}
                >
                  Five Users
                </ToggleButton>

                <ToggleButton
                   variant="outline-secondary"
                  id="toggle-check"
                  type="checkbox"
                  checked={state.showTenUsers}
                  onClick={() => dispatch({ type: types.showTenUsers })}
                >
                  Ten Users
                </ToggleButton>
              </ButtonGroup>
            </Card.Body>
          </Col>
          <Col>
            <Card.Body>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => dispatch({ type: types.descTrue })}
                >
                  Descending
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => dispatch({ type: types.descFalse })}
                >
                  Ascending
                </button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default FollowsMetrics;
