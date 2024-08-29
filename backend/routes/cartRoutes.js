

const express = require('express');
const {
    addToCart,
    getCartItemById,
    getCartByUserEmail,
    deleteCartItem
} = require('../controllers/cartController.js');
const { verifyJWT } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/add-to-cart', verifyJWT, addToCart);
router.get('/cart-item/:id', verifyJWT, getCartItemById);
router.get('/cart/:email', verifyJWT, getCartByUserEmail);
router.delete('/delete-cart-item/:id', verifyJWT, deleteCartItem);

module.exports = router;
