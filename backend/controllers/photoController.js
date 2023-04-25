const User = require('../models/userModel');
const Photo = require('../models/photoModel');
const mapErrors = require('../util/mappers');

// @desc        Publish a new photo
// @route       POST /api/photos
// @access      for registered and logged in users only
async function postPhoto (req, res) {
    const { title, description, photo } = req.body;

        console.log('request body from photo controller', req.body)
    try {
    // Get user using the id in the JWT
    const user = await User.findOne({
        where: {
            user_id: req.user.id
        }
    })
    console.log('User from create photo controller', user);
   // console.log(user.pics);

    if (!user) {
        throw new Error('Такъв потребител не съществува')
    };

    if (user.pics >= 10) {
        throw new Error('Нямате право да качите повече от 10 снимки, моля изтрийте някоя първо.')
    }

    const newPhoto = Photo.build({
        title,
        description,
        photo,
        user_id: req.user.id
    })

    const photo = await newPhoto.save();

    if (photo) {
        req.status(201).json(photo)
    } else {
        throw new Error('Невалидно въведена информация.')
    }

    } catch (err) {
        const errors = mapErrors(err);
        res.json(errors);
    }
}

module.exports = {
    postPhoto
}