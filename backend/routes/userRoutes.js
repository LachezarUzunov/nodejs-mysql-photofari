const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getLastFive 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', registerUser);
router.post('/login', loginUser);

// Get last 5 users
router.get('/lastFive', protect, getLastFive);

module.exports = router;