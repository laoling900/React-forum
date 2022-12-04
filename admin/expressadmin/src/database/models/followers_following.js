module.exports = (db, DataTypes) =>
    db.sequelize.define("followers_following", {

    },{
        timestamps:false,
    })