module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      },
      user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: db.user,
          key: "user_id"
        }
      },

    },
    {
      timestamps: false,
    }
  );
