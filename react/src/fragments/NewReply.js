import React, { useState } from "react";
import ReactQuill from "react-quill";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import { createReply } from "../data/repository";
import "../css/NewReply.css";

function NewReply(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const { user} = useContext(UserContext);
  const navigate = useNavigate();


  const handlePostReply = async (e) => {
    e.preventDefault();
    //save the reply

    //check reply validation
    if(text.length ===0 ){
      setErrorMessage("can not reply empty value!");
      return
    }else if(text.length >=201){
      setErrorMessage("Can not enter more that 200 characters !  ");
      return
    }

    //save the reply to the database
    const reply = {
      reply_text: text,
      post_id: props.post_id,
      user_id: user.user_id,
      replyTo_id: props.replyTo_id,
    };
    await createReply(reply);
    navigate("/forum/allPost");
    navigate(0);
  };

  return (
    <div>
      <Container>
        <Accordion>
          <Accordion.Header className="header">
            <span className="material-icons ">reply</span>
            Reply
          </Accordion.Header>

          <Accordion.Body>
            <Row>
              <ReactQuill
                maxLength="200"
                role="dialog"
                className="mb-5"
                theme="snow"
                value={text}
                onChange={setText}
                // modules={{
                
                // } }
                placeholder= "Replay here..."
                style={{ height: "100px" }}
              />
            </Row>
            <Row>
              <Col>
                <Button variant="primary" onClick={handlePostReply}>
                  CONFIRM
                </Button>

                {errorMessage!=="" && <Alert variant="danger">{errorMessage}</Alert>  }
                </Col>

            </Row>
          </Accordion.Body>
        </Accordion>
      </Container>
    </div>
  );
}

export default NewReply;
