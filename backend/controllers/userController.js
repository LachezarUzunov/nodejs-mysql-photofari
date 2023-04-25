const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mapErrors = require('../util/mappers');

// @desc        Register a new user
// @route       /api/users
// @access      private
async function registerUser (req, res) {
    const {name, email, password} = req.body;
    
    // Hash password
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt)

    try {
          // Validation
        if (!name || !email || !password) {
        throw new Error('Моля въведете всички полета')
        }


        const userExists = await User.findOne({
            where: {
                email: email
            }
        })
    
        if (userExists) {
            throw new Error('Потребител с такъв имейл вече съществува');
        }
    
        // USING BUILD / SAVE method
        const newUser = User.build({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        // USING CREATE METHOD
        // const res = await User.create({
        //     name,
        //     email,
        //     password
        // })
        console.log(user);
        //const user = res.toJSON();

        if (user) {
            res.status(201).json({
                id: user.user_id,
                name: user.name,
                email: user.email,
                pics: user.pics,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            throw new Error('Невалидни данни');
        }
    } catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors);
    }
}


// @desc        Login a user
// @route       /api/users/login
// @access      Public
async function loginUser (req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    })
    console.log(user)
    try {
        // Check user and password match
        if (user && (await brcypt.compare(password, user.password))) {
            res.status(200).json({
                id: user.user_id,
                name: user.name,
                email: user.email,
                pics: user.pics,
                isAdmin: user.isAdmin,
                token: generateToken(user.user_id)
            })
        } else {
            throw new Error('Невалидни логин детайли!')
        }

    } catch (err) {
        const errors = mapErrors(err);
        res.status(401).json(errors)
    }
}

// GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
};

module.exports = {
    registerUser,
    loginUser
}