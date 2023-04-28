const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');
const Photo = require('./photoModel');
const Comment = require('./commentModel');


const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pics: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, 

    // We can make the table name as in this code by adding this
    // freezeTableName: true
    // We can remove the default timestamps createdAt, updatedAt with
    // timestamps: false
    );

module.exports = User;

// Linking Photos and Users
User.hasMany(Photo, { as: 'photos'});
Photo.belongsTo(User, {
    foreignKey: 'user_id',
});

// Linking Comments and Users
User.hasMany(Comment, { as: 'comments'});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Linking Photos and Comments
Photo.hasMany(Comment, { as: 'comments'});
Comment.belongsTo(Photo, {
    foreignKey: 'photo_id',
});


