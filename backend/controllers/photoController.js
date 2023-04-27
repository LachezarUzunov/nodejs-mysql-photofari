const User = require('../models/userModel');
const Photo = require('../models/photoModel');
const mapErrors = require('../util/mappers');

// @desc        Get single photo
// @route       GET /api/photos/:id
// @access      public
async function getPhotoById (req, res) {
    try {
        const photo = await Photo.findOne({
            where: {
                photo_id: req.params.id
            }
        })

        const photoRes = {
            id : photo.photo_id,
            title: photo.title,
            description: photo.description,
            user_id: photo.user_id
        }
        console.log('single photo', photo)
        if (!photoRes) {
            throw new Error('Снимката не е намерена.')
        } else {
            res.status(200).json(photoRes);
        }
    } catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors)
    }
    
}

// @desc        Get latest 10 photos
// @route       GET api/photos
// @access      public
async function getLastTen (req, res) {
  //  console.log(req.body)
    try {
        const photo = await Photo.findOne({
            where: {
                photo_id: 1
            }
        })
       // console.log(photo);
        const updatedPhoto = {
            _id : photo.photo_id,
            title: photo.title,
            description: photo.description,
            photo: photo.photo,
            user: photo.user_id,
        }
        let photos = [];
        // const photos = await Photo.findAll({attributes: [['photo_id', '_id'], ['title'], ['description'], ['photo'], ['user_id', 'user']], order: [[photo_id, 'DESC']], limit: 10})
        // console.log(photos)
     
        if (updatedPhoto) {
            photos.push(updatedPhoto)
            res.status(200).json(photos);
        }
    } catch (err) {
        const errors = mapErrors(err);
        res.json(errors);
    }
}

// @desc        Publish a new photo
// @route       POST /api/photos
// @access      for registered and logged in users only
async function postPhoto (req, res) {
    const { title, description, photo } = req.body;

    try {
    // Get user using the id in the JWT
    const user = await User.findOne({
        where: {
            user_id: req.user.id
        }
    })

    if (!user) {
        throw new Error('Такъв потребител не съществува')
    };

    if (user.pics >= 10) {
        throw new Error('Нямате право да качите повече от 10 снимки, моля изтрийте някоя първо.')
    }

    const photoObj = Photo.build({
        title,
        description,
        photo,
        user_id: req.user.id
    })

    const newPhoto = await photoObj.save();

    if (newPhoto) {
        req.status(201).json(newPhoto)
    } else {
        throw new Error('Невалидно въведена информация.')
    }

    } catch (err) {
        const errors = mapErrors(err);
        res.json(errors);
    }
}

module.exports = {
    postPhoto,
    getLastTen,
    getPhotoById
}