const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');


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
{
    // We can make the table name as in this code by adding this
    // freezeTableName: true
    // We can remove the default timestamps createdAt, updatedAt with
    // timestamps: false
});

module.exports = User;

// ------- CREATING TABLES ---------- //
// const createTable = async () => {
//     try {
//         const res = await User.sync();
//         console.log('Table and model synced successfully')
//     } catch (err) {
//         console.log('Error syncing the table and the model')
//     }
// }

// createTable();

// -------- UPDATING TABLES ------------ //
const updateTable = async () => {
    try {
        await User.sync({ alter: true });
        console.log('Table and model synced successfully!')
    } catch (err) {
        console.log('Could not sync table and model')
    }
}

//updateTable();