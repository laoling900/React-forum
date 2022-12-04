const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema =buildSchema(`
    type User {
        user_id: Int,
        user_name: String,
        user_email: String,
        user_password: String,
        user_block: Boolean,

    }

    type Post {
        post_id: Int,
        post_text: String,
        post_pictureURL: String,
        user_id: Int,
        post_delete: Boolean,
        user:User
 
    }

    type FollowUnFollow{
        follower_id:Int,
        following_id:Int,
    }

    # The input type can be used for incoming data.
    input PostInput{
        post_id: Int,
        post_delete: Boolean,
    }
    input UserInput{
        user_id:Int,
        user_block:Boolean,
    }

    # Queries (read-only operations).
    type Query {
        all_posts: [Post],
        all_users: [User],
        user(user_id:Int): User,
        post(post_id:Int): Post,
        countFollower(user_id:Int): [FollowUnFollow],
    }


    # Mutations (modify data in the underlying data-source, i.e., the database).
    type Mutation {
        delete_post(input:PostInput): Post,
        block_user(input:UserInput): User,
    }

`);




// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
    all_posts: async () => {
      const posts= await db.post.findAll();
      for(const post of posts){
         post.user = await db.user.findByPk(post.user_id);
      }
        return posts;
    },
    all_users: async () => {
        return await db.user.findAll();
    },
    user: async(args) => {
        return await db.user.findByPk(args.user_id);
    },
    post: async(args) => {
        return await db.post.findByPk(args.post_id);
    },
    
    countFollower:async(args) =>{
        return await db.followers_following.findAll(
            {
                where:{
                    following_id: args.user_id,
                }
            }
        );
    },



  // Mutations.
  // delete a post
    delete_post: async(args) =>{
        const post  =await db.post.findByPk(args.input.post_id);
        // Update owner fields.
        post.post_delete = args.input.post_delete;
        await post.save();
        return post;
    },
//block a user
    block_user: async(args) =>{
        const user = await db.user.findByPk(args.input.user_id);
        user.user_block = args.input.user_block;
        await user.save();
        return user;
    }


};

module.exports = graphql;