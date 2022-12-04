const db = require("../database");

// Select all replies from the database.
exports.all = async (req, res) => {
  const replies = await db.reply.findAll({
    include:db.user
  });

  res.json(replies);
};

exports.one = async(req,res) => {
  const reply = await db.reply.findByPk(req.params.id,{
    include: db.user
  });
  res.json(reply);
};


// Create a reply in the database.
exports.create = async (req, res) => {
  const reply = await db.reply.create({
    reply_text:req.body.reply_text,
    post_id:req.body.post_id,
    user_id: req.body.user_id,
    replyTo_id: req.body.replyTo_id
  });

  res.json(reply);
};
