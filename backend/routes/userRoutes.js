

const express = require('express');
const { verifyJWT, verifyAdmin } = require('../middleware/authMiddleware.js');
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUser,
    updateUser
} = require('../controllers/userController.js');

const router = express.Router();

// Public routes
router.post('/new-user', createUser);

// Protected routes
router.get('/users', verifyJWT, verifyAdmin, getAllUsers);
router.get('/users/:id', verifyJWT, verifyAdmin, getUserById);
router.get('/user/:email', verifyJWT, getUserByEmail);
router.delete('/delete-user/:id', verifyJWT, verifyAdmin, deleteUser);
router.put('/update-user/:id', verifyJWT, verifyAdmin, updateUser);

module.exports = router;
