const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const { connectDB } = require('./config/db');
const { sequelize } = require('./config/db');

// Connecting to the mySQL databsae
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello');
})

app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Credentials", "true");
res.header("Access-Control-Allow-Origin", "*");
res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
next();
});

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/photos', require('./routes/photoRoutes'))

// const createTables = async () => {
//     try {
//         await Comment.sync();
//         console.log('DB and tables synced successfully')
//     } catch (error){
//         console.log('Error', error)
//     }
// }

sequelize.sync().then(result => {
    console.log('synced successfully')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.log(err)
})




// -------- UPDATING TABLES ------------ //
// const updateTable = async () => {
//     try {
//         await Comment.sync({ alter: true });
//         console.log('Table and model synced successfully!')
//     } catch (err) {
//         console.log('Could not sync table and model')
//     }
// }

//updateTable();

// ------- CREATING TABLES ---------- //
// const createTable = async () => {
//     try {
//         const res = await Comment.sync();
//         console.log('Table and model synced successfully')
//     } catch (err) {
//         console.log('Error syncing the table and the model')
//     }
// }
//createTable();