const Sequelize = require('sequelize');

const sequelize = new Sequelize('photofari', 'root', 'Uzu_l0v_Roni', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// async function connectDB () {
//     try {
//         await sequelize.authenticate();
//         console.log('Sucess');
//     } catch (err){
//         console.log('Failed to connect')
//     }
// }

// ------ Connecting with ARROW function ---------- //
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Success')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {connectDB, sequelize};

// ------ Connecting with THEN block ---------- //
// sequelize.authenticate().then(() => {
//     console.log('Connection successfull');
// }).catch((err) => {
//     console.log('Error connecting to the database')
// });