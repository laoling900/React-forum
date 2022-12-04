module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();
  
    // Select all posts.
    router.get("/", controller.all);

    //Select one person's posts
    router.get("/oneUserPost/:id", controller.oneUserPost);

    // Select one post.
    router.get("/select/:id", controller.one );
  
    // Create a new post.
    router.post("/", controller.create);

    //update post
    router.put("/update", controller.update);

    //delete post
    router.delete("/delete/:id", controller.delete);
  
    // Add routes to server.
    app.use("/api/posts", router);
  };