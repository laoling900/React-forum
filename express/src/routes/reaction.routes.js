module.exports = (express, app) => {
    const controller = require("../controllers/reaction.controller.js");
    const router = express.Router();

    //Select all reactions.
    router.get("/", controller.all);

    //Select a reaction.
    router.get("/select/:user_id/:post_id", controller.one);

    //Create a new reaction.
    router.post("/create", controller.create);

    //update a reaction
    router.put("/update/:user_id/:post_id", controller.update);


    //empty the like or dislike
    router.delete("/delete/:user_id/:post_id", controller.delete);

    //Add routes to server.
    app.use("/api/reactions", router);

}