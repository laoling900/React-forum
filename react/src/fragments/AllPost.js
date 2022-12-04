import React ,{ useState, useEffect } from "react";
import { getPosts} from "../data/repository";
import "react-quill/dist/quill.snow.css";
import ForEachPost from "../components/ForEachPost";

function AllPost() {
    const[isLoading, setIsLoading ] = useState([]);
    const [posts, setPosts] = useState([]);

//load all posts
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  return (
    <div className="Postdiv">
      {isLoading ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <span className="text-muted">No any posts</span>
      ) : (
        posts.map((item) => (
          <ForEachPost key={item.post_id} value={item} page={"allPost"} />
        ))
      )}
    </div>
  );
}

export default AllPost;
