
module.exports = (db, DataTypes) =>
db.sequelize.define("reaction", {
        like:{
            type: DataTypes.BOOLEAN
        },
        dislike:{
            type: DataTypes.BOOLEAN
        },
    },{
        timestamps:false,
        
    })