const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        if (updateUserData.password) {
          updateUserData.password = await bcrypt.hash(
            updateUserData.password,
            10
          );
        }
        return updateUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
