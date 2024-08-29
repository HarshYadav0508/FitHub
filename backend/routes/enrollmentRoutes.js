
const express = require('express');
const {
    getPopularClasses,
    getPopularInstructors,
    getInstructors,
    getEnrolledClasses
} = require('../controllers/enrollmentController.js');
const { verifyJWT } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/popular-classes', getPopularClasses);
router.get('/popular-instructors', getPopularInstructors);
router.get('/instructors', getInstructors);
router.get('/enrolled-classes/:email', verifyJWT, getEnrolledClasses);

module.exports = router;
