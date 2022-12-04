module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: db.post, 
    
      },
      user_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      user_password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      //admin
      user_block: {
        type: DataTypes.BOOLEAN,
      },
     
    },
    {
      timestamps: true,
    }
  );
