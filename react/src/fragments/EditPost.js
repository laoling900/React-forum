import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import ReactQuill from "react-quill";
import { storage } from "../firebase/firebase";
import {
  ref,
  uploadBytes,
  // listAll,
  getDownloadURL,
  // list,
} from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../data/repository";
import { useLocation } from "react-router-dom";

function EditPost() {
  const location = useLocation();
  const [text, setText] = useState(location.state.p.post_text);
  const [imageUpload, setImageUpload] = useState(null);
  const { user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageRef;
    let post;
    //save the picture URL if the user upload any picture
    if (imageUpload !== null) {
      imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then(async (url) => {
          post = {
            post_id: location.state.p.post_id,
            post_text: text,
            post_pictureURL: url.toString(),
            user_id: user.user_id,
          };
          await updatePost(post);
          await navigate("/forum/myPost");
        });
      });
    } else {
      post = {
        post_id: location.state.p.post_id,
        post_text: text,
        post_pictureURL: location.state.p.post_pictureURL,
        user_id: user.user_id,
      };
      await updatePost(post);
      await navigate("/forum/myPost");
    }
  };

  return (
    <Container fluid="sm" justify-content="center" className="min-vh-100 ">
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
              className="quill"
              theme="snow"
              value={text}
              placeholder={"Can not change to an empty post"}
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
          <Col xs={1}>
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
          <Col xs={5}>
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
      </Form>
    </Container>
  );
}

export default EditPost;
