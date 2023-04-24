const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');


const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    pics: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, 
{
    // We can make the table name as in this code by adding this
    // freezeTableName: true
    // We can remove the default timestamps createdAt, updatedAt with
    // timestamps: false
});

const createTable = async () => {
    try {
        const res = await User.sync();
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}

createTable();