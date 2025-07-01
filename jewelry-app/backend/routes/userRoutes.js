const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (requires authentication middleware — optional)
router.get('/profile', getUserProfile); // You can add auth middleware here later

module.exports = router;
