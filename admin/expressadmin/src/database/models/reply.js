module.exports = (db, DataTypes) =>
db.sequelize.define(
    "reply",
    {
      reply_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reply_text: {
        type: DataTypes.TEXT,
        allowNull: false,    
        validate: {
            min: 1,
            max: 200,
          },
      },
      replyTo_id:{
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
