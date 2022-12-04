const db = require("../database");

//Select all posts from database
exports.all = async (req, res) => {
  const posts = await db.post.findAll({
    include: [
      db.user,
      {
        model: db.reply,
        include: db.user,
      },
    ],
  });

  res.json(posts);
};

//Select one user's post from the database
exports.oneUserPost = async (req, res) => {
  const posts = await db.post.findAll({
    where: {
      user_id: req.params.id,
    },
    include: [
      db.user,
      {
        model: db.reply,
        include: db.user,
      },
    ],
  });

  res.json(posts);
};

//Select one post from the database.
exports.one = async (req, res) => {
  const post = await db.post.findByPk(req.params.id, {
    include: [db.user, db.reply],
  });

  res.json(post);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    post_text: req.body.post_text,
    post_pictureURL: req.body.post_pictureURL,
    user_id: req.body.user_id,
    //admin
    post_delete:false
  });

  res.json(post);
};

//Update post
exports.update = async (req, res) => {
  const post = await db.post.findByPk(req.body.post_id);
  //update post fields.
  post.post_text = req.body.post_text;
  post.post_pictureURL = req.body.post_pictureURL;

  await post.save();
  res.json(post);
};

//delete post
exports.delete = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);
  await db.post.destroy({
    where: {
      post_id: req.params.id,
    },
    force: true,

  });

  //reply also gona be delete , update later

  res.json(null);
};
