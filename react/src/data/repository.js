import axios from "axios";

const axiosConf = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosConf;

const USER_KEY = "user";

//User login verify
async function verifyUser(email, password) {
  const response = await axiosConf.get("/api/users/login", { params: { email, password } });
  const user = response.data;
  return user;
}

//find one users
async function findUser(id) {
  const response = await axiosConf.get(`/api/users/select/${id}`);
  return response.data;
}
//find all users
async function getUsers() {
  const response = await axiosConf.get("/api/users");
  return response.data;

}

//check email exist or not
async function findEmail(email) {
  //return false;
  const data = await getUsers();
  for (const user of data) {
    if (email === user.user_email) {
      return true;
    } else {
      return false;
    }
  }

}

//create one new User
async function createUser(user) {
  const response = await axiosConf.post("/api/users", user);
  return response.data;
}

//update an exist user
async function updateProfile(user) {
  const response = await axiosConf.put(`/api/users/update`, user);
  return response.data;
}

//delete an user
async function deleteUser(id) {
  removeUser();
  const response = await axiosConf.delete(`/api/users/delete/${id}`);
  return response.data;
}


// --- Post ---------------------------------------------------------------------------------------
//All posts
async function getPosts() {
  const response = await axiosConf.get("/api/posts");
  return response.data;
}

//get one user with his/her all posts
async function getOneUserPosts(id) {
  const response = await axiosConf.get(`/api/posts/oneUserPost/${id}`);
  return response.data;
}

//create a new post
async function createPost(post) {
  const response = await axiosConf.post("/api/posts", post);
  return response.data;
}

//update an exist post
async function updatePost(post) {
  const response = await axiosConf.put(`/api/posts/update`, post);
  return response.data;
}

//delete an exist post
async function deletePost(id) {
  const response = await axiosConf.delete(`/api/posts/delete/${id}`);
  return response.data;
}

//--- Reply---------------------------------------------------------------------------------------
//get all replies
async function getReplies() {
  const response = await axiosConf.get("/api/replies");
  return response.data;
}

//get a reply use the reply id
async function getReply(id) {
  const response = await axiosConf.get(`/api/replies/select/${id}`);
  return response.data;
}

//creacte a new reply to a post
async function createReply(reply) {
  const response = await axiosConf.post("/api/replies", reply);
  return response.data;
}
//-----Follow_unfollow-------------------------------------------------------

//get one user's all follow and unfollow relationship
async function getFollowAndUnFollow(id) {
  
  const users = await getUsers();

  const followingRealtionship = await getFollowings(id);

  let following = [];
  let unfollowing = [...users];

  //check all following from the follow relationship 
  for (const user of users) {
    if (user.user_id === id) {
      //remove this user itself from unfollowing
      const indexUser = user;
      const index = unfollowing.indexOf(indexUser);
      unfollowing.splice(index, 1);
    }

    for (const myfollow of followingRealtionship) {
      if (user.user_id === myfollow.following_id) {
        following.push(user);

        //remove this user from unfollowing
        const indexUser = user;
        const index = unfollowing.indexOf(indexUser);
        unfollowing.splice(index, 1);
      }

    }
  }

  return [following, unfollowing];

}

//follow a user
async function follow(follow) {
  const response = await axiosConf.post("/api/followers_following", follow);
  return response.data;
}

//unfollow a user
async function unfollow(followerID, followingID) {
  const response = await axiosConf.delete(`api/followers_following/delete/${followerID}/${followingID}`);
  return response.data;
}

//get a person's all followings id
async function getFollowings(id) {
  const response = await axiosConf.get(`api/followers_following/following/${id}`);
  return response.data;
};

//get a pserson's all followings posts
async function getFollowingsPosts(id){
    const followings = await await getFollowings(id);
    let response = [];
    if(followings[0]){
        for(const follow of followings){
            const thisFollowPost = await getOneUserPosts(follow.following_id);
            response= [...response,...thisFollowPost];
        }
    }
    return response;

}

//-----Reactions ( like & dislike) -------------------------------------------------------
//get all reactions
async function getReactions() {
  const response = await axiosConf.get("/api/reactions");
  return response.data;
}

//get one person's reaction to a specific post
async function getOneReaction(userID, postID) {
  const response = await axiosConf.get(`/api/reactions/select/${userID}/${postID}`);
  return response.data;
}

//create a new reaction to a specific post
async function createReaction(reaction) {
  const response = await axiosConf.post("/api/reactions/create", reaction);
  return response.data;
}

//update a new reaction 
async function updateReaction(reaction) {
  const response = await axiosConf.put(`/api/reactions/update/${reaction.user_id}/${reaction.post_id}`, reaction);
  return response.data;
}

//delete a reaction
async function deleteReaction(userID, postID) {
  const response = await axiosConf.delete(`/api/reactions/delete/${userID}/${postID}`);
  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setLocalUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}



export {
  verifyUser, findUser, createUser, getUser, removeUser, findEmail,
  getUsers, setLocalUser, updateProfile, deleteUser,
  getPosts, getOneUserPosts, createPost, updatePost, deletePost,
  getReplies, getReply, createReply,
  follow, unfollow, getFollowings, getFollowAndUnFollow,getFollowingsPosts,
  createReaction, getReactions, getOneReaction, updateReaction, deleteReaction
}
