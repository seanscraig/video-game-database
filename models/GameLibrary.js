const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

class GameLibrary extends Model {}

GameLibrary.init(
    {
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id',
            }
        },
        library_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'library',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game_library',
    }
);

module.exports = GameLibrary