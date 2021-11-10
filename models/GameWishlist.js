const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class GameWishlist extends Model {}

GameWishlist.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "game",
        key: "id",
      },
    },
    wishlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "wishlist",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game_wishlist",
  }
);

module.exports = GameWishlist;
