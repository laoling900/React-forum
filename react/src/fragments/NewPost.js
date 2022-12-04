import React, { useState } from "react";
import { Button, Container, Form, Row, Col, Alert, Card } from "react-bootstrap";
import "../css/Post.css";
import Avatar from "react-avatar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import {
  ref,
  uploadBytes,
  // listAll,
  getDownloadURL,
  // list,
} from "firebase/storage";
import { createPost } from "../data/repository";
import { v4 } from "uuid";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import "../css/NewPost.css";


function NewPost(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    let imageRef;

    let post ;

    if(text.length ===0 ){
      setErrorMessage("can not post empty value!");
      return
    }else if(text.length >=600){
      setErrorMessage("Can not enter more that 600 characters !  ");
      return
    }

    //save the picture URL if the user upload any picture
    if (imageUpload !== null) {
      imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then(async (url) => {
          post = {
            post_text: text,
            post_pictureURL: url.toString(),
            user_id: user.user_id,
          };
          await createPost(post);
          await navigate("/forum/allPost");
        });
      });
    } else {
      //save the post without picture
      post = {
        post_text: text,
        post_pictureURL: null,
        user_id: user.user_id,
      };
      setErrorMessage("Successful post ! ")
      await createPost(post);
      await navigate("/forum/allPost");
    }
  };

  return (
    <Container fluid="sm" justify-content="center" className="min-vh-100">
      <Form onSubmit={handleSubmit} className="newpostform">
        <Row variant="Primary">
          <Col variant="secondary"></Col>
          <Col className="d1" xs={6}>
            <Avatar
              className="avatar"
              size="55"
              src="/avatar.png"
              alt="forum-pic"
            />
            {user.user_name}{" "}
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>

          <Col xs={6} className="reactquillCol">
            <ReactQuill 
             role="dialog"
              placeholder= "Share your thoughts..."
              className="quill"
              theme="snow"
              value={text}
              onChange={setText}
            />
          </Col>
          
          <Col></Col>

        </Row>
        <br></br>
        <br></br>
        <br></br>

        <Row>
          <Col></Col>
          <Col xs={1} className="postCol">
            <input
              type="file"
              id="fileupload"
              style={{ display: "none" }}
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <label
              className="picLabel"
              htmlFor="fileupload"
              style={{ cursor: "pointer" }}
            >
              picture
            </label>
          </Col>
          <Col xs={5} className="postCol">
            {imageUpload !== null && <Row>{imageUpload.name}</Row>}
            
          </Col>
          
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6} className="d2">
          
            <Button className="postButton" variant="primary" type="submit">
              Post
            </Button>

          </Col>
          <Col></Col>
                    
        </Row>
        <Row>
          <Col></Col>
          <Col xs={6} className="d3">
          
            {errorMessage!=="" && <Alert variant="danger">{errorMessage}</Alert>  }
          </Col>
          <Col></Col>
                    
        </Row>
        

      </Form>

      <Card className="newPostcard"></Card>

      {/* <Row>
          <Col></Col>
          <Col xs={6} className="d2">
          
            {errorMessage!=="" && <Alert variant="danger">{errorMessage}</Alert>  }
          </Col>
          <Col></Col>
                    
        </Row> */}

    </Container>


  );
}

export default NewPost;
