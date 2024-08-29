
const express = require('express');
const { applyAsInstructor, getAppliedInstructors } = require('../controllers/appliedController.js');

const router = express.Router();

router.post('/as-instructor', applyAsInstructor);
router.get('/applied-instructors/:email', getAppliedInstructors);

module.exports = router;
