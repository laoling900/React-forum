const db = require("../database");
const argon2 = require("argon2");
const { where } = require("sequelize");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(
    req.params.id,{
      include: db.post
    });

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const users = await db.user.findAll();

  for (const user of users) {
    if (
      user.user_email === req.query.email &&
      (await argon2.verify(user.user_password, req.query.password)) === true
    ) {
      res.json(user);
      return;
    }
  }
  res.json(null);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.user_password, {
    type: argon2.argon2id,
  });

  const user = await db.user.create({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: hash,
    //admin
    user_block:false
  });

  res.json(user);
};

//update user profile
exports.update = async (req, res) => {

  const user = await db.user.findByPk(req.body.user_id);
  // Update profile fields.
  user.user_name = req.body.user_name;
  user.user_email = req.body.user_email;

  await user.save();

  res.json(user);
};

// //delete user
exports.delete = async(req, res) => {
  const user = await db.user.findByPk(req.params.id);
  await db.user.destroy({
    where:{
      user_id:req.params.id
    },
    force:true
  });
res.json(null);
}
