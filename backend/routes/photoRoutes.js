const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { postPhoto } = require('../controllers/photoController');


// POST, EDIT and DELETE photos
router.post('/', protect, postPhoto);



module.exports = router;