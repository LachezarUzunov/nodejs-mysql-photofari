const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function protect (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
          //  console.log('decoded ID', decoded)
            const user = await User.findOne({
                where: {
                    user_id: decoded.id
                }
            })
           // console.log(user)
            req.user = {
                id: user.user_id
            }

            next();
        } catch (err) {
            res.status(401);
            throw new Error('Неоторизиран достъп');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Неоторизиран достъп');
    }
}

module.exports = { protect };