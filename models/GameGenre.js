const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GameGenre extends Model {}

GameGenre.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "game",
        key: "id",
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "genre",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game_genre",
  }
);

module.exports = GameGenre
