import React, { useState, useEffect } from "react";
import {getOneUserPosts } from "../data/repository";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import "../css/MyPost.css";
import ForEachPost from "../components/ForEachPost";

function MyPost(props) {
  const [isLoading, setIsLoading] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getOneUserPosts(user.user_id);
      setMyPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, [user.user_id]);


  return (
    <div className="Postdiv">
      {isLoading ? (
        <div>Loading posts...</div>
      ) : myPosts.length === 0 ? (
        <span className="text-muted">No any posts</span>
      ) : (
        myPosts.map((item) => <ForEachPost key={item.post_id} value={item} page={"myPost"}/>)
      )}
    </div>
  );
}

export default MyPost;
