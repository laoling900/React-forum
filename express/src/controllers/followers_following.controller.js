const db = require("../database");
const { where } = require("sequelize");


    // Select all follow relationship.
    //router.get("/", controller.all);
    exports.all = async (req, res) => {
        const followers_following = await db.followers_following.findAll();
      
        res.json(followers_following);
      };
      
  
   // Select one user,  show all this user's follower
   //router.get("/follower/:id", controller.follower);
   exports.follower = async (req, res) => {
    const followers = await db.followers_following.findAll(
        {
            where:{
                following_id: req.params.id,
            }
        }
    );
    res.json(followers);
  };


    // Select one user, show All people I am following 
    //router.get("/following/:id", controller.following);
    exports.following = async (req, res) => {
        const followings = await db.followers_following.findAll(
            {
                where:{
                    follower_id: req.params.id,
                }
            }
        );
        res.json(followings);
      };
  
    // Create a follow relationship.
    //router.post("/", controller.create);
    exports.create = async (req, res) => {
        const followers_following = await db.followers_following.create({
            follower_id: req.body.follower_id,
            following_id: req.body.following_id,
        });
        res.json(followers_following);
      };
      

    //delete a follow relationship.
    //router.delete("/delete/:follower_id/:following_id",controller.delete);
    exports.delete = async (req, res) => {
        const followers_following = await db.followers_following.destroy({
          where: {
            follower_id: req.params.follower_id,
            following_id: req.params.following_id,
          },
          force: true,
        });
        res.json("Successful delete !");
      };