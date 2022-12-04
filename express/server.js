const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Ying and Ling API for LAN" });
});

// app.delete('/api/users/:id', (req, res) => { 
// const { id } = req.params;
// const deleted = db.user.delete(user => user.user_id=id);

// });

// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/reply.routes.js")(express, app);
require("./src/routes/reaction.routes.js")(express,app);
require("./src/routes/followers_following.routes.js")(express,app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
