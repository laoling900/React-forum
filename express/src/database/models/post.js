module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        //unique:true
      },
      post_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: 1,
          max: 600,
        },
      },
      post_pictureURL: {
        type: DataTypes.STRING,
      },
      //admin
      post_delete:{
        type:DataTypes.BOOLEAN,
      }
    },
    {
      timestamps: false,
    }
  );
