import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- Post ---------------------------------------------------------------------------------------
//get all posts
async function getPosts() {
  const query = gql`
    {
      all_posts {
        post_id
        post_text
        post_delete
        post_pictureURL
        user_id
        user {
          user_name
        }
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

//when admin delete post, update post_text
async function deletePost(post) {
  const query = gql`
    mutation ($post_id: Int, $post_delete: Boolean) {
      delete_post(input: { post_id: $post_id, post_delete: $post_delete }) {
        post_id
        post_text
        post_pictureURL
        user_id
        post_delete
      }
    }
  `;
  const variables = post;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_post;
}

// --- User ---------------------------------------------------------------------------------------

//get all users
async function getUsers() {
  const query = gql`
    {
      all_users {
        user_id
        user_name
        user_email
        user_block
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

//get one user by user_id
async function getUser(user_id) {
  const query = gql`
    query ($user_id: Int) {
      user(user_id: $user_id) {
        user_id
        user_name
        user_email
        user_block
      }
    }
  `;
  const variables = { user_id };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user;
}

// admin block user
async function blockUser(user) {
  const query = gql`
    mutation ($user_id: Int, $user_block: Boolean) {
      block_user(input: { user_id: $user_id, user_block: $user_block }) {
        user_id
        user_name
        user_email
        user_block
      }
    }
  `;

  const variables = user;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.block_user;
}

// --- followers ---------------------------------------------------------------------------------------
//user followers count and sort
async function countFollowers(users) {

  let maxFollowUsers  = [];

  for(const user of users) {
     const user_id = user.user_id
    const query = gql`
    query ($user_id: Int) {
    countFollower(user_id:$user_id){
      follower_id
    }
  }
  `
  const variables = { user_id }
  const data = await request(GRAPH_QL_URL, query, variables);

      if(maxFollowUsers.length <11){
        maxFollowUsers.push({user: user, followers: data.countFollower.length});
  
      }
  }

  maxFollowUsers.sort((user1, user2 )=>(user2.followers -user1.followers));

  return  maxFollowUsers;
};

export { getPosts, deletePost, getUsers, getUser, blockUser, countFollowers };
