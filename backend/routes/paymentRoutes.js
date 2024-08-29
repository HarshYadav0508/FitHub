
const express = require('express');
const {
    createPaymentIntent,
    savePaymentInfo,
    getPaymentHistory,
    getPaymentHistoryLength
} = require('../controllers/paymentController.js');
const { verifyJWT } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/create-payment-intent', verifyJWT, createPaymentIntent);
router.post('/payment-info', verifyJWT, savePaymentInfo);
router.get('/payment-history/:email', verifyJWT, getPaymentHistory);
router.get('/payment-history-length/:email', verifyJWT, getPaymentHistoryLength);

module.exports = router;
