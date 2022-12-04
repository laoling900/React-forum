import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Container, Button, Col, Row, Table,Card } from "react-bootstrap";
import { blockUser, getUsers } from "../data/repository";
import "../css/User.css";

function User() {
    const {users, setUsers} = useContext(UserContext);

    //when admin block user, update user_block is true
    const handleBlock = async (selectUser) => {
        //true
        selectUser.user_block =true;
        const user = await blockUser(selectUser);
        setUsers(await getUsers());

    };
  //when admin unblock user, update user_block is false
    const handleUnBlock =async (selectUser) => {
        //false
        selectUser.user_block =false;
        const user = await blockUser(selectUser);
        setUsers(await getUsers());
    };
    

    if(users[0] ===undefined){
        return(
            <div>No any user on the system</div>
        )
    }

    return (
        <Container fluid="md" className="d-flex flex-column min-vh-100">
             <h1 className="usertext "> All Users</h1>
            <Card className="userCard">
            <Card.Body>
                <Table responsive striped bordered hover className="userTable">
                <thead>
                    <tr>
                      <th>User Id</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Block State</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) =>(
                        <tr key={user.user_id} >
                            <td>{user.user_id}</td>
                            <td>{user.user_name}</td>
                            <td>{user.user_email}</td>
                            <td>
                            {user.user_block?(
                            <Button
                            className="blockButton"
                            onClick={() =>handleUnBlock(user)}
                            >
                            Unblock
                            </Button>
                            ):(
                                <Button
                                className="unBlockButton"
                                onClick={() =>handleBlock(user)}
                                >
                                Block
                                </Button>
                            )}
                            

                            </td>
                        </tr>
                    ))}
                    </tbody>


                </Table>
            </Card.Body>
            </Card>
        </Container>

    )



}

export default User;