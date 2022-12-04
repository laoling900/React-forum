module.exports = (express, app) => {
    const controller = require("../controllers/reply.controller.js");
    const router = express.Router();
  
    // Select all replies.
    router.get("/", controller.all);
  
    // Select a single reply with id.
    router.get("/select/:id", controller.one);
  
    // // Select one user from the database if username and password are a match.
    // router.get("/login", controller.login);
  
    // Create a new reply.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/replies", router);
  };
  