module.exports = (express, app) => {
    const controller = require("../controllers/followers_following.controller.js");
    const router = express.Router();
  
    // Select all follow relationship.
    router.get("/", controller.all);
  
   // Select one user,  show all this user's follower
   router.get("/follower/:id", controller.follower);

    // Select one user, show All people I am following 
    router.get("/following/:id", controller.following);

  
    // Create a follow relationship.
    router.post("/", controller.create);

    //delete a follow relationship.
    router.delete("/delete/:follower_id/:following_id",controller.delete);

    // Add routes to server.
    app.use("/api/followers_following", router);
  };