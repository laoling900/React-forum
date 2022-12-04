const { time } = require("console");
const { Sequelize, DataTypes, TIME } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  timezone:`+10:00`
});

// Include models.
db.user = require("./models/user.js")(db, DataTypes);
db.post = require("./models/post.js")(db, DataTypes);
db.reply = require("./models/reply.js")(db, DataTypes);
db.reaction = require("./models/reaction.js")(db,DataTypes);
db.followers_following = require("./models/followers_following.js")(db,DataTypes);

// Relate post and user.
db.user.hasMany(db.post, {
  foreignKey: { name: "user_id", allowNull: false },
  });
db.post.belongsTo(db.user,{
  foreignKey: { name: "user_id", allowNull: false },
});


//Relate post and reply
db.post.hasMany(db.reply, {
  foreignKey: { name: "post_id", allowNull: false },
});
db.reply.belongsTo(db.post,{
  foreignKey: { name:"post_id", allowNull: false},
});



//Relate user and reply
db.user.hasMany(db.reply, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.reply.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull:false},
});


//Relate reaction, user and post
db.user.belongsToMany(db.post, {through:"reaction", foreignKey:{ name: "user_id", allowNull: false }});
db.post.belongsToMany(db.user, {through:"reaction",foreignKey:{ name: "post_id", allowNull: false }});

//Realationship between followers and followings
db.user.belongsToMany(db.user, {through:"followers_following",foreignKey:{name:"follower_id"}, otherKey:{name:"following_id"}, as:"followers"});
db.user.belongsToMany(db.user, {through:"followers_following", foreignKey:{name:"following_id"}, otherKey:{name:"follower_id"},as:"following"})

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    user_name: "Ling",
    user_email: "Ling@qq.com",
    user_password: hash,
    //admin
    user_block:false
  });

  await db.user.create({
    user_name: "Ying",
    user_email: "Ying@qq.com",
    user_password: hash,
    user_block:false
  });

  await db.user.create({
    user_name: "KaiShen",
    user_email: "KaiShen@qq.com",
    user_password: hash,
    user_block:false
  });

  await db.user.create({
    user_name: "Frank",
    user_email: "Frank@qq.com",
    user_password: hash,
    user_block:true
  });
  await db.user.create({
    user_name: "Xianxin",
    user_email: "Xianxin@qq.com",
    user_password: hash,
    user_block:false
  });


  await db.post.create({
    post_text: "the first post",
    post_pictureURL: null,
    user_id: 1,
    //admin
    post_delete:false
  });

  await db.post.create({
    post_text: "the second post",
    post_pictureURL: null,
    user_id: 2,
    post_delete:false
  });

  await db.post.create({
    post_text: "Dirty joke",
    post_pictureURL: null,
    user_id: 3,
    post_delete:true
  });

  await db.reply.create({
    reply_text: "the first reply",
    post_id: 1,
    user_id: 1,
    replyTo_id:null,
  });

  await db.reply.create({
    reply_text: "the first reply to reply",
    post_id:1,
    user_id:2,
    replyTo_id:1,
  });

  await db.followers_following.create({
    follower_id:1,
    following_id:2,
  })

  await db.followers_following.create({
    follower_id:2,
    following_id:1,
  })

  await db.followers_following.create({
    follower_id:1,
    following_id:3,
  })


  await db.reaction.create({
    user_id:1,
    like: true,
    dislike: false,
    post_id:1,
  });

  await db.reaction.create({
    user_id:1,
    like: false,
    dislike: true,
    post_id:2,
  });

  await db.reaction.create({
    user_id:2,
    like: false,
    dislike: true,
    post_id:1,
  });

  await db.reaction.create({
    user_id:2,
    like: true,
    dislike: false,
    post_id:2,
  });

}

module.exports = db;
