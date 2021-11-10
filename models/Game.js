const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Game extends Model {}

Game.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // genres: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    // },
    // num_of_players: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
    // library_game_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "library",
    //     key: "game_id"
    //   }
    // },
    // wishlist_game_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "wishlist",
    //     key: "game_id"
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;
