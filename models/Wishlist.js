const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Wishlist extends Model {}

Wishlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    game_wishlist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "wishlist",
  }
);

module.exports = Wishlist;
