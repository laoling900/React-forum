import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Button, Col, Row, Table, Card } from "react-bootstrap";
import { deletePost, getPosts, getUser } from "../data/repository";
import "../css/Post.css";


function Post() {
  const [posts, setPosts] = useState([]);
  const inappropriateWord = new RegExp(/(?=dirty)|(?=pophub)|(?=shit)|(?=fuck)|(?=asholes)|(?=cocks)|(?=dick)|(?=fucker)|(?=jap)|(?=ahole)/);

 //when admin delete post, update post_delete is true
  const handleDelete = async (selectPost) => {
    //true
    selectPost.post_delete = true;
    const post = await deletePost(selectPost);
    setPosts(await getPosts());
  };

  //when admin recover post, update post_delete is false
  const handleRecover = async (selectPost) => {
    //false
    selectPost.post_delete = false;
    const post = await deletePost(selectPost);
    setPosts(await getPosts());
  };

  useEffect(() => {
    async function loadData() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);

    }
    loadData();
  }, []);

  if (posts[0] === undefined) {
    return <div>No any posts on the system</div>;
  }

  return (
    <Container>
       <h1 className="usertext "> All Posts</h1>
      <Card className="postCard"> 
        <Card.Body>
          <Table responsive striped bordered hover >
            <thead>
              <tr>
                <th>Post Id</th>
                <th>Post Text</th>
                <th>InappropriateWord</th>
                <th>Post Picture</th>
                <th>Post Person</th>
                <th>Person ID</th>
                <th>Delete State</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.post_id}>
                  <td>{post.post_id}</td>
                  <td dangerouslySetInnerHTML={{ __html: post.post_text }}
                  className="postTable"
                  >
                  </td>
                  {inappropriateWord.test(post.post_text.toLowerCase()) ?
                  (<td className="inappro"> ! </td>):
                  (<td></td>)}
                  
    
                  <td>
                    {post.post_pictureURL !== null && (
                      <img
                        alt="post img"
    
                        className="imgTable"
                        src={post.post_pictureURL}
                      ></img>
                    )}
                  </td>
                  <td>{post.user.user_name}</td>
                  <td>{post.user_id}</td>
                  <td>
                    {post.post_delete ? (
                      <Button
                        className="deleteButton"
                        onClick={() => handleRecover(post)}
                      >
                        Recover
                      </Button>
                    ) : (
                      <Button
                        className="RecoverButton"
                        onClick={() => handleDelete(post)}
                      >
                        Delete
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
  );
}

export default Post;
