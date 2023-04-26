const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { postPhoto, getLastTen } = require('../controllers/photoController');


// POST, EDIT and DELETE photos
router.post('/', protect, postPhoto);

// GET public photos and single photo
router.get('/lastTen', getLastTen);

module.exports = router;