const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { postPhoto, getLastTen, getPhotoById } = require('../controllers/photoController');


// POST, EDIT and DELETE photos
router.post('/', protect, postPhoto);

// GET public photos and single photo
router.get('/lastTen', getLastTen);
router.get('/:id', getPhotoById);

module.exports = router;