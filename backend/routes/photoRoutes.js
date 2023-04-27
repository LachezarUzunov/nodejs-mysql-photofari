const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { postPhoto, getLastTen, getPhotoById, postComment } = require('../controllers/photoController');


// POST, EDIT and DELETE photos
router.post('/', protect, postPhoto);

// GET public photos and single photo
router.get('/lastTen', getLastTen);
router.get('/:id', getPhotoById);

// POST comments
router.post('/comments', protect, postComment);

module.exports = router;