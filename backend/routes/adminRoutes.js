
const express = require('express');
const { getAdminStats } = require('../controllers/adminController.js');
const { verifyJWT, verifyAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/admin-stats', verifyJWT, verifyAdmin, getAdminStats);

module.exports = router;
