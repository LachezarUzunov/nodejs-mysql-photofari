const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');
const { DataTypes } = Sequelize;

const Photo = sequelize.define({ 'photo': {
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
   

}})

// ------- CREATING TABLES ---------- //
// const createTable = async () => {
//     try {
//         const res = await Photo.sync();
//         console.log('Table and model synced successfully')
//     } catch (err) {
//         console.log('Error syncing the table and the model')
//     }
// }

// createTable();