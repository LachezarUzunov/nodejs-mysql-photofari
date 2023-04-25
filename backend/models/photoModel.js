const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');

const Photo = sequelize.define('photo', {
    photo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Photo;
// ------- CREATING TABLES ---------- //
const createTable = async () => {
    try {
        const res = await Photo.sync({force: true});
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}
//createTable();

// -------- UPDATING TABLES ------------ //
const updateTable = async () => {
    try {
        await Photo.sync();
        console.log('Table and model synced successfully!')
    } catch (err) {
        console.log('Could not sync table and model')
    }
}

//updateTable();