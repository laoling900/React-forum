import React, { useState, useEffect, useReducer } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import {
  createReaction,
  deletePost,
  deleteReaction,
  getOneReaction,
  getReactions,
  updateReaction,
} from "../data/repository";
import { useNavigate } from "react-router-dom";
import ForEachReply from "./ForEachReply";
import "../css/ForEachPost.css";
import NewReply from "../fragments/NewReply";
import { Col, Row } from "react-bootstrap";

function ForEachPost(props) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  // Like& dislike reference: https://codepen.io/wangjieee/pen/eYJmwOp
  //check the database count the likes and dislikes
  const initialState = {
    likes: 0,
    dislikes: 0,
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case "handle_like":
        return {
          ...state,
          likes: state.likes + action.payload,
        };
      case "handle_dislike":
        return {
          ...state,
          dislikes: state.dislikes + action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  const { likes, dislikes } = state;

  //set the status of like and dislike
  const [status, setStatus] = useState(null);

  const [reactions, setReactions] = useState([]);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    async function loadReactions() {
      //call the reactions from database
      const currentReactions = await getReactions();
      setReactions(currentReactions);
      //count like dislike init
      let likecount = 0;
      let dislikecount = 0;
      for (const reaction of currentReactions) {
        if (reaction.post_id === props.value.post_id) {
          if (reaction.like === true) {
            likecount += 1;
          } else {
            dislikecount += 1;
          }
        }
      }
      initialState.likes = likecount;
      initialState.dislikes = dislikecount;
      const currentReaction = await getOneReaction(
        user.user_id,
        props.value.post_id
      );

      //check and change the like and dislike state
      if (currentReaction !== null && currentReaction.like === true) {
        setStatus("like");
      } else if (currentReaction !== null && currentReaction.dislike === true) {
        setStatus("dislike");
      }
      setReaction(currentReaction);
    }
    loadReactions();
  }, []);

    
  const handleClickLike = () => {
    if (status === "like") {
      //save to the database， should delete reaction
      deleteReaction(user.user_id, props.value.post_id);
      setStatus(null);
      dispatch({
        type: "handle_like",
        payload: -1,
      });
    } else {
      if (status === "dislike") {
        //save to the database， should update reaction
        const newReaction = {
          user_id: user.user_id,
          like: true,
          dislike: false,
          post_id: props.value.post_id,
        };
        updateReaction(newReaction);
        dispatch({
          type: "handle_dislike",
          payload: -1,
        });
      } else {
        //save to the database， should create reaction
        const newReaction = {
          user_id: user.user_id,
          like: true,
          dislike: false,
          post_id: props.value.post_id,
        };
        createReaction(newReaction);
      }
      setStatus("like");
      dispatch({
        type: "handle_like",
        payload: 1,
      });
    }
  };
  const handleClickDislike = () => {
    if (status === "dislike") {
      //save to the database, should delete reaction
      deleteReaction(user.user_id, props.value.post_id);
      setStatus(null);
      dispatch({
        type: "handle_dislike",
        payload: -1,
      });
    } else {
      if (status === "like") {
        //save to the database， should update reaction
        const newReaction = {
          user_id: user.user_id,
          like: false,
          dislike: true,
          post_id: props.value.post_id,
        };
        updateReaction(newReaction);

        dispatch({
          type: "handle_like",
          payload: -1,
        });
      } else {
        //save to the database， should create reaction
        const newReaction = {
          user_id: user.user_id,
          like: false,
          dislike: true,
          post_id: props.value.post_id,
        };
        createReaction(newReaction);
      }
      setStatus("dislike");
      dispatch({
        type: "handle_dislike",
        payload: 1,
      });
    }
  };

  const editPost = async (post) => {
    navigate("/forum/EditPost", { state: { p: post } });
  };

  const handleDeletePost = async (postID) => {
    await deletePost(postID);
    setShow(false);
    // props.resetUser();
    navigate("/forum/myPost");
    navigate(0);
  };

  const toFollowPage = async () => {
    navigate("/follow", { state: { f: props.value.user } });
  };

  //each form post
  return (
    <div className="border my-3 p-3">
      {props.page === "myPost" && (
        <div>
          <Row>
            <Col>
              {" "}
              <img src="/ava.png" alt="post-pic" className="ava" />
            </Col>
            <Col>
              <h5 className="name">{user.user_name}</h5>
            </Col>
          </Row>
        </div>
      )}

      {props.page === "allPost" &&
        (props.value.user.user_id === user.user_id ? (
          <div>
            <Row>
              <Col>
                {" "}
                <img src="/ava.png" alt="post-pic" className="ava" />
              </Col>
              <Col>
                <h5 className="name">{user.user_name}</h5>
              </Col>
            </Row>
          </div>
        ) : (
          <button className="followbutton" onClick={toFollowPage}>
            <div>
              <Row>
                <Col>
                  {" "}
                  <img src="/ava.png" alt="post-pic" className="ava" />
                </Col>
                <Col>
                  <h5 className="othername">{props.value.user.user_name}</h5>
                </Col>
              </Row>
            </div>
          </button>
        ))}


        {props.value.post_delete ===true && (
          <div>[**** This post has been deleted by the admin ***]</div>
        )}



      {props.value.post_delete ===false && (
        <div>
<div dangerouslySetInnerHTML={{ __html: props.value.post_text } } className="eachPostText"></div>
      <div key="{props.value.post_id}">
        {props.value.post_pictureURL !== null && (
          <img
            alt="post img"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
            }}
            src={props.value.post_pictureURL}
          ></img>
        )}
        {props.page === "allPost" && (
          <div>
            <button
              className={status === "like" ? "btnlike active" : "btnlike"}
              onClick={handleClickLike}
            >
              {status === "like" ? (
                <span className="material-icons likeButton">thumb_up</span>
              ) : (
                <span className="material-icons">thumb_up_off_alt</span>
              )}

              <span>{likes}</span>
            </button>

            <button
              className={status === "dislike" ? "btnlike active " : "btnlike "}
              onClick={handleClickDislike}
            >
              {status === "dislike" ? (
                <span className="material-icons disikeButton">thumb_down</span>
              ) : (
                <span className="material-icons">thumb_down_off_alt</span>
              )}

              <span>{dislikes}</span>
            </button>
          </div>
        )}
      </div>
      {props.page === "allPost" && (
        <div className="replydiv">
          <NewReply post_id={props.value.post_id} replyTo_id={null} />
        </div>
      )}
      {/* <div className="reply1Div"> */}
        {props.value.replies[0] !== null &&
          props.value.replies.map(
            (item) =>
              item.replyTo_id === null && (
                <div className="reply1Div">
                <>
                  <ForEachReply
                    key={item.reply_id}
                    value={item}
                    replies={props.value.replies}

                  />
                </>
                </div>
              )
          )}

      {props.page === "myPost" && (
        <div>
          <button
            className=" edit material-icons md-36"
            onClick={() => editPost(props.value)}
          >
            edit
          </button>
          <button className="delete material-icons md-36" onClick={handleShow}>
            delete
          </button>
        </div>
      )}


        </div>
      )}


      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you Confirm to delete this Post? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeletePost(props.value.post_id)}
          >
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ForEachPost;
