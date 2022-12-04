const db = require("../database");
const { where } = require("sequelize");
const { reaction } = require("../database");

//Select all reactions from the database.
exports.all = async (req, res) => {
  const reactions = await db.reaction.findAll();
  res.json(reactions);
};

//Select one Post reaction from the database.
exports.one = async (req, res) => {
  const reaction = await db.reaction.findOne({
    where: {
      user_id: req.params.user_id,
      post_id: req.params.post_id,
    }
  });
  res.json(reaction);
};

//Create a reaction
exports.create = async (req, res) => {
  const reaction = await db.reaction.create({
    user_id: req.body.user_id,
    like: req.body.like,
    dislike: req.body.dislike,
    post_id: req.body.post_id,
  });
  res.json(reaction);
};

//update a reaction
exports.update = async (req, res) => {
  const reaction = await db.reaction.findOne({
    where: {
      user_id: req.params.user_id,
      post_id: req.params.post_id,
    },
  });
  reaction.like = req.body.like;
  reaction.dislike = req.body.dislike;
  await reaction.save();
  res.json(reaction);
};

exports.delete = async (req, res) => {
  const reaction = await db.reaction.destroy({
    where: {
        user_id: req.params.user_id,
        post_id: req.params.post_id,
    },
    force: true,
  });
  res.json("Successful delete !");
};
