const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Library extends Model {}

Library.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        games: {
            type: DataTypes.STRING,
            allowNull: true
        },
        library_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'library',
    }
);

module.exports = Library