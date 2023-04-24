const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc        Register a new user
// @route       /api/users
// @access      private
async function registerUser (req, res) {
    const {name, email, password} = req.body;
    console.log(req.body)

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Моля въведете всички полета')
    }

    // Hash password
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt)

    try {
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
                id: user._id,
                name: user.name,
                email: user.email,
                pics: user.pics,
                token: generateToken(user._id)
            })
        } else {
            res.status(400);
            throw new Error('Невалидни данни');
        }
    } catch (err) {
        console.log(err);
    }
}

// GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
};

module.exports = {
    registerUser
}