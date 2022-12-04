const { user } = require("..");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("reaction", {
        like:{
            type: DataTypes.BOOLEAN
        },
        dislike:{
            type: DataTypes.BOOLEAN
        },
    },{
        timestamps:false,
        
    })