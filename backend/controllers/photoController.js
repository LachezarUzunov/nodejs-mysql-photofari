const User = require('../models/userModel');
const Photo = require('../models/photoModel');
const Comment = require('../models/commentModel');
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
    try {
        const photos = await Photo.findAll({
            limit: 10,
            order: [['photo_id', 'DESC']]
        });
  
        const updatedPhotos = photos.map(p => {
            return  {
                _id: p.photo_id,
                title: p.title,
                description: p.description,
                photo: p.photo,
                user: p.user_id
            }  
        });
     
        if (updatedPhotos) {
            res.status(200).json(updatedPhotos);
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
        req.status(201).json(newPhoto);
    } else {
        throw new Error('Невалидно въведена информация.')
    }

    } catch (err) {
        const errors = mapErrors(err);
        res.json(errors);
    }
}

// @desc        POST a new comment
// @route       POST api/photos/comments
// @access      private - for registered and logged in users only
async function postComment (req, res) {
    const { photo_id, comment } = req.body;

    try {
        const user = await User.findOne({
            where: {
                user_id : req.user.id
            }
        })

        if (!user) {
            throw new Error('Такъв потребител не съществува')
        };

        const newComment = await Comment.create({
            comment,
            photo_id,
            user_id: req.user.id
        })
       
    
        if (newComment) {
            //console.log(newComment)
            req.status(201).json(newComment);
        } else {
            throw new Error('Невалидно въведена информация.')
        }
    } catch (err) {
        const errors = mapErrors(err);
        res.json(errors);
    }
}

// @desc        Get comments
// @route       GET api/photos/:id/comments
// @access      public
async function getComments (req, res) {
    console.log(req.params.id)

      try {
          const comment = await Comment.findAll({
              where: {
                  photo_id: req.params.id
              }
          })
          comment.forEach(c => console.log(c.toJSON()))
          const comments = comment.map(c => {
            return {
                comment_id: c.comment_id,
                comment: c.comment
            }
          })
      
          if (comments) {
              res.status(200).json(comments);
          }
      } catch (err) {
          const errors = mapErrors(err);
          res.json(errors);
      }
  }

module.exports = {
    postPhoto,
    getLastTen,
    getPhotoById,
    postComment,
    getComments
}