import React ,{ useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { findUser, getFollowings, getFollowingsPosts, getOneUserPosts, getPosts} from "../data/repository";
import "react-quill/dist/quill.snow.css";
import ForEachPost from "../components/ForEachPost";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

function MyFollowingPost(){
    const {user } = useContext(UserContext);
    const[isLoading, setIsLoading ] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts(){
            const currentPosts = await getFollowingsPosts(user.user_id);
            setPosts(currentPosts);
            setIsLoading(false);
        }
        loadPosts();
    },[user.user_id]);


    return(
        <div className="Postdiv">
        {isLoading ? 
        <div>Loading posts...</div>
        :
        posts.length === 0 ?
        <span className="text-muted">No any posts</span>
        :
       posts.map((item) =><ForEachPost key={item.post_id} value={item} page={"allPost"} />)
    }

     </div> 
    )
}


export default MyFollowingPost;